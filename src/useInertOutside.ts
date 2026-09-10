import { RefObject, useEffect } from 'react';

// Elements that never take part in the accessibility tree or the tab order;
// marking them would only add noise to the restore list.
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEMPLATE', 'LINK', 'META', 'NOSCRIPT']);

type Touched = {
  element: Element;
  inert: string | null;
  ariaHidden: string | null;
};

/**
 * Hide everything outside `rootRef` from assistive technology and the tab
 * order while `isActive`.
 *
 * Walks from the root up to <body>, and at each level marks the current
 * node's siblings `inert` and `aria-hidden="true"`. Only the chain from body
 * down to the root stays live, which is what makes it work for a custom
 * portal container inside the page as well as for document.body. Both
 * attributes are set on purpose: `inert` removes the outside from the tab
 * order and the accessibility tree in every current browser, `aria-hidden`
 * covers assistive technology that predates it. Every attribute is restored
 * to exactly what it was when the hook deactivates.
 *
 * `aria-modal="true"` on the dialog is meant to imply all this, but screen
 * readers honour it unevenly; this is the belt to that pair of braces.
 */
export function useInertOutside(
  rootRef: RefObject<HTMLElement | null>,
  isActive: boolean,
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!isActive || !root) return;

    const touched: Touched[] = [];
    let node: Element = root;

    while (node.parentElement && node !== document.body) {
      const parent = node.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (sibling === node || SKIP.has(sibling.tagName)) continue;
        touched.push({
          element: sibling,
          inert: sibling.getAttribute('inert'),
          ariaHidden: sibling.getAttribute('aria-hidden'),
        });
        // Attributes rather than the `inert` property: jsdom has no property,
        // and the attribute is what every browser reads anyway.
        sibling.setAttribute('inert', '');
        sibling.setAttribute('aria-hidden', 'true');
      }
      node = parent;
    }

    return () => {
      for (const { element, inert, ariaHidden } of touched) {
        if (inert === null) element.removeAttribute('inert');
        else element.setAttribute('inert', inert);
        if (ariaHidden === null) element.removeAttribute('aria-hidden');
        else element.setAttribute('aria-hidden', ariaHidden);
      }
    };
  }, [rootRef, isActive]);
}

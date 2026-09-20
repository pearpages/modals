import { RefObject, useEffect } from 'react';

/**
 * Follow the visual viewport while `isActive`, by writing two custom
 * properties onto `rootRef`:
 *
 * - `--modal-vvh`: the height actually visible to the user.
 * - `--modal-vv-offset-top`: how far that visible box has been pushed down.
 *
 * A `position: fixed` element is laid out against the *layout* viewport, which
 * on iOS does not shrink when the software keyboard appears: the keyboard and
 * the form accessory bar simply cover the bottom of the page. A dialog that
 * centres its panel then centres it in a box the user cannot fully see, and a
 * focused input near the bottom ends up underneath the keyboard. Safari also
 * scrolls the visual viewport to reveal a focused field, which moves the box
 * again without any resize — hence both listeners.
 *
 * The properties are removed on cleanup, and the stylesheet gives each a
 * fallback (`0px` and `100dvh`), so with the hook inactive, on a browser with
 * no `visualViewport`, or during server rendering, the overlay is laid out
 * exactly as it was before this existed. On a desktop browser the values equal
 * the layout viewport, so nothing moves there either.
 */
export function useVisualViewport(
  rootRef: RefObject<HTMLElement | null>,
  isActive: boolean,
): void {
  useEffect(() => {
    const root = rootRef.current;
    const viewport = typeof window === 'undefined' ? null : window.visualViewport;
    if (!isActive || !root || !viewport) return;

    const update = () => {
      root.style.setProperty('--modal-vvh', `${viewport.height}px`);
      root.style.setProperty('--modal-vv-offset-top', `${viewport.offsetTop}px`);
    };

    update();
    // resize: the keyboard opening or closing. scroll: Safari moving the
    // visible box to reveal a focused field, which fires no resize.
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);

    return () => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
      root.style.removeProperty('--modal-vvh');
      root.style.removeProperty('--modal-vv-offset-top');
    };
  }, [rootRef, isActive]);
}

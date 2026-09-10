import React from 'react';

/**
 * Focus trap utility for modal dialogs
 * Provides focus trapping functionality to keep tab navigation within a modal container
 */

// CSS selector for focusable elements
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details',
  'summary',
].join(', ');

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[];
  return elements.filter(element => {
    // Filter out elements that are not actually focusable
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      !element.hasAttribute('disabled') &&
      element.tabIndex !== -1
    );
  });
}

/**
 * Focus trap hook that manages focus within a container
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isActive: boolean = true
) {
  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      // Always move focus ourselves rather than only at the ends of the list.
      // Letting the browser handle the middle steps leaks in Safari, whose
      // default Tab order skips buttons and links: from the last element it
      // considers tabbable, focus left the dialog for <body>.
      event.preventDefault();

      const focusableElements = getFocusableElements(container);
      if (focusableElements.length === 0) return;

      const activeElement = document.activeElement as HTMLElement;
      const index = focusableElements.indexOf(activeElement);
      const step = event.shiftKey ? -1 : 1;
      const next =
        index === -1
          ? (event.shiftKey ? focusableElements.length - 1 : 0)
          : (index + step + focusableElements.length) % focusableElements.length;
      focusableElements[next].focus();
    };

    // Add event listener to document to catch all tab events
    document.addEventListener('keydown', handleKeyDown);
    
    // Focus the first focusable element when trap becomes active
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, isActive]);
}

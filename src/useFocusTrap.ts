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

      const focusableElements = getFocusableElements(container);
      
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab: going backwards
        if (activeElement === firstFocusable || !container.contains(activeElement)) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab: going forwards
        if (activeElement === lastFocusable || !container.contains(activeElement)) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
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

/**
 * Focus restoration hook that stores and restores focus
 */
export function useFocusRestore(
  isModalOpen: boolean,
  modalId: string
) {
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (isModalOpen) {
      // Store the currently focused element when modal opens
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else {
      // Restore focus when modal closes
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        // Use setTimeout to ensure the modal has been removed from DOM
        setTimeout(() => {
          previousFocusRef.current?.focus();
          previousFocusRef.current = null;
        }, 0);
      }
    }
  }, [isModalOpen, modalId]);

  return previousFocusRef.current;
}
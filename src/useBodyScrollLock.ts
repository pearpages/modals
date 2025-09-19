import { useLayoutEffect, useRef } from 'react';

// Detect iOS devices
const isIOS = (): boolean => {
  return typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Calculate scrollbar width for layout compensation
const getScrollbarWidth = (): number => {
  if (typeof window === 'undefined') return 0;

  // Create a temporary div to measure scrollbar width
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  (outer.style as any).msOverflowStyle = 'scrollbar'; // IE legacy support
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  document.body.removeChild(outer);
  return scrollbarWidth;
};

interface ScrollLockState {
  originalBodyStyle: {
    overflow: string;
    position: string;
    top: string;
    left: string;
    right: string;
    paddingRight: string;
  };
  originalScrollY: number;
  scrollbarWidth: number;
}

/**
 * Hook to lock/unlock body scroll with cross-browser compatibility
 * Handles iOS-specific issues and prevents layout shifts
 */
export const useBodyScrollLock = (isLocked: boolean): void => {
  const stateRef = useRef<ScrollLockState | null>(null);

  useLayoutEffect(() => {
    // Early return if SSR or no change needed
    if (typeof window === 'undefined') return;

    const body = document.body;

    if (isLocked && !stateRef.current) {
      // Lock scroll
      const scrollbarWidth = getScrollbarWidth();
      const scrollY = window.scrollY;

      // Store original styles
      stateRef.current = {
        originalBodyStyle: {
          overflow: body.style.overflow,
          position: body.style.position,
          top: body.style.top,
          left: body.style.left,
          right: body.style.right,
          paddingRight: body.style.paddingRight,
        },
        originalScrollY: scrollY,
        scrollbarWidth,
      };

      // Set CSS custom property for scrollbar compensation
      body.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);

      if (isIOS()) {
        // iOS-specific handling using position: fixed
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
      } else {
        // Standard approach for desktop and Android
        body.style.overflow = 'hidden';
        // Compensate for scrollbar width to prevent layout shift
        if (scrollbarWidth > 0) {
          const currentPadding = parseInt(window.getComputedStyle(body).paddingRight, 10) || 0;
          body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
        }
      }

      // Add data attribute for CSS targeting
      body.setAttribute('data-scroll-lock', 'true');

    } else if (!isLocked && stateRef.current) {
      // Unlock scroll
      const state = stateRef.current;

      // Restore original styles
      body.style.overflow = state.originalBodyStyle.overflow;
      body.style.position = state.originalBodyStyle.position;
      body.style.top = state.originalBodyStyle.top;
      body.style.left = state.originalBodyStyle.left;
      body.style.right = state.originalBodyStyle.right;
      body.style.paddingRight = state.originalBodyStyle.paddingRight;

      // Remove CSS custom property
      body.style.removeProperty('--scrollbar-compensation');

      // Remove data attribute
      body.removeAttribute('data-scroll-lock');

      if (isIOS()) {
        // Restore scroll position on iOS
        window.scrollTo(0, state.originalScrollY);
      }

      stateRef.current = null;
    }

    // Cleanup function
    return () => {
      if (stateRef.current) {
        const state = stateRef.current;

        // Restore all original styles
        body.style.overflow = state.originalBodyStyle.overflow;
        body.style.position = state.originalBodyStyle.position;
        body.style.top = state.originalBodyStyle.top;
        body.style.left = state.originalBodyStyle.left;
        body.style.right = state.originalBodyStyle.right;
        body.style.paddingRight = state.originalBodyStyle.paddingRight;

        body.style.removeProperty('--scrollbar-compensation');
        body.removeAttribute('data-scroll-lock');

        if (isIOS()) {
          window.scrollTo(0, state.originalScrollY);
        }

        stateRef.current = null;
      }
    };
  }, [isLocked]);
};

/**
 * Utility hook for components that need scrollbar compensation
 * Returns the current scrollbar width as a CSS custom property value
 */
export const useScrollbarCompensation = (): string => {
  const scrollbarWidth = getScrollbarWidth();
  return `${scrollbarWidth}px`;
};
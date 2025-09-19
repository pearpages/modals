import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useBodyScrollLock } from './useBodyScrollLock';

// Mock window.scrollTo and navigator.userAgent
const mockScrollTo = vi.fn();
const originalScrollTo = window.scrollTo;
const originalUserAgent = navigator.userAgent;

beforeEach(() => {
  // Reset DOM
  document.body.style.cssText = '';
  document.body.removeAttribute('data-scroll-lock');

  // Mock scrollTo
  window.scrollTo = mockScrollTo;
  window.scrollY = 100; // Mock current scroll position

  mockScrollTo.mockClear();
});

afterEach(() => {
  // Restore originals
  window.scrollTo = originalScrollTo;
  Object.defineProperty(navigator, 'userAgent', {
    value: originalUserAgent,
    configurable: true
  });

  // Clean up DOM
  document.body.style.cssText = '';
  document.body.removeAttribute('data-scroll-lock');
});

describe('useBodyScrollLock', () => {
  it('should lock body scroll when isLocked is true', () => {
    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.getAttribute('data-scroll-lock')).toBe('true');
  });

  it('should unlock body scroll when isLocked changes to false', () => {
    const { rerender } = renderHook(({ isLocked }) => useBodyScrollLock(isLocked), {
      initialProps: { isLocked: true }
    });

    // Verify it's locked
    expect(document.body.style.overflow).toBe('hidden');

    // Unlock
    rerender({ isLocked: false });

    expect(document.body.style.overflow).toBe('');
    expect(document.body.getAttribute('data-scroll-lock')).toBeNull();
  });

  it('should handle iOS devices with position fixed', () => {
    // Mock iOS user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true
    });

    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.top).toBe('-100px'); // -window.scrollY
    expect(document.body.style.left).toBe('0px');
    expect(document.body.style.right).toBe('0px');
  });

  it('should restore scroll position on iOS when unlocking', () => {
    // Mock iOS user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
      configurable: true
    });

    const { rerender } = renderHook(({ isLocked }) => useBodyScrollLock(isLocked), {
      initialProps: { isLocked: true }
    });

    // Unlock
    rerender({ isLocked: false });

    expect(mockScrollTo).toHaveBeenCalledWith(0, 100); // Restore original scroll position
  });

  it('should set CSS custom property for scrollbar compensation', () => {
    renderHook(() => useBodyScrollLock(true));

    const scrollbarCompensation = document.body.style.getPropertyValue('--scrollbar-compensation');
    expect(scrollbarCompensation).toMatch(/^\d+px$/); // Should be a pixel value
  });

  it('should clean up styles on unmount', () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true));

    // Verify it's locked
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.getAttribute('data-scroll-lock')).toBe('true');

    // Unmount should clean up
    unmount();

    expect(document.body.style.overflow).toBe('');
    expect(document.body.getAttribute('data-scroll-lock')).toBeNull();
  });

  it('should not duplicate lock when called multiple times with true', () => {
    const { rerender } = renderHook(({ isLocked }) => useBodyScrollLock(isLocked), {
      initialProps: { isLocked: true }
    });

    const firstOverflow = document.body.style.overflow;
    const firstDataAttr = document.body.getAttribute('data-scroll-lock');

    // Re-render with same value
    rerender({ isLocked: true });

    expect(document.body.style.overflow).toBe(firstOverflow);
    expect(document.body.getAttribute('data-scroll-lock')).toBe(firstDataAttr);
  });

  it('should handle non-iOS devices with standard overflow approach', () => {
    // Mock non-iOS user agent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      configurable: true
    });

    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.position).not.toBe('fixed');
  });
});
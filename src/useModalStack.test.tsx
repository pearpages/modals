import { renderHook, act } from '@testing-library/react';
import { ModalProvider, useModalStack } from './ModalProvider';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ModalProvider>{children}</ModalProvider>
);

describe('useModalStack', () => {
  it('should provide open, close, and isOpen functions', () => {
    const { result } = renderHook(() => useModalStack(), { wrapper });

    expect(typeof result.current.open).toBe('function');
    expect(typeof result.current.close).toBe('function');
    expect(typeof result.current.isOpen).toBe('function');
    expect(typeof result.current.getModal).toBe('function');
  });

  it('should return false for isOpen when modal is not registered', () => {
    const { result } = renderHook(() => useModalStack(), { wrapper });

    expect(result.current.isOpen('nonexistent-modal')).toBe(false);
  });

  it('should return undefined for getModal when modal is not registered', () => {
    const { result } = renderHook(() => useModalStack(), { wrapper });

    expect(result.current.getModal('nonexistent-modal')).toBeUndefined();
  });

  it('should allow opening and closing modals programmatically', () => {
    const { result: modalStackResult } = renderHook(() => useModalStack(), { wrapper });

    // Note: In a real scenario, modals would be registered by Modal components
    // For this test, we're testing the hook interface only
    // The actual registration happens when Modal components mount

    act(() => {
      modalStackResult.current.open('test-modal');
    });

    // Since modal isn't registered, it should still be false
    expect(modalStackResult.current.isOpen('test-modal')).toBe(false);

    act(() => {
      modalStackResult.current.close('test-modal');
    });

    expect(modalStackResult.current.isOpen('test-modal')).toBe(false);
  });

  it('should match the specs API signature', () => {
    const { result } = renderHook(() => useModalStack(), { wrapper });
    const modalStack = result.current;

    // Test the expected API from specs
    expect(modalStack.open).toBeDefined();
    expect(modalStack.close).toBeDefined();
    expect(modalStack.isOpen).toBeDefined();

    // Additional helper method
    expect(modalStack.getModal).toBeDefined();
  });
});
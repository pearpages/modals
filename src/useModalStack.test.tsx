import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ModalProvider, useModalStack } from './ModalProvider';
import { Modal } from './Modal';
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

  it('exposes id-taking open, close, isOpen and getModal', () => {
    const { result } = renderHook(() => useModalStack(), { wrapper });
    const modalStack = result.current;

    // Test the documented API (architecture.md › Public API)
    expect(modalStack.open).toBeDefined();
    expect(modalStack.close).toBeDefined();
    expect(modalStack.isOpen).toBeDefined();

    // Additional helper method
    expect(modalStack.getModal).toBeDefined();
  });

  describe('on a controlled modal', () => {
    // A controlled modal owns its state. open/close are requests that go to
    // onOpenChange; the provider only follows the `open` prop.
    const Controls = ({ id }: { id: string }) => {
      const modals = useModalStack();
      return (
        <>
          <button onClick={() => modals.open(id)}>open</button>
          <button onClick={() => modals.close(id)}>close</button>
          <span data-testid="is-open">{String(modals.isOpen(id))}</span>
        </>
      );
    };

    it('close(id) asks via onOpenChange(false) and leaves the modal mounted', () => {
      const onOpenChange = vi.fn();
      render(
        <ModalProvider>
          <Controls id="ctrl" />
          <Modal id="ctrl" open onOpenChange={onOpenChange}>
            <div data-testid="ctrl-content">content</div>
          </Modal>
        </ModalProvider>
      );

      fireEvent.click(screen.getByText('close'));

      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(screen.getByTestId('ctrl-content')).toBeInTheDocument();
      expect(screen.getByTestId('is-open')).toHaveTextContent('true');
    });

    it('open(id) asks via onOpenChange(true) and does not mount the modal', () => {
      const onOpenChange = vi.fn();
      render(
        <ModalProvider>
          <Controls id="ctrl" />
          <Modal id="ctrl" open={false} onOpenChange={onOpenChange}>
            <div data-testid="ctrl-content">content</div>
          </Modal>
        </ModalProvider>
      );

      fireEvent.click(screen.getByText('open'));

      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByTestId('ctrl-content')).not.toBeInTheDocument();
      expect(screen.getByTestId('is-open')).toHaveTextContent('false');
    });
  });
});

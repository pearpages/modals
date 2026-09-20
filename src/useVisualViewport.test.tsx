import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { ModalRoot } from './ModalRoot';
import { useModalStack } from './ModalProvider';

/**
 * jsdom has no visualViewport, so it is faked here. The listeners are the
 * point: a resize is the keyboard opening, and a scroll is Safari moving the
 * visible box to reveal a focused field without resizing anything.
 */
function fakeViewport(height: number, offsetTop = 0) {
  const listeners: Record<string, Array<() => void>> = { resize: [], scroll: [] };
  const viewport = {
    height,
    offsetTop,
    addEventListener: (type: string, fn: () => void) => listeners[type]?.push(fn),
    removeEventListener: (type: string, fn: () => void) => {
      listeners[type] = (listeners[type] ?? []).filter((other) => other !== fn);
    },
    emit(type: string) {
      for (const fn of listeners[type] ?? []) fn();
    },
    listenerCount: () => listeners.resize.length + listeners.scroll.length,
  };
  Object.defineProperty(window, 'visualViewport', { value: viewport, configurable: true, writable: true });
  return viewport;
}

const Controls = ({ id }: { id: string }) => {
  const { open, close } = useModalStack();
  return (
    <>
      <button onClick={() => open(id)}>open</button>
      <button onClick={() => close(id)}>close</button>
    </>
  );
};

const setup = () =>
  render(
    <ModalProvider>
      <ModalRoot />
      <Controls id="m" />
      <Modal id="m">
        <div>content</div>
      </Modal>
    </ModalProvider>
  );

// The portal root mounts on the commit that makes the stack non-empty and
// unmounts when it empties, so it only exists while a modal is open.
const root = () => document.getElementById('modal-root');

describe('useVisualViewport', () => {
  afterEach(() => {
    Reflect.deleteProperty(window, 'visualViewport');
  });

  it('writes the visible height and offset while a modal is open, and follows both events', () => {
    const viewport = fakeViewport(800);
    setup();

    // Nothing to write to until a modal opens, and no listeners either.
    expect(root()).toBeNull();
    expect(viewport.listenerCount()).toBe(0);

    fireEvent.click(screen.getByText('open'));
    expect(root()!.style.getPropertyValue('--modal-vvh')).toBe('800px');
    expect(root()!.style.getPropertyValue('--modal-vv-offset-top')).toBe('0px');

    // The keyboard opens: the visible box is shorter.
    viewport.height = 420;
    viewport.emit('resize');
    expect(root()!.style.getPropertyValue('--modal-vvh')).toBe('420px');

    // Safari scrolls the visible box to reveal a focused field; no resize fires.
    viewport.offsetTop = 120;
    viewport.emit('scroll');
    expect(root()!.style.getPropertyValue('--modal-vv-offset-top')).toBe('120px');
    expect(root()!.style.getPropertyValue('--modal-vvh')).toBe('420px');
  });

  it('drops its listeners when the modal closes', () => {
    const viewport = fakeViewport(800);
    setup();

    fireEvent.click(screen.getByText('open'));
    expect(viewport.listenerCount()).toBe(2);

    fireEvent.click(screen.getByText('close'));
    expect(viewport.listenerCount()).toBe(0);
  });

  it('does nothing where there is no visualViewport, so the fallbacks apply', () => {
    setup();
    fireEvent.click(screen.getByText('open'));
    expect(root()!.style.getPropertyValue('--modal-vvh')).toBe('');
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

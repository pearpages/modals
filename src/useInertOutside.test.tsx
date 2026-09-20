import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ModalProvider, useModalStack } from './ModalProvider';
import { ModalRoot } from './ModalRoot';
import { Modal } from './Modal';

// Uncontrolled on purpose: a modal with `open` and no onOpenChange cannot be
// closed, and these tests need to close it.
const Controls = ({ id }: { id: string }) => {
  const modals = useModalStack();
  return (
    <>
      <button onClick={() => modals.open(id)}>open</button>
      <button onClick={() => modals.close(id)}>close</button>
    </>
  );
};

const inert = (el: Element | null) => el?.hasAttribute('inert') ?? false;

describe('the page outside an open modal', () => {
  it('is inert and aria-hidden while the modal is open, and restored on close', () => {
    // A bystander that already carries aria-hidden="false" must get it back verbatim.
    const bystander = document.createElement('div');
    bystander.id = 'bystander';
    bystander.setAttribute('aria-hidden', 'false');
    document.body.appendChild(bystander);

    const { container } = render(
      <ModalProvider>
        <ModalRoot />
        <Controls id="m" />
        <Modal id="m">
          <div data-testid="inside">content</div>
        </Modal>
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('open'));

    // The app container and the bystander are siblings of #modal-root under body.
    expect(inert(container)).toBe(true);
    expect(container.getAttribute('aria-hidden')).toBe('true');
    expect(inert(bystander)).toBe(true);
    expect(bystander.getAttribute('aria-hidden')).toBe('true');

    const root = document.getElementById('modal-root')!;
    expect(inert(root)).toBe(false);
    expect(root.hasAttribute('aria-hidden')).toBe(false);
    expect(inert(screen.getByTestId('inside').closest('.modalBackdrop'))).toBe(false);

    fireEvent.click(screen.getByText('close'));

    expect(inert(container)).toBe(false);
    expect(container.hasAttribute('aria-hidden')).toBe(false);
    expect(inert(bystander)).toBe(false);
    expect(bystander.getAttribute('aria-hidden')).toBe('false');

    bystander.remove();
  });

  it('leaves a sibling carrying data-modal-keep-active alone, and still inerts the rest', () => {
    // A toast region: a sibling of the portal that has to outlive the dialog
    // which fired the toast, so its Undo stays pressable and announced.
    const toasts = document.createElement('div');
    toasts.setAttribute('data-modal-keep-active', '');
    toasts.innerHTML = '<button>Undo</button>';
    document.body.appendChild(toasts);

    const bystander = document.createElement('div');
    document.body.appendChild(bystander);

    render(
      <ModalProvider>
        <ModalRoot />
        <Controls id="m" />
        <Modal id="m">
          <div>content</div>
        </Modal>
      </ModalProvider>
    );

    fireEvent.click(screen.getByText('open'));

    expect(inert(toasts)).toBe(false);
    expect(toasts.hasAttribute('aria-hidden')).toBe(false);
    // The opt-out is one element's, not everyone's.
    expect(inert(bystander)).toBe(true);
    expect(bystander.getAttribute('aria-hidden')).toBe('true');

    fireEvent.click(screen.getByText('close'));

    expect(inert(toasts)).toBe(false);
    expect(inert(bystander)).toBe(false);

    toasts.remove();
    bystander.remove();
  });

  it('with a custom container, only the container\'s ancestor chain stays live', () => {
    const Page = () => {
      const [host, setHost] = React.useState<HTMLElement | null>(null);
      return (
        <section data-testid="section">
          <p data-testid="other">other content</p>
          <div data-testid="host" ref={setHost} />
          {host && (
            <ModalProvider>
              <ModalRoot container={host} />
              <Controls id="m" />
              <Modal id="m">
                <div>content</div>
              </Modal>
            </ModalProvider>
          )}
        </section>
      );
    };

    render(<Page />);
    fireEvent.click(screen.getByText('open'));

    expect(inert(screen.getByTestId('other'))).toBe(true);
    // The buttons render as siblings of the host inside the section, so they
    // are inert too; the chain section → host → #modal-root is not.
    expect(inert(screen.getByTestId('host'))).toBe(false);
    expect(inert(screen.getByTestId('section'))).toBe(false);
    expect(inert(document.getElementById('modal-root'))).toBe(false);
  });

  it('stays inert across a stack and restores only when the stack empties', () => {
    const { container } = render(
      <ModalProvider>
        <ModalRoot />
        <Controls id="a" />
        <Controls id="b" />
        <Modal id="a"><div>a</div></Modal>
        <Modal id="b"><div>b</div></Modal>
      </ModalProvider>
    );

    // Once a modal is open the buttons sit in the aria-hidden part of the page,
    // so they must be queried with `hidden` — which is itself the behaviour
    // under test.
    const buttons = () => screen.getAllByRole('button', { hidden: true });
    const [openA, , openB] = buttons();
    fireEvent.click(openA);
    fireEvent.click(openB);
    expect(inert(container)).toBe(true);
    expect(() => screen.getAllByRole('button')).toThrow();

    const [, , , closeB] = buttons();
    fireEvent.click(closeB);
    expect(inert(container)).toBe(true);

    const [, closeA] = buttons();
    fireEvent.click(closeA);
    expect(inert(container)).toBe(false);
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });
});

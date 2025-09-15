import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { ModalRoot } from './ModalRoot';

// Test wrapper that provides full modal system context
const TestModalSystem: React.FC<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  children?: React.ReactNode;
}> = ({ open = false, onOpenChange, id = 'test-modal', children }) => {
  return (
    <ModalProvider>
      <ModalRoot />
      <Modal id={id} open={open} onOpenChange={onOpenChange}>
        {children}
      </Modal>
    </ModalProvider>
  );
};

// Helper function to render with proper act handling
const renderModal = async (ui: React.ReactElement) => {
  let result: any;
  await act(async () => {
    result = render(ui);
    vi.runAllTimers();
  });
  return result;
};

describe('Modal Subcomponents Accessibility Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it('should connect ModalTitle ID to ModalContent aria-labelledby', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Confirmation Dialog</Modal.Title>
            <Modal.Close />
          </Modal.Header>
        </Modal.Content>
      </TestModalSystem>
    );

    const title = screen.getByRole('heading', { level: 2 });
    const dialog = screen.getByRole('dialog');

    expect(title).toHaveAttribute('id');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
  });

  it('should connect ModalDescription ID to ModalContent aria-describedby', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Confirmation</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Description>Are you sure you want to delete this item?</Modal.Description>
        </Modal.Content>
      </TestModalSystem>
    );

    const description = screen.getByText('Are you sure you want to delete this item?');
    const dialog = screen.getByRole('dialog');

    expect(description).toHaveAttribute('id');
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
  });

  it('should connect both title and description to dialog', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Delete Item</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Description>This action cannot be undone.</Modal.Description>
          <Modal.Footer>
            <button>Cancel</button>
            <button>Delete</button>
          </Modal.Footer>
        </Modal.Content>
      </TestModalSystem>
    );

    const title = screen.getByRole('heading');
    const description = screen.getByText('This action cannot be undone.');
    const dialog = screen.getByRole('dialog');

    expect(title).toHaveAttribute('id');
    expect(description).toHaveAttribute('id');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
  });

  it('should work with custom IDs', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title id="custom-title">Custom Title</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Description id="custom-desc">Custom description</Modal.Description>
        </Modal.Content>
      </TestModalSystem>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'custom-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'custom-desc');
  });

  it('should work with asChild pattern', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title asChild>
              <h1>Custom Title Element</h1>
            </Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Description asChild>
            <div>Custom description element</div>
          </Modal.Description>
        </Modal.Content>
      </TestModalSystem>
    );

    const title = screen.getByRole('heading', { level: 1 });
    const description = screen.getByText('Custom description element');
    const dialog = screen.getByRole('dialog');

    expect(title).toHaveAttribute('id');
    expect(description).toHaveAttribute('id');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
  });

  it('should handle modal without title gracefully', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Description>Only description provided</Modal.Description>
          <Modal.Footer>
            <Modal.Close>Close</Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </TestModalSystem>
    );

    const description = screen.getByText('Only description provided');
    const dialog = screen.getByRole('dialog');

    expect(dialog).not.toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
  });

  it('should handle modal without description gracefully', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Only title provided</Modal.Title>
            <Modal.Close />
          </Modal.Header>
        </Modal.Content>
      </TestModalSystem>
    );

    const title = screen.getByRole('heading');
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).not.toHaveAttribute('aria-describedby');
  });

  it('should handle modal with neither title nor description', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <div>Some content without title or description</div>
          <Modal.Footer>
            <Modal.Close>Close</Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </TestModalSystem>
    );

    const dialog = screen.getByRole('dialog');

    expect(dialog).not.toHaveAttribute('aria-labelledby');
    expect(dialog).not.toHaveAttribute('aria-describedby');
  });

  it('should handle multiple title/description components correctly', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>First Title</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Description>First Description</Modal.Description>
          {/* These should not interfere with the first ones */}
          <Modal.Title>Second Title</Modal.Title>
          <Modal.Description>Second Description</Modal.Description>
        </Modal.Content>
      </TestModalSystem>
    );

    const dialog = screen.getByRole('dialog');
    
    // Should reference the last registered title and description
    const secondTitle = screen.getByText('Second Title');
    const secondDescription = screen.getByText('Second Description');
    
    expect(dialog).toHaveAttribute('aria-labelledby', secondTitle.id);
    expect(dialog).toHaveAttribute('aria-describedby', secondDescription.id);
  });

  it('should maintain proper dialog accessibility structure', async () => {
    await renderModal(
      <TestModalSystem open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Accessible Modal</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Description>This modal follows accessibility best practices</Modal.Description>
          <div>
            <p>Additional content goes here</p>
          </div>
          <Modal.Footer>
            <button>Cancel</button>
            <button>Confirm</button>
          </Modal.Footer>
        </Modal.Content>
      </TestModalSystem>
    );

    const dialog = screen.getByRole('dialog');
    
    // Basic dialog attributes
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    
    // Accessibility linking
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
    
    // Content structure
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('This modal follows accessibility best practices')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close modal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });
});
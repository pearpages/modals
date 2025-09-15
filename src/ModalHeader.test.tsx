import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ModalHeader } from './ModalHeader';

describe('ModalHeader', () => {
  it('should render with default div element', () => {
    render(
      <ModalHeader>
        <h2>Modal Title</h2>
        <button>Close</button>
      </ModalHeader>
    );

    const header = screen.getByText('Modal Title').parentElement;
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('modal-header');
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <ModalHeader className="custom-header">
        <span>Content</span>
      </ModalHeader>
    );

    const header = screen.getByText('Content').parentElement;
    expect(header).toHaveClass('modal-header', 'custom-header');
  });

  it('should forward additional props', () => {
    render(
      <ModalHeader data-testid="header" role="banner">
        <span>Content</span>
      </ModalHeader>
    );

    const header = screen.getByTestId('header');
    expect(header).toHaveAttribute('role', 'banner');
  });

  it('should support asChild pattern', () => {
    render(
      <ModalHeader asChild>
        <article data-testid="custom-header">
          <h2>Title</h2>
        </article>
      </ModalHeader>
    );

    const header = screen.getByTestId('custom-header');
    expect(header.tagName).toBe('ARTICLE');
    expect(header).toHaveClass('modal-header');
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('should merge className when using asChild', () => {
    render(
      <ModalHeader asChild className="extra-class">
        <div className="original-class" data-testid="header">
          Content
        </div>
      </ModalHeader>
    );

    const header = screen.getByTestId('header');
    expect(header).toHaveClass('original-class', 'modal-header', 'extra-class');
  });

  it('should have correct displayName', () => {
    expect(ModalHeader.displayName).toBe('Modal.Header');
  });
});
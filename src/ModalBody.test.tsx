import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ModalBody } from './ModalBody';

describe('ModalBody', () => {
  it('should render children correctly', () => {
    render(
      <ModalBody>
        <p>Test content</p>
      </ModalBody>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should apply the modalBody class', () => {
    render(
      <ModalBody data-testid="modal-body">
        <p>Content</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toHaveClass('modalBody');
  });

  it('should apply custom className along with modalBody class', () => {
    render(
      <ModalBody className="custom-class" data-testid="modal-body">
        <p>Content</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toHaveClass('modalBody');
    expect(bodyElement).toHaveClass('custom-class');
  });

  it('should pass through additional props', () => {
    render(
      <ModalBody data-testid="modal-body" role="region" aria-label="Main content">
        <p>Content</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toHaveAttribute('role', 'region');
    expect(bodyElement).toHaveAttribute('aria-label', 'Main content');
  });

  it('should support asChild pattern', () => {
    render(
      <ModalBody asChild>
        <section data-testid="custom-element">Custom content</section>
      </ModalBody>
    );

    const element = screen.getByTestId('custom-element');
    expect(element.tagName).toBe('SECTION');
    expect(element).toHaveClass('modalBody');
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('should merge className when using asChild', () => {
    render(
      <ModalBody asChild className="custom-class">
        <div className="existing-class" data-testid="custom-element">
          Content
        </div>
      </ModalBody>
    );

    const element = screen.getByTestId('custom-element');
    expect(element).toHaveClass('existing-class');
    expect(element).toHaveClass('modalBody');
    expect(element).toHaveClass('custom-class');
  });

  it('should have correct display name', () => {
    expect(ModalBody.displayName).toBe('Modal.Body');
  });

  // Additional content type support tests
  it('should handle long text content without breaking layout', () => {
    const longText = 'This is a very long text string that should test word wrapping and overflow behavior';

    render(
      <ModalBody data-testid="modal-body">
        <p>{longText.repeat(10)}</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveTextContent(longText);
  });

  it('should handle image content', () => {
    render(
      <ModalBody data-testid="modal-body">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" alt="Test image" />
        <p>Caption text</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    const image = screen.getByAltText('Test image');

    expect(bodyElement).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(screen.getByText('Caption text')).toBeInTheDocument();
  });

  it('should handle code blocks and preformatted content', () => {
    render(
      <ModalBody data-testid="modal-body">
        <pre>function example() {"\n"}  return "Hello World";{"\n"}{"}"}</pre>
        <p>Code explanation</p>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveTextContent('function example()');
    expect(screen.getByText('Code explanation')).toBeInTheDocument();
  });

  it('should handle table content', () => {
    render(
      <ModalBody data-testid="modal-body">
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
          </tbody>
        </table>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toBeInTheDocument();
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
  });

  it('should handle empty content gracefully', () => {
    render(
      <ModalBody data-testid="modal-body">
        {/* Empty content */}
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toBeInTheDocument();
    expect(bodyElement).toHaveClass('modalBody');
  });

  it('should handle mixed content types', () => {
    render(
      <ModalBody data-testid="modal-body">
        <h3>Title</h3>
        <p>Some text content</p>
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" alt="Image" />
        <pre>Code block</pre>
        <table>
          <tbody>
            <tr><td>Table cell</td></tr>
          </tbody>
        </table>
      </ModalBody>
    );

    const bodyElement = screen.getByTestId('modal-body');
    expect(bodyElement).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Some text content')).toBeInTheDocument();
    expect(screen.getByAltText('Image')).toBeInTheDocument();
    expect(screen.getByText('Code block')).toBeInTheDocument();
    expect(screen.getByText('Table cell')).toBeInTheDocument();
  });
});
import React, { useEffect, useRef, useState } from 'react';
import { ModalBodyProps } from './types';
import { renderAsChild } from './asChild';

/**
 * Modal.Body component - provides main content area with overflow handling
 *
 * Key features:
 * - Handles overflow scrolling when content exceeds viewport height
 * - Becomes a tab stop only while it actually scrolls, so keyboard users can
 *   scroll it (WCAG 2.1.1; axe "scrollable-region-focusable") without adding a
 *   pointless stop to every short modal
 * - Provides consistent spacing and layout
 * - Supports asChild pattern for custom elements
 */
export const ModalBody: React.FC<ModalBodyProps> = ({
  asChild = false,
  className,
  children,
  ...rest
}) => {
  const bodyClasses = ['modalBody', className].filter(Boolean).join(' ');
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  // Measure after every render (content changes re-render us) and on resize
  // (the viewport, and with it the body's max height, can change underneath).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScrollable(el.scrollHeight > el.clientHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  });

  if (asChild) {
    return renderAsChild('Modal.Body', children, { className: bodyClasses, ...rest });
  }

  return (
    <div ref={ref} className={bodyClasses} tabIndex={scrollable ? 0 : undefined} {...rest}>
      {children}
    </div>
  );
};

ModalBody.displayName = 'Modal.Body';

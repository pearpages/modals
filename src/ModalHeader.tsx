import React from 'react';
import { ModalHeaderProps } from './types';

/**
 * Modal.Header component - provides layout for title and close button
 * Automatically wraps title/description in modalHeaderContent container
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  asChild = false,
  className,
  children,
  ...rest
}) => {
  const headerClasses = ['modalHeader', className].filter(Boolean).join(' ');

  if (asChild) {
    // If asChild is true, clone the first child and add our props
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: [child.props.className, headerClasses].filter(Boolean).join(' '),
      ...rest
    });
  }

  // Separate close button from other content for proper grid layout
  const childrenArray = React.Children.toArray(children);
  const contentElements: React.ReactNode[] = [];
  const closeButtons: React.ReactNode[] = [];

  // Separate Modal.Close buttons from other content
  childrenArray.forEach(child => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as any)?.displayName;
      if (displayName === 'Modal.Close') {
        closeButtons.push(child);
      } else {
        contentElements.push(child);
      }
    } else {
      contentElements.push(child);
    }
  });

  return (
    <div className={headerClasses} {...rest}>
      <div className="modalHeaderContent">
        {contentElements}
      </div>
      {closeButtons}
    </div>
  );
};

ModalHeader.displayName = 'Modal.Header';
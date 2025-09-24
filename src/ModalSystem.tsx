import React from "react";
import { ModalSystemProps } from "./types";
import { ModalProvider } from "./ModalProvider";
import { ModalRoot } from "./ModalRoot";

/**
 * ModalSystem - Main wrapper component that provides modal functionality
 *
 * Composes ModalProvider (state management) and ModalRoot (portal rendering)
 * for a complete modal system. This is the recommended way to set up modals
 * in your application.
 *
 * @example
 * ```tsx
 * <ModalSystem>
 *   <App />
 * </ModalSystem>
 * ```
 *
 * Features:
 * - SSR-safe by default (renders null on server)
 * - Configurable z-index base for layering
 * - Custom portal container support
 * - Automatic modal stacking and focus management
 */
export const ModalSystem: React.FC<ModalSystemProps> = ({
  baseZIndex = 1000,
  container,
  children,
}) => {
  return (
    <div className="pearpages-modals">
      <ModalProvider baseZIndex={baseZIndex}>
        {children}
        <ModalRoot container={container} baseZIndex={baseZIndex} />
      </ModalProvider>
    </div>
  );
};

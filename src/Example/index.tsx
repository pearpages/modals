import React from "react";
import { ModalSystem } from "../ModalSystem";
import { ModalExamples } from "./ModalExamples";
import { ModalTriggerDemo } from "./ModalTriggerDemo";
import { ScrollLockDemo } from "./ScrollLockDemo";
import { ModalBodyDemo } from "./ModalBodyDemo";
import { AccessibilityDemo } from "./AccessibilityDemo";
import { ScrollOptimizationDemo } from "./ScrollOptimizationDemo";
import { HeaderSpacingDemo } from "./HeaderSpacingDemo";
import { FooterMobileDemo } from "./FooterMobileDemo";
import { ModalBodyContentTypesDemo } from "./ModalBodyContentTypesDemo";
import "./index.scss";
import { MobileResponsiveTest } from "./MobileResponsiveTest";
import { ProgrammaticModalExample } from "./ProgrammaticModalExample";
import { Task8Example } from "@/Task8Example";
import { ModalContentShowcase } from "./ModalContentShowcase";

/**
 * Example component showcasing the Modal Library in action
 *
 * Demonstrates practical usage of:
 * ✅ Task 1: API contracts & IDs - Complete type definitions
 * ✅ Task 2: ModalSystem wrapper - Functional state management
 * ✅ Task 7: Modal.Content with sizes - Full implementation
 *
 * Real usage examples:
 * - ModalSystem setup and configuration
 * - Modal state management through context
 * - Multiple modal instances and stacking
 * - Modal.Content with different sizes and animations
 * - SSR-safe behavior demonstration
 */

export const Example: React.FC = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>🧩 Modal Library - Live Examples</h1>

      {/* Modal.Content Showcase */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalContentShowcase />
      </div>

      {/* Separate ModalTrigger demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalTriggerDemo />
      </div>

      {/* Scroll Lock Demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <ScrollLockDemo />
        </ModalSystem>
      </div>

      {/* Modal.Body Demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <ModalBodyDemo />
        </ModalSystem>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <Task8Example />
      </div>

      {/* Accessibility Demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <AccessibilityDemo />
        </ModalSystem>
      </div>

      {/* Scroll Optimization Demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <ScrollOptimizationDemo />
        </ModalSystem>
      </div>

      {/* Header Spacing Demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <HeaderSpacingDemo />
        </ModalSystem>
      </div>

      {/* Footer Mobile Demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <FooterMobileDemo />
        </ModalSystem>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <MobileResponsiveTest />
        </ModalSystem>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <ProgrammaticModalExample />
        </ModalSystem>
      </div>

      {/* Modal Body Content Types Demo */}
      <div style={{ marginBottom: "2rem" }}>
        <ModalSystem>
          <ModalBodyContentTypesDemo />
        </ModalSystem>
      </div>

      <ModalSystem>
        <ModalExamples />
      </ModalSystem>
    </div>
  );
};

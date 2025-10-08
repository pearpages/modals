import React from "react";
import "./index.scss";
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
import { MobileResponsiveTest } from "./MobileResponsiveTest";
import { ProgrammaticModalExample } from "./ProgrammaticModalExample";
import { ModalSubcomponents } from "./ModalSubcomponents";
import { ModalContentShowcase } from "./ModalContentShowcase";

export const Example: React.FC = () => {
  return (
    <div className="example-container">
      <h1>🧩 Modal Library - Live Examples</h1>
      <ModalSystem>
        <ModalContentShowcase />
        <ModalTriggerDemo />
        <ScrollLockDemo />
        <ModalBodyDemo />
        <ModalSubcomponents />
        <AccessibilityDemo />
        <ScrollOptimizationDemo />
        <HeaderSpacingDemo />
        <FooterMobileDemo />
        <MobileResponsiveTest />
        <ProgrammaticModalExample />
        <ModalBodyContentTypesDemo />
        <ModalExamples />
      </ModalSystem>
    </div>
  );
};

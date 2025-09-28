[![npm version](https://img.shields.io/npm/v/@pearpages/modals.svg)](https://www.npmjs.com/package/@pearpages/modals)
[![Build Status](https://github.com/pearpages/modals/actions/workflows/publish.yml/badge.svg)](https://github.com/pearpages/modals/actions)
[![License](https://img.shields.io/github/license/pearpages/modals.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@pearpages/modals.svg)](https://www.npmjs.com/package/@pearpages/modals)

# Modals

[Demo](https://modals.pearpages.com)

# Modal Component

A comprehensive, accessible, and flexible modal system for React applications built according to the specifications in `specs.md`.

## Goals

- ✅ **Accessible**: Full WAI-ARIA compliance with proper focus management
- ✅ **Flexible**: Support for programmatic usage, stacked modals, and custom content
- ✅ **Keyboard-first**: ESC to close, tab trapping, focus return
- ✅ **Animation-ready**: Built-in animation states and CSS hooks
- ✅ **TypeScript**: Full type safety with comprehensive interfaces
- ✅ **Headless**: Minimal default styles, easy to customize
- ✅ **Promise-based confirm**: Utility for confirmation dialogs
- ✅ **Portal-based**: Renders outside component tree to avoid z-index issues

## Quick Start

### 1. Setup the Provider

Wrap your app with `ModalProvider` and include `ModalRoot`:

```tsx
import { ModalProvider, ModalRoot } from "./components/Modal";

function App() {
  return (
    <ModalProvider>
      <div id="app">
        {/* Your app content */}
        <ModalRoot />
      </div>
    </ModalProvider>
  );
}
```

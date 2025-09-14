# Architecture Decision Record: Modal API Contracts & Type System

**Date:** September 14, 2025
**Status:** Accepted
**Milestone:** 1 (Core)

## Decision

We have defined comprehensive TypeScript interfaces and type contracts for the modal library that establish:

1. **Strict ID uniqueness per ModalSystem instance**
2. **Event-driven architecture with typed event handlers**
3. **Composable component API with clear prop interfaces**
4. **Error handling with custom error classes**

## Context

The modal library needs well-defined API contracts to ensure:
- Type safety across all components
- Clear boundaries between controlled/uncontrolled modes
- Consistent event handling
- Proper error reporting
- Extensibility for future features

## Key Design Decisions

### 1. ID Uniqueness Rules

**Decision:** Modal IDs must be unique within a single `<ModalSystem>` instance but can be reused across different systems.

**Rationale:**
- Prevents conflicts within a single application context
- Allows multiple modal systems in complex applications
- Simplifies stack management and event routing

**Implementation:**
```typescript
export interface ModalIdConstraints {
  uniquePerSystem: true;
  nonEmpty: true;
  urlSafe: true;
}
```

### 2. Event System Architecture

**Decision:** Use a typed event system with structured event objects rather than simple callbacks.

**Rationale:**
- Provides debugging information (timestamps, metadata)
- Enables event logging and analytics
- Allows for future event middleware
- Maintains consistency with DOM event patterns

**Implementation:**
```typescript
export interface ModalEvent {
  id: string;
  type: 'open' | 'close';
  timestamp: number;
}

export type ModalEventHandler = (event: ModalEvent) => void;
```

### 3. Component Composition Pattern

**Decision:** Use compound components with dot notation (Modal.Content, Modal.Header, etc.) and support `asChild` pattern for flexibility.

**Rationale:**
- Provides clear API surface with logical grouping
- Enables composition flexibility
- Follows established patterns from Radix UI and other libraries
- Allows consumers to use their own elements when needed

### 4. State Management Types

**Decision:** Separate state management into registry (all modals) and stack (open modals) with computed properties.

**Rationale:**
- Clear separation of concerns
- Efficient stack operations for z-index calculation
- Easy tracking of modal relationships
- Supports nested modal scenarios

**Implementation:**
```typescript
export interface ModalProviderState {
  registry: ModalStackRegistry;
  stack: string[];
  baseZIndex: number;
}
```

### 5. Error Handling Strategy

**Decision:** Use custom error classes with modal-specific context rather than generic Error objects.

**Rationale:**
- Provides structured error information
- Enables specific error handling strategies
- Improves debugging experience
- Allows for error reporting and analytics

**Implementation:**
```typescript
export class ModalIdConflictError extends ModalError {
  constructor(id: string) {
    super(`Modal with id "${id}" is already registered`, id, 'ID_CONFLICT');
  }
}
```

## Type Safety Guarantees

1. **Modal IDs:** Strongly typed as strings with runtime validation
2. **Component Props:** Full TypeScript coverage with HTMLAttributes inheritance
3. **Event Handlers:** Typed event objects prevent callback signature errors
4. **Stack Operations:** Registry operations are type-safe and prevent invalid states

## API Contracts

### Core Components
- `Modal`: Manages lifecycle and state
- `ModalTrigger`: Declarative trigger with target validation
- `Modal.Content`: Layout and animation container
- `Modal.Header/Title/Description/Close/Footer`: Semantic subcomponents

### Hook API
- `useModalStack()`: Returns typed API for programmatic control
- Each modal ID gets: `{ open(), close(), isOpen }`

### Provider System
- `ModalSystem`: High-level wrapper (Provider + Root)
- `ModalProvider`: State management context
- `ModalRoot`: Portal rendering and z-index management

## Future Considerations

1. **Animation System:** Types support future animation variants beyond fade
2. **Focus Management:** Types prepared for advanced focus trap features
3. **Accessibility:** Event system can support screen reader announcements
4. **Theming:** Props structure allows for future theme provider integration

## Alternatives Considered

### Simple String-based Events
**Rejected:** Less type safety, harder to debug, limited extensibility

### Single Monolithic Component
**Rejected:** Reduced flexibility, harder to customize, poor composition

### Context-free Implementation
**Rejected:** Increases complexity for consumers, prevents proper stacking

## Implementation Notes

- All interfaces extend appropriate HTML attributes for maximum flexibility
- Error classes provide structured information for debugging
- Event system is designed to be non-breaking for future enhancements
- ID constraints are documented but enforced at runtime

This type system provides a solid foundation for implementing the remaining milestones while maintaining flexibility for future enhancements.
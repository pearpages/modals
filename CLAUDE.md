# Modal Library Project

## Project Overview
React modal library with compound component pattern, accessibility features, and portal-based rendering.

@specs.md

## Development Commands
- `npm test` - Run tests
- `npm run build` - Build library for distribution
- `npm run lint` - Run linting (if available)
- `cd playground && npm run dev` - Start development server on port 5173

## Architecture Notes
- **CSS**: Direct class targeting (`.modalBackdrop`, `.modal`, etc.) - no namespace wrapper due to portal rendering incompatibility
- **Tests**: Use direct class assertions, not CSS modules
- **Components**: Compound pattern with `Modal.*` subcomponents
- **Portals**: Modals render to `document.body` via React portals

## Key Files
- `src/modal.scss` - Main styles (imported once in index.ts)
- `src/Modal*.tsx` - Component implementations
- `src/types.ts` - Complete TypeScript type definitions and component props
- `src/index.ts` - Library exports
- `playground/` - Development environment

## Common Issues
- If modal styles don't load: Check that CSS uses direct selectors, not namespaced
- If tests fail on classes: Ensure tests expect direct class names like `'modalBackdrop'`
- Animation issues: Use CSS-only animations, avoid programmatic timing

## Recent Fixes
- Removed CSS namespace wrapper that prevented portal-rendered modal styles from applying
- See `logs/` directory for detailed session notes

## Todo

### Priority 1: Core Implementation Gaps
- [x] useModalStack hook - ✅ COMPLETED: Full implementation with programmatic API
- [x] onInteractOutside callback - ✅ ALREADY IMPLEMENTED: Found in 7 files, working
- [x] Body scroll lock - ✅ COMPLETED: useBodyScrollLock hook with cross-browser support
- [ ] Modal.Body component implementation
- [ ] Complete accessibility (aria-labelledby, aria-describedby linking)
- [ ] Mobile fullscreen responsive behavior
- [ ] Animation data-state attributes

### Priority 2: UX Issues
- [ ] Modal content overflow/scrolling behavior
- [ ] Header spacing optimization
- [ ] Footer positioning on mobile
- [ ] Ensure modal body supports any content type

### Priority 3: Build & Distribution
- [ ] Run build and fix any production build issues
- [ ] Verify library distribution works correctly
- [ ] Test modal library when imported as external package

### Documentation & Enhancement Tasks
- [ ] Add asChild props to all subcomponents
- [ ] Add error handling/edge cases coverage section to specs
- [ ] Add testing strategy section to specs
- [ ] Add async operation handling examples (loading states, confirmations)
- [ ] Add form integration examples to specs
- [ ] Storybook setup
- [ ] Performance considerations documentation
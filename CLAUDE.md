# Modal Library Project

## Project Overview
React modal library with compound component pattern, accessibility features, and portal-based rendering.

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

### High Priority UX Issues
- [ ] Fix mobile modal layout - footer buttons should stay at bottom regardless of content
- [ ] Prevent body scroll when modal is open (scroll lock)
- [ ] Ensure modal body supports any content type
- [ ] Make modal body scrollable when content exceeds viewport height
- [ ] Reduce header padding/spacing - currently takes too much space

### Technical/Build
- [ ] Run build and fix any production build issues
- [ ] Verify library distribution works correctly
- [ ] Test modal library when imported as external package
- [ ] Consider adding CSS namespace solution that works with portals (CSS-in-JS, CSS Modules, etc.)
- [ ] Review animation performance and accessibility
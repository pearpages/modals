[![npm version](https://img.shields.io/npm/v/@pearpages/modals.svg)](https://www.npmjs.com/package/@pearpages/modals)
[![Build Status](https://github.com/pearpages/modals/actions/workflows/publish.yml/badge.svg)](https://github.com/pearpages/modals/actions)
[![License](https://img.shields.io/github/license/pearpages/modals.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@pearpages/modals.svg)](https://www.npmjs.com/package/@pearpages/modals)

# @pearpages/modals

Accessible, composable modals for React — portal rendered, focus trapped, stackable, and styled entirely through CSS variables.

**[Documentation and live examples →](https://modals.pearpages.com)**

## Install

```bash
npm install @pearpages/modals
```

## Quick start

```tsx
import { Modal, ModalSystem } from "@pearpages/modals";
import "@pearpages/modals/styles.css";

function App() {
  return (
    <ModalSystem>
      <Modal.Trigger target="publish">Publish</Modal.Trigger>

      <Modal id="publish">
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Publish this page?</Modal.Title>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body>
            <Modal.Description>
              Anyone with the link will be able to read it.
            </Modal.Description>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Modal.Button>Cancel</Modal.Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Modal.Button variant="primary">Publish</Modal.Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ModalSystem>
  );
}
```

The stylesheet is a separate entry point and is **not** pulled in by the JavaScript bundle — import it once, yourself.

## What that means

- **Composable** — a dialog is assembled from parts you arrange (`Modal.Content`, `Modal.Header`, `Modal.Title`, `Modal.Body`, `Modal.Footer`) rather than configured through props on one component. Every part takes [`asChild`](https://modals.pearpages.com/guides/as-child), so any of them can become an element of yours.
- **Portal rendered** — in the DOM the dialog is moved to `document.body`, wherever you wrote it in your JSX. That is what stops it being clipped by an ancestor's `overflow: hidden`, or buried under other content by an ancestor's `transform` or `z-index`. It stays where you wrote it in the *React* tree, so context, state and event bubbling are unaffected. [More](https://modals.pearpages.com/guides/portal-container)
- **Focus trapped** — while a modal is open the keyboard cannot leave it: focus moves in on open, Tab and Shift+Tab cycle within it instead of reaching the page behind, and focus returns to whatever had it when the modal closes. Together with `role="dialog"` and ARIA wiring generated from `Modal.Title` and `Modal.Description`, that is most of what makes it [accessible](https://modals.pearpages.com/guides/accessibility).
- **Stackable** — several modals can be open at once, forming an ordered stack. Only the topmost has an interactive backdrop and answers Escape, and page scroll stays locked until the last one closes — so a confirmation on top of a form needs no `z-index` bookkeeping. [More](https://modals.pearpages.com/guides/stacking)
- **Styled through CSS variables** — every visual choice is a custom property, 166 of them. Restyling means setting a variable, not writing more specific selectors or reaching for `!important`. No CSS-in-JS runtime, no theme provider. [More](https://modals.pearpages.com/guides/theming)
- **Responsive** — fullscreen on phones, with safe-area handling in the footer.
- **Small** — no runtime dependencies; `react` and `react-dom` are peers.

## Documentation

Everything is at **[modals.pearpages.com](https://modals.pearpages.com)**, where every example shows its source and the working modal it produces:

- [Setup](https://modals.pearpages.com/setup) · [Your first modal](https://modals.pearpages.com/quick-start)
- [Components](https://modals.pearpages.com/components/modal) — every prop of every part
- [useModalStack](https://modals.pearpages.com/hooks/use-modal-stack) — opening modals from code
- Guides: [controlled](https://modals.pearpages.com/guides/controlled), [stacking](https://modals.pearpages.com/guides/stacking), [dismissal](https://modals.pearpages.com/guides/dismiss), [accessibility](https://modals.pearpages.com/guides/accessibility), [theming](https://modals.pearpages.com/guides/theming), [forms & async](https://modals.pearpages.com/guides/forms-and-async)

## Migrating to 0.2.0

0.2.0 fixes two bugs that changed behaviour, and removes API that never worked.

**Behaviour**

- **The focus trap now actually engages.** It never did before: it activated on the render where the modal opened, but the dialog element is created once the portal is found, so it silently did nothing. Neither autofocus nor Tab containment worked. If you added your own focus handling to compensate, you can remove it.
- **Escape respects controlled state.** Backdrop clicks already called `onOpenChange`; Escape closed the modal directly regardless of what the parent decided. Both paths now ask. A controlled modal that does not flip `open` stays open on Escape.
- **`baseZIndex` on `ModalProvider` is now reachable, and `ModalRoot` no longer takes one.** `ModalRoot` defaulted its own prop to `1000`, so the provider value was unreachable and backdrops could render in a different layer band from their content. The prop is gone from `ModalRoot`; set it on `ModalProvider` or `ModalSystem`.
- **Controlled means `open` is present, and every path respects it.** Previously `useModalStack().open/close` and `Modal.Trigger` wrote to the provider even on a controlled modal, while a modal that passed `onOpenChange` without `open` was treated as controlled by Escape and could never close. Now a modal with an `open` prop is only ever asked through `onOpenChange` — by `Modal.Trigger`, `useModalStack`, `Modal.Close`, Escape and backdrop clicks alike — and a modal without one closes directly and is notified.
- **`Modal.Trigger` composes `onClick` on its own button too.** Passing `onClick` to a plain `Modal.Trigger` used to replace the trigger's handler, so the modal never opened. Handlers now compose in both render paths, and `preventDefault()` cancels the open.
- **`Modal.Content` merges `style`.** An inline `style` used to replace the dialog's own inline z-index.

**Removed**

- `Example` — the library was shipping its own demo tree. The [documentation site](https://modals.pearpages.com) replaces it. `dist/index.css` no longer contains the demo styles (`.demo`, `.box`, `.content-block`, and the per-demo classes), so anything relying on those needs its own CSS.
- `ModalError`, `ModalIdConflictError`, `ModalNotFoundError` — never thrown; the provider warns instead.
- `ModalEvent`, `ModalEventHandler`, `ModalEventDetail`, `ModalEventType`, `ModalSystemConfig`, `ModalIdConstraints`, `FocusStackEntry`, `ModalAnimationState`, `AnimationConfig` — types with no referent.
- `useFocusRestore` and `useScrollbarCompensation` — duplicated what `ModalProvider` and `useBodyScrollLock` already do.
- `ModalSystem`'s wrapper `<div className="pearpages-modals">` — no stylesheet targeted it, and it was the only structural difference from a manual `ModalProvider` + `ModalRoot`.

**Changed**

- `ModalStackActions` and `ModalStackAPI` are replaced by `ModalStackApi`. They described an indexed API — `modals['id'].open()` — that the hook has never returned; the real shape is `open(id)`, `close(id)`, `isOpen(id)`, `getModal(id)`.
- `asChild` behaves identically on all nine subcomponents now: named errors, `className` merged child-first, `on*` handlers composed rather than overwritten, and refs merged. Handlers you passed to `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.Title` or `Modal.Description` used to silently replace the child's; they now run alongside them.
- `Modal.Content` gains `asChild`, which is how you make the dialog itself a `<form>`.
- `ModalProps` and `ModalTriggerProps` extend the matching HTML attributes, so `onClick`, `aria-*` and `data-*` type-check on `Modal.Trigger` — it already forwarded them at runtime.

## Local development

```bash
npm install
npm run playground        # docs site against src/, with HMR
npm run playground:dist   # docs site against the built package
npm run test:run          # library suite
npm run test:playground   # renders every docs route against dist/ (build first)
npm run lint
npm run build
```

The playground is both the dev sandbox and the deployed site. `npm run playground` aliases `@pearpages/modals` to `../src`; any other mode resolves it through the package's own `exports` map into `../dist` — what an npm consumer gets. CI always builds the dist mode, so the deployed site doubles as proof that the published package resolves.

## Releasing

The version lives in `package.json`; the tag does not set it.

```bash
npm version <patch|minor|major>
git push --follow-tags
```

Pushing to `main` deploys the site and never touches npm. Pushing a `v*` tag publishes to npm, provided the tagged commit is an ancestor of `main` — if it is not, the workflow skips with a warning rather than failing, so check that it actually ran.

## License

MIT

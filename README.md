[![npm version](https://img.shields.io/npm/v/@pearpages/modals.svg)](https://www.npmjs.com/package/@pearpages/modals)
[![Build Status](https://github.com/pearpages/modals/actions/workflows/publish.yml/badge.svg)](https://github.com/pearpages/modals/actions)
[![License](https://img.shields.io/github/license/pearpages/modals.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@pearpages/modals.svg)](https://www.npmjs.com/package/@pearpages/modals)

# @pearpages/modals

Accessible, composable modals for React — portal rendered, focus trapped, stackable, and styled entirely through CSS variables.

**[Documentation and live examples →](https://modals.pearpages.com)**

> **Should you use this?** For most React apps, no: reach for [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) (or shadcn/ui, which is Radix underneath). It has the larger ecosystem, more years of edge-case fixes, full control of markup and CSS, and a non-modal mode. This library is worth it when several of these are true:
>
> 1. You open the same modal from several unrelated places and want to address it by id instead of lifting state to a common ancestor.
> 2. You want a modal that looks finished without Tailwind and without a UI kit, restyled through CSS variables.
> 3. You run several sites that should share one modal look — set the variables once.
> 4. You stack modals (a confirmation over a form) and want z-index, Escape and scroll lock handled by the provider.
> 5. You are on React 19, want a dependency-free package, and modal dialogs are all you need — no popovers, drawers or non-modal dialogs.
>
> If you need headless control, non-modal dialogs, `keepMounted`, or a promise-style `openConfirm()`, this is the wrong library. The [comparison table](#compared-with) below says which one is right.

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
- **Focus trapped** — while a modal is open the keyboard cannot leave it: focus moves in on open, Tab and Shift+Tab cycle within it instead of reaching the page behind, and focus returns to whatever had it when the modal closes. Everything outside the modal is `inert` and `aria-hidden` until it closes. Together with `role="dialog"` and ARIA wiring generated from `Modal.Title` and `Modal.Description`, that is most of what makes it [accessible](https://modals.pearpages.com/guides/accessibility).
- **Stackable** — several modals can be open at once, forming an ordered stack. Only the topmost has an interactive backdrop and answers Escape, and page scroll stays locked until the last one closes — so a confirmation on top of a form needs no `z-index` bookkeeping. [More](https://modals.pearpages.com/guides/stacking)
- **Styled through CSS variables** — every visual choice is a custom property, 166 of them. Restyling means setting a variable, not writing more specific selectors or reaching for `!important`. No CSS-in-JS runtime, no theme provider. [More](https://modals.pearpages.com/guides/theming)
- **Responsive** — fullscreen on phones, with safe-area handling in the footer.
- **Small** — no runtime dependencies; `react` and `react-dom` are peers.

## Philosophy

Headless primitives hand you correct behaviour and no appearance, so every project writes the same hundred lines of CSS. UI kits hand you appearance plus a theme runtime, a provider and a design language. This library sits between them, and changes one thing about how modals are addressed. The long version is at [modals.pearpages.com/why](https://modals.pearpages.com/why); the honest short version is the note at the top of this file.

1. **A modal is addressed by id, not by where it sits in the tree.** `Modal` registers with the provider under its `id`; any `Modal.Trigger target` or `useModalStack().open(id)` inside the provider opens it, with no shared subtree and no lifted state. Because one provider owns one registry, stacking is not bolted on: z-index, which modal answers Escape, whose backdrop is live, and when scroll unlocks all fall out of it.
2. **Parts you arrange, under one contract.** Nine `Modal.*` parts, every one takes `asChild`, and one prop rule everywhere: attributes are yours, `on*` handlers compose, `preventDefault()` cancels ours.
3. **Styled by default, restyled through variables.** A real design with 166 custom properties and a `prefers-color-scheme` dark mode. No theme provider, no CSS-in-JS; plain class names because the dialog is portalled out of your tree and scoped styles do not follow it.
4. **Controlled when you say so.** `open` makes the modal controlled, and from then on every path — trigger, hook, close button, Escape, backdrop — asks through `onOpenChange`. Without it the provider owns the state and still notifies you. Same rule as a React input, applied to every path.
5. **Accessible by construction, and small.** `role="dialog"`, ARIA wiring from `Modal.Title` and `Modal.Description`, focus trap and return, Escape to the topmost only, with no props. 7.1 kB gzipped plus 4 kB of CSS.

What it is not: a design system (there is `Modal.Button`, nothing more), headless, a promise-style `openConfirm()` manager, or a home for non-modal dialogs, popovers and drawers. Content unmounts on close; there is no `keepMounted`.

## Compared with

| Library | Styling | Open state | Opening from elsewhere, stacking | Ships as | Pick it when |
|---|---|---|---|---|---|
| **@pearpages/modals** | Styled by a stylesheet, restyled through CSS variables. No provider, no runtime. | Uncontrolled by default; `open` makes it controlled and every path then asks through `onOpenChange`. | Any `Modal.Trigger` or `useModalStack().open(id)` under the provider, by id. The provider owns the stack. | Standalone. No runtime dependencies. 7.1 kB gzipped, plus 4 kB of CSS. | You want a modal that looks finished out of the box, restyled with variables, opened by id from anywhere, and nothing else from a kit. Not the pick if you need headless control, non-modal dialogs, or a promise-style manager. |
| Radix Dialog | Unstyled. `data-state` for animation. | `defaultOpen`, or `open` + `onOpenChange`. | The trigger lives inside its `Root`, or you lift state. Nesting supported. | Primitive package with 15 dependencies (focus scope, scroll removal, …). 12.6 kB gzipped. | You write every style yourself anyway (Tailwind, your own design system), or you use shadcn/ui. The most battle-tested primitive with the largest ecosystem; better than this library for full control of markup and CSS. |
| Headless UI Dialog | Unstyled. `data-closed` / `data-enter` / `data-leave` with the `transition` prop. | Controlled only: `open` and `onClose` are required. | You own the state. Nesting is not documented. | Part of `@headlessui/react` (react-aria, floating-ui, tanstack-virtual). 63 kB gzipped for the whole package. | You are on Tailwind and want dialogs, menus and listboxes from one package maintained by Tailwind Labs. Better when the project needs more than modals; controlled-only is a feature there, not a gap. |
| React Aria Components | Unstyled. `className` and `style` take render functions; `data-entering` / `data-exiting` for animation. | `defaultOpen`, or `isOpen` + `onOpenChange`. | `DialogTrigger` wraps the trigger and the overlay, or you lift state. Backdrop dismissal is off unless `isDismissable`. | Part of `react-aria-components`. | Accessibility rigour beyond the basics: internationalization, screen-reader and touch edge cases, and a full component set built the same way. Better when that depth matters more than bundle size. |
| Ariakit Dialog | Unstyled. `data-enter` / `data-leave`, a `backdrop` prop. | `open` + `onClose`, or a `useDialogStore` you can share. | `DialogDisclosure`, or pass the store around. Nesting supported. | Part of `@ariakit/react`. 63.5 kB gzipped for the whole package. | You want a store you can share across the tree, non-modal dialogs, or the rest of Ariakit's headless set. Better than this library for non-modal use and for state you own outside React props. |
| react-modal | Inline default styles, or your own classes via `className`, `overlayClassName` and `style`. | Controlled only: `isOpen` + `onRequestClose`. | You own the state. Stacking is not documented. Needs `appElement`. | One component with 4 dependencies (prop-types, …). 7.5 kB gzipped. | A codebase already on it, or the smallest single-component dependency with no compound API. Not a pick for new projects: `prop-types`, no stacking, and a single-element API. |
| MUI Dialog | Emotion CSS-in-JS, the `sx` prop and the theme. | Controlled only: `open` + `onClose`. | You own the state. | Part of `@mui/material`, with `@emotion`. | The rest of the app is Material UI. Better there because it inherits the theme and transitions; do not install MUI for a modal. |
| Chakra UI Dialog | Theme recipes and style props. `Provider` required. | `defaultOpen`, `open` + `onOpenChange`, or a `useDialog` store. | `Dialog.Trigger` inside `Root`, or the store through `RootProvider`. Built on Ark UI. | Part of `@chakra-ui/react`. | The rest of the app is Chakra. Its dialog has more built-in variants than this one — sizes, placement, motion presets — and shares the kit's z-index system. |
| Mantine Modal | CSS modules, the Styles API and CSS variables. `MantineProvider` required. | Controlled only: `opened` + `onClose`. | `Modal.Stack` with `useModalsStack`: open and close by a registered id. | Part of `@mantine/core`. | The rest of the app is Mantine, or you want `keepMounted` and a modals manager. Its `useModalsStack` is the closest thing to this library's id model, with a full kit behind it. |

The last column says when the other library is the better choice, and it is meant honestly: every one of these beats this library at something. shadcn/ui's dialog is Radix underneath, so the Radix row covers it. Sizes are minified and gzipped as reported by bundlephobia for each package's current release, and by `gzip -c dist/index.js` for this one, measured in September 2026. Kits are listed without a size because a modal is a small part of what you install.

## Documentation

Everything is at **[modals.pearpages.com](https://modals.pearpages.com)**, where every example shows its source and the working modal it produces:

- [Why this library](https://modals.pearpages.com/why) · [Setup](https://modals.pearpages.com/setup) · [Your first modal](https://modals.pearpages.com/quick-start)
- [Components](https://modals.pearpages.com/components/modal) — every prop of every part
- [useModalStack](https://modals.pearpages.com/hooks/use-modal-stack) — opening modals from code
- Guides: [controlled](https://modals.pearpages.com/guides/controlled), [stacking](https://modals.pearpages.com/guides/stacking), [dismissal](https://modals.pearpages.com/guides/dismiss), [accessibility](https://modals.pearpages.com/guides/accessibility), [theming](https://modals.pearpages.com/guides/theming), [forms & async](https://modals.pearpages.com/guides/forms-and-async)

## What's new in 0.3.0

`Modal.Content` takes a `placement`: `'center'` (the default) or `'start' | 'end' | 'top' | 'bottom'` to dock the dialog to an edge as a sheet. A docked dialog fills its edge, slides in from it instead of scaling, and keeps every other behaviour — focus trap, stacking, dismissal, `size` on the free axis. Two new variables theme it: `--modal-width-sheet` (start/end, default `24rem`) and `--modal-height-sheet` (top/bottom, default `60vh`). The dialog element also carries `data-placement`, and the backdrop lays it out with `:has()`, so nothing changes for consumers who never pass the prop.

```tsx
<Modal.Content placement="end">…</Modal.Content>
```

Additive, no migration needed.

## Migrating to 0.2.0

0.2.0 fixes two bugs that changed behaviour, and removes API that never worked.

**Behaviour**

- **The focus trap now actually engages.** It never did before: it activated on the render where the modal opened, but the dialog element is created once the portal is found, so it silently did nothing. Neither autofocus nor Tab containment worked. If you added your own focus handling to compensate, you can remove it.
- **Escape respects controlled state.** Backdrop clicks already called `onOpenChange`; Escape closed the modal directly regardless of what the parent decided. Both paths now ask. A controlled modal that does not flip `open` stays open on Escape.
- **`baseZIndex` on `ModalProvider` is now reachable, and `ModalRoot` no longer takes one.** `ModalRoot` defaulted its own prop to `1000`, so the provider value was unreachable and backdrops could render in a different layer band from their content. The prop is gone from `ModalRoot`; set it on `ModalProvider` or `ModalSystem`.
- **Controlled means `open` is present, and every path respects it.** Previously `useModalStack().open/close` and `Modal.Trigger` wrote to the provider even on a controlled modal, while a modal that passed `onOpenChange` without `open` was treated as controlled by Escape and could never close. Now a modal with an `open` prop is only ever asked through `onOpenChange` — by `Modal.Trigger`, `useModalStack`, `Modal.Close`, Escape and backdrop clicks alike — and a modal without one closes directly and is notified.
- **`Modal.Trigger` composes `onClick` on its own button too.** Passing `onClick` to a plain `Modal.Trigger` used to replace the trigger's handler, so the modal never opened. Handlers now compose in both render paths, and `preventDefault()` cancels the open.
- **`Modal.Content` merges `style`.** An inline `style` used to replace the dialog's own inline z-index.
- **The focus trap moves focus itself on every Tab.** It used to intervene only at the ends of the list and let the browser handle the middle, which leaked in Safari: its default Tab order skips buttons and links, so focus left the dialog. `Modal.Trigger` also focuses itself before opening, because Safari does not focus a clicked button and focus could not return to it.
- **The page outside an open modal is `inert` and `aria-hidden`.** See above. A sibling of the portal that carries `data-modal-keep-active` is left alone: for a notification region that has to outlive the modal which fired it, so its Undo stays pressable and announced.
- **`Modal.Body` becomes a tab stop while it scrolls**, so keyboard users can scroll it. It carries no `tabindex` otherwise.
- **`Modal.Close asChild` no longer adds the `modalClose` class to your element.** It carried the × icon button's fixed 32px size, so a `Modal.Button` wrapped in `Modal.Close asChild` — the pattern in the quick start above — had its label clipped. The child now keeps its own look and only gains the behaviour. A `Modal.Close` with a text label renders an ordinary quiet button; the square icon look is the `modalClose--icon` modifier, applied only when you render `<Modal.Close />` with no children.
- **Button colours meet WCAG AA.** `primary` is now `#0066cc` (was `#007bff`, 3.97:1 with white text) and `success` is `#1e7e34` (was `#28a745`, 3.1:1); the dark-mode `primary`, `danger` and `success` values changed for the same reason. Override the `--modal-button-*` tokens if you want the old colours back.

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
npm run e2e -w playground        # Playwright: real-browser behaviour + axe, against the built site
npm run e2e:shots -w playground  # writes review screenshots to playground/e2e/shots (git-ignored)
npm run lint
npm run build
```

The browser tests need the site built (`npm run build && npm run build -w playground`) and, once, `npx playwright install chromium webkit`.

The playground is both the dev sandbox and the deployed site. `npm run playground` aliases `@pearpages/modals` to `../src`; any other mode resolves it through the package's own `exports` map into `../dist` — what an npm consumer gets. CI always builds the dist mode, so the deployed site doubles as proof that the published package resolves.

## Releasing

The version lives in `package.json`; the tag does not set it.

```bash
npm version <patch|minor|major>   # commits and creates the vX.Y.Z tag
git push origin main               # 1. deploys the site; wait for the run to go green
git push origin vX.Y.Z             # 2. only then: publishes to npm
```

Two pushes, in that order. The publish workflow only runs when the tagged commit is already an ancestor of `origin/main`; if the tag arrives first it skips every step with a warning and still reports success. That is how `v0.1.1` was tagged but never reached npm, so check that the run actually built something.

Pushing to `main` deploys the site and never touches npm. Publishing authenticates through npm [trusted publishing](https://docs.npmjs.com/trusted-publishers): this repository and `publish.yml` are registered as a Trusted Publisher for the package on npmjs.com, so there is no token to rotate and provenance is attached automatically. A failed publish can be re-run for the same tag without re-tagging:

```bash
gh workflow run publish.yml --ref vX.Y.Z
```

With Claude Code, `/publish <patch|minor|major>` runs every step above, verifies each one (deploy green, publish not skipped, version on npm, site live) and creates the GitHub Release. `/publish resume vX.Y.Z` finishes a release that stopped part-way.

## License

MIT

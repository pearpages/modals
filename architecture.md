# Architecture

How `@pearpages/modals` is built. It explains *how* things work. The rules that follow from
it are in [principles.md](principles.md), the reasons for each choice in
[decisions.md](decisions.md), and open work in [tasks.md](tasks.md). When code and this file
disagree, the code is right and this file is a bug.

## Package shape

- One ESM entry, `dist/index.js` (+ `index.d.ts`), built by tsup from `src/index.ts`, and a
  standalone stylesheet `dist/index.css` exported as `@pearpages/modals/styles.css`.
- The `import './styles/index.scss'` in `src/index.ts` is a **build input**: it is what puts
  the SCSS into the tsup graph so esbuild extracts it. `dist/index.js` does not reference
  the CSS, so `sideEffects: false` is accurate and consumers import the stylesheet
  themselves ([ADR-0002](docs/adr/0002-stylesheet-is-a-separate-import.md)). Sass runs with
  `charset: false` (`tsup.config.ts`): a `@charset` inside a cascade layer is invalid.
- No runtime dependencies; `react` and `react-dom` ^19.1 are peers.
- Size (2026-09-22, `gzip -c dist/index.js | wc -c` / same for `index.css`): 7.7 kB JS,
  4.4 kB CSS. The README and the Why page quote these numbers. Refresh all of them together.

## Component tree

```
ModalSystem                     (ModalProvider + ModalRoot; baseZIndex, container)
├─ ModalProvider                registry + stack + requestOpen/requestClose (context)
│   └─ your app
│       ├─ Modal.Trigger target="x"
│       └─ Modal id="x"         registers; renders children only while open
│           └─ ModalAriaProvider + ModalIdProvider (internal)
│               └─ Modal.Content → portal into its slot in ModalRoot
└─ ModalRoot                    <div id="modal-root"> portalled into container || body
    └─ one .modalBackdrop per open modal (stack order), each holding a
       [data-modal-portal] slot that its Modal.Content portals into
```

- **`ModalProvider`** (`src/ModalProvider.tsx`) holds the registry (`id → entry`: open state,
  `stackIndex`, `controlled`, dismiss config, the element that had focus when it opened) and
  the ordered `stack` of open ids. `useModalStack()` is a thin view over it: `open`, `close`,
  `isOpen`, `getModal`.
- **`ModalRoot`** (`src/ModalRoot.tsx`) renders nothing while the stack is empty or during
  SSR (`useIsClient`). Otherwise it portals `#modal-root` into `container || document.body`
  and draws a backdrop for **every** open modal. Only the topmost backdrop is interactive
  (`pointer-events`) and only the topmost modal answers Escape. The backdrop's `data-state`
  is always `open`.
- **`Modal`** (`src/Modal.tsx`) registers its id, and marks the entry `controlled` exactly when
  an `open` prop is present. It returns `null` while the provider says it is closed.
- **`Modal.Content`** (`src/ModalContent.tsx`) finds its slot with `useModalPortal`, portals the
  `role="dialog"` element into it, and registers its dismiss config (`closeOnBackdrop`,
  `closeOnEscape`, `onInteractOutside`) through `useModalDismissConfig`.

## Opening and closing

- Every library path goes through the provider's `requestOpen(id)` / `requestClose(id)`:
  `Modal.Trigger`, `useModalStack().open/close`, `Modal.Close`, Escape and backdrop clicks
  ([ADR-0005](docs/adr/0005-controlled-means-open-is-present.md)).
  - **Uncontrolled** (no `open` prop): the provider changes state directly; `Modal` then calls
    `onOpenChange` (if given) as a notification.
  - **Controlled**: the request calls `onOpenChange` and nothing else; the provider follows the
    `open` prop. `open` without `onOpenChange` is a modal nothing can close.
- Dismissal: Escape / backdrop consult the topmost modal's config; `onInteractOutside` gets an
  event whose `preventDefault()` blocks it.
- **Animation lifecycle**: `Modal.Content` moves `data-state` `opening` → `open` (after ~10ms)
  and the CSS transitions opacity/transform. **Known limit:** on close, `Modal` returns
  `null` and the backdrop leaves with the stack entry in the same render, so `closing` never
  reaches the screen. Exits are instant (see tasks.md).
- Unregistered ids warn and do nothing. Warnings are unconditional (no `NODE_ENV` gate):
  `Modal with id "abc" is already registered`, `Cannot open modal "xyz" - not registered`,
  `Modal.Trigger: target modal "xyz" is not registered. …`. A duplicate id is ignored on
  registration, but unmounting either copy removes the shared entry (see tasks.md).
- Hooks used outside their provider throw (`useModalContext must be used within a
  ModalProvider`, and likewise for the aria/id contexts). The messages name the internal
  providers, not `ModalSystem`.

## Stacking

`z-index = baseZIndex + stackIndex` for both a backdrop and its dialog. `baseZIndex` (default
1000) is a prop of `ModalSystem` / `ModalProvider` only; `ModalRoot` and `Modal.Content` read
it from context, which is what keeps a backdrop in its dialog's layer band
([ADR-0004](docs/adr/0004-basezindex-lives-on-the-provider.md)). `Modal.Content` merges a
consumer `style` with its inline z-index. There is no z-index CSS variable.

## Accessibility machinery

- **ARIA wiring**: `Modal` renders an internal `ModalAriaProvider`. `Modal.Title` (an `h2`)
  and `Modal.Description` register generated ids (`modalTitle-<useId>`), and `Modal.Content`
  sets `aria-labelledby` / `aria-describedby`. Consumers use `useModalAria` / `useModalId`
  to wire their own parts; the provider itself is not exported.
- **Focus trap** (`src/useFocusTrap.ts`): active once the portal slot exists (it was gated on
  `portalContainer` after it silently never engaged). It focuses the first focusable element
  and **moves focus itself on every Tab**. Letting the browser handle Tab leaked in WebKit,
  whose default order skips buttons.
- **Focus return**: the provider records `document.activeElement` on open and focuses it on
  close. `Modal.Trigger` focuses itself before opening, because Safari does not focus a
  clicked button.
- **Inert page** (`src/useInertOutside.ts`, called by `ModalRoot`): while the stack is
  non-empty, every sibling of `#modal-root` up the tree gets `inert` + `aria-hidden="true"`,
  and only attributes it set are restored. A sibling carrying `data-modal-keep-active` is
  skipped, for toast regions
  ([ADR-0007](docs/adr/0007-inert-and-aria-hidden-outside-the-modal.md)).
- **Scrolling**: `useBodyScrollLock` locks body scroll while any modal is open, compensating
  for the scrollbar (`--scrollbar-compensation`) and using `position: fixed` on iOS.
  `Modal.Body` sets `tabindex=0` only while it overflows (ResizeObserver + a measure per
  render), so keyboard users can scroll it.
- **Visual viewport** (`src/useVisualViewport.ts`, called by `ModalRoot`): while open, it
  writes `--modal-vvh` and `--modal-vv-offset-top` onto `#modal-root` from
  `window.visualViewport` on `resize` and `scroll`. The backdrop uses them with fallbacks
  `100dvh` / `0px`, so the layout is unchanged where the hook is inactive. Unit-tested only;
  it has not been checked on a real iPhone (tasks.md).
- Reduced motion is **not** handled by the stylesheet yet (tasks.md); the Animation guide
  shows the consumer rule.

## Parts and `asChild`

All nine parts (Trigger, Content, Header, Title, Description, Close, Body, Footer, Button)
render through `renderAsChild` (`src/asChild.ts`). It gives named errors for a bad child,
merges className child-first, composes `on*` handlers (consumer first; `preventDefault()`
cancels the library's), and merges refs. Attributes are the consumer's
([ADR-0006](docs/adr/0006-consumer-attributes-win-handlers-compose.md)).
`Modal.Close asChild` adds no library class; the fixed 32px square is `modalClose--icon`,
applied only to the bare `<Modal.Close />` (×), which is also the only form that gets
`aria-label="Close modal"`. A text label is its own accessible name ([ADR-0008](docs/adr/0008-modal-close-aschild-adds-no-class.md)).
`Modal.Button` has 5 variants, 3 sizes and `loading` (spinner, implies `disabled`), and
forwards its ref.

## Styling

- `src/styles/index.scss` imports `tokens.scss` (CSS variables on `:root` plus a
  `prefers-color-scheme: dark` block) and `components.scss` (the rules).
- **Direct camelCase classes** (`.modalBackdrop`, `.modal`, `.modalHeader`…) with BEM-style
  modifiers (`.modal--md`, `.modal--placement-end`, `.modalClose--icon`). There are no CSS
  modules and no namespace wrapper, because the dialog is portalled out of the consumer's
  tree ([ADR-0001](docs/adr/0001-direct-class-names-no-css-modules.md)). Title and
  description are `.modal .modalTitle` so a host's descendant selectors do not win.
- **Tokens**: `tokens.scss` is the source of truth for every default the docs quote. Count
  (2026-09-22): 109 unique `--modal-*` custom properties, counted with
  `grep -oE -- '--modal-[a-z0-9-]+\s*:' src/styles/tokens.scss | sort -u | wc -l`. That
  leaves out the 59 dark-mode re-declarations and the 2 runtime viewport variables.
- **Sizes**: `auto` (fits content above `--modal-min-width`), `md` (`--modal-width-md`,
  520px), `full`. At ≤768px `auto`/`md` become fullscreen, header/footer tighten, and
  multi-button footers stack with `column-reverse` (the first button in the markup ends up
  at the bottom). At ≤480px the footer tightens again.
- **Placement** (`center | start | end | top | bottom`): the dialog gets
  `modal--placement-<x>` and `data-placement`, and the backdrop lays docked dialogs out with
  `:has(.modal--placement-<x>)`, so `ModalRoot` knows nothing about placement. The docked
  rules sit at the end of `.modal` so they win at equal specificity, and outrank the mobile
  rule so a bottom sheet stays at the bottom on a phone. Slide-in uses physical
  `translateX/Y`, which is wrong in RTL
  ([ADR-0009](docs/adr/0009-placement-through-backdrop-has.md)).
- Only runtime values are inline: z-index and the viewport variables.

## SSR

`ModalRoot` renders `null` on the server and until its first client effect, so `window` /
`document` are never touched and there is nothing to hydrate. Modal content is never
server-rendered, since a modal is closed on the first render.

## Public API

Everything `src/index.ts` exports: `ModalSystem`, `ModalProvider`, `ModalRoot`, `Modal` (with
`Modal.*` parts) plus each part as a named export; the hooks `useModalStack`,
`useModalContext`, `useModalDismissConfig`, `useModalPortal`, `useModalId`, `useModalAria`,
`useFocusTrap`, `useBodyScrollLock`, `useInertOutside`, `useVisualViewport`; and all types
from `src/types.ts`. `useModalStack` keeps the flat `open(id)` form
([ADR-0003](docs/adr/0003-usemodalstack-flat-open-id.md)). It currently returns a new object
on every render (tasks.md). Portal elements carry `data-modal-portal`,
`data-modal-backdrop`, `data-modal-trigger` and `data-modal-id`.

## Docs site and workspace

- The root is an npm workspace. `playground/` is both the dev sandbox and the deployed site
  (modals.pearpages.com). `vite` is a root devDependency so `playground`'s `tsc -b` sees one
  vite type tree (vitest 2 pins vite 5).
- Dual-mode vite: `npm run playground` aliases the package to `../src` (HMR); every other mode
  resolves through the real `exports` map into `../dist`, so the deployed site proves the
  package resolves.
- `playground/src/routes.tsx` is the single source for both sidebar and router (28 routes).
- Examples in `playground/src/examples/` are self-contained. Each is imported twice: as a
  component, and with `?raw` for its code block. eslint restricts them to `react` +
  `@pearpages/modals` imports and they carry no stylesheet. Code comes first, the live demo
  second.
- Code blocks use `prism-react-renderer`, themed through CSS variables, so dark mode is a
  token swap. `ComparisonTable` is a generic columns-as-data table; `PropsTable` has fixed
  columns. Both fall back to stacked rows at ≤640px via `data-label`.
- The footer renders `<Credit as="div" />` from `@pearpages/credit/react` (`as="div"` so
  landmarks do not nest). `.footer` maps its two tokens to page tokens for AA in dark mode.
- Content that exists in more than one place: the comparison table (README + `Why.tsx`), and
  the "Should you use this?" disclaimer (README, Overview, Why).

## Testing layers

| Layer | Command | What it proves |
|---|---|---|
| Library unit/integration | `npm run test:run` (vitest + testing-library, jsdom; 231 tests) | Behaviour of every part and hook. `src/test-setup.ts` only loads jest-dom and clears `document.body` before each test. Fake timers are per-file. |
| Docs smoke | `npm run test:playground` (after `build`) | Every route renders against the **built** package; `__stylesheet.test.ts` guards the published CSS (no `@charset`). |
| Real browsers | `npm run e2e -w playground` (after both builds) | Playwright on chromium, webkit and a Pixel 7 profile, against `vite preview`: focus trap with a real Tab, inert page, scroll lock, stacking, controlled dismissal, phone layout, axe on every route closed and open (serious/critical fail). |
| Visual review | `npm run e2e:shots -w playground` | Not a test: one PNG per route × viewport × scheme in `playground/e2e/shots/` (git-ignored), to Read. |

Helper lessons (`playground/e2e/helpers.ts`):
- Measure only after `document.getAnimations()` finish.
- Take scroll baselines after opening, because Playwright scrolls the trigger into view.
- Use `offset*` boxes where a hover transform can apply.
- Once a modal is open the page is `aria-hidden`, so role queries need `{ hidden: true }` or
  a dialog scope.

Accepted: axe's minor `aria-allowed-role` on the form-as-dialog example (`dialog` on
`<form>`).

## CI and release

- `deploy.yml`: on push to `main` (and `workflow_dispatch`): `npm ci`, `test:run`, library
  build, site build, `test:playground`, Playwright (chromium + webkit), then deploys GitHub
  Pages. It runs on Node 20 (tasks.md). It is the only CI run that executes e2e.
- `publish.yml`: on a `v*` tag (and `workflow_dispatch` to re-run a tag). It checks that the
  tagged commit is an ancestor of `origin/main` and **skips every step, still green, if not**.
  Then Node 22, `npm@^11`, `npm ci`, lint, test, build, `check:package`
  (`publint --pack npm` + attw), `test:playground`, and
  `npm publish --access public --loglevel verbose` through npm trusted publishing (OIDC,
  provenance). `setup-node` has no `registry-url` on purpose: it would write an
  `_authToken` line that shadows OIDC
  ([ADR-0010](docs/adr/0010-trusted-publishing-main-before-tag.md)).
- `prepublishOnly` repeats build + test + `check:package`, so a local `npm publish` cannot
  skip them.
- Releases are run by the `/publish` skill (`.claude/skills/publish/SKILL.md`), which orders
  main before tag and verifies each step
  ([ADR-0011](docs/adr/0011-releases-only-through-publish.md)).

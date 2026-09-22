# Tasks

What's open and what's been done. Every change updates this file: tick or add an Open item,
and add a dated line at the top of **Done** ([principles.md](principles.md) P21). How things
work is in [architecture.md](architecture.md), and why in [decisions.md](decisions.md).

## Open

### Library fixes (each with a failing-first test, P14)

- [ ] **Exit animation never plays.** `Modal` returns `null` and the backdrop leaves with the
      stack entry in the same render as the close, so `data-state="closing"` never reaches
      the screen. The Animation guide says so; update it when this is fixed.
- [ ] **`prefers-reduced-motion`.** The stylesheet ignores it; the Animation guide shows the
      consumer rule for now. Add a `reduce` block to `components.scss`, then update the guide.
- [ ] **Duplicate ids share one entry.** The second registration is ignored with a warning,
      but unmounting either copy deletes the shared entry.
- [ ] **`useModalStack` returns a new object every render** (`ModalProvider.tsx`). Memoise it,
      or document that it is unstable.
- [ ] **Provider errors name internals.** "useModalContext must be used within a
      ModalProvider" should mention `ModalSystem`, which is what users render.
- [ ] **RTL.** `placement` slides with physical `translateX/Y`, so `start`/`end` slide the
      wrong way in RTL ([ADR-0009](docs/adr/0009-placement-through-backdrop-has.md)).
- [ ] Fix the 10 React `act()` warnings from `Modal.Content` in the test suite.
- [ ] `keepMounted` prop (future; content unmounts on close today).

### Verification

- [ ] Check the visual-viewport behaviour (`useVisualViewport`) on a real iPhone with the
      keyboard open. It is unit-tested against a faked viewport only.

### Tooling and CI

- [ ] Decide whether `deploy.yml` moves from Node 20 to 22 (`publish.yml` and `.nvmrc` are on
      22), and whether `pnpm-lock.yaml` stays next to `package-lock.json` (CI is npm-only).

### Review the number of CSS variables

109 unique `--modal-*` properties (counted 2026-09-22; see architecture.md › Styling). That
still sounds like a lot for a modal.

- [x] Count what `src/styles/tokens.scss` actually defines. The docs said 166; it is 109,
      and the docs are corrected.
- [ ] Group them (colours, spacing, buttons, sizes, animation…) and find variables that are
      unused, only alias another one, or that no consumer would realistically override.
- [ ] Decide what to keep, merge or make internal. Removing a public variable is a breaking
      change (P5): README migration notes, and an ADR.
- [ ] Update the count everywhere it appears (P18: README ×2, Why, Overview, architecture.md).

## Done

- [x] 2026-09-22: `Modal.Close` no longer overrides a text label's accessible name;
      `aria-label="Close modal"` only on the bare ×. Three regression tests; Close page and
      architecture.md updated. Unreleased (next patch).
- [x] 2026-09-22: Project knowledge split into `architecture.md`, `principles.md`,
      `decisions.md` (+ 12 seed ADRs in `docs/adr/`) and this file. CLAUDE.md slimmed,
      `specs.md` retired ([ADR-0012](docs/adr/0012-project-knowledge-files.md)).
- [x] 2026-09-22: README and docs site made consistent with the code. Variable count
      166 → 109; bundle 7.1/4 → 7.7/4.4 kB; built-in dark mode; entrance per shape; "no
      drawers" qualified; `placement` in the README; visual viewport on the Mobile page and
      hooks list; stale `baseZIndex`, footer-order, 480px and `auto`-width sentences fixed;
      reduced motion, the exit animation and the `Modal.Close` label described as they
      really are.
- [x] 2026-09-22: Released 0.4.0 (e0091ad): README notes, GitHub Release, first
      `/publish resume` run; three skill fixes from that run.
- [x] 2026-09-22: `/publish` skill written; CLAUDE.md and README point to it.
- [x] 2026-09-22: Audit of missing tasks; created this file.
- [x] 2026-09-21: 0.4.0 on npm: `data-modal-keep-active`, visual-viewport following, no
      `@charset` in the stylesheet.
- [x] 2026-09-17: Released 0.3.0: `placement` on `Modal.Content`.
- [x] 2026-09-12: `NPM_TOKEN` secret deleted, `big-refactor` branch removed.
- [x] 2026-09-11: Released 0.2.0, the first release through npm trusted publishing
      (0.1.1 had been tagged but never published).
- [x] 2026-09-10: API consistency audit (controlled rule, handler composition, style merge);
      inert page; Why page and library comparison; Playwright on three engines with axe,
      which found and fixed the WebKit focus leak, Safari focus return, AA button colours,
      keyboard-scrollable body, `Modal.Close asChild` clipping and host heading styles.
      Docs footer moved to `@pearpages/credit`.
- [x] 2026-09-09: Docs site: `playground/` became the npm-workspace site, with the 26 routes
      at the time from `routes.tsx`, examples shown via `?raw`, and a smoke suite against
      dist. Fixed the focus trap that never engaged, Escape ignoring controlled state, and the
      `baseZIndex` split. `renderAsChild` shared by all parts; bundle 180 kB → 33 kB raw.
- [x] 2025-10-17: `v0.1.1` tagged. It never reached npm (tag pushed before `main`).
- [x] 2025-09-23 to 2025-09-28: `Modal.Button`; compact header/footer, mobile footer stacking
      and safe area; content-type support in `Modal.Body`; CSS architecture refactor.
- [x] 2025-09-14 to 2025-09-18: Initial library and 0.1.0: compound parts, provider/stack,
      portal, focus trap, scroll lock, `useModalStack`, `Modal.Body`, data-state entrance,
      size variants.

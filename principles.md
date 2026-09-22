# Principles

Every change to this repository, whether code, docs, tests or process, complies with these
rules. When a change would break one, stop and ask the user instead of working around it.
Changing a principle is itself a decision: it needs the user's agreement and an ADR
([decisions.md](decisions.md)). How things are built is in
[architecture.md](architecture.md).

Each rule has a **Why**, and a **Check** where something enforces it.

## API

**P1. A modal is controlled exactly when it has an `open` prop.** Every path that opens or
closes it (Trigger, `useModalStack`, Close, Escape, backdrop) asks through `onOpenChange` and
never writes state directly. Uncontrolled modals change directly and notify afterwards.
*Why:* one rule users can predict, like `<input value>`. [ADR-0005](docs/adr/0005-controlled-means-open-is-present.md)

**P2. Consumer attributes win; `on*` handlers compose.** In both the plain and `asChild`
paths, a consumer's attributes override ours. Their handler runs first, and its
`preventDefault()` cancels ours. Refs merge, and className merges child-first.
*Why:* a silently replaced `onClick` once shipped a docs example whose modal never opened.
[ADR-0006](docs/adr/0006-consumer-attributes-win-handlers-compose.md)

**P3. One source per setting.** `baseZIndex` lives on `ModalSystem` / `ModalProvider` only.
No part grows a prop that shadows a provider value.
*Why:* a shadowing prop split backdrops and dialogs into different layer bands.
[ADR-0004](docs/adr/0004-basezindex-lives-on-the-provider.md)

**P4. The API must be typeable honestly.** Prefer forms where a typo fails to type-check or
fails loudly. `useModalStack` keeps flat `open(id)`, not `modals['id'].open()`.
[ADR-0003](docs/adr/0003-usemodalstack-flat-open-id.md)

**P5. Additive by default.** New behaviour must not change what existing consumers see.
Fallbacks reproduce the old layout, and the prop defaults to the old behaviour. A breaking
change needs the user's agreement, migration notes in the README and a version bump that
says so.

**P6. Misuse warns or throws; it never fails silently.** Unregistered ids and duplicate ids
warn in every environment, and hooks outside their provider throw.

## Styling

**P7. `src/styles/tokens.scss` is the source of truth for defaults.** Any default the README
or docs quote (sizes, colours, radii, counts) is copied from it, and the docs change when
it changes.

**P8. Direct camelCase classes, BEM-style `--modifiers`, no CSS modules, no namespace
wrapper.** Tests assert these class names directly.
*Why:* the dialog is portalled out of the consumer's tree.
[ADR-0001](docs/adr/0001-direct-class-names-no-css-modules.md)

**P9. Every visual choice is a custom property; no JavaScript styling.** Animations are CSS
transitions driven by `data-state`. No inline styles, style objects or CSS-in-JS in library
components, docs components or examples. The only exceptions are runtime values: z-index
and the viewport variables. Components get a `.scss` / `.css` file.

**P10. The stylesheet ships separately and stays side-effect free.** Keep the build-input
import in `src/index.ts`. Never make `dist/index.js` import CSS.
[ADR-0002](docs/adr/0002-stylesheet-is-a-separate-import.md)

**P11. Don't restyle the `@pearpages/credit` footer** beyond mapping its tokens. It is meant to
look the same on every pearpages site.

## Accessibility

**P12. Accessible without props.** Dialog role, labelling, focus trap and return, Escape,
inert page and keyboard-reachable scrolling all work by default. Colours meet WCAG AA in
light and dark.
*Check:* axe in `playground/e2e/a11y.spec.ts` (serious/critical fail).

**P13. Focus, layout and a11y claims are proven in a real browser**, not only in jsdom.
Anything about Tab order, focus, scrolling, geometry or colour gets a Playwright assertion.
*Why:* the first real-browser run found defects all 200+ jsdom tests had missed.

## Quality

**P14. Every bug fix comes with a test that fails without the fix.**
*Why:* a focus trap that never engaged survived behind tests that only asserted "does not
throw".

**P15. Gates pass before a change is done:** `npm run lint`, `npm run test:run`,
`npm run build`, and for anything touching the site or styles also
`npm run build -w playground`, `npm run test:playground` and `npm run e2e -w playground`.
Report failures as they are; never skip a gate silently.

**P16. Docs follow code, in the same change.** A behaviour, API or default change updates the
README, the docs site and architecture.md in the same commit. No page may claim something
the code does not do. If the code falls short of a promise, either fix the code or correct
the claim and open a task.

## Docs

**P17. Examples are copyable.** Files in `playground/src/examples/` import only `react` and
`@pearpages/modals` and carry no stylesheet.
*Check:* eslint `no-restricted-imports` on that folder.

**P18. Content that exists in several places is edited together:**
- the comparison table (README + `Why.tsx`);
- the "Should you use this?" disclaimer (README, Overview, Why);
- dated numbers such as bundle size and variable count (README, Why, Overview,
  architecture.md), together with their dating sentence.

The comparison's concessions, including the one in our own row, are deliberate and stay.

**P19. Honest positioning.** The docs recommend Radix by default and say when another library
is the better choice. Do not remove or soften that.

## Process

**P20. Releases go only through `/publish`.** Never run `npm version`, `npm publish`, push a
`v*` tag or `gh release create` by hand.
[ADR-0011](docs/adr/0011-releases-only-through-publish.md)

**P21. Project knowledge has one home per kind** ([ADR-0012](docs/adr/0012-project-knowledge-files.md)):
- how it's built → `architecture.md`
- rules → `principles.md`
- why → `docs/adr/` + `decisions.md`
- what's open and done → `tasks.md`

Every change updates `tasks.md`: tick or add Open items, and add a dated Done line. A
structural change updates `architecture.md`. A choice between real alternatives gets an ADR,
proposed to the user; reversing an ADR means a new ADR that supersedes it. CLAUDE.md holds
only how to work here and pointers.

**P22. Outward-facing actions are confirmed first:** pushes, releases, anything published.

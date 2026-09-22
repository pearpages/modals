import { Link } from 'react-router-dom'
import { Page } from '../components/Page'
import { Callout } from '../components/Callout'
import { ComparisonTable } from '../components/ComparisonTable'
import type { ComparisonRow } from '../components/ComparisonTable'

const COLUMNS = [
  { key: 'library', label: 'Library' },
  { key: 'styling', label: 'Styling' },
  { key: 'state', label: 'Open state' },
  { key: 'elsewhere', label: 'Opening from elsewhere, stacking' },
  { key: 'ships', label: 'Ships as' },
  { key: 'pick', label: 'Pick it when' },
]

const ROWS: ComparisonRow[] = [
  {
    key: 'pearpages',
    self: true,
    cells: {
      pick: (
        <>
          You want a modal that looks finished out of the box, restyled with variables, opened
          by id from anywhere, and nothing else from a kit. Not the pick if you need headless
          control, non-modal dialogs, or a promise-style manager.
        </>
      ),
      library: '@pearpages/modals',
      styling: (
        <>
          Styled by a stylesheet, restyled through CSS variables. No provider, no runtime.
        </>
      ),
      state: (
        <>
          Uncontrolled by default; <code>open</code> makes it controlled and every path then
          asks through <code>onOpenChange</code>.
        </>
      ),
      elsewhere: (
        <>
          Any <code>Modal.Trigger</code> or <code>useModalStack().open(id)</code> under the
          provider, by id. The provider owns the stack.
        </>
      ),
      ships: 'Standalone. No runtime dependencies. 7.7 kB gzipped, plus 4.4 kB of CSS.',
    },
  },
  {
    key: 'radix',
    cells: {
      pick: (
        <>
          You write every style yourself anyway (Tailwind, your own design system), or you use
          shadcn/ui. The most battle-tested primitive with the largest ecosystem; better than
          this library for full control of markup and CSS.
        </>
      ),
      library: 'Radix Dialog',
      styling: (
        <>
          Unstyled. <code>data-state</code> for animation.
        </>
      ),
      state: (
        <>
          <code>defaultOpen</code>, or <code>open</code> + <code>onOpenChange</code>.
        </>
      ),
      elsewhere: (
        <>
          The trigger lives inside its <code>Root</code>, or you lift state. Nesting supported.
        </>
      ),
      ships: 'Primitive package with 15 dependencies (focus scope, scroll removal, …). 12.6 kB gzipped.',
    },
  },
  {
    key: 'headless',
    cells: {
      pick: (
        <>
          You are on Tailwind and want dialogs, menus and listboxes from one package
          maintained by Tailwind Labs. Better when the project needs more than modals;
          controlled-only is a feature there, not a gap.
        </>
      ),
      library: 'Headless UI Dialog',
      styling: (
        <>
          Unstyled. <code>data-closed</code>, <code>data-enter</code>, <code>data-leave</code>{' '}
          with the <code>transition</code> prop.
        </>
      ),
      state: (
        <>
          Controlled only: <code>open</code> and <code>onClose</code> are required.
        </>
      ),
      elsewhere: 'You own the state. Nesting is not documented.',
      ships: (
        <>
          Part of <code>@headlessui/react</code> (react-aria, floating-ui, tanstack-virtual).
          63 kB gzipped for the whole package.
        </>
      ),
    },
  },
  {
    key: 'react-aria',
    cells: {
      pick: (
        <>
          Accessibility rigour beyond the basics: internationalization, screen-reader and
          touch edge cases, and a full component set built the same way. Better when that
          depth matters more than bundle size.
        </>
      ),
      library: 'React Aria Components',
      styling: (
        <>
          Unstyled. <code>className</code> and <code>style</code> take render functions;{' '}
          <code>data-entering</code> / <code>data-exiting</code> for animation.
        </>
      ),
      state: (
        <>
          <code>defaultOpen</code>, or <code>isOpen</code> + <code>onOpenChange</code>.
        </>
      ),
      elsewhere: (
        <>
          <code>DialogTrigger</code> wraps the trigger and the overlay, or you lift state.
          Backdrop dismissal is off unless <code>isDismissable</code>.
        </>
      ),
      ships: (
        <>
          Part of <code>react-aria-components</code>.
        </>
      ),
    },
  },
  {
    key: 'ariakit',
    cells: {
      pick: (
        <>
          You want a store you can share across the tree, non-modal dialogs, or the rest of
          Ariakit&apos;s headless set. Better than this library for non-modal use and for
          state you own outside React props.
        </>
      ),
      library: 'Ariakit Dialog',
      styling: (
        <>
          Unstyled. <code>data-enter</code> / <code>data-leave</code>, a <code>backdrop</code>{' '}
          prop.
        </>
      ),
      state: (
        <>
          <code>open</code> + <code>onClose</code>, or a <code>useDialogStore</code> you can
          share.
        </>
      ),
      elsewhere: (
        <>
          <code>DialogDisclosure</code>, or pass the store around. Nesting supported.
        </>
      ),
      ships: (
        <>
          Part of <code>@ariakit/react</code>. 63.5 kB gzipped for the whole package.
        </>
      ),
    },
  },
  {
    key: 'react-modal',
    cells: {
      pick: (
        <>
          A codebase already on it, or the smallest single-component dependency with no
          compound API. Not a pick for new projects: <code>prop-types</code>, no stacking, and
          a single-element API.
        </>
      ),
      library: 'react-modal',
      styling: (
        <>
          Inline default styles, or your own classes via <code>className</code>,{' '}
          <code>overlayClassName</code> and <code>style</code>.
        </>
      ),
      state: (
        <>
          Controlled only: <code>isOpen</code> + <code>onRequestClose</code>.
        </>
      ),
      elsewhere: (
        <>
          You own the state. Stacking is not documented. Needs <code>appElement</code>.
        </>
      ),
      ships: 'One component with 4 dependencies (prop-types, …). 7.5 kB gzipped.',
    },
  },
  {
    key: 'mui',
    cells: {
      pick: (
        <>
          The rest of the app is Material UI. Better there because it inherits the theme and
          transitions; do not install MUI for a modal.
        </>
      ),
      library: 'MUI Dialog',
      styling: (
        <>
          Emotion CSS-in-JS, the <code>sx</code> prop and the theme.
        </>
      ),
      state: (
        <>
          Controlled only: <code>open</code> + <code>onClose</code>.
        </>
      ),
      elsewhere: 'You own the state.',
      ships: (
        <>
          Part of <code>@mui/material</code>, with <code>@emotion</code>.
        </>
      ),
    },
  },
  {
    key: 'chakra',
    cells: {
      pick: (
        <>
          The rest of the app is Chakra. Its dialog has more built-in variants than this one
          — sizes, placement, motion presets — and shares the kit&apos;s z-index system.
        </>
      ),
      library: 'Chakra UI Dialog',
      styling: (
        <>
          Theme recipes and style props. <code>Provider</code> required.
        </>
      ),
      state: (
        <>
          <code>defaultOpen</code>, <code>open</code> + <code>onOpenChange</code>, or a{' '}
          <code>useDialog</code> store.
        </>
      ),
      elsewhere: (
        <>
          <code>Dialog.Trigger</code> inside <code>Root</code>, or the store through{' '}
          <code>RootProvider</code>. Built on Ark UI.
        </>
      ),
      ships: (
        <>
          Part of <code>@chakra-ui/react</code>.
        </>
      ),
    },
  },
  {
    key: 'mantine',
    cells: {
      pick: (
        <>
          The rest of the app is Mantine, or you want <code>keepMounted</code> and a modals
          manager. Its <code>useModalsStack</code> is the closest thing to this
          library&apos;s id model, with a full kit behind it.
        </>
      ),
      library: 'Mantine Modal',
      styling: (
        <>
          CSS modules, the Styles API and CSS variables. <code>MantineProvider</code>{' '}
          required.
        </>
      ),
      state: (
        <>
          Controlled only: <code>opened</code> + <code>onClose</code>.
        </>
      ),
      elsewhere: (
        <>
          <code>Modal.Stack</code> with <code>useModalsStack</code>: open and close by a
          registered id.
        </>
      ),
      ships: (
        <>
          Part of <code>@mantine/core</code>.
        </>
      ),
    },
  },
]

export function Why() {
  return (
    <Page
      title="Why this library"
      lead="The five ideas behind the API, what the library deliberately is not, and how it sits next to the modals you already know."
    >
      <Callout variant="warning" title="Should you use this?">
        <p>
          For most React apps, no: reach for Radix Dialog (or shadcn/ui, which is Radix
          underneath). It has the larger ecosystem, more years of edge-case fixes, full
          control of markup and CSS, and a non-modal mode. This library is worth it when
          several of these are true:
        </p>
        <ol>
          <li>
            You open the same modal from several unrelated places and want to address it
            by id instead of lifting state to a common ancestor.
          </li>
          <li>
            You want a modal that looks finished without Tailwind and without a UI kit,
            restyled through CSS variables.
          </li>
          <li>
            You run several sites that should share one modal look — set the variables
            once.
          </li>
          <li>
            You stack modals (a confirmation over a form) and want z-index, Escape and
            scroll lock handled by the provider.
          </li>
          <li>
            You are on React 19, want a dependency-free package, and modal dialogs are all
            you need — no popovers, non-modal dialogs or non-modal drawers (a modal sheet
            docked to an edge is <code>placement</code>).
          </li>
        </ol>
        <p>
          If you need headless control, non-modal dialogs, <code>keepMounted</code>, or a
          promise-style <code>openConfirm()</code>, this is the wrong library.{' '}
          The table at the bottom of this page says which.
        </p>
      </Callout>

      <p>
        There is no shortage of React modals. This one exists because the two common
        shapes each leave something on the table: headless primitives hand you correct
        behaviour and no appearance, so every project writes the same hundred lines of
        CSS; UI kits hand you appearance and a theme runtime, a provider, and a design
        language you may not want. This library sits between them, and it changes one
        thing about how modals are addressed.
      </p>

      <h2>Five ideas</h2>

      <h3>1. A modal is addressed by id, not by where it sits in the tree</h3>
      <p>
        A <code>Modal</code> registers with the provider under its <code>id</code>. From then
        on anything inside the provider can open it: a <code>Modal.Trigger</code> with a{' '}
        <code>target</code>, or <code>useModalStack().open(id)</code> from any component. The
        trigger and the modal do not need to share a subtree, and nobody lifts state to a
        common ancestor. Most libraries scope a dialog&apos;s state to the component that
        renders it, which is why their triggers must live inside a <code>Root</code> or you
        end up threading <code>open</code> and <code>setOpen</code> through props.
      </p>
      <p>
        Because one provider owns one registry, stacking is not a feature bolted on top. The
        registry is the stack: z-index, which modal answers Escape, whose backdrop is
        interactive, and when body scroll unlocks all fall out of it. See{' '}
        <Link to="/guides/stacking">Stacking</Link> and{' '}
        <Link to="/guides/programmatic">Programmatic control</Link>.
      </p>

      <h3>2. Parts you arrange, under one contract</h3>
      <p>
        A dialog is assembled from nine <code>Modal.*</code> parts rather than configured
        through props on one component. Every part accepts <code>asChild</code>, so any of
        them can become an element of yours, and every part follows the same prop rule:
        attributes are yours to set, <code>on*</code> handlers compose with the
        library&apos;s, and <code>preventDefault()</code> in yours cancels the
        library&apos;s. There is one implementation of that rule, so it cannot drift between
        parts. See <Link to="/guides/as-child">asChild</Link>.
      </p>

      <h3>3. Styled by default, restyled through variables</h3>
      <p>
        The stylesheet is a real design, not a placeholder: spacing, typography, a dark mode
        that follows <code>prefers-color-scheme</code>, fullscreen on phones. Every visual
        choice in it is a custom property, 109 of them, so restyling means setting a
        variable, never out-specifying a selector. There is no theme provider and no
        CSS-in-JS runtime, because a stylesheet and custom properties already do that job.
        Class names are plain (<code>.modal</code>, <code>.modalHeader</code>) rather than
        scoped, deliberately: the dialog is portalled out of your tree, and scoped styles do
        not follow it. See <Link to="/guides/theming">Theming</Link>.
      </p>

      <h3>4. Controlled when you say so</h3>
      <p>
        Pass <code>open</code> and the modal is controlled; from then on every path that
        would open or close it — <code>Modal.Trigger</code>, <code>useModalStack</code>,{' '}
        <code>Modal.Close</code>, Escape, the backdrop — calls your <code>onOpenChange</code>{' '}
        and nothing else, so you can refuse. Leave <code>open</code> off and the provider
        owns the state, still telling <code>onOpenChange</code> what happened. Same rule as a
        React input, applied to every path rather than some. See{' '}
        <Link to="/guides/controlled">Controlled modals</Link>.
      </p>

      <h3>5. Accessible by construction, and small</h3>
      <p>
        <code>role=&quot;dialog&quot;</code>, <code>aria-modal</code>, and{' '}
        <code>aria-labelledby</code> / <code>aria-describedby</code> generated from{' '}
        <code>Modal.Title</code> and <code>Modal.Description</code>; focus moves in, is
        trapped, and returns to whatever had it; Escape reaches only the topmost modal;
        everything outside the modal is <code>inert</code> and <code>aria-hidden</code>{' '}
        until it closes, since <code>aria-modal</code> alone is honoured unevenly. None of
        it needs a prop. The library has no runtime dependencies — <code>react</code> and{' '}
        <code>react-dom</code> are peers — and ships as 7.7 kB of gzipped JavaScript plus 4.4 kB
        of CSS. See <Link to="/guides/accessibility">Accessibility</Link>.
      </p>

      <h2>What it is not</h2>
      <ul>
        <li>
          <strong>Not a design system.</strong> There is a <code>Modal.Button</code> for
          footers, and nothing else. Your buttons, inputs and typography are yours.
        </li>
        <li>
          <strong>Not headless.</strong> If you want to write every rule yourself, a
          primitive library will suit you better than overriding a stylesheet.
        </li>
        <li>
          <strong>Not a promise-style manager.</strong> There is no{' '}
          <code>openConfirm()</code> that resolves with an answer. A modal is JSX you render,
          opened by id.
        </li>
        <li>
          <strong>Modal only.</strong> No non-modal dialogs, popovers or non-modal drawers.
          One built-in entrance per shape (centred dialogs fade and scale, docked sheets
          slide in), which you can replace in CSS.
        </li>
        <li>
          <strong>Unmounts on close.</strong> There is no <code>keepMounted</code>; content is
          created when the modal opens and dropped when it closes.
        </li>
      </ul>

      <h2>Compared with</h2>
      <p>
        The libraries most people reach for, described by the four things that differ most:
        how they are styled, how open state works, whether something outside the dialog can
        open it, and what you install. The last column says when the other library is the
        better choice, and it is meant honestly: every one of these beats this library at
        something. shadcn/ui&apos;s dialog is Radix underneath, so the Radix row covers it.
      </p>
      <ComparisonTable columns={COLUMNS} rows={ROWS} caption="Nine React modals, side by side" />
      <p>
        Sizes are minified and gzipped as reported by bundlephobia for the package&apos;s
        current release, and by <code>gzip -c dist/index.js</code> for this one, measured in
        September 2026. Kits are listed without a size because a modal is a small part of
        what you install.
      </p>
    </Page>
  )
}

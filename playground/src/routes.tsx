import type { ReactElement } from 'react'

import { Overview } from './pages/Overview'
import { Setup } from './pages/Setup'
import { QuickStart } from './pages/QuickStart'

import { ModalPage } from './pages/components/ModalPage'
import { TriggerPage } from './pages/components/TriggerPage'
import { ContentPage } from './pages/components/ContentPage'
import { HeaderPage } from './pages/components/HeaderPage'
import { BodyPage } from './pages/components/BodyPage'
import { FooterPage } from './pages/components/FooterPage'
import { ClosePage } from './pages/components/ClosePage'
import { ButtonPage } from './pages/components/ButtonPage'

import { UseModalStackPage } from './pages/hooks/UseModalStackPage'
import { ContextHooksPage } from './pages/hooks/ContextHooksPage'

import { ControlledPage } from './pages/guides/ControlledPage'
import { ProgrammaticPage } from './pages/guides/ProgrammaticPage'
import { SizesPage } from './pages/guides/SizesPage'
import { AnimationPage } from './pages/guides/AnimationPage'
import { StackingPage } from './pages/guides/StackingPage'
import { DismissPage } from './pages/guides/DismissPage'
import { AsChildPage } from './pages/guides/AsChildPage'
import { AccessibilityPage } from './pages/guides/AccessibilityPage'
import { ScrollLockPage } from './pages/guides/ScrollLockPage'
import { MobilePage } from './pages/guides/MobilePage'
import { PortalContainerPage } from './pages/guides/PortalContainerPage'
import { ThemingPage } from './pages/guides/ThemingPage'
import { FormsAsyncPage } from './pages/guides/FormsAsyncPage'

export type DocRoute = {
  path: string
  title: string
  element: ReactElement
}

export type DocSection = {
  label: string
  routes: DocRoute[]
}

/**
 * The single source of truth for the site: both the sidebar and the router are
 * generated from this, so a page can never appear in one and not the other.
 */
export const SECTIONS: DocSection[] = [
  {
    label: 'Getting started',
    routes: [
      { path: '/', title: 'Overview', element: <Overview /> },
      { path: '/setup', title: 'Setup', element: <Setup /> },
      { path: '/quick-start', title: 'Your first modal', element: <QuickStart /> },
    ],
  },
  {
    label: 'Components',
    routes: [
      { path: '/components/modal', title: 'Modal', element: <ModalPage /> },
      { path: '/components/modal-trigger', title: 'Modal.Trigger', element: <TriggerPage /> },
      { path: '/components/modal-content', title: 'Modal.Content', element: <ContentPage /> },
      { path: '/components/modal-header', title: 'Header, Title & Description', element: <HeaderPage /> },
      { path: '/components/modal-body', title: 'Modal.Body', element: <BodyPage /> },
      { path: '/components/modal-footer', title: 'Modal.Footer', element: <FooterPage /> },
      { path: '/components/modal-close', title: 'Modal.Close', element: <ClosePage /> },
      { path: '/components/modal-button', title: 'Modal.Button', element: <ButtonPage /> },
    ],
  },
  {
    label: 'Hooks',
    routes: [
      { path: '/hooks/use-modal-stack', title: 'useModalStack', element: <UseModalStackPage /> },
      { path: '/hooks/context-hooks', title: 'Context hooks', element: <ContextHooksPage /> },
    ],
  },
  {
    label: 'Guides',
    routes: [
      { path: '/guides/controlled', title: 'Controlled modals', element: <ControlledPage /> },
      { path: '/guides/programmatic', title: 'Programmatic control', element: <ProgrammaticPage /> },
      { path: '/guides/sizes', title: 'Sizes', element: <SizesPage /> },
      { path: '/guides/animation', title: 'Animation', element: <AnimationPage /> },
      { path: '/guides/stacking', title: 'Stacking', element: <StackingPage /> },
      { path: '/guides/dismiss', title: 'Dismissal', element: <DismissPage /> },
      { path: '/guides/as-child', title: 'asChild', element: <AsChildPage /> },
      { path: '/guides/accessibility', title: 'Accessibility', element: <AccessibilityPage /> },
      { path: '/guides/scroll-lock', title: 'Scroll lock', element: <ScrollLockPage /> },
      { path: '/guides/mobile', title: 'Mobile', element: <MobilePage /> },
      { path: '/guides/portal-container', title: 'Portal container', element: <PortalContainerPage /> },
      { path: '/guides/theming', title: 'Theming', element: <ThemingPage /> },
      { path: '/guides/forms-and-async', title: 'Forms & async work', element: <FormsAsyncPage /> },
    ],
  },
]

export const ALL_ROUTES: DocRoute[] = SECTIONS.flatMap((section) => section.routes)

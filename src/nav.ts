// ─────────────────────────────────────────────────────────
//  nav.ts  ←  EDIT THIS FILE FOR EACH NEW PROJECT
//  Define your sidebar navigation here.
// ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  path?: string
  children?: NavItem[]
}

export const NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Getting Started',
    children: [
      { label: 'Introduction', path: '/docs/introduction' },
      { label: 'Installation', path: '/docs/installation' },
      { label: 'Quick Start', path: '/docs/quick-start' },
    ],
  },
  {
    label: 'Guides',
    children: [
      { label: 'Overview', path: '/guides/overview' },
    ],
  },
  {
    label: 'Components',
    children: [
      { label: 'Component Showcase', path: '/docs/showcase' },
    ],
  },
]

/** Flat ordered list used for Prev / Next navigation */
export const FLAT_PAGES = NAV.flatMap(item =>
  item.children
    ? item.children.map(c => ({ label: c.label!, path: c.path! }))
    : [{ label: item.label, path: item.path! }]
)

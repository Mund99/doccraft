// ─────────────────────────────────────────────────────────
//  nav.ts  ←  EDIT THIS FILE FOR EACH NEW PROJECT
//  Define your sidebar navigation here.
//  Every path must have a matching <Route> in App.tsx.
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
      { label: 'How to Use',          path: '/docs/how-to-use' },
      { label: 'AI Prompt Templates', path: '/docs/ai-prompts' },
    ],
  },
  {
    label: 'Framework',
    children: [
      { label: 'Component Showcase', path: '/docs/showcase' },
    ],
  },
  // ── Add your sections below ──────────────────────────
  // {
  //   label: 'Your Section',
  //   children: [
  //     { label: 'Introduction', path: '/docs/introduction' },
  //     { label: 'Installation', path: '/docs/installation' },
  //   ],
  // },
]

/** Flat ordered list used for Prev / Next navigation */
export const FLAT_PAGES = NAV.flatMap(item =>
  item.children
    ? item.children.map(c => ({ label: c.label!, path: c.path! }))
    : [{ label: item.label, path: item.path! }]
)

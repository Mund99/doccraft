# doccraft

A clean, opinionated documentation site framework built with React + Vite + TypeScript.

Light/warm theme, dark mode, collapsible sidebar, live search, on-page TOC, breadcrumbs, and a complete set of documentation components — ready to drop into any project.

---

## Quick start

**Option 1 — npx (recommended)**

```bash
npx create-doccraft my-project-docs
cd my-project-docs
npm run dev
```

**Option 2 — GitHub template**

Click **"Use this template"** on GitHub to create a new repo, then:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev
```

## Customise for your project

Only three files need to change:

| File | What to edit |
|---|---|
| `src/site.config.ts` | Site title, logo, GitHub URL, version badge, edit-on-GitHub base URL |
| `src/nav.ts` | Sidebar sections and page links |
| `src/App.tsx` | Import your pages and register routes |

Then write your pages in `src/pages/` using `DocLayout` as the wrapper:

```tsx
import { DocLayout, Callout, CodeBlock } from '../framework'

export default function MyPage() {
  return (
    <DocLayout>
      <h1>My Page</h1>
      <p>Content goes here.</p>
      <Callout type="tip" title="Tip">Use h2 and h3 headings — they appear in the right TOC.</Callout>
    </DocLayout>
  )
}
```

## Components

| Component | Description |
|---|---|
| `DocLayout` | Wraps every page — breadcrumbs, progress bar, prev/next nav, right TOC |
| `Callout` | `note` / `tip` / `warning` / `danger` / `info` / `quote` highlight blocks |
| `CodeBlock` | Dark code block with syntax highlighting, copy button, optional `filename` prop |
| `Tabs` / `Tab` | Tabbed content panels — great for package manager commands |
| `DocTable` | Styled data table |
| `Badge` | Language and status inline badges |
| `Diagram` | Mermaid diagram (flowchart, sequence, state, etc.) |
| `Search` | Live search across all nav pages — built into the header, ⌘K / Ctrl+K |

## Project structure

```
src/
  framework/          ← doccraft engine — do not edit
    components/
      DocLayout.tsx   ← breadcrumbs, progress, TOC, prev/next
      Sidebar.tsx     ← collapsible left nav with toggle button
      Search.tsx      ← live search with keyboard nav
      TableOfContents.tsx
      ui/
        Badge.tsx
        Callout.tsx
        CodeBlock.tsx ← filename prop, syntax highlighting
        Diagram.tsx
        DocTable.tsx
        Tabs.tsx      ← Tabs + Tab components
    styles/
      globals.css
    index.ts          ← barrel export
    ThemeContext.tsx  ← useTheme() hook
  site.config.ts      ← EDIT: title, logo, github, version, editUrl
  nav.ts              ← EDIT: sidebar navigation
  pages/              ← EDIT: your content pages
  App.tsx             ← EDIT: register your routes
  main.tsx
```

## Features

- Light (warm white) and dark (earthy neutral) theme with toggle — persists via `localStorage`
- Collapsible sidebar with toggle button — state persisted in `localStorage`
- Breadcrumbs above page content derived from nav structure
- Live search across all pages — ⌘K / Ctrl+K, keyboard navigation, text highlighting
- Right-side on-page TOC with active section tracking (h2 + h3)
- "Edit this page" link — set `editUrl` in `site.config.ts`, pass `editPath` to `DocLayout`
- Reading progress bar
- Prev / Next page navigation
- Back to top button
- Mobile-friendly layout

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [React Router](https://reactrouter.com) for client-side routing
- [highlight.js](https://highlightjs.org) for syntax highlighting
- [Mermaid](https://mermaid.js.org) for diagrams
- Google Fonts: Space Grotesk · Outfit · JetBrains Mono

## License

MIT

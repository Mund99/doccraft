# doccraft

A clean, opinionated documentation site framework built with React + Vite + TypeScript.

Light/warm theme, dark mode, responsive sidebar, on-page TOC, and a complete set of documentation components — all ready to use for any project.

---

## Use this template

Click **"Use this template"** on GitHub to create a new repo, then:

```bash
npm install
npm run dev
```

## Customise for your project

Only three files need to change:

| File | What to edit |
|---|---|
| `src/site.config.ts` | Site title, logo, GitHub URL, version badge |
| `src/nav.ts` | Sidebar sections and page links |
| `src/App.tsx` | Import your pages and register routes |

Then write your pages in `src/pages/` using `DocLayout` as the wrapper:

```tsx
import DocLayout from '../framework/components/DocLayout'

export default function MyPage() {
  return (
    <DocLayout>
      <h1>My Page</h1>
      <p>Content goes here.</p>
    </DocLayout>
  )
}
```

## Components

| Component | Usage |
|---|---|
| `DocLayout` | Wraps every page — progress bar, prev/next nav, right TOC |
| `Callout` | note / tip / warning / danger / info / quote blocks |
| `CodeBlock` | Dark code block with copy button |
| `DocTable` | Styled data table |
| `Badge` | Language and status badges |
| `Diagram` | Mermaid flowchart diagrams |

## Project structure

```
src/
  framework/          ← doccraft engine — do not edit
    components/
      DocLayout.tsx
      Sidebar.tsx
      TableOfContents.tsx
      ui/  (Badge, Callout, CodeBlock, Diagram, DocTable)
    styles/
      globals.css
    index.ts
  site.config.ts      ← EDIT: title, logo, github, version
  nav.ts              ← EDIT: sidebar navigation
  pages/              ← EDIT: your content pages
  App.tsx             ← EDIT: register your routes
  main.tsx
```

## Features

- Light (warm white) and dark (earthy neutral) theme with toggle — persists via `localStorage`
- Responsive sidebar — auto-closes on mobile resize
- Right-side on-page TOC with active section tracking
- Reading progress bar
- Prev / Next page navigation
- Back to top button
- Mobile-friendly layout

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [React Router](https://reactrouter.com) for client-side routing
- [Mermaid](https://mermaid.js.org) for diagrams
- Google Fonts: Space Grotesk · Outfit · JetBrains Mono

## License

MIT

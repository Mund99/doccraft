import { DocLayout, Callout, CodeBlock, DocTable, Badge } from '../../framework'

export default function HowToUse() {
  return (
    <DocLayout>
      <h1>How to Use doccraft</h1>
      <div className="page-meta">
        <Badge type="tip" label="5 min setup" />
      </div>

      <p>
        doccraft is a GitHub template. You copy it once, configure three files, and you have
        a fully-featured documentation site. All the framework code stays untouched — you only
        ever edit the files outside <code>src/framework/</code>.
      </p>

      <h2>Step 1 — Create your project</h2>
      <p>There are two ways to get started. The <code>npx</code> route is faster.</p>

      <h3>Option A — npx (recommended)</h3>
      <p>
        One command scaffolds the project, sets your project name in <code>package.json</code>,
        initialises a fresh git repo, and runs <code>npm install</code> for you:
      </p>
      <CodeBlock language="bash">{`npx create-doccraft my-project-docs
cd my-project-docs
npm run dev`}</CodeBlock>

      <h3>Option B — GitHub template</h3>
      <p>
        Go to <a href="https://github.com/Mund99/doccraft" target="_blank" rel="noopener noreferrer">
          github.com/Mund99/doccraft
        </a> and click <strong>Use this template → Create a new repository</strong>.
        Then clone your new repo and install:
      </p>
      <CodeBlock language="bash">{`git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev`}</CodeBlock>

      <Callout type="tip" title="Dev server">
        The dev server starts at <code>http://localhost:5173</code> with hot reload.
        Every change you make to a page is reflected instantly.
      </Callout>

      <h2>Step 2 — Configure site.config.ts</h2>
      <p>
        This is the identity of your project — what shows in the header. Open{' '}
        <code>src/site.config.ts</code> and fill in your values:
      </p>
      <CodeBlock language="typescript">{`export const siteConfig = {
  title: 'My Project Docs',   // shown in the header
  logo: '🚀',                 // emoji or a short text logo
  github: 'https://github.com/you/your-project',  // optional
  version: 'v1.0.0',          // optional — shows as a badge
}`}</CodeBlock>

      <h2>Step 3 — Define your navigation</h2>
      <p>
        Open <code>src/nav.ts</code>. Each top-level item becomes a sidebar section header.
        Items with a <code>path</code> become clickable links. Items with <code>children</code>{' '}
        become collapsible groups.
      </p>
      <CodeBlock language="typescript">{`export const NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Getting Started',
    children: [
      { label: 'Introduction',  path: '/docs/introduction' },
      { label: 'Installation',  path: '/docs/installation' },
      { label: 'Configuration', path: '/docs/configuration' },
    ],
  },
  {
    label: 'Guides',
    children: [
      { label: 'Writing Pages', path: '/docs/writing-pages' },
      { label: 'Components',    path: '/docs/components' },
    ],
  },
]`}</CodeBlock>

      <Callout type="note" title="Prev / Next navigation">
        The prev/next buttons at the bottom of every page follow the order defined in{' '}
        <code>nav.ts</code>. Keep the order logical — it doubles as your reading order.
      </Callout>

      <h2>Step 4 — Write a page</h2>
      <p>
        Create a new <code>.tsx</code> file inside <code>src/pages/</code>. Every page wraps its
        content in <code>DocLayout</code>. The layout handles the progress bar, right-side TOC,
        and prev/next nav automatically.
      </p>
      <CodeBlock language="tsx">{`// src/pages/docs/Introduction.tsx
import { DocLayout, Callout } from '../../framework'

export default function Introduction() {
  return (
    <DocLayout>
      <h1>Introduction</h1>

      <p>Welcome to My Project — a tool for doing amazing things.</p>

      <h2>What it does</h2>
      <p>
        Explain the purpose here. The h2 heading above will appear
        automatically in the right-side table of contents.
      </p>

      <h2>Key concepts</h2>
      <p>Use h2 and h3 headings freely — they all show up in the TOC.</p>

      <h3>Concept A</h3>
      <p>Details about concept A.</p>

      <Callout type="tip" title="Quick tip">
        Use Callout for anything that deserves extra attention.
      </Callout>
    </DocLayout>
  )
}`}</CodeBlock>

      <h2>Step 5 — Register the route</h2>
      <p>
        Open <code>src/App.tsx</code> and add an import and a <code>&lt;Route&gt;</code> for
        each new page. The pattern is always the same:
      </p>
      <CodeBlock language="tsx">{`// 1. Add the import near the top of App.tsx
import Introduction from './pages/docs/Introduction'

// 2. Add the Route inside <Routes>
<Route path="/docs/introduction" element={<Introduction />} />`}</CodeBlock>

      <Callout type="warning" title="Path must match nav.ts">
        The <code>path</code> you register in <code>App.tsx</code> must be identical to the{' '}
        <code>path</code> value in <code>nav.ts</code>. A mismatch results in a 404.
      </Callout>

      <h2>Headings and the TOC</h2>
      <p>
        The right-side table of contents is fully automatic. It scans the rendered page for{' '}
        <code>h2</code> and <code>h3</code> elements and builds the list. The active section
        highlights as you scroll.
      </p>
      <DocTable
        headers={['Heading', 'Behaviour']}
        rows={[
          ['h1', 'Page title — not shown in TOC'],
          ['h2', 'Top-level TOC entry'],
          ['h3', 'Indented TOC entry under the nearest h2'],
          ['h4+', 'Not tracked in TOC'],
        ]}
      />
      <p>
        The TOC hides automatically on viewports narrower than 1200 px. On mobile, only the
        sidebar and main content are shown.
      </p>

      <h2>Available components</h2>
      <DocTable
        headers={['Component', 'What it does', 'Key props']}
        rows={[
          ['DocLayout', 'Page wrapper — use on every page', '—'],
          ['Callout', 'Highlighted notice block', 'type, title'],
          ['CodeBlock', 'Syntax-highlighted code block with copy', 'language, children'],
          ['DocTable', 'Styled data table', 'headers[ ], rows[ ][ ]'],
          ['Badge', 'Inline status / language badge', 'type, label'],
          ['Diagram', 'Mermaid flowchart or sequence diagram', 'children'],
        ]}
      />
      <p>
        See the <a href="/docs/showcase">Component Showcase</a> for live examples and copy-paste
        snippets for every component.
      </p>

      <h2>Deploying</h2>
      <p>
        Run <code>npm run build</code> — it outputs a static <code>dist/</code> folder.
        Deploy to any static host: Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.
      </p>
      <CodeBlock language="bash">{`npm run build
# → dist/ is ready to deploy`}</CodeBlock>

      <Callout type="note" title="Base path">
        If you deploy to a subdirectory (e.g. <code>https://you.github.io/your-repo/</code>),
        set <code>base</code> in <code>vite.config.ts</code>:{' '}
        <code>{`base: '/your-repo/'`}</code>
      </Callout>
    </DocLayout>
  )
}

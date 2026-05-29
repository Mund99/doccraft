import { Link } from 'react-router-dom'
import { DocLayout, DocTable, Callout, CodeBlock, Badge } from '../framework'

export default function HomePage() {
  return (
    <DocLayout>
      <h1>doccraft</h1>
      <div className="page-meta">
        <Badge type="active" label="open source" />
        <Badge type="ts" label="TypeScript" />
        <Badge type="js" label="React" />
      </div>

      <p>
        A clean, opinionated documentation site framework built with React + Vite + TypeScript.
        Clone it, configure three files, and you have a fully-featured docs site for any project.
      </p>

      <Callout type="tip" title="Get started in 2 minutes">
        <p>
          Click <strong>Use this template</strong> on GitHub, then:
        </p>
        <p><code>npm install && npm run dev</code></p>
      </Callout>

      <h2>What's included</h2>
      <DocTable
        headers={['Feature', 'Details']}
        rows={[
          ['Light & dark theme', 'Toggle persists via localStorage'],
          ['Collapsible sidebar', 'Toggle button on sidebar edge — state saved in localStorage'],
          ['Live search', 'Searches all nav pages — ⌘K / Ctrl+K, keyboard navigation'],
          ['Breadcrumbs', 'Auto-generated above page content from nav structure'],
          ['On-page TOC', 'Right-side table of contents, tracks h2 and h3'],
          ['Reading progress', 'Progress bar at the top of every page'],
          ['Prev / Next nav', 'Auto-generated from your nav.ts order'],
          ['Edit this page', 'Link to GitHub editor — set editUrl in site.config.ts'],
          ['Back to top', 'Smooth-scroll button appears after scrolling'],
          ['Mobile layout', 'Hamburger menu, hidden TOC, full-width content'],
        ]}
      />

      <h2>Three files to customise</h2>
      <p>Everything else in the framework is hands-off.</p>

      <h3>1. site.config.ts — your project identity</h3>
      <CodeBlock language="typescript">{`export const siteConfig = {
  title: 'My Project Docs',
  logo: '🚀',                  // emoji, or set logoUrl for an image
  github: 'https://github.com/you/your-project',
  version: 'v1.0.0',
  accentColor: '',             // optional: e.g. '#7c3aed'
  editUrl: '',                 // optional: base URL for Edit this page links
}`}</CodeBlock>

      <h3>2. nav.ts — sidebar navigation</h3>
      <CodeBlock language="typescript">{`export const NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Getting Started',
    children: [
      { label: 'Introduction', path: '/docs/introduction' },
      { label: 'Installation',  path: '/docs/installation' },
    ],
  },
]`}</CodeBlock>

      <h3>3. App.tsx — register your routes</h3>
      <CodeBlock language="tsx">{`import Introduction from './pages/docs/Introduction'

// inside <Routes>:
<Route path="/docs/introduction" element={<Introduction />} />`}</CodeBlock>

      <h2>Writing a page</h2>
      <p>
        Every page wraps its content in <code>DocLayout</code>. The layout handles the progress
        bar, prev/next navigation, and the right-side TOC automatically.
      </p>
      <CodeBlock language="tsx">{`import { DocLayout, Callout } from '../framework'

export default function MyPage() {
  return (
    <DocLayout>
      <h1>My Page</h1>
      <p>Body text goes here.</p>
      <Callout type="tip" title="Pro tip">
        Use h2 and h3 headings — they appear automatically in the right TOC.
      </Callout>
    </DocLayout>
  )
}`}</CodeBlock>

      <h2>Available components</h2>
      <DocTable
        headers={['Component', 'Usage']}
        rows={[
          ['DocLayout', 'Wrap every page — breadcrumbs, TOC, prev/next'],
          ['Callout', 'note, tip, warning, danger, info, quote'],
          ['CodeBlock', 'Syntax-highlighted code, copy button, filename label'],
          ['Tabs / Tab', 'Tabbed content panels'],
          ['DocTable', 'Styled data table'],
          ['Badge', 'Language / status badges'],
          ['Diagram', 'Mermaid flowcharts and sequence diagrams'],
        ]}
      />
      <CodeBlock language="tsx">{`import { DocLayout, Callout, CodeBlock, Tabs, Tab, DocTable, Badge, Diagram } from '../framework'`}</CodeBlock>

      <p>
        See the <Link to="/docs/showcase">Component Showcase</Link> for live examples
        and copy-paste code for every component.
      </p>

      <h2>Project structure</h2>
      <div className="file-tree">
        <span className="dir">src/</span>{'\n'}
        {'  '}<span className="dir">framework/</span>
        <span className="note">     ← doccraft engine, do not edit</span>{'\n'}
        {'  '}<span className="entry">site.config.ts</span>
        <span className="note"> ← title, logo, github, accentColor…</span>{'\n'}
        {'  '}<span className="entry">nav.ts</span>
        <span className="note">          ← sidebar structure</span>{'\n'}
        {'  '}<span className="dir">pages/</span>
        <span className="note">          ← your content goes here</span>{'\n'}
        {'  '}<span className="entry">App.tsx</span>
        <span className="note">         ← register your routes</span>
      </div>

      <Callout type="note" title="Framework files">
        <p>
          Everything inside <code>src/framework/</code> is the doccraft engine. Don't edit it —
          that's the part you carry from project to project unchanged.
        </p>
      </Callout>
    </DocLayout>
  )
}

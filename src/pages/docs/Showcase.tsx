import { DocLayout, Callout, CodeBlock, Badge, DocTable, Diagram, Tabs, Tab } from '../../framework'

export default function Showcase() {
  return (
    <DocLayout>
      <h1>Component Showcase</h1>
      <div className="page-meta">
        <Badge type="active" label="reference" />
      </div>

      <p>
        Every component available in doccraft, shown with live examples and the
        code to produce them. Copy-paste into your own pages.
      </p>

      <h2>Callout</h2>
      <p>Six semantic variants: <code>note</code>, <code>tip</code>, <code>warning</code>, <code>danger</code>, <code>info</code>, <code>quote</code>.</p>

      <Callout type="note" title="Note">This is a note callout — background context or clarification.</Callout>
      <Callout type="tip" title="Tip">This is a tip callout — helpful shortcut or best practice.</Callout>
      <Callout type="warning" title="Warning">This is a warning callout — potential gotcha, won't break things but watch out.</Callout>
      <Callout type="danger" title="Danger">This is a danger callout — will break things if ignored.</Callout>
      <Callout type="info" title="Info">This is an info callout — neutral informational aside.</Callout>
      <Callout type="quote" title="Quote">This is a quote callout — highlight a quote or key statement.</Callout>

      <CodeBlock language="tsx">{`<Callout type="tip" title="My tip">
  Content goes here — can contain <code>inline code</code> and <strong>bold</strong>.
</Callout>`}</CodeBlock>

      <h2>Code Block</h2>
      <p>Dark code block with syntax highlighting and one-click copy. Optional <code>filename</code> prop labels the file.</p>
      <CodeBlock language="typescript" filename="src/greet.ts">{`function greet(name: string): string {
  return \`Hello, \${name}!\`
}

console.log(greet('world'))  // Hello, world!`}</CodeBlock>

      <CodeBlock language="tsx">{`<CodeBlock language="typescript" filename="src/greet.ts">
  {yourCodeString}
</CodeBlock>`}</CodeBlock>

      <h2>Tabs</h2>
      <p>Tabbed content panels — great for package manager commands, OS-specific instructions, or code in multiple languages.</p>
      <Tabs>
        <Tab label="npm">
          <CodeBlock language="bash">npm install doccraft</CodeBlock>
        </Tab>
        <Tab label="yarn">
          <CodeBlock language="bash">yarn add doccraft</CodeBlock>
        </Tab>
        <Tab label="pnpm">
          <CodeBlock language="bash">pnpm add doccraft</CodeBlock>
        </Tab>
      </Tabs>

      <CodeBlock language="tsx">{`<Tabs>
  <Tab label="npm">
    <CodeBlock language="bash">npm install my-pkg</CodeBlock>
  </Tab>
  <Tab label="yarn">
    <CodeBlock language="bash">yarn add my-pkg</CodeBlock>
  </Tab>
</Tabs>`}</CodeBlock>

      <h2>Badge</h2>
      <p>Inline status and language badges. Use inside a <code>page-meta</code> div at the top of a page.</p>
      <div className="page-meta">
        <Badge type="python" />
        <Badge type="ts" />
        <Badge type="js" />
        <Badge type="electron" />
        <Badge type="active" label="stable" />
        <Badge type="archived" label="deprecated" />
      </div>

      <CodeBlock language="tsx">{`<div className="page-meta">
  <Badge type="python" />
  <Badge type="ts" />
  <Badge type="active" label="stable" />
  <Badge type="archived" label="deprecated" />
</div>`}</CodeBlock>

      <DocTable
        headers={['type', 'Default label', 'Use for']}
        rows={[
          ['python',   'Python',     'Python code or project'],
          ['ts',       'TypeScript', 'TypeScript'],
          ['js',       'JavaScript', 'JavaScript'],
          ['electron', 'Electron',   'Desktop / Electron apps'],
          ['active',   '—',          'Status: live, stable, current'],
          ['archived', '—',          'Status: deprecated, legacy'],
        ]}
      />

      <h2>Table</h2>
      <p>Styled data table with hover rows, code-formatted cells, and horizontal scroll on small screens.</p>
      <DocTable
        headers={['Name', 'Type', 'Default', 'Description']}
        rows={[
          ['type',     'string',    '—',      'Semantic variant of the callout'],
          ['title',    'string',    'auto',   'Override the auto-capitalised title'],
          ['children', 'ReactNode', '—',      'Content rendered inside the callout'],
        ]}
      />

      <CodeBlock language="tsx">{`<DocTable
  headers={['Name', 'Type', 'Description']}
  rows={[
    ['title', 'string', 'The page title'],
    ['path',  'string', 'The route path'],
  ]}
/>`}</CodeBlock>

      <h2>Diagram</h2>
      <p>
        Mermaid flowcharts rendered inline. Supports <code>flowchart</code>,{' '}
        <code>sequenceDiagram</code>, <code>graph</code>, and other Mermaid diagram types.
        Diagrams re-render automatically when the theme switches between light and dark.
      </p>
      <Diagram>{`flowchart LR
  A[User] --> B[Your App]
  B --> C[doccraft]
  C --> D[Great Docs]`}</Diagram>

      <CodeBlock language="tsx">{`<Diagram>{\`flowchart LR
  A[Input] --> B[Process] --> C[Output]
\`}</Diagram>`}</CodeBlock>

      <h3>Multi-line node labels</h3>
      <p>
        Use <code>{"<br/>"}</code> inside quoted node labels to wrap text. Long labels render
        correctly at any width — no clipping.
      </p>
      <Diagram>{`flowchart TD
  A["Token embedding<br/>45 positions"] --> SUM["Sum all inputs"]
  B["Position embedding<br/>45 positions"] --> SUM
  C["Guessed letters<br/>26-dim binary"] --> SUM
  SUM --> ENC["Transformer encoder<br/>pre-norm · GELU"]
  ENC --> OUT["26 letter logits"]`}</Diagram>

      <CodeBlock language="tsx">{`<Diagram>{\`flowchart TD
  A["Multi-line<br/>node label"] --> B["Another<br/>node"]
\`}</Diagram>`}</CodeBlock>

      <h2>Definition List</h2>
      <p>
        A key-value list rendered with monospace keys and body text values. Good for glossaries,
        config references, or short term definitions.
      </p>
      <ul className="def-list">
        <li>
          <span className="def-key">d_model</span>
          <span className="def-val">Hidden dimension of the Transformer. Doubling it roughly 4× the parameter count.</span>
        </li>
        <li>
          <span className="def-key">n_heads</span>
          <span className="def-val">Number of attention heads. Must evenly divide d_model.</span>
        </li>
        <li>
          <span className="def-key">n_layers</span>
          <span className="def-val">Depth of the Transformer encoder stack.</span>
        </li>
      </ul>

      <CodeBlock language="tsx">{`<ul className="def-list">
  <li>
    <span className="def-key">key</span>
    <span className="def-val">Value text goes here.</span>
  </li>
  <li>
    <span className="def-key">another-key</span>
    <span className="def-val">Another description.</span>
  </li>
</ul>`}</CodeBlock>

      <h2>File Tree</h2>
      <p>
        A styled directory listing. Use the CSS classes <code>dir</code>, <code>file</code>,{' '}
        <code>entry</code> (highlighted), and <code>note</code> (italic comment) to annotate entries.
      </p>
      <div className="file-tree">
        <span className="dir">src/</span>{'\n'}
        {'  '}<span className="dir">framework/</span>
        <span className="note">     ← engine, do not edit</span>{'\n'}
        {'  '}<span className="entry">site.config.ts</span>
        <span className="note"> ← title, logo, github…</span>{'\n'}
        {'  '}<span className="entry">nav.ts</span>
        <span className="note">          ← sidebar structure</span>{'\n'}
        {'  '}<span className="dir">pages/</span>
        <span className="note">          ← your content here</span>{'\n'}
        {'    '}<span className="file">HomePage.tsx</span>{'\n'}
        {'    '}<span className="entry">YourPage.tsx</span>
        <span className="note">   ← add yours here</span>{'\n'}
        {'  '}<span className="entry">App.tsx</span>
        <span className="note">         ← register your routes</span>
      </div>

      <CodeBlock language="tsx">{`<div className="file-tree">
  <span className="dir">src/</span>{'\n'}
  {'  '}<span className="entry">site.config.ts</span>
  <span className="note"> ← edit this</span>{'\n'}
  {'  '}<span className="file">App.tsx</span>
</div>`}</CodeBlock>

      <h2>Layout features</h2>
      <p>
        These features are built into <code>DocLayout</code> and require no extra components —
        they activate automatically.
      </p>

      <h3>Breadcrumbs</h3>
      <p>
        When a page is nested under a nav section (i.e. it has a parent in <code>nav.ts</code>),
        a breadcrumb appears above the page title automatically. No props needed.
      </p>
      <Callout type="note" title="You're looking at one now">
        The breadcrumb at the top of this page — <strong>Framework › Component Showcase</strong> —
        is generated from the nav structure in <code>nav.ts</code>. Top-level pages (like Home) show no breadcrumb.
      </Callout>

      <h3>Edit this page link</h3>
      <p>
        Set <code>editUrl</code> in <code>site.config.ts</code> to the base URL of your
        GitHub editor, then pass <code>editPath</code> to <code>DocLayout</code>. A pencil icon
        link appears below the page content.
      </p>
      <CodeBlock language="typescript" filename="site.config.ts">{`editUrl: 'https://github.com/you/repo/edit/main/src'`}</CodeBlock>
      <CodeBlock language="tsx">{`// In your page:
<DocLayout editPath="pages/docs/MyPage.tsx">
  ...
</DocLayout>
// Renders: https://github.com/you/repo/edit/main/src/pages/docs/MyPage.tsx`}</CodeBlock>

      <h3>Sidebar collapse</h3>
      <p>
        The hamburger button in the top-left of the header toggles the sidebar on all screen
        sizes. On desktop, clicking it completely hides or shows the sidebar — no thin rail.
        On mobile, it opens and closes the slide-in drawer. State is saved to{' '}
        <code>localStorage</code> and restored on reload.
      </p>

      <h3>Back to top</h3>
      <p>
        A scroll-to-top button appears in the bottom-right corner after the reader scrolls
        past 320 px. It uses smooth scroll and disappears automatically when the page is near
        the top. No setup needed — it's part of <code>DocLayout</code>.
      </p>

      <h2>Typography</h2>
      <h3>Heading 3</h3>
      <p>
        Body text with <strong>bold</strong>, <em>italic</em>, and{' '}
        <code>inline code</code>. Links look like{' '}
        <a href="#">this anchor</a>.
      </p>
      <blockquote>
        A blockquote for notable passages or quotes from external sources.
      </blockquote>
      <ul>
        <li>Unordered list item one</li>
        <li>Unordered list item two</li>
        <li>Unordered list item three</li>
      </ul>
    </DocLayout>
  )
}

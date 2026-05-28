import { DocLayout, Callout, CodeBlock, Badge, DocTable, Diagram } from '../../framework'

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

      <Callout type="note" title="Note">This is a note callout.</Callout>
      <Callout type="tip" title="Tip">This is a tip callout.</Callout>
      <Callout type="warning" title="Warning">This is a warning callout.</Callout>
      <Callout type="danger" title="Danger">This is a danger callout.</Callout>
      <Callout type="info" title="Info">This is an info callout.</Callout>
      <Callout type="quote" title="Quote">This is a quote callout.</Callout>

      <CodeBlock language="tsx">{`<Callout type="tip" title="My tip">
  Content goes here.
</Callout>`}</CodeBlock>

      <h2>Code Block</h2>
      <p>Dark code block with a filename label and one-click copy.</p>
      <CodeBlock language="typescript">{`function greet(name: string): string {
  return \`Hello, \${name}!\`
}

console.log(greet('world'))  // Hello, world!`}</CodeBlock>

      <CodeBlock language="tsx">{`<CodeBlock language="typescript">
  {yourCodeString}
</CodeBlock>`}</CodeBlock>

      <h2>Badge</h2>
      <p>Inline status and language badges.</p>
      <div className="page-meta">
        <Badge type="python" />
        <Badge type="ts" />
        <Badge type="js" />
        <Badge type="electron" />
        <Badge type="active" label="stable" />
        <Badge type="archived" label="deprecated" />
      </div>

      <CodeBlock language="tsx">{`<Badge type="python" />
<Badge type="ts" />
<Badge type="active" label="stable" />`}</CodeBlock>

      <h2>Table</h2>
      <DocTable
        headers={['Name', 'Type', 'Default', 'Description']}
        rows={[
          ['type', 'string', '—', 'Semantic variant of the callout'],
          ['title', 'string', 'auto', 'Override the auto-capitalised title'],
          ['children', 'ReactNode', '—', 'Content rendered inside the callout'],
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
      <p>Mermaid flowcharts rendered inline.</p>
      <Diagram>{`flowchart LR
  A[User] --> B[Your App]
  B --> C[doccraft]
  C --> D[Great Docs]`}</Diagram>

      <CodeBlock language="tsx">{`<Diagram>{\`flowchart LR
  A[Input] --> B[Process] --> C[Output]
\`}</Diagram>`}</CodeBlock>

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

      <h2>File Tree</h2>
      <div className="file-tree">
        <span className="dir">src/</span>{'\n'}
        {'  '}<span className="dir">pages/</span>{'\n'}
        {'    '}<span className="file">HomePage.tsx</span>{'\n'}
        {'    '}<span className="entry">YourPage.tsx</span>
        {'  '}<span className="note">← add yours here</span>{'\n'}
        {'  '}<span className="entry">nav.ts</span>
      </div>
    </DocLayout>
  )
}

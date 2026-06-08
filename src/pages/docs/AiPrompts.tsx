import { DocLayout, Callout, CodeBlock, Badge, DocTable } from '../../framework'

export default function AiPrompts() {
  return (
    <DocLayout>
      <h1>AI Prompt Templates</h1>
      <div className="page-meta">
        <Badge type="active" label="AI native" />
      </div>

      <p>
        doccraft is designed to work naturally with AI assistants. These ready-made prompt
        templates give any AI (Claude, ChatGPT, Gemini, etc.) the context it needs to write
        doccraft pages, add navigation, and generate components — so you can focus on what to
        say, not how to structure it.
      </p>

      <Callout type="tip" title="How to use these prompts">
        Copy a prompt, paste it into your AI chat, then fill in the parts marked in square
        brackets. For best results, always start with the <strong>System Context</strong>{' '}
        prompt so the AI knows what framework it's working with.
      </Callout>

      <h2>System Context Prompt</h2>
      <p>
        Paste this once at the start of your AI session. It gives the AI a complete picture
        of the doccraft framework so every follow-up request is accurate.
      </p>
      <CodeBlock language="bash">{`You are helping me write documentation using doccraft — a React + Vite + TypeScript
documentation site framework.

FRAMEWORK RULES:
- All pages live in src/pages/ and are .tsx files
- Import ALL components from the barrel: import { DocLayout, Callout, CodeBlock, DocTable, Badge, Diagram, Tabs, Tab } from '../../framework'
  (use '../framework' for pages directly in src/pages/; use '../../framework' for pages in src/pages/docs/)
- Every page wraps content in <DocLayout>
- Use h1 for the page title, h2 for sections, h3 for subsections
- h2 and h3 headings auto-populate the right-side table of contents
- Never use inline styles — all styling is via CSS classes
- No external UI libraries allowed

AVAILABLE COMPONENTS (all imported from '../../framework'):
- DocLayout      props: editPath (optional string) — wraps every page; handles breadcrumbs, TOC, prev/next, edit link
- Callout        type: "note" | "tip" | "warning" | "danger" | "info" | "quote"
                 props: type, title (optional), children
- CodeBlock      props: language (ts/tsx/js/python/bash/json/yaml/css/html), filename (optional), children (string)
- Tabs / Tab     <Tabs><Tab label="npm">…</Tab><Tab label="yarn">…</Tab></Tabs>
- DocTable       props: headers: string[], rows: string[][]
- Badge          props: type: "python"|"ts"|"js"|"electron"|"active"|"archived", label (optional string)
- Diagram        children: Mermaid diagram string — use as <Diagram>{\`flowchart TD...\`}</Diagram>
                 supports <br/> in quoted node labels for multi-line text

FILE STRUCTURE:
src/
  framework/        ← engine, never edit
  site.config.ts    ← title, logo, github, version
  nav.ts            ← sidebar NavItem[] array
  App.tsx           ← React Router <Route> registrations
  pages/            ← content pages go here

BUILT-IN LAYOUT FEATURES (no extra components needed):
- Breadcrumbs    auto-generated from nav.ts when page is nested under a section
- Sidebar collapse  toggle on sidebar edge, state saved in localStorage
- Edit this page    set editUrl in site.config.ts + pass editPath to DocLayout
- Back to top    appears after scrolling 320px, built into DocLayout
- Prev / Next nav   auto-generated from nav.ts order

When I ask you to write a page, return only the complete .tsx file contents.
When I ask for nav entries, return the NavItem objects to add to nav.ts.
When I ask for routes, return the import + <Route> lines for App.tsx.`}</CodeBlock>

      <h2>Write a new page</h2>
      <p>
        Use this to generate a complete, ready-to-save doccraft page for any topic.
      </p>
      <CodeBlock language="bash">{`Write a complete doccraft page for the topic: [YOUR TOPIC]

Requirements:
- File path: src/pages/docs/[PageName].tsx
- Use h2 for each major section (these appear in the TOC)
- Use h3 for subsections where helpful
- Add a Callout wherever there is an important note, tip, or warning
- Use CodeBlock for any code examples — set the correct language prop
- Use DocTable for any comparison tables or structured data
- End the page with a brief summary or next-steps paragraph

Return the complete .tsx file, ready to save.`}</CodeBlock>

      <h2>Add navigation entries</h2>
      <p>
        After writing new pages, use this to get the exact nav and route changes.
      </p>
      <CodeBlock language="bash">{`I've added the following pages to my doccraft site:

[LIST YOUR PAGES AND FILE PATHS, e.g.:]
- Introduction     → src/pages/docs/Introduction.tsx   → /docs/introduction
- Installation     → src/pages/docs/Installation.tsx   → /docs/installation
- Configuration    → src/pages/docs/Configuration.tsx  → /docs/configuration

Give me:
1. The NavItem entries to add to nav.ts (grouped under a section label if appropriate)
2. The import statements and <Route> lines to add to App.tsx`}</CodeBlock>

      <h2>Generate a Mermaid diagram</h2>
      <p>
        Use this to get a Mermaid chart string you can drop straight into the{' '}
        <code>Diagram</code> component.
      </p>
      <CodeBlock language="bash">{`Write a Mermaid diagram for: [YOUR PROCESS / ARCHITECTURE / FLOW]

Use flowchart TD (top-down) unless a left-right layout makes more sense.
Keep node labels short (under 5 words each).
Group related nodes into subgraphs if there are more than 6 nodes.

Return only the raw Mermaid syntax (no JSX, no markdown fences) so I can
paste it directly into:

<Diagram>{\`[paste here]\`}</Diagram>`}</CodeBlock>

      <h2>Improve an existing page</h2>
      <p>
        Paste your current page and let the AI restructure, expand, or polish it.
      </p>
      <CodeBlock language="bash">{`Here is an existing doccraft page:

[PASTE YOUR .tsx FILE CONTENTS]

Please improve it by:
- [ ] Adding clearer section headings (h2/h3) where content is dense
- [ ] Wrapping important notes in <Callout> components
- [ ] Adding a DocTable for any lists that have two or more columns of data
- [ ] Making the intro paragraph more concise (under 3 sentences)
- [ ] Any other improvements you see fit

Return the complete updated .tsx file.`}</CodeBlock>

      <h2>Write a full documentation set</h2>
      <p>
        Starting from scratch? Use this to plan and generate a complete docs structure
        for your project in one shot.
      </p>
      <CodeBlock language="bash">{`I'm documenting a project called [PROJECT NAME].

Project summary: [1-2 sentences about what the project does]

Please:
1. Suggest a documentation structure (sections and pages) that covers:
   - What it is and why it exists
   - Getting started / installation
   - Core concepts
   - API or usage reference
   - At least one guide or tutorial

2. Write the nav.ts NAV array for that structure

3. Write the first page — the Introduction — as a complete doccraft .tsx file

Keep each page focused on one topic. Use h2 headings generously.`}</CodeBlock>

      <h2>Reference — component cheat sheet</h2>
      <p>
        A quick reference you can append to any prompt if the AI needs a reminder of
        component syntax.
      </p>
      <CodeBlock language="tsx">{`// Callout
<Callout type="tip" title="Optional heading">
  Content goes here — can contain <code>inline code</code> and <strong>bold</strong>.
</Callout>

// CodeBlock
<CodeBlock language="typescript">
  {/* put code string here as template literal */}
</CodeBlock>

// DocTable
<DocTable
  headers={['Column A', 'Column B', 'Column C']}
  rows={[
    ['Row 1A', 'Row 1B', 'Row 1C'],
    ['Row 2A', 'Row 2B', 'Row 2C'],
  ]}
/>

// Badge  (inline, used in page-meta div)
<div className="page-meta">
  <Badge type="active" label="stable" />
  <Badge type="archived" label="deprecated" />
  <Badge type="python" />
  <Badge type="ts" />
  <Badge type="js" />
  <Badge type="electron" />
</div>

// Tabs
<Tabs>
  <Tab label="npm"><CodeBlock language="bash">npm install my-pkg</CodeBlock></Tab>
  <Tab label="yarn"><CodeBlock language="bash">yarn add my-pkg</CodeBlock></Tab>
</Tabs>

// Diagram (supports <br/> in quoted labels for multi-line nodes)
<Diagram>{\`
flowchart TD
  A[Start] --> B{Decision}
  B -- Yes --> C["Action<br/>with detail"]
  B -- No  --> D[End]
\`}</Diagram>`}</CodeBlock>

      <DocTable
        headers={['Callout type', 'When to use']}
        rows={[
          ['note', 'Background info or context'],
          ['tip', 'Helpful shortcut or best practice'],
          ['warning', 'Potential gotcha — won\'t break things but watch out'],
          ['danger', 'Will break things if ignored'],
          ['info', 'Neutral informational aside'],
          ['quote', 'Highlight a quote or key statement'],
        ]}
      />
      <DocTable
        headers={['Badge type', 'Default label', 'Use for']}
        rows={[
          ['python',   'Python',     'Python code or project'],
          ['ts',       'TypeScript', 'TypeScript'],
          ['js',       'JavaScript', 'JavaScript'],
          ['electron', 'Electron',   'Desktop / Electron'],
          ['active',   '—',          'Stable, live, current'],
          ['archived', '—',          'Deprecated, legacy'],
        ]}
      />

      <Callout type="info" title="AI-native design">
        doccraft pages are plain TSX — no custom markup language, no hidden metadata. This
        means any AI can read, understand, and modify your documentation files without special
        tooling. The structure you see is the structure the AI sees.
      </Callout>
    </DocLayout>
  )
}

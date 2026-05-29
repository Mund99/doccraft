# Contributing to doccraft

Thank you for your interest in contributing! This guide covers everything you need to know to submit a great pull request.

## Ways to contribute

- **Bug reports** — something not working as expected
- **Feature requests** — ideas for new components or framework improvements
- **Bug fixes** — pick up an open issue and submit a PR
- **New components** — additions to the `src/framework/components/ui/` folder
- **CSS / design improvements** — updates to `src/framework/styles/globals.css`
- **Documentation** — improvements to README, CONTRIBUTING, or the showcase page

## Local development

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/<your-username>/doccraft.git
cd doccraft
npm install
npm run dev
```

The dev server starts at `http://localhost:5175`.

Run a production build before opening a PR to confirm zero TypeScript errors:

```bash
npm run build
```

## Project structure

```
src/
  framework/          ← the doccraft engine — shared by every project
    components/
      DocLayout.tsx   ← page wrapper: breadcrumbs, TOC, prev/next, progress
      Sidebar.tsx     ← collapsible left nav sidebar
      Search.tsx      ← ⌘K live search
      TableOfContents.tsx
      ui/
        Badge.tsx
        Callout.tsx
        CodeBlock.tsx ← syntax-highlighted, filename prop, copy button
        Diagram.tsx   ← Mermaid diagrams
        DocTable.tsx
        Tabs.tsx      ← tabbed content panels
    styles/
      globals.css     ← full design system + dark mode tokens
    index.ts          ← barrel export (all public API)
    ThemeContext.tsx  ← useTheme() hook
  site.config.ts      ← template: title, logo, github, editUrl
  nav.ts              ← template: sidebar navigation
  pages/              ← template: example content pages
  App.tsx             ← template: route registration
  main.tsx
```

**The rule:** everything inside `src/framework/` is the shared engine. Changes here affect every doccraft project. Everything outside (`pages/`, `App.tsx`, `site.config.ts`, `nav.ts`) is template content that users customise — treat it as documentation, not production code.

## Commit message format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body — explain *why*, not *what*]
```

**Types:** `feat` · `fix` · `docs` · `style` · `refactor` · `chore`  
**Scope** (optional): component name or area, e.g. `CodeBlock`, `sidebar`, `css`

**Examples:**
```
feat(Tabs): add tabbed content component with keyboard support
fix(Sidebar): preserve collapsed state on mobile open/close
docs: add editUrl field to site.config guide
chore: upgrade highlight.js to v11.10
```

Keep the subject line under 72 characters. Use the body for context when the reason isn't obvious.

## What NOT to change

Please do not modify:
- `vite.config.ts` — base path is set specifically for the GitHub Pages demo
- `.github/workflows/deploy.yml` — CI/CD pipeline for the live demo
- `public/404.html` and the `index.html` recovery script — SPA routing hack for GitHub Pages
- `create-doccraft/` — separate npm package; changes need their own release

If your contribution genuinely requires touching these files, mention it clearly in the PR description and explain why.

## Submitting a pull request

1. Fork the repo on GitHub
2. Make your changes on a branch in your fork
3. Run `npm run build` — zero TypeScript errors required
4. Open a PR against `main` with a short description of what changed and why

**PR review expectations:**
- All new components need CSS in both light and dark mode
- Keep PRs focused — one feature or fix per PR makes review much easier
- You may be asked to add a showcase example or adjust code style

## Adding a new component

1. Create `src/framework/components/ui/YourComponent.tsx`
2. Export it from `src/framework/index.ts` (barrel export)
3. Add CSS in `src/framework/styles/globals.css` — include both light and dark mode
4. Add a live example to `src/pages/docs/Showcase.tsx`
5. Document it in `README.md` and `public/llms.txt`
6. Update the component count / list in `CONTRIBUTING.md` if applicable

## Code style

- **TypeScript** — no `any`, use proper types and interfaces
- **Functional components** only — no class components
- **CSS custom properties** — `var(--token)` everywhere, never hardcode colours
- **Dark mode** — add `[data-theme="dark"]` overrides in the same section as the light styles
- **No external UI libraries** — the framework has zero runtime dependencies beyond what's in `package.json`
- **Exports** — always use named exports from `index.ts`; default exports are fine inside component files
- **Import paths** — pages import from `'../framework'` or `'../../framework'`; never deep-import individual files

## Reporting a bug

Open a [GitHub issue](https://github.com/Mund99/doccraft/issues) with:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser / OS / Node version if relevant

## Questions

Open a [GitHub Discussion](https://github.com/Mund99/doccraft/discussions) for anything that isn't a bug or feature request.

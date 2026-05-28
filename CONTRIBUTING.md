# Contributing to doccraft

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Ways to contribute

- **Bug reports** — something not working as expected
- **Feature requests** — ideas for new components or framework improvements
- **Bug fixes** — pick up an open issue and submit a PR
- **New components** — additions to the `src/framework/components/ui/` folder
- **CSS / design improvements** — updates to `src/framework/styles/globals.css`
- **Documentation** — improvements to README, CONTRIBUTING, or the showcase page

## Local development

```bash
git clone https://github.com/Mund99/doccraft.git
cd doccraft
npm install
npm run dev
```

The dev server starts at `http://localhost:5175`.

## Project structure

```
src/
  framework/          ← the doccraft engine (components + CSS)
    components/
      DocLayout.tsx   ← page wrapper with TOC, prev/next, progress
      Sidebar.tsx     ← left nav sidebar
      TableOfContents.tsx
      ui/
        Badge.tsx
        Callout.tsx
        CodeBlock.tsx
        Diagram.tsx
        DocTable.tsx
    styles/
      globals.css     ← full design system + dark mode tokens
    index.ts          ← barrel export
  site.config.ts      ← template: project identity
  nav.ts              ← template: sidebar navigation
  pages/              ← template: example content pages
  App.tsx             ← template: route registration
  main.tsx
```

Everything inside `src/framework/` is the shared engine. Changes here affect every project that uses doccraft. Everything outside is template/example content.

## Submitting a pull request

1. Fork the repo and create a branch: `git checkout -b feat/my-feature`
2. Make your changes
3. Run `npm run build` to confirm it compiles with zero errors
4. Commit with a clear message describing what and why
5. Open a PR against `main` with a short description

## Adding a new component

1. Create the component in `src/framework/components/ui/YourComponent.tsx`
2. Export it from `src/framework/index.ts`
3. Add CSS classes to `src/framework/styles/globals.css` — include both light and dark mode styles
4. Add a live example to `src/pages/docs/Showcase.tsx`
5. Document it in the `README.md` components table

## Code style

- TypeScript — no `any`, use proper types
- Follow the existing component patterns (functional components, named exports)
- CSS uses custom properties (`var(--token)`) — never hardcode colours
- Dark mode styles go in `[data-theme="dark"]` blocks at the bottom of the relevant section
- No external UI libraries — keep the framework dependency-free beyond what's in `package.json`

## Reporting a bug

Open a [GitHub issue](https://github.com/Mund99/doccraft/issues) with:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser / OS if it's a visual issue

## Questions

Open a [GitHub Discussion](https://github.com/Mund99/doccraft/discussions) for anything that isn't a bug or feature request.

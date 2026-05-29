// ─────────────────────────────────────────────────────────
//  site.config.ts  ←  EDIT THIS FILE FOR EACH NEW PROJECT
// ─────────────────────────────────────────────────────────

export const siteConfig = {
  /** Displayed in the browser tab and header */
  title: 'doccraft',

  /** Emoji or short text shown in the header logo box */
  logo: '⚡',

  /** Optional: URL to an image used as the logo (replaces the emoji box).
   *  Accepts any web URL or local asset (e.g. '/logo.png' placed in public/).
   *  Recommended size: 28×28 px or a square SVG.
   */
  logoUrl: '',

  /** Optional: links a GitHub icon in the header */
  github: 'https://github.com/Mund99/doccraft',

  /** Optional: version badge shown next to the title */
  version: '',

  /** Optional: override the brand / accent colour (e.g. '#7c3aed').
   *  Applies to links, active nav items, buttons, and the logo box gradient.
   *  Leave empty to use the default blue.
   */
  accentColor: '',

  /** Optional: base URL for "Edit on GitHub" links.
   *  Example: 'https://github.com/username/repo/edit/main/src'
   *  Then pass editPath to DocLayout: <DocLayout editPath="pages/docs/MyPage.tsx">
   */
  editUrl: '',
}

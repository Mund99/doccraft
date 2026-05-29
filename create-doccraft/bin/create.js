#!/usr/bin/env node
// create-doccraft — scaffold a new doccraft documentation site
// Usage: npx create-doccraft <project-name>

import { execSync }                                    from 'child_process'
import { existsSync, rmSync, readFileSync, writeFileSync } from 'fs'
import { resolve, join }                               from 'path'

// ── Helpers ────────────────────────────────────────────────────────────────

const RESET  = '\x1b[0m'
const BOLD   = '\x1b[1m'
const CYAN   = '\x1b[36m'
const GREEN  = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RED    = '\x1b[31m'
const DIM    = '\x1b[2m'

function log(msg)    { process.stdout.write(msg + '\n') }
function info(msg)   { log(`${CYAN}  ${msg}${RESET}`) }
function success(msg){ log(`${GREEN}  ✓ ${msg}${RESET}`) }
function warn(msg)   { log(`${YELLOW}  ! ${msg}${RESET}`) }
function fatal(msg)  { log(`\n${RED}  ✗ ${msg}${RESET}\n`); process.exit(1) }
function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, FORCE_COLOR: '1' } })
}

// ── Node version check ─────────────────────────────────────────────────────

const [major, minor] = process.versions.node.split('.').map(Number)
if (major < 20 || (major === 20 && minor < 19)) {
  fatal(`Node.js 20.19 or higher is required (you have v${process.versions.node}).\nDownload the latest LTS from https://nodejs.org`)
}

// ── Resolve project name ───────────────────────────────────────────────────

const arg = process.argv[2]

if (!arg || arg.startsWith('--')) {
  log(`
${BOLD}create-doccraft${RESET}

  Usage:
    ${CYAN}npx create-doccraft${RESET} ${YELLOW}<project-name>${RESET}

  Example:
    ${CYAN}npx create-doccraft${RESET} ${YELLOW}my-project-docs${RESET}
`)
  process.exit(0)
}

const projectName = arg
const targetDir   = resolve(process.cwd(), projectName)

// ── Pre-flight checks ──────────────────────────────────────────────────────

if (existsSync(targetDir)) {
  fatal(`Directory "${projectName}" already exists. Choose a different name or delete the folder first.`)
}

// Check git is available
try { execSync('git --version', { stdio: 'ignore' }) }
catch { fatal('git is required but was not found. Please install git and try again.') }

// ── Banner ─────────────────────────────────────────────────────────────────

log(`
${BOLD}  doccraft${RESET} ${DIM}— React documentation site framework${RESET}
  ─────────────────────────────────────────
  Creating: ${CYAN}${projectName}${RESET}
`)

// ── Clone template ─────────────────────────────────────────────────────────

info('Cloning template from GitHub…')
try {
  run(
    `git clone --depth=1 https://github.com/Mund99/doccraft.git "${targetDir}"`,
    process.cwd()
  )
} catch {
  fatal('Could not clone the doccraft template. Check your internet connection and try again.')
}

// ── Remove the .git directory (fresh start for the new project) ────────────

rmSync(join(targetDir, '.git'), { recursive: true, force: true })
success('Cloned template')

// ── Remove the create-doccraft sub-package (not needed in new projects) ────

const createPkgDir = join(targetDir, 'create-doccraft')
if (existsSync(createPkgDir)) {
  rmSync(createPkgDir, { recursive: true, force: true })
}

// ── Also remove the dist/ folder if it was committed ──────────────────────

const distDir = join(targetDir, 'dist')
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true })
}

// ── Reset site.config.ts to blank placeholders ────────────────────────────
// The template has real values (title, github, etc.) for the live demo site.
// New projects should start with empty/placeholder values.

const siteConfigPath = join(targetDir, 'src', 'site.config.ts')
if (existsSync(siteConfigPath)) {
  let sc = readFileSync(siteConfigPath, 'utf8')
  // Reset title and logo to generic placeholders
  sc = sc.replace(/title:\s*'[^']*'/, "title: 'My Project Docs'")
  sc = sc.replace(/logo:\s*'[^']*'/, "logo: '📦'")
  // Clear the github link — user sets their own
  sc = sc.replace(/github:\s*'[^']*'/, "github: ''")
  writeFileSync(siteConfigPath, sc)
}
success('Configured site.config.ts')

// ── Strip doccraft-specific GitHub Pages config ────────────────────────────
// The template is deployed at /doccraft/ but new projects start fresh.

// 1. Remove base: '/doccraft/' from vite.config.ts
const vcPath = join(targetDir, 'vite.config.ts')
if (existsSync(vcPath)) {
  const vc = readFileSync(vcPath, 'utf8')
  writeFileSync(vcPath, vc.replace(/\s*base:\s*['"][^'"]*['"],?\n?/g, '\n'))
}

// 2. Remove public/404.html (GitHub Pages SPA redirect for /doccraft/)
const p404 = join(targetDir, 'public', '404.html')
if (existsSync(p404)) rmSync(p404)

// 3. Remove the 404 recovery script block from index.html + update <title>
const htmlPath = join(targetDir, 'index.html')
if (existsSync(htmlPath)) {
  let html = readFileSync(htmlPath, 'utf8')
  html = html.replace(/\s*<script>\s*\/\/ Restore path encoded[\s\S]*?<\/script>/m, '')
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${projectName}</title>`)
  writeFileSync(htmlPath, html)
}

success('Configured for fresh deployment')

// ── Patch package.json ─────────────────────────────────────────────────────

const pkgPath = join(targetDir, 'package.json')
const pkg     = JSON.parse(readFileSync(pkgPath, 'utf8'))

// Strip doccraft-specific metadata; user sets their own
pkg.name        = projectName
pkg.description = ''
pkg.version     = '0.0.1'
delete pkg.repository
delete pkg.homepage
delete pkg.keywords

// Ensure it's not marked private so the user can publish if they want
// (keep it private by default — they can change it)

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
success('Configured package.json')

// ── Update README.md title ─────────────────────────────────────────────────

const readmePath = join(targetDir, 'README.md')
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, 'utf8')
  writeFileSync(readmePath, readme.replace(/^# \S+/m, `# ${projectName}`))
}

// ── Remove doccraft-specific files not needed in user projects ─────────────

// CONTRIBUTING.md is the doccraft contributor guide — not relevant to user projects
const contribPath = join(targetDir, 'CONTRIBUTING.md')
if (existsSync(contribPath)) rmSync(contribPath)

// Replace llms.txt with a blank template for the user's project
const llmsPath = join(targetDir, 'public', 'llms.txt')
if (existsSync(llmsPath)) {
  writeFileSync(llmsPath,
`# ${projectName}

> Describe your project here for AI discoverability.

## Links

- GitHub:
- Docs:
`)
}

success('Cleaned up template files')

// ── Initialise a fresh git repo ────────────────────────────────────────────

try {
  run('git init',           targetDir)
  run('git add -A',         targetDir)
  run('git commit -m "init: scaffold from doccraft template"', targetDir)
  success('Initialised git repository')
} catch {
  warn('Could not create initial git commit — you can run "git init" manually.')
}

// ── Install dependencies ───────────────────────────────────────────────────

info('Installing dependencies…')
try {
  run('npm install', targetDir)
  success('Dependencies installed')
} catch {
  warn('npm install failed — run it manually inside the project folder.')
}

// ── Done ───────────────────────────────────────────────────────────────────

log(`
${GREEN}${BOLD}  Done!${RESET} Your doccraft project is ready.

  ${DIM}Next steps:${RESET}

    ${CYAN}cd ${projectName}${RESET}
    ${CYAN}npm run dev${RESET}

  ${DIM}Then customise these three files:${RESET}

    ${YELLOW}src/site.config.ts${RESET}   ← project title, logo, GitHub link
    ${YELLOW}src/nav.ts${RESET}           ← sidebar navigation structure
    ${YELLOW}src/App.tsx${RESET}          ← register your page routes

  ${DIM}Docs:${RESET} ${CYAN}https://github.com/Mund99/doccraft${RESET}
`)

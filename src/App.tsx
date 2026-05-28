import { useState, useRef, useEffect, useContext } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { Sidebar, ThemeContext } from './framework'
import { siteConfig } from './site.config'
import './framework/styles/globals.css'

// ── Pages — add your imports here ────────────────────────
import HomePage from './pages/HomePage'
import HowToUse from './pages/docs/HowToUse'
import AiPrompts from './pages/docs/AiPrompts'
import Showcase from './pages/docs/Showcase'
// import YourPage from './pages/YourPage'
// ─────────────────────────────────────────────────────────

function NotFound() {
  const { pathname } = useLocation()
  return (
    <div className="main">
      <div className="page">
        <div className="not-found">
          <div className="code">404</div>
          <p>Page not found: <code>{pathname}</code></p>
        </div>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext)
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

function Header({ onMenu }: { onMenu: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); inputRef.current?.focus() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <header className="header">
      <button onClick={onMenu} className="mobile-btn" aria-label="Menu">☰</button>

      <Link to="/" className="header-logo">
        <div className="header-logo-icon">{siteConfig.logo}</div>
        <span className="header-title">{siteConfig.title}</span>
      </Link>

      {siteConfig.version && <span className="header-version">{siteConfig.version}</span>}

      <div className="header-spacer" />

      <div className="header-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input ref={inputRef} type="text" placeholder="Search docs…" />
        <span className="kbd">⌘K</span>
      </div>

      {siteConfig.github && (
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="header-github">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      )}

      <ThemeToggle />
    </header>
  )
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth < 768) setSidebarOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
      <div className="shell">
        <Header onMenu={() => setSidebarOpen(o => !o)} />
        <div className="shell-body">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.25)', top: 'var(--header-h)' }}
            />
          )}

          {/* ── Add your routes here ───────────────────────── */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs/how-to-use" element={<HowToUse />} />
            <Route path="/docs/ai-prompts" element={<AiPrompts />} />
            <Route path="/docs/showcase" element={<Showcase />} />
            {/* <Route path="/docs/your-page" element={<YourPage />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

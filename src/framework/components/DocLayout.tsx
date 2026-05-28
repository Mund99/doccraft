import { type ReactNode, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FLAT_PAGES } from '../../nav'
import TableOfContents from './TableOfContents'

function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const el = document.querySelector('.main')
    if (!el) return
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } = el as HTMLElement
      setPct(scrollHeight <= clientHeight ? 100 : (scrollTop / (scrollHeight - clientHeight)) * 100)
    }
    el.addEventListener('scroll', fn)
    return () => el.removeEventListener('scroll', fn)
  }, [])
  return <div className="progress" style={{ transform: `scaleX(${pct / 100})` }} />
}

function BackTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = document.querySelector('.main')
    if (!el) return
    const fn = () => setShow((el as HTMLElement).scrollTop > 320)
    el.addEventListener('scroll', fn)
    return () => el.removeEventListener('scroll', fn)
  }, [])
  return (
    <button
      className={`back-top ${show ? 'show' : ''}`}
      onClick={() => document.querySelector('.main')?.scrollTo({ top: 0, behavior: 'smooth' })}
    >↑</button>
  )
}

interface Props { children: ReactNode }

export default function DocLayout({ children }: Props) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.querySelector('.main')?.scrollTo({ top: 0 })
  }, [pathname])

  const idx = FLAT_PAGES.findIndex(p => p.path === pathname)
  const prev = idx > 0 ? FLAT_PAGES[idx - 1] : null
  const next = idx < FLAT_PAGES.length - 1 ? FLAT_PAGES[idx + 1] : null

  return (
    <>
      <ProgressBar />
      <div className="doc-wrapper">
        <div className="main">
          <div className="page">
            {children}
            {(prev || next) && (
              <nav className="page-nav">
                <div className="page-nav-prev">
                  {prev && (
                    <Link to={prev.path} className="page-nav-btn">
                      <span className="page-nav-arrow">←</span>
                      <span className="page-nav-text">
                        <span className="page-nav-hint">Previous</span>
                        <span className="page-nav-label">{prev.label}</span>
                      </span>
                    </Link>
                  )}
                </div>
                <div className="page-nav-next">
                  {next && (
                    <Link to={next.path} className="page-nav-btn page-nav-btn--next">
                      <span className="page-nav-text">
                        <span className="page-nav-hint">Next</span>
                        <span className="page-nav-label">{next.label}</span>
                      </span>
                      <span className="page-nav-arrow">→</span>
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </div>
        </div>
        <TableOfContents />
      </div>
      <BackTop />
    </>
  )
}

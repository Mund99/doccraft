import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV, type NavItem } from '../../nav'

function Section({ item }: { item: NavItem }) {
  const { pathname } = useLocation()
  const childActive = item.children?.some(c => c.path === pathname)
  const [open, setOpen] = useState(childActive ?? true)

  return (
    <div className="nav-section">
      <div
        className="nav-section-hd"
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
      >
        <span>{item.label}</span>
        <span className={`nav-chevron ${open ? 'open' : ''}`}>▶</span>
      </div>
      {open && item.children?.map(child => (
        <NavLink
          key={child.path}
          to={child.path!}
          end
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          {child.label}
        </NavLink>
      ))}
    </div>
  )
}

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} onClick={e => {
      if ((e.target as HTMLElement).tagName === 'A') onClose()
    }}>
      {NAV.map((item, i) =>
        item.children
          ? <Section key={i} item={item} />
          : (
            <NavLink
              key={i}
              to={item.path!}
              end
              className={({ isActive }) => `nav-top-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          )
      )}
    </aside>
  )
}

import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  return (
    <motion.header
      className={`nav ${scrolled || open ? 'nav--scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="container nav-inner">
        <Link to="/" aria-label="ClaudeAndVSCode home">
          <Logo size={34} />
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className="nav-link">
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <motion.span layoutId="nav-underline" className="nav-underline" />}
                </>
              )}
            </NavLink>
          ))}
          <Link to="/#setup" className="btn btn-primary btn-sm">Get set up</Link>
        </nav>

        <button
          className={`burger ${open ? 'burger--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mobile-menu-inner">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.06 * i }}>
                  <NavLink to={l.to} end className="mobile-link">{l.label}</NavLink>
                </motion.div>
              ))}
              <Link to="/#setup" className="btn btn-primary">Get set up</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

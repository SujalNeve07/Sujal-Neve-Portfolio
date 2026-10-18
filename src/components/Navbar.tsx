import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { VERIFIED_PROFILE } from '@/data/verifiedData'
import { scrollToTarget } from '@/lib/lenis'
import { useTheme } from '@/context/ThemeContext'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#publications' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 30)

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 10) {
          setIsVisible(false)
        } else if (lastScrollY.current - currentScrollY > 10) {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle runtime hash navigation (e.g. browser back/forward buttons)
  // Only trigger on explicit user-initiated hashchange, not automatically on initial mount or refresh
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash && hash.length > 1) {
        scrollToTarget(hash)
      }
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith('#')) {
      scrollToTarget(href)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-3.5 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface-1/95 backdrop-blur-xl border border-border-medium shadow-surface-card'
            : 'bg-surface-1/80 backdrop-blur-md border border-border-subtle shadow-sm'
        }`}
      >
        {/* Editorial Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            scrollToTarget('#hero')
          }}
          className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-accent-green rounded-full py-0.5"
          aria-label="Sujal Neve Portfolio - Return to top"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-surface-2 border border-border-medium group-hover:border-accent-green transition-colors">
            <span className="font-display font-bold text-xs text-text-primary group-hover:text-accent-green transition-colors">
              SN
            </span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-text-primary group-hover:text-accent-green transition-colors">
              {VERIFIED_PROFILE.name}
            </span>
            <span className="hidden sm:block text-[11px] font-mono text-text-muted leading-tight">
              Java &amp; Spring Boot Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1 rounded-full bg-surface-2/80 border border-border-subtle"
          aria-label="Primary Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
              className="px-3 py-1.5 rounded-full text-xs font-sans font-medium text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-all focus-visible:ring-2 focus-visible:ring-accent-green relative group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-accent-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle & Contact CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Light/Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-text-secondary hover:text-text-primary bg-surface-2 hover:bg-surface-3 border border-border-medium hover:border-accent-green focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:outline-none transition-all cursor-pointer"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-accent-lime" />
            ) : (
              <Moon className="w-4 h-4 text-text-primary" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contact')
            }}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-semibold text-white bg-accent-green hover:bg-accent-green-hover shadow-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-green active:scale-95 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle + Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-secondary hover:text-text-primary bg-surface-2 border border-border-medium hover:border-accent-green focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:outline-none transition-all cursor-pointer"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-accent-lime" />
            ) : (
              <Moon className="w-4 h-4 text-text-primary" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-text-secondary hover:text-text-primary bg-surface-2 border border-border-medium hover:border-accent-green focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:outline-none cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-accent-green" /> : <Menu className="w-5 h-5 text-text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-3 p-6 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <span className="text-xs font-mono text-accent-green uppercase tracking-wider font-semibold">NAVIGATION</span>
              <span className="text-[11px] font-mono text-text-muted">ESC to close</span>
            </div>

            <nav className="flex flex-col space-y-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-sans font-medium text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-text-muted text-xs font-mono">→</span>
                </a>
              ))}
            </nav>

            {/* Mobile Theme Toggle Row */}
            <div className="p-3.5 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs font-mono text-text-primary font-medium">
                {isDark ? (
                  <>
                    <Moon className="w-4 h-4 text-accent-lime" />
                    <span>Dark Theme Active</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-accent-green" />
                    <span>Light Theme Active</span>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-surface-1 border border-border-medium hover:border-accent-green text-text-primary focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:outline-none transition-all cursor-pointer"
              >
                Switch to {isDark ? 'Light' : 'Dark'}
              </button>
            </div>

            <div className="pt-2 border-t border-border-subtle">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#contact')
                }}
                className="w-full py-3 px-4 rounded-xl text-center font-sans font-semibold text-sm bg-accent-green hover:bg-accent-green-hover text-white shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Initiate Contact</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

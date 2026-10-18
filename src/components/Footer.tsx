import { ArrowUp } from 'lucide-react'
import { VERIFIED_PROFILE } from '@/data/verifiedData'
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '@/components/icons'
import { scrollToTarget } from '@/lib/lenis'

const FOOTER_NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#publications' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleScroll = (href: string) => {
    scrollToTarget(href)
  }

  const handleBackToTop = () => {
    scrollToTarget('#hero')
  }

  return (
    <footer className="relative border-t border-border-subtle bg-surface-1 text-text-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-border-subtle">
          {/* Identity Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-medium flex items-center justify-center">
                <span className="font-display font-bold text-xs text-text-primary">SN</span>
              </div>
              <span className="font-display font-extrabold text-xl text-text-primary tracking-tight">
                {VERIFIED_PROFILE.name}
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed font-sans max-w-sm">
              Java Developer crafting intelligent backend solutions through clean architecture, secure
              API design, and efficient relational data modeling—turning complex logic into reliable software.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-border-subtle text-xs font-mono text-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-text-primary font-medium">Available for Software Engineering roles</span>
            </div>
          </div>

          {/* Quick Anchor Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono text-accent-green font-bold uppercase tracking-wider block mb-2">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-sans">
              {FOOTER_NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll(link.href)
                  }}
                  className="text-text-muted hover:text-accent-green transition-colors py-0.5 focus-visible:ring-1 focus-visible:ring-accent-green rounded font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Profiles & Location (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono text-accent-green font-bold uppercase tracking-wider block mb-2">
              Connect
            </span>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={VERIFIED_PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-medium text-text-primary hover:text-accent-green transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href={VERIFIED_PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-medium text-text-primary hover:text-accent-green transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href={VERIFIED_PROFILE.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-medium text-text-primary hover:text-amber-500 transition-colors"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 text-center sm:text-left">
            <span>
              &copy; {currentYear} {VERIFIED_PROFILE.name}. All rights reserved.
            </span>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 hover:bg-surface-3 border border-border-medium text-text-primary transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-accent-green font-medium"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent-green group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}

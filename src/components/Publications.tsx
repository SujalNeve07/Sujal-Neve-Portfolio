import { useRef, useEffect } from 'react'
import { FileText, ExternalLink, BookOpen, CheckCircle2, Calendar, Link2, ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { VERIFIED_PUBLICATIONS } from '@/data/verifiedData'

export function Publications() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="publications"
      aria-label="Academic Research Publications"
      className="w-full bg-canvas border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Header - No numbered labels */}
        <div ref={headerRef} className="space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <BookOpen className="w-4 h-4 text-accent-green" />
            <span>Academic Research</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary tracking-tight leading-tight">
            Research <span className="text-accent-green">Publications</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Peer-reviewed academic research publications and reviews in deep generative modeling, forensic computing, and assistive computer vision.
          </p>
        </div>

        {/* Publications Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {VERIFIED_PUBLICATIONS.map((pub) => {
            const isReviewPaper = pub.type.toLowerCase().includes('review')

            return (
              <div
                key={pub.id}
                className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-surface-1 border border-border-medium shadow-surface-card flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-accent-green/40"
              >
                <div className="space-y-5">
                  {/* Meta Badges: Publication Type & Date / Field */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                          isReviewPaper
                            ? 'text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20'
                            : 'text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-500/20'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{pub.type}</span>
                      </span>

                      {pub.date && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-text-muted bg-surface-2 border border-border-subtle">
                          <Calendar className="w-3.5 h-3.5 text-accent-green" />
                          <span>{pub.date}</span>
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-text-muted">
                      {pub.field}
                    </span>
                  </div>

                  {/* Title & Journal info */}
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight leading-snug">
                      {pub.title}
                    </h3>
                    {pub.journal && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs sm:text-sm font-sans font-semibold text-accent-green">
                          {pub.journal}
                        </p>
                        {pub.volumeIssue && (
                          <p className="text-xs font-mono text-text-muted">
                            {pub.volumeIssue}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Clickable DOI pill */}
                  {pub.doi && pub.doiUrl && (
                    <div className="pt-0.5">
                      <a
                        href={pub.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-medium text-xs font-mono text-accent-green hover:underline transition-colors group"
                        aria-label={`Verified DOI: ${pub.doi}`}
                      >
                        <Link2 className="w-3.5 h-3.5 text-accent-green" />
                        <span className="font-semibold">DOI:</span>
                        <span>{pub.doi}</span>
                        <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-accent-green transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  )}

                  {/* Abstract */}
                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {pub.description}
                  </p>

                  {/* Technologies & Research Concepts */}
                  {pub.technologies && pub.technologies.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                        Technologies &amp; Research Concepts
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pub.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-surface-2 border border-border-subtle text-xs font-mono text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Core Modules / Scope */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                      {pub.id === 'blind-people-helping-hand'
                        ? 'Core Modules & Key Features'
                        : 'Core Investigation Scope'}
                    </span>
                    <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                      {pub.focusAreas.map((area) => (
                        <li key={area} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons: Read Paper + View Certificate / View Publication */}
                <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap">
                    {/* Button 1: Read Paper */}
                    <a
                      href={pub.publicationUrl || pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-accent-green hover:bg-accent-green-hover text-white font-sans font-semibold text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-accent-green cursor-pointer shrink-0"
                      aria-label={`Read Paper: ${pub.title}`}
                    >
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>{pub.buttonText || 'Read Paper'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    {/* Button 2: View Certificate */}
                    <a
                      href={pub.secondaryUrl || pub.doiUrl || pub.publicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-surface-2 hover:bg-surface-3 text-text-primary border border-border-medium hover:border-accent-green font-sans font-semibold text-xs sm:text-sm whitespace-nowrap transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-accent-green cursor-pointer shrink-0"
                      aria-label={`${pub.secondaryButtonText || 'View Certificate'}: ${pub.title} in new tab`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-text-muted shrink-0" />
                      <span>{pub.secondaryButtonText || 'View Certificate'}</span>
                    </a>
                  </div>

                  <span className="text-xs font-mono text-text-muted shrink-0 self-start sm:self-auto">
                    Verified DOI
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useRef, useEffect } from 'react'
import { Award, ExternalLink, CheckCircle2, Clock } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { VERIFIED_CERTIFICATIONS } from '@/data/verifiedData'

export function Certifications() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="certifications"
      aria-label="Professional Certifications"
      className="w-full bg-canvas-alt border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Header - No numbered labels */}
        <div ref={headerRef} className="space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <Award className="w-4 h-4 text-accent-green" />
            <span>Certifications</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary tracking-tight leading-tight">
            Technical <span className="text-accent-green">Certifications</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Specialized credentials in enterprise Java software architecture, MVC design patterns, and modern full-stack development.
          </p>
        </div>

        {/* Certifications Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VERIFIED_CERTIFICATIONS.map((cert) => {
            const isAvailable = cert.status === 'available' && cert.certificateUrl

            return (
              <div
                key={cert.id}
                className="p-7 sm:p-9 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                      <Award className="w-3.5 h-3.5" />
                      <span>{cert.year}</span>
                    </span>

                    <span
                      className={`text-xs font-mono font-medium flex items-center gap-1.5 ${
                        isAvailable ? 'text-accent-green' : 'text-text-muted'
                      }`}
                    >
                      {!isAvailable && <Clock className="w-3.5 h-3.5" />}
                      <span>{cert.statusLabel}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-sans text-accent-green font-semibold mt-1">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border-subtle">
                    <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                      Competencies Covered
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                      {cert.skillsCovered.map((skill) => (
                        <li key={skill} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle">
                  {isAvailable ? (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent-green hover:text-accent-green-hover transition-colors"
                    >
                      <span>{cert.buttonText || 'View Certificate'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-text-muted">
                      Credential completion in progress
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

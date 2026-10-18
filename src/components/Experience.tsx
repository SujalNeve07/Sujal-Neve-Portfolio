import { useRef, useEffect } from 'react'
import {
  Briefcase,
  ExternalLink,
  Calendar,
  CheckCircle2,
  MapPin,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { VERIFIED_EXPERIENCES } from '@/data/verifiedData'

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const [netleap, r3systems] = VERIFIED_EXPERIENCES

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
      id="experience"
      aria-label="Professional Experience"
      className="w-full bg-canvas border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Header - Clean, unnumbered editorial title */}
        <div ref={headerRef} className="space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <Briefcase className="w-4 h-4 text-accent-green" />
            <span>Experience</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary tracking-tight leading-tight">
            Professional <span className="text-accent-green">Internships</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Practical industry experience developing web features with Spring Boot, managing relational databases,
            and building reusable object-oriented Java modules.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Internship 1: NetLeap */}
          <div className="p-7 sm:p-9 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Meta Tags: Duration & Type */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{netleap.type}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{netleap.duration}</span>
                </span>
              </div>

              {/* Role & Company */}
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                  {netleap.role}
                </h3>
                <p className="text-sm font-sans text-accent-green font-semibold mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span>{netleap.company} &bull; {netleap.location}</span>
                </p>
              </div>

              {/* Factual Responsibilities */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  Responsibilities
                </span>
                <ul className="space-y-2 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                  {netleap.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {netleap.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-surface-2 text-text-primary border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Working Certificate Button */}
            {netleap.certificateUrl && (
              <div className="pt-4 border-t border-border-subtle">
                <a
                  href={netleap.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent-green hover:text-accent-green-hover transition-colors"
                >
                  <span>{netleap.certificateButtonText || 'View Internship Certificate'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Internship 2: R3 Systems */}
          <div className="p-7 sm:p-9 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{r3systems.type}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{r3systems.duration}</span>
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                  {r3systems.role}
                </h3>
                <p className="text-sm font-sans text-accent-green font-semibold mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span>{r3systems.company} &bull; {r3systems.location}</span>
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  Responsibilities
                </span>
                <ul className="space-y-2 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                  {r3systems.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {r3systems.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-surface-2 text-text-primary border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Working Certificate Button */}
            {r3systems.certificateUrl && (
              <div className="pt-4 border-t border-border-subtle">
                <a
                  href={r3systems.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent-green hover:text-accent-green-hover transition-colors"
                >
                  <span>{r3systems.certificateButtonText || 'View Internship Certificate'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

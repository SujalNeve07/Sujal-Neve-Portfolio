import { useRef, useEffect } from 'react'
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { VERIFIED_EDUCATION } from '@/data/verifiedData'

export function Education() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const [beDegree, diplomaDegree] = VERIFIED_EDUCATION

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

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listRef.current,
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
      id="education"
      aria-label="Academic Education"
      className="w-full bg-canvas-alt border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Clean Editorial Header - No numbered labels or generic slogans */}
        <div ref={headerRef} className="space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <GraduationCap className="w-4 h-4 text-accent-green" />
            <span>Education</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary tracking-tight leading-tight">
            Academic <span className="text-accent-green">Qualifications</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Formal engineering education completed with distinction standing.
          </p>
        </div>

        {/* Two Clearly Separated Qualification Cards */}
        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Qualification 1: B.E. in Computer Engineering */}
          <div className="p-7 sm:p-9 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Top Meta Badges: Year & Score clearly separated */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Completed {beDegree.year}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-accent-green bg-surface-2 border border-border-medium">
                  <Award className="w-3.5 h-3.5 text-accent-green" />
                  <span>{beDegree.score}</span>
                </span>
              </div>

              {/* Single Degree Title & Institution */}
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
                  {beDegree.degree}
                </h3>
                <p className="text-sm font-sans text-text-secondary mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span>{beDegree.institution}, {beDegree.location}</span>
                </p>
              </div>

              {/* Coursework & Focus Areas */}
              <div className="pt-2 border-t border-border-subtle space-y-2">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  Core Coursework
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                  {beDegree.curriculumHighlights.map((topic) => (
                    <li key={topic} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Status Note */}
            <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
              <span>First Class with Distinction Standing</span>
              <span className="text-accent-green font-semibold">Verified</span>
            </div>
          </div>

          {/* Qualification 2: Diploma in Computer Engineering */}
          <div className="p-7 sm:p-9 rounded-2xl bg-surface-1 border border-border-medium shadow-surface-card flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Top Meta Badges: Year & Score clearly separated */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Completed {diplomaDegree.year}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-accent-green bg-surface-2 border border-border-medium">
                  <Award className="w-3.5 h-3.5 text-accent-green" />
                  <span>Percentage: {diplomaDegree.score}</span>
                </span>
              </div>

              {/* Single Degree Title & Institution */}
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
                  {diplomaDegree.degree}
                </h3>
                <p className="text-sm font-sans text-text-secondary mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span>{diplomaDegree.institution}, {diplomaDegree.location}</span>
                </p>
              </div>

              {/* Coursework & Focus Areas */}
              <div className="pt-2 border-t border-border-subtle space-y-2">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  Foundational Coursework
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                  {diplomaDegree.curriculumHighlights.map((topic) => (
                    <li key={topic} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Status Note */}
            <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
              <span>First Class with Distinction</span>
              <span className="text-accent-green font-semibold">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

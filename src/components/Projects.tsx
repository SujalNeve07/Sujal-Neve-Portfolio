import { useRef, useEffect } from 'react'
import {
  ExternalLink,
  ShieldCheck,
  Server,
  AppWindow,
  Binary,
  Code2,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { VERIFIED_PROJECTS } from '@/data/verifiedData'
import { GithubIcon } from '@/components/icons'

export function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const [bankingProject, expenseProject, forensicProject] = VERIFIED_PROJECTS

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
        const cards = gsap.utils.toArray<HTMLElement>('.project-showcase-card')
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play reverse play reverse',
              },
            }
          )
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="projects"
      aria-label="Featured Projects Showcase"
      className="w-full bg-canvas-alt border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Header - Clean, unnumbered editorial title */}
        <div ref={headerRef} className="space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <Code2 className="w-4 h-4 text-accent-green" />
            <span>Projects</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary tracking-tight leading-tight">
            Featured <span className="text-accent-green">Projects</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Three verified software systems and research implementations engineered with Java, Spring Boot,
            and applied machine learning.
          </p>
        </div>

        {/* Fully Visible, Stacked Showcase Cards (No clipping, visible on all viewports) */}
        <div ref={cardsRef} className="space-y-10 sm:space-y-12">
          {/* ========================================================= */}
          {/* PROJECT 1: BANKING PORTAL REST API */}
          {/* ========================================================= */}
          <div className="project-showcase-card p-7 sm:p-10 lg:p-12 rounded-3xl bg-surface-1 border border-border-medium shadow-surface-card transition-all duration-300 hover:shadow-surface-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Details & Capabilities (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                  <Server className="w-3.5 h-3.5" />
                  <span>Java Backend &amp; REST</span>
                </span>
                <span className="text-xs font-mono text-text-muted">
                  {bankingProject.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-tight">
                  {bankingProject.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-text-secondary mt-2 leading-relaxed">
                  {bankingProject.tagline}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                {bankingProject.problemStatement}
              </p>

              {/* Core Capabilities */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  Key Capabilities
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                  {bankingProject.keyFeatures.slice(0, 4).map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2 pt-3">
                {bankingProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-2 text-text-primary border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Working Repository Link & Spec Box (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l lg:border-border-subtle lg:pl-8">
              <div className="p-5 rounded-2xl bg-surface-2/70 border border-border-subtle space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-text-muted text-[11px]">
                  <span>AUTHENTICATION</span>
                  <span className="text-accent-green font-bold">JWT Stateless</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-text-muted text-[11px]">
                  <span>TRANSACTIONS</span>
                  <span className="text-text-primary font-bold">@Transactional ACID</span>
                </div>
                <div className="flex items-center justify-between text-text-muted text-[11px]">
                  <span>PERSISTENCE</span>
                  <span className="text-text-primary font-bold">MySQL &amp; JPA</span>
                </div>
              </div>

              {/* Working GitHub Button */}
              {bankingProject.githubUrl && (
                <a
                  href={bankingProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-green hover:bg-accent-green-hover text-white font-sans font-semibold text-sm transition-all shadow-sm active:scale-95"
                >
                  <GithubIcon className="w-4 h-4 fill-current" />
                  <span>View Repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PROJECT 2: SMART EXPENSE TRACKER */}
        {/* ========================================================= */}
        <div className="project-showcase-card p-7 sm:p-10 lg:p-12 rounded-3xl bg-surface-1 border border-border-medium shadow-surface-card transition-all duration-300 hover:shadow-surface-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                  <AppWindow className="w-3.5 h-3.5" />
                  <span>Desktop Engineering</span>
                </span>
                <span className="text-xs font-mono text-text-muted">
                  {expenseProject.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-tight">
                  {expenseProject.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-text-secondary mt-2 leading-relaxed">
                  {expenseProject.tagline}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                {expenseProject.problemStatement}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  Key Capabilities
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                  {expenseProject.keyFeatures.slice(0, 4).map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                {expenseProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-2 text-text-primary border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l lg:border-border-subtle lg:pl-8">
              <div className="p-5 rounded-2xl bg-surface-2/70 border border-border-subtle space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-text-muted text-[11px]">
                  <span>INTERFACE</span>
                  <span className="text-text-primary font-bold">Java Swing GUI</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-text-muted text-[11px]">
                  <span>CONNECTIVITY</span>
                  <span className="text-accent-green font-bold">Direct JDBC</span>
                </div>
                <div className="flex items-center justify-between text-text-muted text-[11px]">
                  <span>STORAGE</span>
                  <span className="text-text-primary font-bold">Relational MySQL</span>
                </div>
              </div>

              {/* Working GitHub Button */}
              {expenseProject.githubUrl && (
                <a
                  href={expenseProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-green hover:bg-accent-green-hover text-white font-sans font-semibold text-sm transition-all shadow-sm active:scale-95"
                >
                  <GithubIcon className="w-4 h-4 fill-current" />
                  <span>View Repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PROJECT 3: LINGUISTIC TO VISUAL TRANSFORMATION */}
        {/* ========================================================= */}
        <div className="project-showcase-card p-7 sm:p-10 lg:p-12 rounded-3xl bg-surface-1 border border-border-medium shadow-surface-card transition-all duration-300 hover:shadow-surface-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-accent-lime-badge-text bg-accent-lime-badge border border-accent-lime/20">
                  <Binary className="w-3.5 h-3.5" />
                  <span>Applied AI &amp; Research</span>
                </span>
                <span className="text-xs font-mono text-text-muted">
                  {forensicProject.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-tight">
                  {forensicProject.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-text-secondary mt-2 leading-relaxed">
                  {forensicProject.tagline}
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                {forensicProject.problemStatement}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  Methodology Scope
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans text-text-secondary leading-relaxed">
                  {forensicProject.keyFeatures.slice(0, 4).map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                {forensicProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-2 text-text-primary border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l lg:border-border-subtle lg:pl-8">
              <div className="p-5 rounded-2xl bg-surface-2/70 border border-border-subtle space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-text-muted text-[11px]">
                  <span>TYPE</span>
                  <span className="text-text-primary font-bold">Academic Prototype</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-text-muted text-[11px]">
                  <span>NLP ENCODER</span>
                  <span className="text-accent-green font-bold">BERT Embeddings</span>
                </div>
                <div className="flex items-center justify-between text-text-muted text-[11px]">
                  <span>SYNTHESIS</span>
                  <span className="text-text-primary font-bold">StyleGAN &amp; ResNet</span>
                </div>
              </div>

              {/* Working GitHub Button */}
              {forensicProject.githubUrl && (
                <a
                  href={forensicProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-green hover:bg-accent-green-hover text-white font-sans font-semibold text-sm transition-all shadow-sm active:scale-95"
                >
                  <GithubIcon className="w-4 h-4 fill-current" />
                  <span>View Repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

import { useRef, useEffect } from 'react'
import { ShieldCheck, Database, Cpu, User } from 'lucide-react'
import { gsap } from '@/lib/gsap'

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Deterministic Backend Systems',
    desc: 'Engineering stateless RESTful microservices with Spring Boot, ensuring rigorous validation, atomic transactions, and centralized exception lifecycles.',
  },
  {
    icon: Database,
    title: 'Relational Data Integrity',
    desc: 'Architecting normalized MySQL schemas, writing performant SQL queries, and enforcing ACID guarantees across financial and operational ledgers.',
  },
  {
    icon: Cpu,
    title: 'Applied Engineering Research',
    desc: 'Investigating deep learning model architectures, bridging semantic natural language embeddings with generative visual synthesis for forensic use-cases.',
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
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
            stagger: 0.12,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Sujal Neve"
      className="w-full bg-canvas-alt border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Header: Replaced 'Perspective' with 'Overview' and removed '01 PERSPECTIVE' */}
        <div ref={headerRef} className="space-y-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <User className="w-4 h-4 text-accent-green" />
            <span>Overview</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary max-w-4xl tracking-tight leading-tight">
            Engineering practical software with{' '}
            <span className="text-accent-green">
              clean logic and reliable architecture.
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            <p className="lg:col-span-8 font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              I’m Sujal Neve, a Java Developer passionate about architecting resilient backend systems.
              From building seamless REST APIs to developing secure applications with Spring Boot, JWT
              authentication, and relational databases, I transform complex requirements into scalable,
              efficient, and maintainable solutions.
            </p>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-2.5 text-xs font-mono text-text-muted bg-surface-1 p-5 rounded-2xl border border-border-subtle shadow-sm">
              <div className="flex items-center gap-2 text-text-primary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>Clean Object-Oriented Principles</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>Spring Boot RESTful Microservices</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span>ACID Relational Persistence</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars with crisp white surfaces */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="p-7 sm:p-8 rounded-2xl bg-surface-1 border border-border-medium hover:border-accent-green transition-all duration-300 space-y-4 shadow-surface-card"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-green" />
                </div>

                <h3 className="font-display font-bold text-lg text-text-primary tracking-tight">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

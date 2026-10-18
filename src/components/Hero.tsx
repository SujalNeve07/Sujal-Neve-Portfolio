import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { scrollToTarget } from '@/lib/lenis'
import { HeroVisual3D } from '@/components/HeroVisual3D'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleLine1Ref = useRef<HTMLHeadingElement>(null)
  const titleLine2Ref = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '.hero-mask-text',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12, delay: 0.1 }
      )
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.9 },
          '-=0.5'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Introduction & Overview"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-28 sm:pt-32 pb-12 bg-canvas overflow-hidden"
    >
      {/* Top Header Eyebrow */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-text-muted pb-4 border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-text-primary font-semibold">Java &amp; Spring Boot Developer</span>
        </div>
        <div className="flex items-center gap-4 text-text-muted">
          <span className="text-accent-green font-semibold">Open for Software Engineering Roles</span>
        </div>
      </div>

      {/* Main Hero Composition */}
      <div className="max-w-7xl mx-auto w-full my-auto py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Headline & Intro */}
        <div className="lg:col-span-7 space-y-5">
          <div className="overflow-hidden">
            <h1
              ref={titleLine1Ref}
              className="font-display font-extrabold text-hero text-text-primary tracking-tighter leading-[0.98] select-none"
            >
              <span className="block hero-mask-text">Sujal Neve.</span>
            </h1>
          </div>

          <div className="overflow-hidden">
            <h2
              ref={titleLine2Ref}
              className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-text-secondary tracking-tight leading-snug"
            >
              <span className="block hero-mask-text">
                Engineering practical software &amp;{' '}
                <span className="font-bold bg-gradient-to-r from-accent-green via-emerald-600 to-accent-green dark:from-accent-green dark:to-accent-lime bg-clip-text text-transparent">
                  resilient backend systems.
                </span>
              </span>
            </h2>
          </div>

          <div ref={roleRef} className="space-y-6 max-w-xl pt-1">
            <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
              <span>
                Java Developer skilled in{' '}
                <strong className="font-bold text-text-primary">
                  Spring Boot, microservices, and REST APIs
                </strong>
                .
              </span>
              <span className="block mt-1">
                Building scalable backend systems with clean code and efficient database design.
              </span>
            </p>

            {/* Action Buttons: 1. View Resume -> 2. Contact Me -> 3. Explore Projects */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Button 1: View Resume (Opens verified PDF in new tab) */}
              <a
                href="/Sujal_Neve_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-green hover:bg-accent-green-hover text-white font-sans font-semibold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
                aria-label="View Sujal Neve Resume in a new tab"
              >
                <FileText className="w-4 h-4 text-white/90" />
                <span>View Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Button 2: Contact Me */}
              <button
                type="button"
                onClick={() => scrollToTarget('#contact')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-1 hover:bg-surface-2 text-text-primary border border-border-medium font-sans font-semibold text-sm shadow-surface-card transition-all active:scale-95 hover:border-accent-green cursor-pointer"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Button 3: Explore Projects */}
              <button
                type="button"
                onClick={() => scrollToTarget('#projects')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-1 hover:bg-surface-2 text-text-primary border border-border-medium font-sans font-semibold text-sm transition-all active:scale-95 hover:border-accent-green shadow-surface-card cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 text-text-muted group-hover:text-accent-green group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Technical Geometric Composition */}
        <div ref={visualRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <HeroVisual3D />
        </div>
      </div>

      {/* Bottom Bar without numbered labels */}
      <div className="max-w-7xl mx-auto w-full pt-4 border-t border-border-subtle flex items-center justify-end text-xs font-mono text-text-muted shrink-0">
        <button
          type="button"
          onClick={() => scrollToTarget('#about')}
          className="flex items-center gap-1.5 hover:text-accent-green transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-accent-green animate-bounce" />
        </button>
      </div>
    </section>
  )
}

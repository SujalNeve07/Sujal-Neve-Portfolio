import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Education } from '@/components/Education'
import { Publications } from '@/components/Publications'
import { Certifications } from '@/components/Certifications'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { initSmoothScroll, destroySmoothScroll } from '@/lib/lenis'
import { syncGsapWithLenis } from '@/lib/gsap'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Disable browser scroll restoration so page always starts at top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Clear stale hash on refresh to avoid unintended jumps to sections
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      } catch {
        // Fallback if history.replaceState fails
      }
    }

    // Initialize singleton smooth scroll & sync with GSAP ScrollTrigger
    const lenis = initSmoothScroll((instance) => {
      // Track page scroll progress for fresh green progress line
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, instance.scroll / total)))
      }
    })

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      syncGsapWithLenis(lenis)
    }

    return () => {
      destroySmoothScroll()
    }
  }, [])

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-accent-green/20 selection:text-accent-green flex flex-col relative overflow-x-hidden">
      {/* Page-level Slim Fresh Green Scroll Progress Rail */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent-green z-[60] origin-left transition-transform duration-100 ease-out pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Floating Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Publications />
        <Certifications />
        <Contact />
      </main>

      {/* Production Footer */}
      <Footer />
    </div>
  )
}

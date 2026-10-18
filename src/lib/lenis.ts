import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/**
 * Initializes the singleton Lenis instance for smooth scrolling.
 * Animation frame ticker is synchronized with GSAP in gsap.ts to prevent duplicate RAF loops.
 */
export function initSmoothScroll(onScroll?: (lenis: Lenis) => void): Lenis {
  if (typeof window === 'undefined') {
    return {} as Lenis
  }

  if (lenisInstance) {
    return lenisInstance
  }

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  lenisInstance = new Lenis({
    duration: isReducedMotion ? 0 : 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !isReducedMotion,
    touchMultiplier: 1.5,
  })

  if (onScroll) {
    lenisInstance.on('scroll', onScroll)
  }

  return lenisInstance
}

/**
 * Returns current Lenis instance if active.
 */
export function getLenis(): Lenis | null {
  return lenisInstance
}

/**
 * Destroys current Lenis instance and resets singleton reference.
 */
export function destroySmoothScroll(): void {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

/**
 * Smoothly scrolls to an element or selector using Lenis if available,
 * accounting for fixed navbar height (-90px offset) and updating URL hash.
 */
export function scrollToTarget(
  target: string | HTMLElement,
  offset: number = -90,
  updateHash: boolean = true
): void {
  if (typeof window === 'undefined') return

  if (typeof target === 'string') {
    const el = document.querySelector(target) as HTMLElement | null
    if (el) {
      if (lenisInstance) {
        lenisInstance.scrollTo(el, { offset, duration: 1 })
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top, behavior: 'smooth' })
      }

      if (updateHash && target.startsWith('#')) {
        try {
          window.history.pushState(null, '', target)
        } catch {
          window.location.hash = target
        }
      }
    }
  } else if (target) {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset, duration: 1 })
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
}

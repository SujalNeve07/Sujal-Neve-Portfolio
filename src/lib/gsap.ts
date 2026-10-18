import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

let tickerListener: ((time: number) => void) | null = null

/**
 * Synchronizes GSAP ScrollTrigger with Lenis smooth scroll ticker.
 * Uses GSAP ticker exclusively to drive Lenis updates without duplicate RAF loops.
 */
export function syncGsapWithLenis(lenis: Lenis) {
  lenis.on('scroll', ScrollTrigger.update)

  if (tickerListener) {
    gsap.ticker.remove(tickerListener)
  }

  tickerListener = (time: number) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(tickerListener)
  gsap.ticker.lagSmoothing(0)
}

/**
 * Standard bidirectional ScrollTrigger configuration preset.
 * Ensures animations replay smoothly when scrolling up and down repeatedly.
 */
export const bidirectionalTrigger = {
  start: 'top 85%',
  end: 'bottom 15%',
  toggleActions: 'play reverse play reverse',
}

export { gsap, ScrollTrigger }

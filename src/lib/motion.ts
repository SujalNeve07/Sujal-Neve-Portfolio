import type { Transition, Variants } from 'framer-motion'

/**
 * Standard spring and cubic bezier easing curves for micro-interactions.
 */
export const transitions = {
  springGentle: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
  } satisfies Transition,
  springSnappy: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  } satisfies Transition,
  easeOutQuart: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  } satisfies Transition,
}

/**
 * Reusable motion variants for section headers, cards, and list elements.
 */
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.easeOutQuart,
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

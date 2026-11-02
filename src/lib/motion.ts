import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Inicializa o smooth scroll (Lenis) sincronizado com o ScrollTrigger. */
export function initSmoothScroll(): Lenis | null {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = (): Lenis | null => lenis

/** Rola suavemente até um seletor, elemento ou posição absoluta (px). */
export function scrollToTarget(target: string | number | HTMLElement, immediate = false): void {
  if (lenis) {
    lenis.scrollTo(target, { duration: immediate ? 0 : 1.6, immediate })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
}

/** Trava/destrava o scroll da página (usado por drawers e pelo zoom do portfólio). */
export function lockScroll(lock: boolean): void {
  if (lenis) {
    if (lock) lenis.stop()
    else lenis.start()
  }
  document.documentElement.classList.toggle('scroll-locked', lock)
}

export { gsap, ScrollTrigger }


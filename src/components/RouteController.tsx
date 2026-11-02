import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { lockScroll, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { mountScrollChoreography } from '../lib/scrollChoreography'

/**
 * Controla a transição entre rotas da SPA:
 * - Destrava qualquer bloqueio de scroll residual (drawers/modais)
 * - Rola imediatamente para o topo da nova página
 * - Monta o motor global de coreografia de entrada & saída (scrollChoreography)
 * - Recalcula todos os gatilhos do ScrollTrigger após a renderização
 */
export function RouteController() {
  const { pathname, hash } = useLocation()
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    lockScroll(false)
    setTransitioning(true)

    let cleanupChoreography: (() => void) | null = null

    const t1 = window.setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash) as HTMLElement | null
        if (el) {
          scrollToTarget(el, false)
        } else {
          scrollToTarget(0, true)
          window.scrollTo(0, 0)
        }
      } else {
        scrollToTarget(0, true)
        window.scrollTo(0, 0)
      }

      cleanupChoreography = mountScrollChoreography(document)
      ScrollTrigger.refresh()
    }, 50)

    const t2 = window.setTimeout(() => {
      setTransitioning(false)
      ScrollTrigger.refresh()
    }, 360)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      if (cleanupChoreography) cleanupChoreography()
    }
  }, [pathname, hash])

  return (
    <div
      className={`route-curtain ${transitioning ? 'is-active' : ''}`}
      aria-hidden="true"
    />
  )
}

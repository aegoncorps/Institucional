import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { lockScroll, ScrollTrigger, scrollToTarget } from '../lib/motion'

/**
 * Controla a transição entre rotas da SPA:
 * - Destrava qualquer bloqueio de scroll residual (drawers/modais)
 * - Rola imediatamente para o topo da nova página
 * - Recalcula todos os gatilhos do ScrollTrigger após a renderização
 */
export function RouteController() {
  const { pathname, hash } = useLocation()
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    lockScroll(false)
    setTransitioning(true)

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

      ScrollTrigger.refresh()
    }, 40)

    const t2 = window.setTimeout(() => {
      setTransitioning(false)
      ScrollTrigger.refresh()
    }, 360)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname, hash])

  return (
    <div
      className={`route-curtain ${transitioning ? 'is-active' : ''}`}
      aria-hidden="true"
    />
  )
}

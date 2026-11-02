import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/motion'

/**
 * Custom Cursor idêntico ao da v2 (aegon-spa):
 * - Anel externo suave (32px, border white/50%, trail com inércia power3.out)
 * - Ponto central ágil (4px, cor oficial Azul System Wake com glow)
 * - Reação ao clique (scale 0.8, duration 0.3)
 * - Expansão magnética ao passar o mouse em elementos interativos:
 *   (scale 2.0, bg 'rgba(0, 87, 255, 0.2)', borderColor '#0057ff')
 * - Oculta 100% o cursor padrão do sistema no desktop, exatamente como na v2.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const isHoveringRef = useRef(false)

  useEffect(() => {
    // Apenas em dispositivos de ponteiro fino (desktop/mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Centraliza o ponto pivô nos dois elementos
    gsap.set([cursor, cursorDot], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    })

    let hasMoved = false

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true
        gsap.set([cursor, cursorDot], {
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
        })
      }

      // Física idêntica à v2 (aegon-spa):
      // Anel com inércia sedosa (0.6s) e ponto com tracking instantâneo (0.1s)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.25, ease: 'power2.out' })
    }

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: isHoveringRef.current ? 2 : 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onMouseLeaveWindow = () => {
      gsap.to([cursor, cursorDot], { opacity: 0, duration: 0.2 })
    }

    const onMouseEnterWindow = () => {
      gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.2 })
    }

    // Detecção dinâmica de elementos clicáveis/interativos
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest(
          'button, a, input, select, textarea, [role="button"], .interactive, .filter-pill, .btn, .portal__skip, .drawer__close, .prod-card, .brand-on-switch'
        )
      )

      if (isInteractive !== isHoveringRef.current) {
        isHoveringRef.current = isInteractive
        setIsHovering(isInteractive)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseenter', onMouseEnterWindow)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseenter', onMouseEnterWindow)
    }
  }, [])

  // Efeito idêntico ao da v2 (aegon-spa CustomCursor.tsx)
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    if (isHovering) {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: 'rgba(0, 87, 255, 0.2)',
        borderColor: '#0057ff',
        duration: 0.3,
        ease: 'power2.out',
      })
    } else {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [isHovering])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor-ring"
        aria-hidden="true"
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        aria-hidden="true"
      />
    </>
  )
}


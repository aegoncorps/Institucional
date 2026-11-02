import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/motion'

/**
 * Cursor personalizado idêntico ao da v2 (aegon-spa):
 * - Anel externo suave (32px, borda branca/50%, delay com inércia power3.out)
 * - Ponto interno ágil (4px, preenchimento em Azul System Wake oficial)
 * - Reação ao clique (scale 0.8)
 * - Expansão com aura azul em elementos interativos (links, botões, pills, etc.)
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Apenas em dispositivos com mouse/ponteiro fino
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Quick setters do GSAP para performance de 120fps sem lag
    const xToCursor = gsap.quickTo(cursor, 'x', { duration: 0.55, ease: 'power3.out' })
    const yToCursor = gsap.quickTo(cursor, 'y', { duration: 0.55, ease: 'power3.out' })
    const xToDot = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power3.out' })
    const yToDot = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      xToCursor(e.clientX)
      yToCursor(e.clientY)
      xToDot(e.clientX)
      yToDot(e.clientY)
    }

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.2, ease: 'power2.out' })
    }

    const onMouseUp = () => {
      gsap.to(cursor, { scale: isHovering ? 2.2 : 1, duration: 0.25, ease: 'power2.out' })
    }

    const onMouseLeaveWindow = () => setIsVisible(false)
    const onMouseEnterWindow = () => setIsVisible(true)

    // Delegação de eventos para elementos interativos (dinâmicos e estáticos)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('button, a, input, select, textarea, [role="button"], .interactive, .filter-pill')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
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
  }, [isHovering, isVisible])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    if (isHovering) {
      gsap.to(cursor, {
        scale: 2.2,
        backgroundColor: 'rgba(0, 69, 186, 0.22)',
        borderColor: '#0045ba',
        duration: 0.28,
        ease: 'power2.out',
      })
    } else {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.28,
        ease: 'power2.out',
      })
    }
  }, [isHovering])

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor-ring ${isVisible ? 'is-active' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isVisible ? 'is-active' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}

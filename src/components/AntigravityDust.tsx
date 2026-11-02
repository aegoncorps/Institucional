import { useEffect, useRef } from 'react'

interface Particle {
  baseX: number
  baseY: number
  x: number
  y: number
  z: number
  size: number
  color: string
  alpha: number
  vx: number
  vy: number
  phase: number
}

/**
 * Campo de partículas antigravidade em órbita espacial suave:
 * - 70 partículas suspensas em gravidade zero
 * - Respondem ao movimento do mouse com efeito de paralaxe por profundidade (Z)
 * - Cores da paleta oficial Aegon (Azul System Wake, Azul Elétrico, Core Pulse)
 * - Altamente otimizado (Canvas 2D, pausa fora do viewport)
 */
export function AntigravityDust({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const colors = [
      'rgba(0, 69, 186, 0.85)',   // Azul System Wake
      'rgba(59, 130, 246, 0.75)',  // Azul Elétrico
      'rgba(96, 165, 250, 0.65)',  // Cyan Light
      'rgba(255, 241, 228, 0.55)', // Core Pulse
    ]

    const count = 70
    const particles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 2 + 0.5 // profundidade de 0.5 a 2.5
      particles.push({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        x: 0,
        y: 0,
        z,
        size: (Math.random() * 1.8 + 0.8) * z * 0.75,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.35,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
      })
    }

    let targetNx = 0
    let targetNy = 0
    let currentNx = 0
    let currentNy = 0
    let isVisible = true
    let animId = 0

    const onMouseMove = (e: MouseEvent) => {
      targetNx = (e.clientX - width / 2) / (width / 2)
      targetNy = (e.clientY - height / 2) / (height / 2)
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const onScroll = () => {
      // Pausa a renderização quando o usuário rolar para fora da primeira tela
      isVisible = window.scrollY < window.innerHeight * 1.2
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    let time = 0
    const render = () => {
      if (isVisible) {
        time += 0.015
        ctx.clearRect(0, 0, width, height)

        // Interpolação suave do mouse (inércia física de gravidade zero)
        currentNx += (targetNx - currentNx) * 0.05
        currentNy += (targetNy - currentNy) * 0.05

        for (let i = 0; i < count; i++) {
          const p = particles[i]

          // Movimento orbital suave em gravidade zero
          p.baseX += p.vx
          p.baseY += p.vy

          // Wrap around edges
          if (p.baseX < 0) p.baseX = width
          if (p.baseX > width) p.baseX = 0
          if (p.baseY < 0) p.baseY = height
          if (p.baseY > height) p.baseY = 0

          // Deslocamento por paralaxe de profundidade (efeito antigravidade 3D)
          const parallaxX = currentNx * p.z * 32
          const parallaxY = currentNy * p.z * 24

          // Respiração sutil de brilho
          const pulse = Math.sin(time + p.phase) * 0.2 + 0.8

          p.x = p.baseX + parallaxX
          p.y = p.baseY + parallaxY

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.alpha * pulse
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`portal__antigravity-dust ${className}`}
      aria-hidden="true"
    />
  )
}


import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { getPillGeometry, pillClipString, getPlanetOffset, type PillGeometry } from '../lib/clip'
import { VIDEO_SRC, whatsappLink } from '../config'
import { ArrowDown, ArrowRight, WhatsApp } from '../components/Icons'
import { LOGO_PATHS, OnBrandPill } from '../components/Logo'
import { AntigravityDust } from '../components/AntigravityDust'

/**
 * Atos 0 + 1 — Ignição e Portal "on".
 * - Efeito Antigravity / Gravidade Zero: a logo flutua em 3D reagindo ao mouse com inércia física.
 * - Luz azul viva de DENTRO da logo: feixe volumétrico e brilho especular que se deslocam
 *   diretamente pela cápsula do switch e pelo olho do "g" acompanhando o mouse.
 * - Partículas de poeira espacial em gravidade zero (AntigravityDust).
 * - Planeta no vídeo 100% alinhado dentro do "on".
 * - Abertura com bordas 100% arredondadas (cápsula contínua sem cantos quadrados).
 * - "Juntos, on." usando o badge com o glifo VomZom oficial da identidade visual.
 */
export function Portal() {
  const uid = useId().replace(/:/g, '')
  const maskId = `portal-logo-mask-${uid}`
  const switchClipId = `portal-switch-clip-${uid}`
  const lightGradId = `portal-light-grad-${uid}`
  const specularGradId = `portal-specular-grad-${uid}`
  const blurFilterId = `portal-blur-${uid}`

  const stage = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const videoWrap = useRef<HTMLDivElement>(null)
  const tint = useRef<HTMLDivElement>(null)
  const pillWindow = useRef<SVGRectElement>(null)
  const onGroup = useRef<SVGGElement>(null)
  const aegGroup = useRef<SVGGElement>(null)
  const blueSwitch = useRef<SVGGElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const headline = useRef<HTMLDivElement>(null)

  const logoWrap = useRef<HTMLDivElement>(null)
  const logoLight = useRef<HTMLDivElement>(null)
  const innerLightEl = useRef<SVGEllipseElement>(null)
  const innerSpecularEl = useRef<SVGEllipseElement>(null)

  // 1. Efeito Antigravidade do Mouse & Luz Azul Reativa DE DENTRO da Logo
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const wrapEl = logoWrap.current
    const lightEl = logoLight.current
    if (!wrapEl || !lightEl) return

    // Quick setters do GSAP para performance impecável de 120fps
    const xToLogo = gsap.quickTo(wrapEl, 'x', { duration: 0.85, ease: 'power3.out' })
    const yToLogo = gsap.quickTo(wrapEl, 'y', { duration: 0.85, ease: 'power3.out' })
    const rxToLogo = gsap.quickTo(wrapEl, 'rotateX', { duration: 0.85, ease: 'power3.out' })
    const ryToLogo = gsap.quickTo(wrapEl, 'rotateY', { duration: 0.85, ease: 'power3.out' })

    const xToLight = gsap.quickTo(lightEl, 'x', { duration: 0.5, ease: 'power2.out' })
    const yToLight = gsap.quickTo(lightEl, 'y', { duration: 0.5, ease: 'power2.out' })

    let targetNx = 0
    let targetNy = 0
    let currentNx = 0
    let currentNy = 0
    let animId = 0

    const onMouseMove = (e: MouseEvent) => {
      // Normalizado de -1 a 1 em relação ao centro da janela
      targetNx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      targetNy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      targetNx = Math.max(-1, Math.min(1, targetNx))
      targetNy = Math.max(-1, Math.min(1, targetNy))
    }

    const onMouseLeave = () => {
      targetNx = 0
      targetNy = 0
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    const updateFrame = () => {
      // Ativo apenas na primeira tela (hero)
      if (window.scrollY < window.innerHeight * 0.75) {
        currentNx += (targetNx - currentNx) * 0.08
        currentNy += (targetNy - currentNy) * 0.08

        // A. Efeito Antigravidade 3D na Logo
        xToLogo(currentNx * 36)
        yToLogo(currentNy * 24)
        ryToLogo(currentNx * 18)
        rxToLogo(-currentNy * 14)

        // B. Aura de Luz Azul volumétrica no fundo
        xToLight(currentNx * 105)
        yToLight(currentNy * 70)

        // C. Luz Azul DE DENTRO da Logo:
        // No sistema viewBox (x: 36..234, y: 22..84):
        // Centro do switch = 175.75, 44 | Centro do círculo do "g" = 141, 44
        const lightX = 175 + currentNx * 42
        const lightY = 44 + currentNy * 14

        if (innerLightEl.current) {
          innerLightEl.current.setAttribute('cx', lightX.toFixed(2))
          innerLightEl.current.setAttribute('cy', lightY.toFixed(2))
        }
        if (innerSpecularEl.current) {
          innerSpecularEl.current.setAttribute('cx', (lightX - 2).toFixed(2))
          innerSpecularEl.current.setAttribute('cy', (lightY - 1).toFixed(2))
        }
      }
      animId = requestAnimationFrame(updateFrame)
    }

    animId = requestAnimationFrame(updateFrame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // 2. Timeline de Zoom-screen com ScrollTrigger
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const state = { p: 0 }
        let geom: PillGeometry | null =
          pillWindow.current && stage.current
            ? getPillGeometry(pillWindow.current as unknown as HTMLElement, stage.current)
            : null
        let planet: { x: number; y: number; scale: number } | null =
          pillWindow.current && stage.current
            ? getPlanetOffset(pillWindow.current as unknown as HTMLElement, stage.current, 1.55)
            : null

        const apply = () => {
          if (media.current && geom && stage.current) {
            media.current.style.clipPath = pillClipString(geom, stage.current, state.p)
          }
        }

        const measure = () => {
          if (!pillWindow.current || !stage.current) return
          geom = getPillGeometry(pillWindow.current as unknown as HTMLElement, stage.current)
          planet = getPlanetOffset(pillWindow.current as unknown as HTMLElement, stage.current, 1.55)
          apply()
        }

        measure()
        ScrollTrigger.addEventListener('refresh', measure)

        // Posicionamento inicial: o planeta fica exatamente cravado no centro da pílula "on"
        const initialPlanet = planet ?? { x: 0, y: 0, scale: 1.55 }
        if (videoWrap.current) {
          gsap.set(videoWrap.current, {
            x: initialPlanet.x,
            y: initialPlanet.y,
            scale: initialPlanet.scale,
            transformOrigin: 'center center',
          })
        }

        const items = headline.current!.children
        gsap.set(items, { opacity: 0, y: 60 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top top',
            end: '+=240%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        tl.to(hint.current, { opacity: 0, y: 24, duration: 0.08 }, 0)
          .to(logoWrap.current, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.15 }, 0)
          .to(logoLight.current, { opacity: 0, scale: 2, duration: 0.35 }, 0)
          .to(
            onGroup.current,
            { scale: 2.4, opacity: 0, svgOrigin: '193 44', duration: 0.26, ease: 'power1.in' },
            0.02,
          )
          .to(
            aegGroup.current,
            { x: -65, opacity: 0, filter: 'blur(8px)', duration: 0.34, ease: 'power1.in' },
            0.02,
          )
          .to(
            blueSwitch.current,
            { scale: 2.8, opacity: 0, svgOrigin: '193 44', duration: 0.38, ease: 'power2.in' },
            0.05,
          )
          // Expansão do portal com bordas 100% arredondadas (stadium/cápsula perfeita)
          .to(state, { p: 1, duration: 0.72, ease: 'power2.inOut', onUpdate: apply }, 0.06)
          // Transição suave do vídeo: o planeta abre de dentro da pílula até o centro de tela cheia
          .to(
            videoWrap.current,
            { x: 0, y: 0, scale: 1, duration: 0.76, ease: 'power2.out' },
            0.06,
          )
          .to(tint.current, { opacity: 0, duration: 0.45 }, 0.28)
          .to(items, { opacity: 1, y: 0, stagger: 0.035, duration: 0.18, ease: 'power2.out' }, 0.72)
          .to({}, { duration: 0.12 })

        return () => ScrollTrigger.removeEventListener('refresh', measure)
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        media.current!.style.clipPath = 'none'
        gsap.set(
          [hint.current, aegGroup.current, blueSwitch.current, onGroup.current, tint.current, logoLight.current],
          { opacity: 0 },
        )
      })
    }, stage)

    return () => ctx.revert()
  }, [])

  return (
    <section className="portal" id="inicio" ref={stage} aria-label="Aegon">
      {/* Campo de poeira e partículas em órbita com efeito antigravidade 3D */}
      <AntigravityDust />

      <div className="portal__media" ref={media}>
        <div className="portal__video" ref={videoWrap}>
          <video src={VIDEO_SRC} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        </div>
        <div className="portal__tint" ref={tint} />
        <div className="portal__shade" />
      </div>

      {/* Wrapper da logo com efeito Antigravidade 3D e Luz Azul reativa */}
      <div className="portal__logo-wrap" ref={logoWrap}>
        {/* Luz azul volumétrica externa que se move com o cursor */}
        <div className="portal__logo-light" ref={logoLight} aria-hidden="true" />

        {/* Container de flutuação contínua em gravidade zero */}
        <div className="portal__logo-zerog">
          <svg
            className="portal__logo-svg"
            viewBox="36 22 198 62"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x="30" y="20" width="210" height="70">
                <rect x="30" y="20" width="210" height="70" fill="white" />
                <rect x="160.5" y="28.5" width="65" height="31" rx="15.5" fill="black" />
                <path fill="black" fillRule="evenodd" d={LOGO_PATHS.gMaskRing} />
                <path fill="black" d={LOGO_PATHS.gMaskStem} />
              </mask>

              {/* Clip path exato da forma azul (switch + círculo interno do "g") */}
              <clipPath id={switchClipId} clipPathUnits="userSpaceOnUse">
                <rect x="122" y="25" width="107.5" height="38" rx="19" mask={`url(#${maskId})`} />
                <circle cx="141" cy="44" r="9.2" />
              </clipPath>

              {/* Feixe de luz azul viva de dentro da cápsula */}
              <radialGradient id={lightGradId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#0057ff" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#0045ba" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0045ba" stopOpacity="0" />
              </radialGradient>

              {/* Ponto focal especular brilhante */}
              <radialGradient id={specularGradId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="#bfdbfe" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </radialGradient>

              <filter id={blurFilterId} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" />
              </filter>
            </defs>

            {/* Retângulo de referência na janela interna da cápsula "on" (usado pelo clip-path do vídeo) */}
            <rect
              ref={pillWindow}
              x="160.5"
              y="28.5"
              width="65"
              height="31"
              rx="15.5"
              fill="transparent"
              stroke="none"
            />

            {/* Camada Azul: Switch + círculo do "g" com Luz Azul Viva que se mexe com o mouse */}
            <g ref={blueSwitch} clipPath={`url(#${switchClipId})`}>
              {/* Base sólida no Azul System Wake oficial */}
              <rect x="110" y="20" width="130" height="55" fill="#0045ba" />

              {/* Luz azul interna viva que percorre a cápsula e o olho do "g" */}
              <ellipse
                ref={innerLightEl}
                cx="175"
                cy="44"
                rx="42"
                ry="24"
                fill={`url(#${lightGradId})`}
                filter={`url(#${blurFilterId})`}
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Ponto focal especular brilhante no centro da luz */}
              <ellipse
                ref={innerSpecularEl}
                cx="175"
                cy="44"
                rx="16"
                ry="10"
                fill={`url(#${specularGradId})`}
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Contorno sutil da cápsula para acabamento refinado */}
              <rect
                x="122"
                y="25"
                width="107.5"
                height="38"
                rx="19"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="0.75"
                opacity="0.5"
              />
            </g>

            {/* Camada Branca: Letras "aeg" */}
            <g ref={aegGroup} fill="#ffffff">
              <path fillRule="evenodd" d={LOGO_PATHS.a} />
              <path fillRule="evenodd" d={LOGO_PATHS.e} />
              <path fillRule="evenodd" d={LOGO_PATHS.g} />
            </g>

            {/* Camada Branca: Letras "on" dentro da janela do portal */}
            <g ref={onGroup} fill="#ffffff">
              <path fillRule="evenodd" d={LOGO_PATHS.o} />
              <path d={LOGO_PATHS.n} />
            </g>
          </svg>
        </div>
      </div>

      <div className="portal__hint" ref={hint}>
        <span>Role para ligar</span>
        <span className="portal__hint-line"><ArrowDown size={16} /></span>
        <button type="button" className="portal__skip" onClick={() => scrollToTarget('#manifesto')}>
          Pular intro
        </button>
      </div>

      <div className="portal__headline container" ref={headline}>
        <p className="eyebrow">Estratégia · Criação · Tecnologia</p>
        <h1>
          Um novo capítulo.
          <br />
          Juntos, <OnBrandPill className="portal__on-pill" />
        </h1>
        <p className="lead">Transformamos desafios reais em soluções digitais com propósito humano.</p>
        <div className="actions">
          <a className="btn btn--on" href={whatsappLink()} target="_blank" rel="noopener">
            <WhatsApp size={18} /> Falar no WhatsApp
          </a>
          <a className="btn btn--ghost" href="#solucoes">
            Ver soluções <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

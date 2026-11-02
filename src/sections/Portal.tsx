import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { getPillGeometry, pillClipString, getPlanetOffset, type PillGeometry } from '../lib/clip'
import { VIDEO_SRC, whatsappLink } from '../config'
import { ArrowDown, ArrowRight, WhatsApp } from '../components/Icons'
import { LOGO_PATHS, OnBrandPill } from '../components/Logo'

/**
 * Atos 0 + 1 — Ignição e Portal "on".
 * - Efeito Antigravity / Magnético: a logo flutua sutilmente em 3D reagindo ao mouse.
 * - Luz azul dinâmica: feixe volumétrico e gradiente de iluminação dentro da logo que se move com o cursor.
 * - Planeta no vídeo 100% alinhado dentro do "on".
 * - Abertura com bordas 100% arredondadas (cápsula contínua sem cantos quadrados).
 * - "Juntos, on." usando o badge com o glifo VomZom oficial da identidade visual.
 */
export function Portal() {
  const uid = useId().replace(/:/g, '')
  const maskId = `portal-logo-mask-${uid}`
  const lightGradId = `portal-light-grad-${uid}`

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
  const lightGrad = useRef<SVGRadialGradientElement>(null)

  // 1. Efeito Antigravidade do Mouse & Luz Azul Reativa
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const stageEl = stage.current
    const wrapEl = logoWrap.current
    const lightEl = logoLight.current
    if (!stageEl || !wrapEl || !lightEl) return

    // Quick setters do GSAP para fluidez suave com inércia física
    const xToLogo = gsap.quickTo(wrapEl, 'x', { duration: 0.9, ease: 'power3.out' })
    const yToLogo = gsap.quickTo(wrapEl, 'y', { duration: 0.9, ease: 'power3.out' })
    const rxToLogo = gsap.quickTo(wrapEl, 'rotateX', { duration: 0.9, ease: 'power3.out' })
    const ryToLogo = gsap.quickTo(wrapEl, 'rotateY', { duration: 0.9, ease: 'power3.out' })

    const xToLight = gsap.quickTo(lightEl, 'x', { duration: 0.45, ease: 'power2.out' })
    const yToLight = gsap.quickTo(lightEl, 'y', { duration: 0.45, ease: 'power2.out' })

    const onMouseMove = (e: MouseEvent) => {
      const rect = stageEl.getBoundingClientRect()
      // Coordenadas normalizadas [-0.5, 0.5]
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5

      // Antigravity 3D tilt na logo
      xToLogo(nx * 32)
      yToLogo(ny * 22)
      ryToLogo(nx * 14)
      rxToLogo(-ny * 12)

      // A luz azul interna se desloca acompanhando o mouse
      xToLight(nx * 140)
      yToLight(ny * 95)

      // Atualiza o ponto focal de luz dentro do switch azul
      if (lightGrad.current) {
        const cx = 50 + nx * 55
        const cy = 50 + ny * 55
        lightGrad.current.setAttribute('cx', `${cx}%`)
        lightGrad.current.setAttribute('cy', `${cy}%`)
        lightGrad.current.setAttribute('fx', `${cx}%`)
        lightGrad.current.setAttribute('fy', `${cy}%`)
      }
    }

    const onMouseLeave = () => {
      xToLogo(0)
      yToLogo(0)
      rxToLogo(0)
      ryToLogo(0)
      xToLight(0)
      yToLight(0)
    }

    stageEl.addEventListener('mousemove', onMouseMove, { passive: true })
    stageEl.addEventListener('mouseleave', onMouseLeave)

    return () => {
      stageEl.removeEventListener('mousemove', onMouseMove)
      stageEl.removeEventListener('mouseleave', onMouseLeave)
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
      <div className="portal__media" ref={media}>
        <div className="portal__video" ref={videoWrap}>
          <video src={VIDEO_SRC} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        </div>
        <div className="portal__tint" ref={tint} />
        <div className="portal__shade" />
      </div>

      {/* Wrapper da logo com efeito Antigravidade 3D e Luz Azul reativa */}
      <div className="portal__logo-wrap" ref={logoWrap}>
        {/* Luz azul volumétrica que se move com o cursor */}
        <div className="portal__logo-light" ref={logoLight} aria-hidden="true" />

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

            {/* Gradiente dinâmico da luz azul dentro do switch */}
            <radialGradient
              id={lightGradId}
              ref={lightGrad}
              cx="50%"
              cy="50%"
              r="70%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#4f8aff" stopOpacity="1" />
              <stop offset="45%" stopColor="#0045ba" stopOpacity="1" />
              <stop offset="100%" stopColor="#002b7a" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Retângulo de referência na janela interna da cápsula "on" (usado pelo clip-path) */}
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

          {/* Camada Azul: Switch + círculo interno do "g" com iluminação dinâmica */}
          <g ref={blueSwitch} fill={`url(#${lightGradId})`}>
            <rect x="122" y="25" width="107.5" height="38" rx="19" mask={`url(#${maskId})`} />
            <circle cx="141" cy="44" r="9.2" />
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

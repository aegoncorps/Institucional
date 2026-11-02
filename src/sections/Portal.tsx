import { useId, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { getPillGeometry, pillClipString, getPlanetOffset, type PillGeometry } from '../lib/clip'
import { VIDEO_SRC, whatsappLink } from '../config'
import { ArrowDown, ArrowRight, WhatsApp } from '../components/Icons'
import { LOGO_PATHS, OnBrandPill } from '../components/Logo'

/**
 * Atos 0 + 1 — Ignição e Portal "on" (Versão Estável sem animação de mouse na tela inicial).
 * - Tela inicial estática, limpa e imersiva: a logo repousa perfeitamente no centro.
 * - Planeta no vídeo 100% alinhado dentro do "on".
 * - Abertura com bordas 100% arredondadas (cápsula contínua sem cantos quadrados) ativada exclusivamente pelo scroll.
 * - "Juntos, on." usando o badge com o glifo VomZom oficial da identidade visual.
 */
export function Portal() {
  const uid = useId().replace(/:/g, '')
  const maskId = `portal-logo-mask-${uid}`

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

  // Timeline de Zoom-screen com ScrollTrigger (ativada exclusivamente pelo scroll)
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
          // Expansão do portal com bordas 100% arredondadas (stadium/cápsula contínua)
          .to(state, { p: 1, duration: 0.72, ease: 'power2.inOut', onUpdate: apply }, 0.06)
          // Transição suave do vídeo: o planeta abre de dentro da pílula até o centro da tela cheia
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

      {/* Wrapper da logo (estático e elegante na tela inicial) */}
      <div className="portal__logo-wrap" ref={logoWrap}>
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

          {/* Camada Azul: Switch + círculo do "g" no Azul System Wake oficial */}
          <g ref={blueSwitch} fill="#0045ba">
            <rect x="122" y="25" width="107.5" height="38" rx="19" mask={`url(#${maskId})`} />
            <circle cx="141" cy="44" r="9.2" />
          </g>

          {/* Camada Branca: Letras "aeg" */}
          <g ref={aegGroup} fill="var(--logo-aeg-color, #ffffff)">
            <path fillRule="evenodd" d={LOGO_PATHS.a} />
            <path fillRule="evenodd" d={LOGO_PATHS.e} />
            <path fillRule="evenodd" d={LOGO_PATHS.g} />
          </g>

          {/* Camada Branca: Letras "on" dentro da janela do portal */}
          <g ref={onGroup} fill="var(--logo-on-color, #ffffff)">
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

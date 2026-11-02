import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/motion'
import { getPillGeometry, pillClipString, type PillGeometry } from '../lib/clip'
import { whatsappLink } from '../config'
import { WhatsApp } from '../components/Icons'
import { OnSwitchBadge } from '../components/Logo'

/**
 * Ato 6 — Fechamento circular (zoom-out de volta para a pílula "on").
 * A tela inteira se recolhe mantendo bordas 100% arredondadas (cápsula contínua)
 * para dentro da pílula do switch, que pousa como botão principal de WhatsApp.
 */
export function FinalCta() {
  const stage = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const targetPill = useRef<HTMLAnchorElement>(null)
  const copy = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const state = { p: 0 }
        let geom: PillGeometry

        const apply = () => {
          if (media.current && geom && stage.current) {
            media.current.style.clipPath = pillClipString(geom, stage.current, 1 - state.p)
          }
        }

        const measure = () => {
          if (!targetPill.current || !stage.current) return
          geom = getPillGeometry(targetPill.current, stage.current)
          apply()
        }

        measure()
        ScrollTrigger.addEventListener('refresh', measure)

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current,
            start: 'top top',
            end: '+=165%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        tl.to(state, { p: 1, duration: 0.72, ease: 'power2.inOut', onUpdate: apply }, 0)
          .fromTo(copy.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.35)
          .to({}, { duration: 0.2 })

        return () => ScrollTrigger.removeEventListener('refresh', measure)
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (media.current) media.current.style.display = 'none'
      })
    }, stage)

    return () => ctx.revert()
  }, [])

  return (
    <section className="final-cta" id="contato" ref={stage} aria-label="Contato">
      <div className="final-cta__media" ref={media} aria-hidden="true">
        <img src="/assets/img/design.jpg" alt="" loading="lazy" />
        <div className="duotone" />
      </div>

      <div className="final-cta__inner container">
        <div className="final-cta__copy" ref={copy}>
          <p className="eyebrow">Próximo passo</p>
          <h2>
            Pronto para ligar
            <br />o próximo capítulo?
          </h2>
          <p className="lead">
            Conte pra gente o desafio do seu negócio. Respondemos rápido e direto ao ponto no WhatsApp.
          </p>
        </div>

        <a
          ref={targetPill}
          className="final-cta__pill"
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          aria-label="Ligar conversa com a Aegon no WhatsApp"
        >
          <OnSwitchBadge className="final-cta__switch" />
          <span className="final-cta__pill-label">
            <WhatsApp size={20} /> Vamos conversar no WhatsApp
          </span>
        </a>
      </div>
    </section>
  )
}

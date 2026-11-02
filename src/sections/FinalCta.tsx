import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router'
import { gsap } from '../lib/motion'
import { ArrowRight } from '../components/Icons'

/**
 * Ato 6 — O "on" Final (Portal Reverso com Construção & Saída).
 * - Entrada (scrub): Eyebrow, título e lead emergem em cascata; a imagem de fundo
 *   recolhe-se em direção à cápsula "on" central.
 * - Saída (scrub): Ao descer para o rodapé, o conjunto sobe suavemente em parallax.
 */
export function FinalCta() {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const copyParts = gsap.utils.toArray<HTMLElement>(
          '.final-cta__copy .eyebrow, .final-cta__copy h2, .final-cta__copy .lead'
        )
        gsap.set(media.current, { clipPath: 'inset(0% 0% 0% 0% round 0px)' })
        gsap.set(copyParts, { y: 44, opacity: 0 })
        gsap.set(pill.current, { y: 36, scale: 0.86, opacity: 0 })

        // 1. Entrada e Fechamento da Cápsula
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 82%',
            end: 'center center',
            scrub: 0.75,
          },
        })

        tl.to(
          copyParts,
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power3.out',
          },
          0
        )
          .to(
            media.current,
            {
              clipPath: 'inset(38% 36% 38% 36% round 999px)',
              duration: 1,
              ease: 'power2.inOut',
            },
            0.05
          )
          .to(
            pill.current,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: 'back.out(1.5)',
            },
            0.35
          )

        // 2. Saída suave ao rolar para o Footer
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'bottom 75%',
            end: 'bottom 10%',
            scrub: 0.65,
          },
        })

        exitTl
          .to(
            copyParts,
            {
              y: -38,
              opacity: 0.15,
              stagger: 0.04,
              duration: 0.5,
              ease: 'power2.in',
            },
            0
          )
          .to(
            pill.current,
            {
              y: -26,
              scale: 0.95,
              opacity: 0.25,
              duration: 0.5,
              ease: 'power2.in',
            },
            0.08
          )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="final-cta" id="contato" ref={root} aria-label="Contato">
      <div className="final-cta__media" ref={media} aria-hidden="true">
        <img src="/assets/media/cta-bg.jpg" alt="" loading="lazy" decoding="async" />
        <div className="duotone" />
      </div>

      <div className="container final-cta__inner">
        <div className="final-cta__copy">
          <p className="eyebrow">05 / Próximo capítulo</p>
          <h2>Pronto para ligar o próximo capítulo?</h2>
          <p className="lead">
            Conte pra gente o que sua empresa precisa destravar. A primeira conversa é direta, sem roteiro engessado.
          </p>
        </div>

        <Link
          ref={pill}
          to="/contato"
          className="final-cta__pill interactive"
        >
          <span className="switch-pill is-on" aria-hidden="true">
            <span className="switch-pill__knob" />
            <span className="switch-pill__text">on</span>
          </span>
          <span className="final-cta__pill-label">
            Iniciar um projeto <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </section>
  )
}

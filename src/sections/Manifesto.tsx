import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router'
import { gsap } from '../lib/motion'
import { ArrowRight } from '../components/Icons'

const SEGMENTS: { text: string; serif?: boolean; highlight?: boolean }[] = [
  { text: 'Unimos' },
  { text: 'estratégia,', serif: true },
  { text: 'criação', serif: true },
  { text: 'e' },
  { text: 'tecnologia', serif: true },
  { text: 'para' },
  { text: 'ligar', highlight: true },
  { text: 'ideias,' },
  { text: 'marcas' },
  { text: 'e' },
  { text: 'negócios' },
  { text: 'ao' },
  { text: 'que' },
  { text: 'vem' },
  { text: 'pela' },
  { text: 'frente.' },
]

/**
 * Ato 2 — O Manifesto.
 * - Entrada (scrub): Eyebrow desliza, palavras acendem e emergem uma a uma conforme o scroll,
 *   chave "on" comuta para o estado ligado e o bloco lateral constrói sua linha e chamada.
 * - Saída (scrub): Ao continuar descendo rumo a #solucoes, os elementos do Manifesto
 *   deslizam em camadas para cima com redução de escala e fade progressivo.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const switchRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const eyebrow = root.current?.querySelector('.eyebrow')
      const words = gsap.utils.toArray<HTMLElement>('.word')
      const aside = root.current?.querySelector('.manifesto__aside')
      const quoteBlock = root.current?.querySelector('.manifesto__quote')

      gsap.set(words, { opacity: 0.15, y: 16 })
      if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 24 })
      if (aside) gsap.set(aside, { opacity: 0, y: 42 })

      // 1. Timeline de Entrada (Construção progressiva conforme desce)
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 82%',
          end: 'center 48%',
          scrub: 0.65,
        },
      })

      if (eyebrow) {
        enterTl.to(
          eyebrow,
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
          0
        )
      }

      enterTl.to(
        words,
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: 'power2.out',
        },
        0.08
      )

      if (aside) {
        enterTl.to(
          aside,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
          },
          0.32
        )
      }

      // Aciona a chave "on" no meio da leitura
      enterTl.call(
        () => {
          switchRef.current?.classList.add('is-on')
        },
        [],
        0.52
      )

      // 2. Timeline de Saída (Desconstrução cinematográfica ao descer para #solucoes)
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'bottom 68%',
          end: 'bottom 8%',
          scrub: 0.65,
        },
      })

      if (eyebrow) {
        exitTl.to(
          eyebrow,
          { y: -36, opacity: 0, duration: 0.4, ease: 'power2.in' },
          0
        )
      }

      if (quoteBlock) {
        exitTl.to(
          quoteBlock,
          {
            y: -52,
            scale: 0.96,
            opacity: 0.08,
            duration: 0.6,
            ease: 'power2.in',
          },
          0.05
        )
      }

      if (aside) {
        exitTl.to(
          aside,
          {
            y: -72,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.in',
          },
          0.1
        )
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="manifesto" id="manifesto" ref={root} aria-label="Propósito da Aegon">
      <div className="container">
        <div className="editorial-rule" data-scroll-line />
        <p className="eyebrow">01 / Nosso propósito</p>

        <div className="manifesto__grid" ref={gridRef}>
          <blockquote className="manifesto__quote">
            {SEGMENTS.map((seg, i) => (
              <span
                key={i}
                className={`word ${seg.serif ? 'word--serif' : ''} ${seg.highlight ? 'word--highlight' : ''}`}
              >
                {seg.text}{' '}
              </span>
            ))}

            <span className="manifesto__switch" ref={switchRef} aria-hidden="true">
              <span className="manifesto__switch-knob" />
              <span className="manifesto__switch-text">on</span>
            </span>
          </blockquote>

          <div className="manifesto__aside">
            <p>
              Mais do que entregar projetos isolados, trabalhamos lado a lado com cada cliente para entender o negócio,
              desenhar caminhos possíveis e colocar em prática soluções que geram resultado real.
            </p>
            <div className="manifesto__cta">
              <Link to="/sobre" className="btn btn--ghost btn--sm interactive">
                Conheça nossa história e método <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

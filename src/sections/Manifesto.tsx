import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/motion'
import { OnSwitchBadge } from '../components/Logo'

const TEXT =
  'Estratégia, criação e tecnologia para transformar *desafios reais* em soluções digitais com *propósito humano.*'

/** Ato 2 — Manifesto: palavras acendem conforme o scroll (respiro entre os zooms). */
export function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.manifesto__word',
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: '.manifesto__text', start: 'top 78%', end: 'bottom 45%', scrub: true },
          },
        )
        gsap.from('.manifesto__aside', {
          opacity: 0,
          y: 30,
          scrollTrigger: { trigger: '.manifesto__aside', start: 'top 90%', end: 'top 65%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  let highlight = false
  const words = TEXT.split(' ').map((raw, i) => {
    const starts = raw.startsWith('*')
    const ends = raw.endsWith('*') || raw.endsWith('*.')
    if (starts) highlight = true
    const word = raw.replace(/\*/g, '')
    const node = (
      <span key={i} className={`manifesto__word ${highlight ? 'is-highlight' : ''}`}>
        {word}{' '}
      </span>
    )
    if (ends) highlight = false
    return node
  })

  return (
    <section className="manifesto" id="manifesto" ref={root}>
      <div className="container">
        <p className="eyebrow">Manifesto</p>
        <h2 className="manifesto__text">{words}</h2>
        <div className="manifesto__aside">
          <OnSwitchBadge className="manifesto__switch" />
          <p>
            Tudo se resolve no mesmo botão. Um parceiro que pensa, cria e constrói junto com você, do
            diagnóstico à entrega.
          </p>
        </div>
      </div>
    </section>
  )
}

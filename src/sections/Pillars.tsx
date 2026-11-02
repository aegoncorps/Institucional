import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap } from '../lib/motion'
import { pillars } from '../data/content'
import { ArrowRight } from '../components/Icons'

/**
 * Ato 3 — As 3 Frentes de Atuação (Cortina de Pilares Coreografada).
 * - Entrada da seção: o palco expande sua máscara e os elementos internos do Pilar 01
 *   (número monumental, kicker, título, descrição, pílulas e CTAs) se constroem em cascata.
 * - Transição entre pilares (01 -> 02 -> 03): saída escalonada peça por peça do pilar
 *   anterior + abertura de cortina da nova cena + entrada escalonada do novo pilar.
 * - Saída da seção: desconstrução suave ao entregar o palco para #produtos.
 */
export function Pillars() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const scenes = gsap.utils.toArray<HTMLElement>('.pillar-scene')
        const copies = gsap.utils.toArray<HTMLElement>('.pillar-copy')
        const dotsWrap = root.current?.querySelector('.pillars__dots')

        // Helper para buscar as peças internas de cada bloco de copy
        const getCopyParts = (copyEl: HTMLElement) =>
          gsap.utils.toArray<HTMLElement>(
            '.pillar-copy__number, .eyebrow, .pillar-copy__kicker, h2, .pillar-copy__text, .pillar-copy__list li, .pillar-copy__actions',
            copyEl
          )

        // Estado inicial das cenas
        scenes.forEach((s, i) => {
          if (i > 0) gsap.set(s, { clipPath: 'inset(100% 0% 0% 0%)' })
        })

        // Estado inicial dos blocos de texto e suas peças
        copies.forEach((c, i) => {
          const parts = getCopyParts(c)
          if (i === 0) {
            gsap.set(c, { autoAlpha: 1 })
            gsap.set(parts, { y: 46, opacity: 0 })
          } else {
            gsap.set(c, { autoAlpha: 0 })
            gsap.set(parts, { y: 48, opacity: 0 })
          }
        })

        // 0. Pré-entrada conforme a seção sobe na tela (antes de travar no topo)
        const firstParts = getCopyParts(copies[0])
        const firstImg = scenes[0]?.querySelector('img')
        if (firstImg) gsap.set(firstImg, { scale: 1.15 })
        if (dotsWrap) gsap.set(dotsWrap, { y: 24, opacity: 0 })

        const preEnterTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 88%',
            end: 'top top',
            scrub: 0.65,
          },
        })

        preEnterTl.to(
          firstParts,
          {
            y: 0,
            opacity: 1,
            stagger: 0.045,
            duration: 0.6,
            ease: 'power3.out',
          },
          0.1
        )
        if (firstImg) {
          preEnterTl.to(firstImg, { scale: 1, duration: 0.8, ease: 'power2.out' }, 0)
        }
        if (dotsWrap) {
          preEnterTl.to(dotsWrap, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.35)
        }

        // 1. Timeline principal pinada (Troca 01 -> 02 -> 03 + Saída final)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                pillars.length - 1,
                Math.floor(self.progress * pillars.length + 0.12)
              )
              setActive(idx)
            },
          },
        })

        for (let i = 1; i < pillars.length; i++) {
          const stepStart = (i - 1) * 1.1 + 0.15
          const prevParts = getCopyParts(copies[i - 1])
          const nextParts = getCopyParts(copies[i])
          const img = scenes[i].querySelector('img')

          // A. Desconstrói o pilar anterior peça por peça para cima
          tl.to(
            prevParts,
            {
              y: -38,
              opacity: 0,
              stagger: 0.03,
              duration: 0.38,
              ease: 'power2.in',
            },
            stepStart
          ).set(copies[i - 1], { autoAlpha: 0 }, stepStart + 0.38)

          // B. Abre a cortina da nova cena de fundo com zoom-out cinematográfico
          tl.to(
            scenes[i],
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.85,
              ease: 'power2.inOut',
            },
            stepStart + 0.08
          )
          if (img) {
            tl.fromTo(
              img,
              { scale: 1.16 },
              { scale: 1, duration: 0.95, ease: 'power2.out' },
              stepStart + 0.08
            )
          }

          // C. Constrói o novo pilar peça por peça vindo de baixo
          tl.set(copies[i], { autoAlpha: 1 }, stepStart + 0.28).fromTo(
            nextParts,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.045,
              duration: 0.52,
              ease: 'power3.out',
            },
            stepStart + 0.3
          )
        }

        // 2. Saída coreografada no final do pin (entrega para #produtos)
        const lastParts = getCopyParts(copies[pillars.length - 1])
        const exitStart = (pillars.length - 1) * 1.1 + 0.35

        tl.to(
          lastParts,
          {
            y: -34,
            opacity: 0.12,
            stagger: 0.025,
            duration: 0.45,
            ease: 'power2.in',
          },
          exitStart
        )
        if (dotsWrap) {
          tl.to(
            dotsWrap,
            { y: 18, opacity: 0, duration: 0.35, ease: 'power2.in' },
            exitStart + 0.05
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="pillars" id="solucoes" ref={root} aria-label="Áreas de atuação">
      {/* Camada de cenas de fundo */}
      <div className="pillars__scenes" aria-hidden="true">
        {pillars.map((p, i) => (
          <div className={`pillar-scene pillar-scene--${i}`} key={p.id}>
            <img src={p.image} alt="" loading="lazy" decoding="async" />
            <div className="duotone" />
            <div className="pillar-scene__vignette" />
          </div>
        ))}
      </div>

      {/* Camada de conteúdo */}
      <div className="container pillars__content">
        <div className="pillars__copies">
          {pillars.map((p, i) => (
            <article
              className={`pillar-copy ${active === i ? 'is-active' : ''}`}
              key={p.id}
            >
              <div className="pillar-copy__left">
                <span className="pillar-copy__number">{p.number}</span>
                <span className="eyebrow">Frente de atuação</span>
              </div>

              <div className="pillar-copy__right">
                <p className="pillar-copy__kicker">{p.kicker}</p>
                <h2>{p.title}</h2>
                <p className="pillar-copy__text">{p.text}</p>

                <ul className="pillar-copy__list" aria-label={`Entregas de ${p.title}`}>
                  {p.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="pillar-copy__actions">
                  <Link
                    to={`/solucoes#${p.id}`}
                    className="btn btn--on interactive"
                  >
                    Explorar frente {p.title} <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Indicadores de progresso */}
        <div className="pillars__dots" role="tablist" aria-label="Pilares Aegon">
          {pillars.map((p, i) => (
            <div
              key={p.id}
              className={`pillars__dot ${active === i ? 'is-active' : ''}`}
              aria-current={active === i}
            >
              <span className="pillars__dot-num">{p.number}</span>
              <span className="pillars__dot-label">{p.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

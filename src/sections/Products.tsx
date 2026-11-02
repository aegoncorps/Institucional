import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, lockScroll } from '../lib/motion'
import { products, type Product } from '../data/content'
import { ArrowRight, Close, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'

/**
 * Ato 4 — Produtos e Soluções (Efeito Stacking Cards / Cartões Sobrepostos).
 * - O texto principal fica no topo da seção (eyebrow, título, subtítulo e contador).
 * - Conforme o usuário rola (scrub), cada card sobe e se sobrepõe ao anterior como um baralho,
 *   com escala reduzida no card de baixo, sombra profunda e luminosidade atenuada.
 * - Suporta navegação interativa e abertura de gaveta de detalhes completos.
 */
export function Products() {
  const root = useRef<HTMLElement>(null)
  const stack = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [selected, setSelected] = useState<Product | null>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])

  const totalCards = products.length + 1 // 4 produtos + 1 CTA sob medida = 5 cards

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
        if (!cards.length || !root.current) return

        // Estado inicial dos cards empilhados:
        // O primeiro card (0) começa visível em repouso.
        // Os cards seguintes (1..4) aguardam abaixo para subir e se sobrepor.
        gsap.set(cards[0], { yPercent: 0, scale: 1, filter: 'brightness(1)' })
        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], {
            yPercent: 115,
            scale: 1,
            filter: 'brightness(1)',
          })
        }

        // Timeline de rolagem com pin do container e scrub proporcional
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${(cards.length - 1) * 115}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`
              }
              const idx = Math.min(
                cards.length - 1,
                Math.round(self.progress * (cards.length - 1))
              )
              setActiveIdx(idx)
            },
          },
        })

        // Para cada card subsequente, anima o card anterior recuando e o novo subindo por cima
        for (let i = 1; i < cards.length; i++) {
          const stepTime = i - 1

          // 1. Os cards que ficam por baixo diminuem de escala e ganham profundidade
          for (let prev = 0; prev < i; prev++) {
            const depth = i - prev
            tl.to(
              cards[prev],
              {
                scale: Math.max(0.86, 1 - depth * 0.045),
                y: -depth * 14,
                filter: `brightness(${Math.max(0.48, 1 - depth * 0.22)})`,
                duration: 1,
                ease: 'power1.inOut',
              },
              stepTime
            )
          }

          // 2. O card atual sobe do fundo e pousa exatamente por cima do anterior
          tl.to(
            cards[i],
            {
              yPercent: 0,
              scale: 1,
              filter: 'brightness(1)',
              duration: 1,
              ease: 'power1.inOut',
            },
            stepTime
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [totalCards])

  useEffect(() => {
    lockScroll(Boolean(selected))
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section className="products" id="produtos" ref={root} aria-label="Produtos e ofertas">
      <div className="products__container">
        {/* Texto no topo da seção (eyebrow, título, subtítulo e contador) */}
        <header className="products__header">
          <div className="products__header-copy">
            <p className="eyebrow">Produtos & Consultoria</p>
            <h2>O que a Aegon liga no seu negócio.</h2>
            <p className="products__sub">
              Soluções próprias e consultoria prática para organizar, escalar e inovar sem complexidade desnecessária.
            </p>
          </div>

          <div className="products__nav">
            <div className="products__counter" aria-live="polite">
              <strong>{String(activeIdx + 1).padStart(2, '0')}</strong>
              <span>/ {String(totalCards).padStart(2, '0')}</span>
            </div>

            <div className="products__pills" role="tablist">
              {products.map((p, i) => (
                <span
                  key={p.id}
                  className={`products__pill ${activeIdx === i ? 'is-active' : ''}`}
                >
                  <span>0{i + 1}</span> {p.name.split(' ')[0]}
                </span>
              ))}
              <span
                className={`products__pill ${activeIdx === products.length ? 'is-active' : ''}`}
              >
                <span>05</span> Sob Medida
              </span>
            </div>
          </div>
        </header>

        {/* Stack de cards sobrepostos */}
        <div className="products__stack" ref={stack}>
          {products.map((p, idx) => (
            <article
              className={`product-card product-card--stack product-card--${idx}`}
              key={p.id}
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              style={{ zIndex: idx + 1 }}
            >
              <div className="product-card__media">
                <img src={p.image} alt={p.name} loading="lazy" decoding="async" />
                <div className="duotone" />
                <div className="product-card__badges">
                  <span className="badge badge--category">{p.category}</span>
                  <span className={`badge ${p.status === 'disponivel' ? 'badge--live' : 'badge--dev'}`}>
                    {p.status === 'disponivel' ? 'Disponível' : 'Em desenvolvimento'}
                  </span>
                </div>
                <span className="product-card__index">0{idx + 1}</span>
              </div>

              <div className="product-card__body">
                <div>
                  <span className="product-card__kicker">{p.category}</span>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>

                  <ul className="product-card__features">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="product-card__actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm interactive"
                    onClick={() => setSelected(p)}
                  >
                    Ver detalhes <ArrowRight size={15} />
                  </button>
                  <a
                    className="btn btn--on btn--sm interactive"
                    href={whatsappLink(p.whatsappMessage)}
                    target="_blank"
                    rel="noopener"
                  >
                    <WhatsApp size={15} /> {p.ctaLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* Card 5 final de conversão sob medida */}
          <article
            className="product-card product-card--stack product-card--cta-stack"
            key="cta-card"
            ref={(el) => {
              cardRefs.current[products.length] = el
            }}
            style={{ zIndex: products.length + 1 }}
          >
            <div className="product-card__cta-inner">
              <span className="eyebrow">Sob medida</span>
              <h3>Tem um desafio específico no seu negócio?</h3>
              <p>
                Desenhamos e construímos soluções digitais a partir da sua realidade — do diagnóstico inicial ao
                sistema em produção.
              </p>
              <div className="pt-2">
                <a
                  className="btn btn--on interactive"
                  href={whatsappLink('Olá, Aegon! Tenho um desafio específico no meu negócio e gostaria de conversar.')}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsApp size={18} /> Vamos construir juntos
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="products__progress" aria-hidden="true">
        <div className="products__progress-bar" ref={progress} />
      </div>

      {/* Drawer de detalhes completos do produto */}
      <div
        className={`product-drawer ${selected ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={selected?.name ?? 'Detalhes do produto'}
        aria-hidden={!selected}
      >
        <div className="product-drawer__backdrop" onClick={() => setSelected(null)} />
        {selected && (
          <div className="product-drawer__panel">
            <button
              type="button"
              className="product-drawer__close interactive"
              onClick={() => setSelected(null)}
              aria-label="Fechar detalhes"
            >
              <Close size={20} />
            </button>

            <div className="product-drawer__hero">
              <img src={selected.image} alt="" />
              <div className="duotone" />
              <div className="product-drawer__hero-copy">
                <span className={`badge ${selected.status === 'disponivel' ? 'badge--live' : 'badge--dev'}`}>
                  {selected.status === 'disponivel' ? 'Oferta disponível' : 'Em desenvolvimento'}
                </span>
                <h3>{selected.name}</h3>
              </div>
            </div>

            <div className="product-drawer__content">
              <div className="drawer-block">
                <h4>Para quem é</h4>
                <p>{selected.forWho}</p>
              </div>

              <div className="drawer-block">
                <h4>O problema que resolve</h4>
                <p>{selected.problem}</p>
              </div>

              <div className="drawer-block">
                <h4>Como funciona / Entregas</h4>
                <ul>
                  {selected.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              {selected.model && (
                <div className="drawer-block">
                  <h4>Modelo</h4>
                  <p>{selected.model}</p>
                </div>
              )}

              {selected.note && <p className="drawer-note">{selected.note}</p>}

              <div className="product-drawer__footer">
                <a
                  className="btn btn--on interactive"
                  href={whatsappLink(selected.whatsappMessage)}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsApp size={18} /> {selected.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

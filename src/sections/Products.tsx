import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap, lockScroll } from '../lib/motion'
import { products, type Product } from '../data/content'
import { ArrowRight, Close } from '../components/Icons'

/**
 * Ato 4 — Produtos e Soluções (Stacking Cards com 75% de cobertura / 25% visível + Entrada e Saída).
 * - Pré-entrada (scrub): Conforme a seção entra na viewport, a sidebar constrói seus elementos
 *   em cascata e o Card 01 emerge com escala e máscara.
 * - Durante o pin (scrub): Card 01 desliza para a esquerda sobrepondo a sidebar e cada card
 *   subsequente chega da direita cobrindo 75% do anterior (deixando 25% visível).
 * - Saída (scrub): Ao concluir a pilha, o palco faz uma transição suave de saída rumo ao Portfólio.
 */
export function Products() {
  const root = useRef<HTMLElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
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
        const sidebar = sidebarRef.current
        const stage = stageRef.current
        if (!cards.length || !root.current || !stage) return

        const cardWidth = cards[0].offsetWidth || 520
        const peekFraction = 0.25
        const stepOffset = cardWidth * peekFraction
        const stageWidth = stage.offsetWidth || 1200

        const initialOffset = Math.min(330, window.innerWidth * 0.24)
        const sidebarParts = sidebar
          ? gsap.utils.toArray<HTMLElement>('.eyebrow, h2, .products__sub, .products__counter', sidebar)
          : []

        // Estado inicial para a construção de entrada
        if (sidebarParts.length) {
          gsap.set(sidebarParts, { y: 40, opacity: 0 })
        }
        gsap.set(cards[0], {
          x: initialOffset + 60,
          y: 56,
          scale: 0.94,
          opacity: 0,
          filter: 'brightness(1)',
        })

        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], {
            x: () => window.innerWidth + 100,
            y: 0,
            scale: 1,
            opacity: 1,
            filter: 'brightness(1)',
          })
        }
        if (sidebar) gsap.set(sidebar, { opacity: 1 })

        // 0. Pré-entrada conforme a seção sobe até o topo da tela
        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 88%',
            end: 'top top',
            scrub: 0.65,
          },
        })

        if (sidebarParts.length) {
          enterTl.to(
            sidebarParts,
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.6,
              ease: 'power3.out',
            },
            0
          )
        }

        enterTl.to(
          cards[0],
          {
            x: initialOffset,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          },
          0.12
        )

        // 1. Timeline principal pinada vinculada ao ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${totalCards * 115}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`
              }
              const idx = Math.min(
                totalCards - 1,
                Math.round(self.progress * (totalCards - 1))
              )
              setActiveIdx(idx)
            },
          },
        })

        // O primeiro card desliza para a esquerda (x: 0), sobrepondo o título da sidebar
        tl.to(
          cards[0],
          {
            x: 0,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          0
        )
        if (sidebar) {
          tl.to(
            sidebar,
            {
              opacity: 0.12,
              x: -24,
              duration: 0.7,
              ease: 'power2.inOut',
            },
            0
          )
        }

        // 2. Cada card seguinte vem da direita e cobre SEMPRE 75% do anterior
        for (let i = 1; i < cards.length; i++) {
          const stepTime = 0.7 + (i - 1) * 1.15
          const currentStackWidth = i * stepOffset + cardWidth
          const overflowShift = Math.max(0, currentStackWidth - stageWidth + 30)

          for (let prev = 0; prev < i; prev++) {
            const targetPrevX = prev * stepOffset - overflowShift
            const depth = i - prev
            tl.to(
              cards[prev],
              {
                x: targetPrevX,
                filter: `brightness(${Math.max(0.5, 1 - depth * 0.16)})`,
                duration: 1.05,
                ease: 'power2.out',
              },
              stepTime
            )
          }

          const targetNewX = i * stepOffset - overflowShift
          const cardImg = cards[i].querySelector('img')
          if (cardImg) {
            tl.fromTo(
              cardImg,
              { scale: 1.14 },
              { scale: 1, duration: 1.05, ease: 'power2.out' },
              stepTime
            )
          }

          tl.to(
            cards[i],
            {
              x: targetNewX,
              filter: 'brightness(1)',
              duration: 1.05,
              ease: 'power2.out',
            },
            stepTime
          )
        }

        // 3. Saída suave do palco no final do pin antes de liberar para #portfolio
        const exitTime = 0.7 + (cards.length - 1) * 1.15 + 0.15
        tl.to(
          stage,
          {
            y: -38,
            scale: 0.965,
            opacity: 0.18,
            duration: 0.55,
            ease: 'power2.in',
          },
          exitTime
        )
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
      <div className="products__layout">
        {/* Sidebar com título na lateral esquerda */}
        <aside className="products__sidebar" ref={sidebarRef}>
          <div>
            <p className="eyebrow">Produtos & Consultoria</p>
            <h2>O que a Aegon liga no seu negócio.</h2>
            <p className="products__sub">
              Soluções próprias e consultoria prática para organizar, escalar e inovar sem complexidade desnecessária.
            </p>
          </div>

          <div className="products__counter" aria-live="polite">
            <strong>{String(activeIdx + 1).padStart(2, '0')}</strong>
            <span>/ {String(totalCards).padStart(2, '0')}</span>
          </div>
        </aside>

        {/* Palco dos cards empilhados na lateral esquerda com 75% de sobreposição */}
        <div className="products__stage" ref={stageRef}>
          {products.map((p, idx) => (
            <article
              className={`product-card product-card--${idx}`}
              key={p.id}
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              style={{ zIndex: idx + 2 }}
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
                <span className="product-card__strip-tag">0{idx + 1}</span>
                <span className="product-card__index">0{idx + 1}</span>
              </div>

              <div className="product-card__body">
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                </div>

                <div className="product-card__actions">
                  <Link
                    to={`/produtos/${p.id}`}
                    className="btn btn--on btn--sm interactive"
                  >
                    Página do produto <ArrowRight size={15} />
                  </Link>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm interactive"
                    onClick={() => setSelected(p)}
                  >
                    Resumo
                  </button>
                </div>
              </div>
            </article>
          ))}

          {/* Card 5 final de conversão sob medida */}
          <article
            className="product-card product-card--cta"
            key="cta-card"
            ref={(el) => {
              cardRefs.current[products.length] = el
            }}
            style={{ zIndex: products.length + 2 }}
          >
            <div className="product-card__cta-inner">
              <span className="eyebrow">Sob medida</span>
              <h3>Tem um desafio específico no seu negócio?</h3>
              <p>
                Desenhamos e construímos soluções digitais a partir da sua realidade — do diagnóstico inicial ao
                sistema em produção.
              </p>
              <Link
                to="/contato"
                className="btn btn--on interactive"
              >
                Vamos construir juntos <ArrowRight size={18} />
              </Link>
            </div>
            <span className="product-card__strip-tag">05</span>
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
                <Link
                  to={`/produtos/${selected.id}`}
                  className="btn btn--on interactive"
                  onClick={() => setSelected(null)}
                >
                  Ver página completa & planos <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contato"
                  className="btn btn--ghost interactive"
                  onClick={() => setSelected(null)}
                >
                  Solicitar diagnóstico
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap, lockScroll } from '../lib/motion'
import { products, type Product } from '../data/content'
import { ArrowRight, Close, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'

/**
 * Ato 4 — Produtos e Soluções (Stacking Cards com 75% de cobertura / 25% visível).
 * - Restaura a estrutura lateral original (título, subtítulo e contador à esquerda).
 * - Ao iniciar o scroll, o Card 01 desliza para a esquerda sobrepondo o título da sidebar.
 * - Conforme o usuário continua rolando a página (scrub), cada card subsequente chega da direita
 *   e cobre SEMPRE 75% do card anterior, deixando um pedaço de 25% à vista como um baralho fatiado.
 * - Suporta abertura da gaveta de detalhes completos e empilhamento sticky no mobile.
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
        // Cada card cobre exatamente 75% do anterior, deixando 25% visível (stepOffset)
        const peekFraction = 0.25
        const stepOffset = cardWidth * peekFraction
        const stageWidth = stage.offsetWidth || 1200

        // Posição inicial:
        // Card 0 começa ao lado da sidebar (a ~390px da esquerda), revelando o título.
        // Os demais cards aguardam fora da tela à direita.
        const initialOffset = Math.min(390, window.innerWidth * 0.28)
        gsap.set(cards[0], { x: initialOffset, filter: 'brightness(1)' })
        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], {
            x: () => window.innerWidth + 100,
            filter: 'brightness(1)',
          })
        }
        if (sidebar) gsap.set(sidebar, { opacity: 1 })

        // Timeline de rolagem vinculada ao ScrollTrigger
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

        // 1. O primeiro card desliza para a esquerda (x: 0), sobrepondo o título da sidebar
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
              duration: 0.7,
              ease: 'power2.inOut',
            },
            0
          )
        }

        // 2. Cada card seguinte sobe da direita e cobre SEMPRE 75% do anterior
        for (let i = 1; i < cards.length; i++) {
          const stepTime = 0.7 + (i - 1) * 1.15

          // Se a pilha ultrapassar a largura do container, recua o stack suavemente para a esquerda
          const currentStackWidth = i * stepOffset + cardWidth
          const overflowShift = Math.max(0, currentStackWidth - stageWidth + 30)

          // Atualiza a posição de todos os cards anteriores para manter a fresta de 25% e o shift
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

          // O novo card entra da direita e pousa exatamente cobrindo 75% do anterior
          const targetNewX = i * stepOffset - overflowShift
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
        {/* Sidebar com título restaurado na lateral esquerda */}
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
                {/* Indicador na borda visível de 25% */}
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
                    className="btn btn--ghost btn--sm interactive"
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
              <a
                className="btn btn--on interactive"
                href={whatsappLink('Olá, Aegon! Tenho um desafio específico no meu negócio e gostaria de conversar.')}
                target="_blank"
                rel="noopener"
              >
                <WhatsApp size={18} /> Vamos construir juntos
              </a>
            </div>
            {/* Tag na borda visível de 25% */}
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
                  className="btn btn--ghost interactive"
                  onClick={() => setSelected(null)}
                >
                  Ver página completa & planos <ArrowRight size={16} />
                </Link>
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

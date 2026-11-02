import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap, lockScroll } from '../lib/motion'
import { products, type Product } from '../data/content'
import { ArrowRight, Close } from '../components/Icons'

/**
 * Ato 4 — Produtos e Soluções em Faixa Horizontal (100% do conteúdo visível).
 * - Coluna lateral esquerda fixa (título, subtítulo e contador) sem sobreposição de texto.
 * - Faixa horizontal (track) onde todos os cards mostram 100% do seu conteúdo
 *   (imagem, categoria, título completo, resumo e botões) lado a lado conforme o scroll.
 */
export function Products() {
  const root = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [selected, setSelected] = useState<Product | null>(null)

  const totalCards = products.length + 1 // 4 produtos + 1 CTA sob medida = 5 cards

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const trackEl = trackRef.current
        const viewportEl = viewportRef.current
        if (!trackEl || !viewportEl || !root.current) return

        const getScrollAmount = () =>
          Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth + 24)

        const tween = gsap.to(trackEl, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${Math.max(900, getScrollAmount() * 1.25)}`,
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

        // Parallax sutil nas imagens internas dos cards durante o deslocamento
        const imgs = gsap.utils.toArray<HTMLElement>('.product-card__media img', trackEl)
        imgs.forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.1, xPercent: -5 },
            {
              scale: 1.1,
              xPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.product-card'),
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          )
        })
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
        {/* Sidebar dedicada na lateral esquerda (sem sobreposição sobre os cards) */}
        <aside className="products__sidebar">
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

        {/* Viewport e faixa horizontal: cada card exibe 100% do seu conteúdo sem cortes */}
        <div className="products__viewport" ref={viewportRef}>
          <div className="products__track" ref={trackRef}>
            {products.map((p, idx) => (
              <article className="product-card" key={p.id}>
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
            <article className="product-card product-card--cta" key="cta-card">
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
            </article>
          </div>
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

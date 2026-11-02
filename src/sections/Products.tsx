import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, lockScroll } from '../lib/motion'
import { products, type Product } from '../data/content'
import { ArrowRight, Close, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'

/**
 * Ato 4 — Produtos e soluções em rolagem lateral (inspirado na Dexa).
 * No desktop: pin vertical com scrub horizontal proporcional à largura da faixa + parallax interno.
 * No mobile: carrossel nativo com scroll-snap para evitar scroll-jacking.
 */
export function Products() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [selected, setSelected] = useState<Product | null>(null)

  const totalCards = products.length + 1 // +1 para o card final de CTA

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const trackEl = track.current!
        const getScrollAmount = () => Math.max(0, trackEl.scrollWidth - window.innerWidth + 120)

        const tween = gsap.to(trackEl, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`
              }
              const idx = Math.min(totalCards - 1, Math.floor(self.progress * totalCards * 0.999))
              setActiveIdx(idx)
            },
          },
        })

        // Parallax sutil nas imagens internas dos cards
        const imgs = gsap.utils.toArray<HTMLElement>('.product-card__media img')
        imgs.forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8, scale: 1.12 },
            {
              xPercent: 8,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.product-card'),
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
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

        <div className="products__viewport">
          <div className="products__track" ref={track}>
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
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSelected(p)}>
                      Ver detalhes <ArrowRight size={15} />
                    </button>
                    <a
                      className="btn btn--on btn--sm"
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

            {/* Card final de conversão */}
            <article className="product-card product-card--cta">
              <div className="product-card__cta-inner">
                <span className="eyebrow">Sob medida</span>
                <h3>Tem um desafio específico no seu negócio?</h3>
                <p>
                  Desenhamos e construímos soluções digitais a partir da sua realidade — do diagnóstico inicial ao
                  sistema em produção.
                </p>
                <a
                  className="btn btn--on"
                  href={whatsappLink('Olá, Aegon! Tenho um desafio específico no meu negócio e gostaria de conversar.')}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsApp size={18} /> Vamos construir juntos
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="products__progress" aria-hidden="true">
        <div className="products__progress-bar" ref={progress} />
      </div>

      {/* Drawer de detalhes do produto */}
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
              className="product-drawer__close"
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
                  className="btn btn--on"
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


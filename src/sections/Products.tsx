import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Close } from '../components/Icons'
import { OnBrandSymbol } from '../components/Logo'
import { lockScroll, prefersReducedMotion } from '../lib/motion'
import { products, type Product } from '../data/content'
import { contactPath } from '../config'

const CARD_DURATION = 5200

/** Cards se revezam automaticamente e podem ser abertos por seleção direta. */
export function Products() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const totalCards = products.length + 1

  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const timer = window.setInterval(() => setActiveIdx((current) => (current + 1) % totalCards), CARD_DURATION)
    return () => window.clearInterval(timer)
  }, [activeIdx, paused, totalCards])

  useEffect(() => {
    lockScroll(Boolean(selected))
    if (!selected) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section className="products products-timed" id="produtos" aria-labelledby="products-heading">
      <div className="products-timed__atmosphere" aria-hidden="true">
        <span className="products-timed__grid" />
        <span className="products-timed__orbit products-timed__orbit--a" />
        <span className="products-timed__orbit products-timed__orbit--b" />
        <span className="products-timed__star products-timed__star--a" />
        <span className="products-timed__star products-timed__star--b" />
        <span className="products-timed__brand"><OnBrandSymbol /></span>
      </div>

      <div className="products-timed__shell">
        <div className="products-timed__intro">
          <p className="eyebrow">Produtos & consultoria</p>
          <h2 id="products-heading">O que a Aegon <em>liga</em> no seu negócio.</h2>
          <p>Soluções demonstrativas e consultoria prática para organizar, escalar e inovar com direção.</p>
          <div className="products-timed__counter" aria-live="polite"><strong>{String(activeIdx + 1).padStart(2, '0')}</strong><span>/ {String(totalCards).padStart(2, '0')}</span></div>
        </div>

        <div
          className={`products-timed__deck ${paused ? 'is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false) }}
          aria-label="Ofertas Aegon: seleção temporizada de cards"
        >
          {products.map((product, index) => (
            <ProductTimedCard key={product.id} product={product} index={index} active={activeIdx === index} onActivate={() => setActiveIdx(index)} onSummary={() => setSelected(product)} />
          ))}
          <CustomTimedCard active={activeIdx === products.length} index={products.length} total={totalCards} onActivate={() => setActiveIdx(products.length)} />
        </div>
      </div>

      <div className={`product-drawer ${selected ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label={selected?.name ?? 'Resumo do produto'} aria-hidden={!selected}>
        <div className="product-drawer__backdrop" onClick={() => setSelected(null)} />
        {selected && (
          <div className="product-drawer__panel">
            <button type="button" className="product-drawer__close interactive" onClick={() => setSelected(null)} aria-label="Fechar resumo"><Close size={20} /></button>
            <div className="product-drawer__hero"><img src={selected.image} alt="" /><div className="duotone" /><div className="product-drawer__hero-copy"><span className="badge badge--dev">Conceito em evolução</span><h3>{selected.name}</h3></div></div>
            <div className="product-drawer__content">
              <div className="drawer-block"><h4>Para quem é</h4><p>{selected.forWho}</p></div>
              <div className="drawer-block"><h4>O problema que explora</h4><p>{selected.problem}</p></div>
              <div className="drawer-block"><h4>Como pode funcionar</h4><ul>{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
              {selected.model && <div className="drawer-block"><h4>Modelo imaginado</h4><p>{selected.model}</p></div>}
              {selected.note && <p className="drawer-note">{selected.note}</p>}
              <div className="product-drawer__footer"><Link to={`/produtos/${selected.id}`} className="btn btn--on interactive" onClick={() => setSelected(null)}>Ver página do conceito <ArrowRight size={16} /></Link><Link to={contactPath(selected.name)} className="btn btn--ghost interactive" onClick={() => setSelected(null)}>Conversar sobre isso</Link></div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProductTimedCard({ product, index, active, onActivate, onSummary }: { product: Product; index: number; active: boolean; onActivate: () => void; onSummary: () => void }) {
  return (
    <article className={`products-timed__card ${active ? 'is-active' : ''}`}>
      <img className="products-timed__media" src={product.image} alt="" loading="lazy" decoding="async" />
      <div className="products-timed__shade" />
      <button type="button" className="products-timed__select interactive" onClick={onActivate} aria-pressed={active} aria-label={`Ver ${product.name}`}><span>0{index + 1}</span><strong>{product.name}</strong></button>
      <div className="products-timed__content">
        <div className="products-timed__meta"><span>{product.category}</span><span>Conceito em evolução</span></div>
        <div><h3>{product.name}</h3><p>{product.summary}</p></div>
        <div className="products-timed__actions"><Link to={`/produtos/${product.id}`} className="btn btn--on btn--sm interactive">Conhecer conceito <ArrowRight size={15} /></Link><button type="button" className="btn btn--ghost btn--sm interactive" onClick={onSummary}>Ver resumo</button></div>
      </div>
      {active && !prefersReducedMotion() && <span className="products-timed__timer" key={index} />}
    </article>
  )
}

function CustomTimedCard({ active, index, total, onActivate }: { active: boolean; index: number; total: number; onActivate: () => void }) {
  return (
    <article className={`products-timed__card products-timed__card--custom ${active ? 'is-active' : ''}`}>
      <div className="products-timed__custom-pattern" aria-hidden="true" />
      <button type="button" className="products-timed__select interactive" onClick={onActivate} aria-pressed={active} aria-label="Ver solução sob medida"><span>0{total}</span><strong>Sob medida</strong></button>
      <div className="products-timed__content">
        <div className="products-timed__meta"><span>Sob medida</span><span>Conversa inicial</span></div>
        <div><h3>Tem um desafio específico no seu negócio?</h3><p>Desenhamos marcas, produtos e sistemas a partir da sua realidade — da primeira pergunta à operação em movimento.</p></div>
        <div className="products-timed__actions"><Link to={contactPath('Produto sob medida')} className="btn btn--on btn--sm interactive">Vamos construir juntos <ArrowRight size={15} /></Link></div>
      </div>
      {active && !prefersReducedMotion() && <span className="products-timed__timer" key={index} />}
    </article>
  )
}

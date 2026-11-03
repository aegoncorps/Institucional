import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Close } from '../components/Icons'
import { OnBrandSymbol } from '../components/Logo'
import { lockScroll, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { products, type Product } from '../data/content'
import { contactPath } from '../config'

type ProductScene = {
  id: string
  title: string
  previewTitle?: string
  kicker: string
  summary: string
  image?: string
  product?: Product
}

const slides: ProductScene[] = [
  ...products.map((product) => ({
    id: product.id,
    title: product.name,
    kicker: product.category,
    summary: product.summary,
    image: product.image,
    product,
  })),
  {
    id: 'sob-medida',
    title: 'Seu próximo produto começa por uma pergunta.',
    previewTitle: 'Sob medida',
    kicker: 'Solução sob medida',
    summary: 'Estratégia, criação e tecnologia trabalham juntas para tirar uma ideia do papel e colocá-la em operação.',
  },
]

/** Uma cena por etapa da rolagem, com imagem e conteúdo ocupando toda a tela. */
export function Products() {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [selected, setSelected] = useState<Product | null>(null)
  const active = slides[activeIdx]
  const previews = slides.filter((_, index) => index !== activeIdx)

  const goTo = (index: number) => {
    const section = sectionRef.current
    const scene = sceneRef.current
    if (!section || !scene) return
    const targetIndex = Math.max(0, Math.min(slides.length - 1, index))
    const travel = section.offsetHeight - scene.offsetHeight
    const start = section.getBoundingClientRect().top + window.scrollY
    scrollToTarget(start + travel * (targetIndex + 0.02) / slides.length)
  }

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const update = (progress: number) => {
      const index = Math.max(0, Math.min(slides.length - 1, Math.floor(progress * slides.length)))
      setActiveIdx((current) => current === index ? current : index)
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
    }
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    })
    update(trigger.progress)
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    lockScroll(Boolean(selected))
    if (!selected) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section ref={sectionRef} className="products products-timed" id="produtos" aria-labelledby="products-heading">
      <div ref={sceneRef} className="products-showcase" aria-label="Produtos e consultoria Aegon">
        <div className={`products-showcase__backdrop ${active.image ? '' : 'is-custom'}`} key={active.id} style={active.image ? { backgroundImage: `url(${active.image})` } : undefined} aria-hidden="true" />
        <div className="products-showcase__veil" aria-hidden="true" />

        <div className="products-showcase__content" key={active.id}>
          <p className="eyebrow">Produtos & consultoria</p>
          <span className="products-showcase__kicker">{active.kicker}</span>
          <h2 id="products-heading">{active.title}</h2>
          <p className="products-showcase__summary">{active.summary}</p>
          <div className="products-showcase__actions">
            {active.product ? (
              <>
                <Link to={`/produtos/${active.product.id}`} className="btn btn--on interactive">Conhecer conceito <ArrowRight size={17} /></Link>
                <button type="button" className="btn btn--ghost interactive" onClick={() => active.product && setSelected(active.product)}>Ver resumo</button>
              </>
            ) : (
              <Link to={contactPath('Produto sob medida')} className="btn btn--on interactive">Vamos construir juntos <ArrowRight size={17} /></Link>
            )}
          </div>
        </div>

        <div className="products-showcase__rail" key={`rail-${active.id}`}>
          {previews.map((slide) => {
            const index = slides.findIndex((item) => item.id === slide.id)
            return (
              <button type="button" className={`products-showcase__card ${slide.image ? '' : 'is-custom'}`} key={slide.id} onClick={() => goTo(index)} aria-label={`Ir para ${slide.title}`}>
                {slide.image ? <img src={slide.image} alt="" loading="lazy" /> : <span className="products-showcase__card-pattern"><OnBrandSymbol /></span>}
                <span className="products-showcase__card-shade" />
                <span className="products-showcase__card-kicker">{slide.kicker}</span>
                <strong>{slide.previewTitle ?? slide.title}</strong>
              </button>
            )
          })}
        </div>

        <div className="products-showcase__footer">
          <div className="products-showcase__controls">
            <button type="button" className="interactive" onClick={() => goTo(activeIdx - 1)} disabled={activeIdx === 0} aria-label="Oferta anterior"><ArrowRight size={17} /></button>
            <button type="button" className="interactive" onClick={() => goTo(activeIdx + 1)} disabled={activeIdx === slides.length - 1} aria-label="Próxima oferta"><ArrowRight size={17} /></button>
          </div>
          <span className="products-showcase__scroll-hint">Role para explorar</span>
          <div className="products-showcase__progress" aria-hidden="true"><span ref={progressRef} /></div>
          <p className="products-showcase__count"><strong>{String(activeIdx + 1).padStart(2, '0')}</strong> / {String(slides.length).padStart(2, '0')}</p>
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

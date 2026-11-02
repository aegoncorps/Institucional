import { Link } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { products } from '../data/content'
import { productPages } from '../data/solutions'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { contactPath, whatsappLink } from '../config'
import { ProductDemo } from '../components/ProductDemo'

export function ProductsPage() {
  usePageMeta({
    title: 'Produtos Próprios & Consultoria — Soluções Aegon',
    description:
      'Conheça as ofertas proprietárias da Aegon: Consultoria para Pequenos Negócios, Gestão Financeira Modular, Assistente de Compras e Projeto Andresa.',
  })

  return (
    <div className="spa-page products-catalog-page" id="conteudo">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Catálogo de Produtos & Ofertas</p>
          <h1>
            Soluções próprias que nascem de <em>problemas reais</em>.
          </h1>
          <p className="page-hero__lead">
            Explore conceitos de plataformas, aplicativos e consultoria. Esta versão usa
            conteúdo demonstrativo para apresentar a experiência e o potencial de cada oferta.
          </p>
        </div>
      </section>

      <ProductDemo productId="financeiro" showSwitcher />

      <section className="page-section">
        <div className="container products-catalog-grid">
          {products.map((p, idx) => {
            const detail = productPages[p.id]
            return (
              <article className="catalog-product-card" key={p.id}>
                <Link
                  to={`/produtos/${p.id}`}
                  className="catalog-product-card__media interactive"
                >
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="duotone" />
                  <div className="product-card__badges">
                    <span className="badge badge--category">{p.category}</span>
                    <span
                      className={`badge ${
                        p.status === 'disponivel' ? 'badge--live' : 'badge--dev'
                      }`}
                    >
                      Conceito em evolução
                    </span>
                  </div>
                  <span className="featured-case-card__number">0{idx + 1}</span>
                </Link>

                <div className="catalog-product-card__body">
                  <h2>
                    <Link to={`/produtos/${p.id}`} className="interactive">
                      {p.name}
                    </Link>
                  </h2>
                  {detail && <p className="catalog-product-card__tagline">{detail.tagline}</p>}
                  <p>{p.summary}</p>

                  <div className="catalog-product-card__meta">
                    <div>
                      <span>Para quem é:</span>
                      <p>{p.forWho}</p>
                    </div>
                  </div>

                  <div className="featured-case-card__deliverables">
                    {p.features.map((f) => (
                      <span className="deliverable-pill" key={f}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="catalog-product-card__actions">
                    <Link to={`/produtos/${p.id}`} className="btn btn--on interactive">
                      Ver módulos, planos e detalhes <ArrowRight size={16} />
                    </Link>
                    <a
                      href={whatsappLink(p.whatsappMessage)}
                      target="_blank"
                      rel="noopener"
                      className="btn btn--ghost interactive"
                    >
                      <WhatsApp size={16} /> {p.ctaLabel}
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="page-cta-band">
        <div className="container page-cta-band__inner">
          <div>
            <p className="eyebrow">Precisa de um sistema exclusivo?</p>
            <h2>Também desenhamos e construímos plataformas 100% sob medida.</h2>
          </div>
          <div className="page-cta-band__actions">
            <Link to="/solucoes/tecnologia" className="btn btn--ghost interactive">
              Conhecer Engenharia Sob Medida
            </Link>
            <Link to={contactPath('Sistema sob medida')} className="btn btn--on interactive">
              Solicitar orçamento <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


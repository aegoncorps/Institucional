import { Link, useParams } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { products } from '../data/content'
import { productPages } from '../data/solutions'
import { getCase } from '../data/cases'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'
import { NotFoundPage } from './NotFoundPage'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const baseProduct = products.find((p) => p.id === slug)
  const detail = slug ? productPages[slug] : undefined

  usePageMeta({
    title: baseProduct ? `${baseProduct.name} — Produto Aegon` : 'Produto não encontrado',
    description: detail ? detail.tagline : baseProduct?.summary,
  })

  if (!baseProduct || !detail) return <NotFoundPage />

  const relatedCase = detail.relatedCase ? getCase(detail.relatedCase) : undefined

  return (
    <div className="spa-page product-detail-page" id="conteudo">
      {/* Hero do Produto */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <nav className="breadcrumb" aria-label="Navegação estrutural">
              <Link to="/">Início</Link>
              <span>/</span>
              <Link to="/produtos">Produtos</Link>
              <span>/</span>
              <span aria-current="page">{baseProduct.name}</span>
            </nav>

            <div className="case-hero__tags">
              <span className="badge badge--category">{baseProduct.category}</span>
              <span
                className={`badge ${
                  baseProduct.status === 'disponivel' ? 'badge--live' : 'badge--dev'
                }`}
              >
                {baseProduct.status === 'disponivel'
                  ? 'Disponível para contratação'
                  : 'Em desenvolvimento · Lista prioritária'}
              </span>
            </div>

            <h1>{baseProduct.name}</h1>
            <p className="page-hero__lead">{detail.tagline}</p>
            <p>{baseProduct.summary}</p>

            <div className="page-hero__actions">
              <a
                href={whatsappLink(baseProduct.whatsappMessage)}
                target="_blank"
                rel="noopener"
                className="btn btn--on interactive"
              >
                <WhatsApp size={18} /> {baseProduct.ctaLabel}
              </a>
              <Link to="/contato" className="btn btn--ghost interactive">
                Agendar demonstração
              </Link>
            </div>
          </div>

          <div className="page-hero__media">
            <img src={baseProduct.image} alt={baseProduct.name} />
            <div className="duotone" />
          </div>
        </div>
      </section>

      {/* Para quem é & O Problema */}
      <section className="page-section page-section--alt">
        <div className="container product-context-grid">
          <div className="product-context-card">
            <p className="eyebrow">Público Ideal</p>
            <h2>Para quem desenhamos o {baseProduct.name}</h2>
            <p>{baseProduct.forWho}</p>
          </div>
          <div className="product-context-card">
            <p className="eyebrow">O Problema Real</p>
            <h2>Por que as alternativas comuns falham</h2>
            <p>{baseProduct.problem}</p>
            {baseProduct.note && <p className="product-context-note">{baseProduct.note}</p>}
          </div>
        </div>
      </section>

      {/* Módulos / Pilares do Produto */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Arquitetura & Funcionalidades</p>
              <h2>O que faz parte da solução.</h2>
            </div>
          </div>

          <div className="values-grid">
            {detail.modules.map((m, i) => (
              <article className="value-card" key={m.name}>
                <span className="value-card__num">Módulo 0{i + 1}</span>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona passo a passo */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Passo a Passo</p>
              <h2>Como funciona na prática.</h2>
            </div>
          </div>

          <div className="process-grid">
            {detail.steps.map((s, i) => (
              <article className="process-card" key={s.title}>
                <div className="process-card__top">
                  <span className="process-card__step">0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Planos e Formatos */}
      {detail.plans && detail.plans.length > 0 && (
        <section className="page-section">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Planos & Modalidades</p>
                <h2>Escolha o formato adequado ao seu momento.</h2>
              </div>
            </div>

            <div className="plans-grid">
              {detail.plans.map((plan) => (
                <article
                  className={`plan-card ${plan.highlight ? 'plan-card--featured' : ''}`}
                  key={plan.name}
                >
                  {plan.highlight && <span className="plan-card__ribbon">Mais escolhido</span>}
                  <span className="plan-card__badge">{plan.price}</span>
                  <h3>{plan.name}</h3>
                  <ul className="plan-card__list">
                    {plan.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(
                      `Olá, Aegon! Tenho interesse na modalidade "${plan.name}" do produto ${baseProduct.name}.`
                    )}
                    target="_blank"
                    rel="noopener"
                    className={`btn ${plan.highlight ? 'btn--on' : 'btn--ghost'} interactive`}
                  >
                    <WhatsApp size={16} /> Conversar sobre {plan.name}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case de Referência do Produto */}
      {relatedCase && (
        <section className="page-section page-section--alt">
          <div className="container">
            <div className="next-case-card">
              <div>
                <p className="eyebrow">Estudo de Caso Relacionado</p>
                <h2>Veja na prática: {relatedCase.title}</h2>
                <p>{relatedCase.headline}</p>
                <div className="next-case-card__actions">
                  <Link
                    to={`/portfolio/${relatedCase.slug}`}
                    className="btn btn--on interactive"
                  >
                    Ler estudo de caso completo <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
              <Link
                to={`/portfolio/${relatedCase.slug}`}
                className="next-case-card__media interactive"
              >
                <img src={relatedCase.cover} alt={relatedCase.title} loading="lazy" />
                <div className="duotone" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Perguntas Frequentes</p>
              <h2>Tire suas dúvidas sobre o {baseProduct.name}.</h2>
            </div>
          </div>

          <div className="faq-list">
            {detail.faq.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

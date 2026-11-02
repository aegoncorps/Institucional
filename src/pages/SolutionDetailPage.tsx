import { Link, useParams } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { getSolution, solutions } from '../data/solutions'
import { caseStudies } from '../data/cases'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'
import { NotFoundPage } from './NotFoundPage'

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const sol = slug ? getSolution(slug) : undefined

  usePageMeta({
    title: sol ? `${sol.name}: ${sol.headline} — Soluções Aegon` : 'Solução não encontrada',
    description: sol ? sol.intro : 'Soluções integradas Aegon.',
  })

  if (!sol) return <NotFoundPage />

  const relatedCases = caseStudies
    .filter((c) => c.areas.some((a) => sol.relatedAreas.includes(a)))
    .slice(0, 3)

  return (
    <div className="spa-page solution-detail-page" id="conteudo">
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <nav className="breadcrumb" aria-label="Navegação estrutural">
              <Link to="/">Início</Link>
              <span>/</span>
              <Link to="/solucoes">Soluções</Link>
              <span>/</span>
              <span aria-current="page">{sol.name}</span>
            </nav>

            <p className="eyebrow">
              Pilar {sol.number} · {sol.name}
            </p>
            <h1>{sol.headline}</h1>
            <p className="page-hero__lead">{sol.intro}</p>

            <div className="page-hero__actions">
              <a
                href={whatsappLink(
                  `Olá, Aegon! Quero conversar sobre uma demanda de ${sol.name}.`
                )}
                target="_blank"
                rel="noopener"
                className="btn btn--on interactive"
              >
                <WhatsApp size={18} /> Falar com especialista em {sol.name}
              </a>
              <Link to="/contato" className="btn btn--ghost interactive">
                Enviar briefing detalhado
              </Link>
            </div>
          </div>

          <div className="page-hero__media">
            <img src={sol.image} alt={sol.name} />
            <div className="duotone" />
            <div className="page-hero__badge">
              <strong>{sol.number}</strong>
              <span>Frente de {sol.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dores que resolvemos */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Quando acionar esta frente</p>
              <h2>Sinais de que sua empresa precisa de {sol.name}.</h2>
            </div>
          </div>

          <div className="problems-grid">
            {sol.problems.map((prob, i) => (
              <div className="problem-card" key={prob}>
                <span className="problem-card__num">0{i + 1}</span>
                <p>{prob}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entregáveis Detalhados */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Escopo & Entregas</p>
              <h2>O que construímos na prática.</h2>
            </div>
          </div>

          <div className="values-grid">
            {sol.deliverables.map((d, idx) => (
              <article className="value-card" key={d.title}>
                <span className="value-card__num">0{idx + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Formatos de Contratação */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Modelos de Engajamento</p>
              <h2>Como você pode contratar a frente de {sol.name}.</h2>
            </div>
          </div>

          <div className="formats-grid">
            {sol.formats.map((f) => (
              <article className="format-card" key={f.name}>
                <span className="format-card__duration">{f.duration}</span>
                <h3>{f.name}</h3>
                <p>{f.text}</p>
                <a
                  href={whatsappLink(
                    `Olá, Aegon! Tenho interesse no formato "${f.name}" da frente de ${sol.name}.`
                  )}
                  target="_blank"
                  rel="noopener"
                  className="btn btn--ghost btn--sm interactive"
                >
                  Consultar disponibilidade <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Relacionados */}
      {relatedCases.length > 0 && (
        <section className="page-section">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">Projetos Aplicados</p>
                <h2>Estudos de caso com forte atuação em {sol.name}.</h2>
              </div>
              <Link to="/portfolio" className="btn btn--ghost interactive">
                Ver todo o portfólio <ArrowRight size={16} />
              </Link>
            </div>

            <div className="related-cases-grid">
              {relatedCases.map((c) => (
                <article className="related-case-card" key={c.slug}>
                  <Link to={`/portfolio/${c.slug}`} className="related-case-card__media interactive">
                    <img src={c.cover} alt={c.title} loading="lazy" />
                    <div className="duotone" />
                  </Link>
                  <div className="related-case-card__body">
                    <span>
                      {c.client.name} · {c.year}
                    </span>
                    <h3>
                      <Link to={`/portfolio/${c.slug}`}>{c.title}</Link>
                    </h3>
                    <p>{c.headline}</p>
                    <Link to={`/portfolio/${c.slug}`} className="btn btn--on btn--sm interactive">
                      Ver estudo de caso <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Dúvidas Frequentes</p>
              <h2>Perguntas comuns sobre {sol.name}.</h2>
            </div>
          </div>

          <div className="faq-list">
            {sol.faq.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          {/* Navegação entre os 3 pilares */}
          <div className="pillar-switcher">
            {solutions.map((other) => (
              <Link
                key={other.slug}
                to={`/solucoes/${other.slug}`}
                className={`pillar-switcher__link ${other.slug === sol.slug ? 'is-current' : ''}`}
              >
                <span>{other.number}</span>
                <strong>{other.name}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

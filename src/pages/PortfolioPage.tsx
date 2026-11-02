import { Link, useSearchParams } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { caseStudies, caseAreas, areaLabel, areaColor, type CaseArea } from '../data/cases'
import { Portfolio as ConstellationSection } from '../sections/Portfolio'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'

export function PortfolioPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeArea = (searchParams.get('area') || 'all') as 'all' | CaseArea
  const viewMode = searchParams.get('view') === '3d' ? '3d' : 'editorial'

  usePageMeta({
    title: 'Portfólio & Estudos de Caso — Projetos Reais e Demonstrativos',
    description:
      'Explore os projetos de Branding, Sistemas Web, UX/UI Design e Consultoria da Aegon, com métricas de impacto, entregas detalhadas e navegação 3D.',
  })

  const filteredCases =
    activeArea === 'all'
      ? caseStudies
      : caseStudies.filter((c) => c.areas.includes(activeArea))

  const setFilter = (area: string) => {
    const next = new URLSearchParams(searchParams)
    if (area === 'all') next.delete('area')
    else next.set('area', area)
    setSearchParams(next, { replace: true })
  }

  const setView = (view: 'editorial' | '3d') => {
    const next = new URLSearchParams(searchParams)
    if (view === 'editorial') next.delete('view')
    else next.set('view', '3d')
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="spa-page portfolio-page" id="conteudo">
      {/* Hero do Portfólio */}
      <section className="page-hero page-hero--portfolio">
        <div className="container">
          <div className="portfolio-hero__top">
            <div>
              <p className="eyebrow">Acervo Aegon · Estudos de Caso</p>
              <h1>
                Projetos pensados para dar <em>clareza</em>, tração e escala.
              </h1>
              <p className="page-hero__lead">
                Explore cada trabalho em detalhes: o problema inicial do cliente, a abordagem escolhida,
                a arquitetura construída e os indicadores alcançados após o lançamento.
              </p>
            </div>

            <div className="portfolio-hero__summary">
              <div className="portfolio-hero__stat">
                <strong>{caseStudies.length}</strong>
                <span>Estudos de caso completos</span>
              </div>
              <div className="portfolio-hero__stat">
                <strong>4 áreas</strong>
                <span>Branding · Sistemas · UX · Consultoria</span>
              </div>
            </div>
          </div>

          {/* Barra de Controle: Filtros por Área + Alternador Grade Editorial / 3D */}
          <div className="portfolio-toolbar" role="region" aria-label="Filtros e modo de visualização">
            <div className="portfolio-toolbar__filters" role="tablist" aria-label="Filtrar por especialidade">
              <button
                type="button"
                role="tab"
                aria-selected={activeArea === 'all'}
                className={`filter-pill ${activeArea === 'all' ? 'is-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Todos os cases ({caseStudies.length})
              </button>
              {caseAreas.map((a) => {
                const count = caseStudies.filter((c) => c.areas.includes(a.id)).length
                return (
                  <button
                    key={a.id}
                    type="button"
                    role="tab"
                    aria-selected={activeArea === a.id}
                    className={`filter-pill ${activeArea === a.id ? 'is-active' : ''}`}
                    onClick={() => setFilter(a.id)}
                  >
                    <span className="filter-pill__dot" style={{ background: a.color }} />
                    {a.label} ({count})
                  </button>
                )
              })}
            </div>

            <div className="portfolio-toolbar__views" role="group" aria-label="Modo de visualização">
              <button
                type="button"
                className={`view-switch-btn ${viewMode === 'editorial' ? 'is-active' : ''}`}
                onClick={() => setView('editorial')}
              >
                Grade Editorial Detalhada
              </button>
              <button
                type="button"
                className={`view-switch-btn ${viewMode === '3d' ? 'is-active' : ''}`}
                onClick={() => setView('3d')}
              >
                Constelação 3D Interativa
              </button>
            </div>
          </div>
        </div>
      </section>

      {viewMode === '3d' ? (
        <ConstellationSection />
      ) : (
        <section className="page-section portfolio-editorial-section">
          <div className="container">
            <div className="portfolio-editorial-grid">
              {filteredCases.map((c, index) => (
                <article
                  className={`portfolio-showcase-card ${
                    index === 0 && activeArea === 'all' ? 'portfolio-showcase-card--hero' : ''
                  }`}
                  key={c.slug}
                >
                  <Link
                    to={`/portfolio/${c.slug}`}
                    className="portfolio-showcase-card__media interactive"
                  >
                    <img src={c.cover} alt={c.title} loading="lazy" />
                    <div className="duotone" />
                    <div className="featured-case-card__top-tags">
                      {c.areas.map((area) => (
                        <span className="area-chip" key={area}>
                          <i style={{ background: areaColor(area) }} />
                          {areaLabel(area)}
                        </span>
                      ))}
                      {c.placeholder && <span className="badge badge--dev">Mock / Exemplo</span>}
                    </div>
                  </Link>

                  <div className="portfolio-showcase-card__body">
                    <div className="featured-case-card__meta">
                      <strong>{c.client.name}</strong>
                      <span>·</span>
                      <span>{c.client.sector}</span>
                      <span>·</span>
                      <span>{c.year}</span>
                      <span>·</span>
                      <span>{c.duration}</span>
                    </div>

                    <h2>
                      <Link to={`/portfolio/${c.slug}`} className="interactive">
                        {c.title}
                      </Link>
                    </h2>

                    <p className="portfolio-showcase-card__headline">{c.headline}</p>
                    <p className="portfolio-showcase-card__summary">{c.summary}</p>

                    <div className="portfolio-showcase-card__block">
                      <span className="portfolio-showcase-card__label">Trabalho realizado & Entregas:</span>
                      <div className="featured-case-card__deliverables">
                        {c.services.map((d) => (
                          <span className="deliverable-pill" key={d}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="featured-case-card__metrics">
                      {c.results.map((r) => (
                        <div className="metric-box" key={r.label}>
                          <strong>{r.value}</strong>
                          <span>{r.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="portfolio-showcase-card__footer">
                      <Link
                        to={`/portfolio/${c.slug}`}
                        className="btn btn--on btn--sm interactive"
                      >
                        Ver estudo de caso completo <ArrowRight size={15} />
                      </Link>
                      <a
                        href={whatsappLink(
                          `Olá, Aegon! Vi o case "${c.title}" no portfólio e gostaria de conversar sobre um projeto semelhante.`
                        )}
                        target="_blank"
                        rel="noopener"
                        className="btn btn--ghost btn--sm interactive"
                      >
                        <WhatsApp size={15} /> Quero algo similar
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Faixa de Conversão */}
      <section className="page-cta-band">
        <div className="container page-cta-band__inner">
          <div>
            <p className="eyebrow">Seu projeto pode ser o próximo case</p>
            <h2>Tem uma marca para posicionar ou um sistema para construir?</h2>
          </div>
          <div className="page-cta-band__actions">
            <Link to="/contato" className="btn btn--on interactive">
              Iniciar briefing do projeto <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

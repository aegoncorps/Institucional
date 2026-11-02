import { Link } from 'react-router'
import { featuredCases, areaLabel, areaColor } from '../data/cases'
import { stats, clients, testimonials } from '../data/site'
import { ArrowRight } from '../components/Icons'

/**
 * Ato 5 da Home (SPA):
 * - Vitrine de Cases Selecionados com cards espaçosos, entregas e métricas de impacto.
 * - Faixa de autoridade: Indicadores numéricos, marcas atendidas e depoimentos de clientes.
 * - Ponte direta para a aba dedicada /portfolio (Grade Editorial + Constelação 3D).
 */
export function HomeShowcase() {
  return (
    <section className="home-showcase" id="portfolio" aria-label="Cases em destaque e resultados">
      <div className="container">
        <div className="home-showcase__head">
          <div>
            <p className="eyebrow">Portfólio & Impacto Real</p>
            <h2>Trabalhos que ligaram marcas, produtos e operações.</h2>
            <p className="home-showcase__sub">
              Cada projeto nasce de um diagnóstico real e termina com indicadores claros de evolução.
              Conheça três estudos de caso em destaque ou explore nosso acervo completo.
            </p>
          </div>
          <div className="home-showcase__head-actions">
            <Link to="/portfolio" className="btn btn--on interactive">
              Explorar portfólio completo (9 cases) <ArrowRight size={17} />
            </Link>
            <Link to="/portfolio?view=3d" className="btn btn--ghost interactive">
              Abrir Constelação 3D
            </Link>
          </div>
        </div>

        {/* Lista de Cards Espaçosos dos 3 Cases em Destaque */}
        <div className="featured-cases">
          {featuredCases.map((c, idx) => (
            <article className="featured-case-card" key={c.slug}>
              <Link
                to={`/portfolio/${c.slug}`}
                className="featured-case-card__media interactive"
                aria-label={`Ver estudo de caso: ${c.title}`}
              >
                <img src={c.cover} alt={c.title} loading="lazy" />
                <div className="duotone" />
                <div className="featured-case-card__top-tags">
                  {c.areas.map((a) => (
                    <span className="area-chip" key={a}>
                      <i style={{ background: areaColor(a) }} />
                      {areaLabel(a)}
                    </span>
                  ))}
                  {c.placeholder && <span className="badge badge--dev">Case demonstrativo</span>}
                </div>
                <span className="featured-case-card__number">0{idx + 1}</span>
              </Link>

              <div className="featured-case-card__body">
                <div className="featured-case-card__meta">
                  <span>{c.client.name}</span>
                  <span>·</span>
                  <span>{c.client.sector}</span>
                  <span>·</span>
                  <span>{c.year}</span>
                  <span>·</span>
                  <span>{c.duration}</span>
                </div>

                <h3>
                  <Link to={`/portfolio/${c.slug}`} className="interactive">
                    {c.title}
                  </Link>
                </h3>

                <p className="featured-case-card__headline">{c.headline}</p>
                <p className="featured-case-card__summary">{c.summary}</p>

                <div className="featured-case-card__deliverables" aria-label="Entregas realizadas">
                  {c.services.map((d) => (
                    <span className="deliverable-pill" key={d}>
                      {d}
                    </span>
                  ))}
                </div>

                <div className="featured-case-card__metrics">
                  {c.results.map((r) => (
                    <div className="metric-box" key={r.label}>
                      <strong>{r.value}</strong>
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>

                <div className="featured-case-card__footer">
                  <Link to={`/portfolio/${c.slug}`} className="btn btn--on btn--sm interactive">
                    Ler estudo de caso completo <ArrowRight size={15} />
                  </Link>
                  {c.stack && c.stack.length > 0 && (
                    <span className="featured-case-card__stack">
                      Stack: {c.stack.slice(0, 3).join(' · ')}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Faixa de Indicadores Aegon */}
        <div className="trust-stats" aria-label="Indicadores da Aegon">
          {stats.map((s) => (
            <div className="trust-stat-card" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Marcas e Clientes */}
        <div className="trust-clients">
          <p className="trust-clients__label">Empresas e iniciativas que já construíram com a Aegon</p>
          <div className="trust-clients__grid">
            {clients.map((cl) => (
              <div className="client-pill" key={cl}>
                <strong>{cl}</strong>
                <span>Parceiro Aegon</span>
              </div>
            ))}
          </div>
        </div>

        {/* Depoimentos */}
        <div className="trust-testimonials">
          {testimonials.map((t) => (
            <blockquote className="testimonial-card" key={t.author}>
              <span className="testimonial-card__metric">Depoimento verificado</span>
              <p>“{t.quote}”</p>
              <footer>
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

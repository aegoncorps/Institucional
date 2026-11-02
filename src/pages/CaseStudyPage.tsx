import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { caseStudies, getCase, areaLabel, areaColor } from '../data/cases'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { contactPath, whatsappLink } from '../config'
import { NotFoundPage } from './NotFoundPage'
import { RouteChapter } from '../components/ExperienceScenes'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getCase(slug) : undefined

  usePageMeta({
    title: item ? `${item.title} (${item.client.name}) — Estudo de Caso` : 'Case não encontrado',
    description: item ? item.headline : 'Estudo de caso do portfólio Aegon.',
  })

  if (!item) return <NotFoundPage />

  const currentIdx = caseStudies.findIndex((c) => c.slug === item.slug)
  const nextCase = caseStudies[(currentIdx + 1) % caseStudies.length]

  return (
    <div className="spa-page case-study-page" id="conteudo" style={{ '--v5-case-accent': item.accent } as CSSProperties}>
      {/* Hero do Estudo de Caso */}
      <section className="case-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Navegação estrutural">
            <Link to="/">Início</Link>
            <span>/</span>
            <Link to="/portfolio">Portfólio</Link>
            <span>/</span>
            <span aria-current="page">{item.title}</span>
          </nav>

          <div className="case-hero__tags">
            {item.areas.map((a) => (
              <span className="area-chip" key={a}>
                <i style={{ background: areaColor(a) }} />
                {areaLabel(a)}
              </span>
            ))}
            {item.placeholder && (
              <span className="badge badge--dev">Estudo demonstrativo · dados ilustrativos</span>
            )}
          </div>

          <h1>{item.title}</h1>
          <p className="case-hero__headline">{item.headline}</p>

          {/* Barra de Métricas de Impacto Imediato */}
          <div className="case-hero__metrics">
            {item.results.map((r) => (
              <div className="case-hero__metric-card" key={r.label}>
                <strong>{r.value}</strong>
                <span>{r.label}</span>
              </div>
            ))}
          </div>

          <div className="case-hero__cover">
            <img src={item.cover} alt={item.title} />
            <div className="duotone" />
          </div>
        </div>
      </section>

      <RouteChapter
        variant="case"
        index="02 / Por dentro"
        eyebrow="O detalhe revela a decisão"
        title={item.headline}
        description={item.challenge}
        image={item.cover}
        imageAlt={item.title}
      />

      {/* Corpo do Case: Ficha Técnica Sticky + Narrativa do Trabalho */}
      <section className="page-section">
        <div className="container case-body-grid">
          {/* Ficha Técnica Lateral */}
          <aside className="case-specs" aria-label="Ficha técnica do projeto">
            <div className="case-specs__card">
              <h2>Ficha Técnica</h2>

              <div className="case-specs__row">
                <span>Cliente</span>
                <strong>{item.client.name}</strong>
              </div>
              <div className="case-specs__row">
                <span>Setor</span>
                <strong>{item.client.sector}</strong>
              </div>
              <div className="case-specs__row">
                <span>Ano & Duração</span>
                <strong>
                  {item.year} · {item.duration}
                </strong>
              </div>

              <div className="case-specs__group">
                <span>Entregas Realizadas</span>
                <ul>
                  {item.services.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>

              {item.stack && item.stack.length > 0 && (
                <div className="case-specs__group">
                  <span>Stack & Ferramentas</span>
                  <div className="case-specs__pills">
                    {item.stack.map((st) => (
                      <span className="deliverable-pill" key={st}>
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="case-specs__group">
                <span>Esquadrão Aegon</span>
                <ul>
                  {item.team.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <a
                href={whatsappLink(
                  `Olá, Aegon! Li o estudo de caso "${item.title}" e gostaria de conversar sobre um desafio parecido.`
                )}
                target="_blank"
                rel="noopener"
                className="btn btn--on interactive"
              >
                <WhatsApp size={17} /> Quero um projeto assim
              </a>
              <Link to={contactPath(`Case: ${item.title}`)} className="btn btn--ghost interactive">
                Começar em três perguntas <ArrowRight size={17} />
              </Link>
            </div>
          </aside>

          {/* Narrativa Editorial */}
          <div className="case-narrative">
            <article className="case-narrative__block">
              <p className="eyebrow">01 · Contexto & Visão Geral</p>
              <h2>Sobre o projeto</h2>
              <p className="case-narrative__lead">{item.summary}</p>
            </article>

            <article className="case-narrative__block">
              <p className="eyebrow">02 · O Desafio</p>
              <h2>O problema que precisava ser resolvido</h2>
              <p>{item.challenge}</p>
            </article>

            <article className="case-narrative__block">
              <p className="eyebrow">03 · Nossa Abordagem</p>
              <h2>Como estruturamos a execução</h2>
              <div className="case-approach-list">
                {item.approach.map((step, i) => (
                  <div className="case-approach-card" key={step.title}>
                    <span className="case-approach-card__num">0{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="case-narrative__block">
              <p className="eyebrow">04 · A Solução Entregue</p>
              <h2>O que colocamos em produção</h2>
              <p>{item.solution}</p>
            </article>

            {/* Galeria Visual do Projeto */}
            <div className="case-gallery" aria-label="Galeria de telas e entregas">
              {item.gallery.map((g, idx) => (
                <figure
                  className={`case-gallery__item case-gallery__item--${g.layout}`}
                  key={`${g.caption}-${idx}`}
                >
                  <div className="case-gallery__media">
                    <img src={g.src} alt={g.caption} loading="lazy" />
                    <div className="duotone" />
                  </div>
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>

            {/* Depoimento do Cliente */}
            {item.testimonial && (
              <blockquote className="case-testimonial">
                <p>“{item.testimonial.quote}”</p>
                <footer>
                  <strong>{item.testimonial.author}</strong>
                  <span>{item.testimonial.role}</span>
                </footer>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      {/* Navegação para o Próximo Case */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="next-case-card">
            <div>
              <p className="eyebrow">Próximo Estudo de Caso</p>
              <h2>{nextCase.title}</h2>
              <p>{nextCase.headline}</p>
              <div className="next-case-card__actions">
                <Link to={`/portfolio/${nextCase.slug}`} className="btn btn--on interactive">
                  Ler próximo case <ArrowRight size={17} />
                </Link>
                <Link to="/portfolio" className="btn btn--ghost interactive">
                  Voltar para todos os cases
                </Link>
              </div>
            </div>
            <Link to={`/portfolio/${nextCase.slug}`} className="next-case-card__media interactive">
              <img src={nextCase.cover} alt={nextCase.title} loading="lazy" />
              <div className="duotone" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

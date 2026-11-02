import { useState } from 'react'
import { Link } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { posts, formatDate } from '../data/insights'
import { ArrowRight } from '../components/Icons'

const categories = ['Todos', 'Estratégia', 'Criação', 'Tecnologia'] as const

export function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  usePageMeta({
    title: 'Insights & Artigos — Estratégia, Design e Tecnologia',
    description:
      'Artigos práticos, guias e aprendizados de campo escritos pelo time da Aegon sobre gestão, branding, UX/UI e engenharia de software.',
  })

  const filtered =
    activeCategory === 'Todos'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  const featured = posts[0]

  return (
    <div className="spa-page insights-page" id="conteudo">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Publicações & Notas de Campo</p>
          <h1>
            Insights sobre tecnologia, design e <em>decisões de negócio</em>.
          </h1>
          <p className="page-hero__lead">
            Compartilhamos o que aprendemos na trincheira construindo marcas, plataformas e processos
            para empresas que querem crescer com organização.
          </p>
        </div>
      </section>

      {/* Artigo em Destaque */}
      <section className="page-section page-section--tight">
        <div className="container">
          <article className="featured-post-card">
            <Link to={`/insights/${featured.slug}`} className="featured-post-card__media interactive">
              <img src={featured.cover} alt={featured.title} />
              <div className="duotone" />
              <span className="badge badge--live">Leitura em destaque</span>
            </Link>
            <div className="featured-post-card__body">
              <div className="featured-case-card__meta">
                <strong>{featured.category}</strong>
                <span>·</span>
                <span>{formatDate(featured.date)}</span>
                <span>·</span>
                <span>{featured.readTime} de leitura</span>
              </div>
              <h2>
                <Link to={`/insights/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <div className="featured-post-card__footer">
                <div className="post-author">
                  <strong>{featured.author}</strong>
                  <span>Sócio Aegon</span>
                </div>
                <Link
                  to={`/insights/${featured.slug}`}
                  className="btn btn--on btn--sm interactive"
                >
                  Ler artigo completo <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Filtro + Grade de Artigos */}
      <section className="page-section">
        <div className="container">
          <div className="portfolio-toolbar__filters" role="tablist" aria-label="Filtrar artigos por tema">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-pill ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="posts-grid">
            {filtered.map((post) => (
              <article className="post-card" key={post.slug}>
                <Link to={`/insights/${post.slug}`} className="post-card__media interactive">
                  <img src={post.cover} alt={post.title} loading="lazy" />
                  <div className="duotone" />
                  <span className="badge badge--category">{post.category}</span>
                </Link>
                <div className="post-card__body">
                  <div className="featured-case-card__meta">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>
                    <Link to={`/insights/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <div className="post-card__footer">
                    <span>Por {post.author}</span>
                    <Link to={`/insights/${post.slug}`} className="post-card__read">
                      Ler <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

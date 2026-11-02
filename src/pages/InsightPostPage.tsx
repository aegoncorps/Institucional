import { Link, useParams } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { getPost, posts, formatDate } from '../data/insights'
import { ArrowRight } from '../components/Icons'
import { NotFoundPage } from './NotFoundPage'
import { RouteChapter } from '../components/ExperienceScenes'

export function InsightPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  usePageMeta({
    title: post ? `${post.title} — Insights Aegon` : 'Artigo não encontrado',
    description: post ? post.excerpt : 'Artigo Aegon.',
  })

  if (!post) return <NotFoundPage />

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="spa-page insight-post-page" id="conteudo">
      <article className="article-reader">
        <header className="article-reader__header">
          <div className="container article-reader__container">
            <nav className="breadcrumb" aria-label="Navegação estrutural">
              <Link to="/">Início</Link>
              <span>/</span>
              <Link to="/insights">Insights</Link>
              <span>/</span>
              <span aria-current="page">{post.category}</span>
            </nav>

            <div className="featured-case-card__meta">
              <span className="badge badge--category">{post.category}</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} de leitura</span>
            </div>

            <h1>{post.title}</h1>
            <p className="article-reader__lead">{post.excerpt}</p>

            <div className="article-reader__author">
              <div>
                <strong>{post.author}</strong>
                <span>Sócio Aegon</span>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="case-hero__cover">
              <img src={post.cover} alt={post.title} />
              <div className="duotone" />
            </div>
          </div>
        </header>

        <div className="container article-reader__container article-reader__body">
          {post.body.map((block, idx) => {
            if (block.type === 'h2') return <h2 key={idx}>{block.text}</h2>
            if (block.type === 'quote') {
              return (
                <blockquote className="article-quote" key={idx}>
                  <p>“{block.text}”</p>
                </blockquote>
              )
            }
            if (block.type === 'list') {
              return (
                <ul className="article-list" key={idx}>
                  {block.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              )
            }
            return <p key={idx}>{block.text}</p>
          })}
        </div>
      </article>

      <RouteChapter
        variant="thinking"
        index="02 / Em perspectiva"
        eyebrow={post.category}
        title="Uma ideia só importa quando muda a próxima decisão."
        description={post.excerpt}
        image={post.cover}
        imageAlt={post.title}
      />

      {/* Artigos Relacionados */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Continue lendo</p>
              <h2>Outros artigos da Aegon</h2>
            </div>
            <Link to="/insights" className="btn btn--ghost interactive">
              Ver todas as publicações <ArrowRight size={16} />
            </Link>
          </div>

          <div className="related-cases-grid">
            {related.map((r) => (
              <article className="post-card" key={r.slug}>
                <Link to={`/insights/${r.slug}`} className="post-card__media interactive">
                  <img src={r.cover} alt={r.title} loading="lazy" />
                  <div className="duotone" />
                </Link>
                <div className="post-card__body">
                  <div className="featured-case-card__meta">
                    <span>{r.category}</span>
                    <span>·</span>
                    <span>{r.readTime}</span>
                  </div>
                  <h3>
                    <Link to={`/insights/${r.slug}`}>{r.title}</Link>
                  </h3>
                  <p>{r.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

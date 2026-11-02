import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { featuredCases, areaLabel, areaColor } from '../data/cases'
import { stats, clients, testimonials } from '../data/site'
import { ArrowRight } from '../components/Icons'

/**
 * Ato 5 da Home (SPA) — Galeria Editorial de Cases & Autoridade.
 *
 * Desenhada com a mesma linguagem arquitetônica das 2 primeiras telas:
 * - Zero "sopa de caixinhas": uso de linhas divisórias finas (hairlines),
 *   numeração monumental, tipografia contrastante (Display + Instrument Serif)
 *   e imagens amplas reveladas por máscara (clip-path).
 * - Coreografia completa de Entrada + Platô + Saída (scrub) em cada estudo de caso,
 *   faixa de indicadores, marcas parceiras e citações.
 */
export function HomeShowcase() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // 1. Cabeçalho da seção (Entrada + Saída)
      const head = root.current?.querySelector('.home-showcase__head')
      if (head) {
        const headParts = gsap.utils.toArray<HTMLElement>(
          '.eyebrow, h2, .home-showcase__sub, .home-showcase__head-actions',
          head
        )
        gsap.set(headParts, { y: 42, opacity: 0 })

        const headTl = gsap.timeline({
          scrollTrigger: {
            trigger: head,
            start: 'top 92%',
            end: 'bottom 6%',
            scrub: 0.65,
          },
        })

        headTl
          .to(headParts, {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.34,
            ease: 'power3.out',
          })
          .to(headParts, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'none',
          })
          .to(headParts, { y: 0, opacity: 1, duration: 0.26 })
      }

      // 2. Cada Estudo de Caso Editorial (Construção em 3 colunas na entrada + Desconstrução na saída)
      const spreads = gsap.utils.toArray<HTMLElement>('.editorial-case')
      spreads.forEach((spread) => {
        const rule = spread.querySelector('.editorial-case__rule')
        const metaCol = spread.querySelector('.editorial-case__index-col')
        const mediaWrap = spread.querySelector('.editorial-case__visual')
        const mediaImg = mediaWrap?.querySelector('img')
        const copyParts = gsap.utils.toArray<HTMLElement>(
          '.editorial-case__title, .editorial-case__headline, .editorial-case__summary, .editorial-case__services, .editorial-case__metrics, .editorial-case__cta',
          spread
        )

        if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
        if (metaCol) gsap.set(metaCol, { y: 44, opacity: 0 })
        if (mediaWrap) {
          gsap.set(mediaWrap, {
            clipPath: 'inset(14% 8% 14% 8% round 18px)',
            y: 52,
            opacity: 0.1,
          })
        }
        if (mediaImg) gsap.set(mediaImg, { scale: 1.18, yPercent: -6 })
        if (copyParts.length) gsap.set(copyParts, { y: 40, opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: spread,
            start: 'top 93%',
            end: 'bottom 5%',
            scrub: 0.65,
          },
        })

        // FASE A — Construção (Entrada ao descer)
        if (rule) {
          tl.to(rule, { scaleX: 1, duration: 0.28, ease: 'power2.out' }, 0)
        }
        if (metaCol) {
          tl.to(metaCol, { y: 0, opacity: 1, duration: 0.32, ease: 'power3.out' }, 0.04)
        }
        if (mediaWrap) {
          tl.to(
            mediaWrap,
            {
              clipPath: 'inset(0% 0% 0% 0% round 18px)',
              y: 0,
              opacity: 1,
              duration: 0.36,
              ease: 'power3.out',
            },
            0.06
          )
        }
        if ( copyParts.length ) {
          tl.to(
            copyParts,
            {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 0.34,
              ease: 'power3.out',
            },
            0.1
          )
        }

        // FASE B — Platô de leitura no centro da viewport
        tl.to(spread, { duration: 0.36, ease: 'none' }, 0.38)

        // A composição permanece legível após a revelação.
        if (metaCol) {
          tl.to(
            metaCol,
            { y: 0, opacity: 1, duration: 0.26 },
            0.74
          )
        }
        if (mediaWrap) {
          tl.to(
            mediaWrap,
            {
              clipPath: 'inset(0% 0% 0% 0% round 18px)',
              y: 0,
              opacity: 1,
              duration: 0.26,
              ease: 'power2.in',
            },
            0.74
          )
        }
        if (copyParts.length) {
          tl.to(
            copyParts,
            {
              y: 0,
              opacity: 1,
              stagger: 0.025,
              duration: 0.26,
              ease: 'power2.in',
            },
            0.74
          )
        }

        // Parallax contínuo da imagem durante toda a passagem
        if (mediaImg) {
          tl.to(
            mediaImg,
            {
              scale: 1,
              yPercent: 6,
              duration: 1,
              ease: 'none',
            },
            0
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="home-showcase"
      id="portfolio"
      ref={root}
      aria-label="Cases em destaque e resultados"
    >
      <div className="container">
        {/* Cabeçalho Editorial */}
        <div className="home-showcase__head">
          <div>
            <p className="eyebrow">04 / Portfólio demonstrativo</p>
            <h2>
              Trabalhos que <em className="editorial-serif">ligaram</em> marcas, produtos e
              operações.
            </h2>
            <p className="home-showcase__sub">
              Esta seleção usa histórias e indicadores ilustrativos para apresentar como pensamos,
              criamos e construímos. Explore os estudos de caso ou navegue pelo acervo.
            </p>
          </div>
          <div className="home-showcase__head-actions">
            <Link to="/portfolio" className="btn btn--on interactive">
              Acervo completo (9 cases) <ArrowRight size={17} />
            </Link>
            <Link to="/portfolio?view=3d" className="btn btn--ghost interactive">
              Explorar Constelação 3D
            </Link>
          </div>
        </div>

        {/* Galeria Editorial Arquitetônica dos 3 Cases Selecionados */}
        <div className="editorial-cases">
          {featuredCases.map((c, idx) => (
            <article className="editorial-case" key={c.slug}>
              <div className="editorial-case__rule" aria-hidden="true" />

              <div className="editorial-case__grid">
                {/* Coluna 1: Índice Monumental & Ficha Técnica */}
                <div className="editorial-case__index-col">
                  <span className="editorial-case__num">0{idx + 1}</span>

                  <div className="editorial-case__areas">
                    {c.areas.map((a) => (
                      <span className="editorial-area-tag" key={a}>
                        <i style={{ background: areaColor(a) }} />
                        {areaLabel(a)}
                      </span>
                    ))}
                  </div>

                  <dl className="editorial-case__specs">
                    <div>
                      <dt>Cliente</dt>
                      <dd>{c.client.name}</dd>
                    </div>
                    <div>
                      <dt>Setor</dt>
                      <dd>{c.client.sector}</dd>
                    </div>
                    <div>
                      <dt>Ciclo</dt>
                      <dd>
                        {c.year} · {c.duration}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Coluna 2: Imagem Cinematográfica com Máscara e Parallax */}
                <Link
                  to={`/portfolio/${c.slug}`}
                  className="editorial-case__visual interactive"
                  aria-label={`Ver estudo de caso: ${c.title}`}
                >
                  <img src={c.cover} alt={c.title} loading="lazy" />
                  <div className="duotone" />
                  <span className="editorial-case__hover-pill">
                    Abrir estudo de caso <ArrowRight size={14} />
                  </span>
                </Link>

                {/* Coluna 3: Narrativa & Indicadores Tipográficos */}
                <div className="editorial-case__copy-col">
                  <h3 className="editorial-case__title">
                    <Link to={`/portfolio/${c.slug}`} className="interactive">
                      {c.title}
                    </Link>
                  </h3>

                  <p className="editorial-case__headline">{c.headline}</p>
                  <p className="editorial-case__summary">{c.summary}</p>

                  <p className="editorial-case__services" aria-label="Entregas realizadas">
                    <strong>Escopo:</strong> {c.services.join('  ·  ')}
                  </p>

                {c.placeholder && <span className="badge badge--dev">Case ilustrativo</span>}
                <div className="editorial-case__metrics">
                    {c.results.map((r) => (
                      <div className="editorial-metric" key={r.label}>
                        <strong>{r.value}</strong>
                        <span>{r.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="editorial-case__cta">
                    <Link
                      to={`/portfolio/${c.slug}`}
                      className="editorial-link interactive"
                    >
                      <span>Ler estudo de caso completo</span>
                      <ArrowRight size={16} />
                    </Link>
                    {c.stack && c.stack.length > 0 && (
                      <span className="editorial-case__stack">
                        {c.stack.slice(0, 3).join(' / ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Faixa Arquitetônica de Indicadores (Sem caixinhas genéricas) */}
        <div className="editorial-ledger-wrap">
          <p className="eyebrow">Indicadores ilustrativos / composição visual</p>
          <div className="editorial-rule" data-scroll-line />
          <div className="editorial-ledger" data-scroll-stagger aria-label="Indicadores da Aegon">
            {stats.map((s, i) => (
              <div className="editorial-ledger__item" key={s.label}>
                <span className="editorial-ledger__index">0{i + 1}</span>
                <strong>{s.value}</strong>
                <span className="editorial-ledger__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Índice Editorial de Marcas & Parceiros */}
        <div className="editorial-clients">
          <div className="editorial-rule" data-scroll-line />
          <div className="editorial-clients__header" data-scroll-reveal>
            <span className="eyebrow">Ecossistema Aegon</span>
            <p>Nomes demonstrativos usados para visualizar o futuro acervo de marcas e parceiros</p>
          </div>
          <div className="editorial-clients__list" data-scroll-stagger>
            {clients.map((cl, i) => (
              <div className="editorial-client-row" key={cl}>
                <span className="editorial-client-row__num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <strong>{cl}</strong>
                <span className="editorial-client-row__tag">Exemplo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Citações Editoriais de Clientes */}
        <div className="editorial-quotes-wrap">
          <p className="eyebrow">Depoimentos ilustrativos</p>
          <div className="editorial-rule" data-scroll-line />
          <div className="editorial-quotes" data-scroll-stagger>
            {testimonials.map((t, i) => (
              <blockquote className="editorial-quote" key={t.author}>
                <span className="editorial-quote__mark" aria-hidden="true">
                  “
                </span>
                <p>{t.quote}</p>
                <footer>
                  <div>
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                  <span className="editorial-quote__num">0{i + 1}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

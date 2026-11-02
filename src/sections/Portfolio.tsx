import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { cases, topics, type PortfolioCase } from '../data/content'
import { Close, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'
import { prefersReducedMotion } from '../lib/motion'

const ConstellationCanvas = lazy(() => import('./ConstellationCanvas'))

/**
 * Ato 5 — Portfólio 3D em constelação com zoom.
 * Cases agrupados por assunto (Branding, Sistemas, Design, Consultoria).
 * Ao clicar num assunto ou case, a câmera 3D dá zoom suave e abre os detalhes.
 * Fallback em grade acessível para mobile ou prefers-reduced-motion.
 */
export function Portfolio() {
  const root = useRef<HTMLElement>(null)
  const [activeTopic, setActiveTopic] = useState<string>('all')
  const [selectedCase, setSelectedCase] = useState<PortfolioCase | null>(null)
  const [inView, setInView] = useState(false)
  const [use3D, setUse3D] = useState(true)

  useEffect(() => {
    const check = () => {
      const wide = window.innerWidth >= 860
      setUse3D(wide && !prefersReducedMotion())
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const filteredCases = activeTopic === 'all' ? cases : cases.filter((c) => c.topic === activeTopic)

  const handleTopicClick = (id: string) => {
    setSelectedCase(null)
    setActiveTopic((prev) => (prev === id ? 'all' : id))
  }

  return (
    <section className="portfolio" id="portfolio" ref={root} aria-label="Portfólio por assuntos">
      <div className="container portfolio__head">
        <div>
          <p className="eyebrow">Portfólio interativo</p>
          <h2>Explore nossos assuntos em 3D.</h2>
          <p className="portfolio__sub">
            Filtre por área ou clique em qualquer projeto na constelação para dar zoom e ver o que entregamos.
          </p>
        </div>

        <div className="portfolio__filters" role="tablist" aria-label="Filtrar portfólio por assunto">
          <button
            type="button"
            role="tab"
            aria-selected={activeTopic === 'all'}
            className={`filter-pill ${activeTopic === 'all' ? 'is-active' : ''}`}
            onClick={() => {
              setSelectedCase(null)
              setActiveTopic('all')
            }}
          >
            Todos ({cases.length})
          </button>
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTopic === t.id}
              className={`filter-pill ${activeTopic === t.id ? 'is-active' : ''}`}
              onClick={() => handleTopicClick(t.id)}
            >
              <span className="filter-pill__dot" style={{ background: t.color }} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {use3D ? (
        <div className="portfolio__stage">
          {inView && (
            <Suspense fallback={<div className="portfolio__loader">Carregando constelação 3D…</div>}>
              <ConstellationCanvas
                activeTopic={activeTopic}
                selectedCase={selectedCase}
                onSelectCase={setSelectedCase}
                onSelectTopic={handleTopicClick}
              />
            </Suspense>
          )}

          <div className="portfolio__stage-bar">
            <span>
              {selectedCase
                ? `Visualizando: ${selectedCase.title}`
                : activeTopic !== 'all'
                  ? `Zoom no assunto: ${topics.find((t) => t.id === activeTopic)?.label}`
                  : 'Dica: passe o mouse para orbitar e clique em um projeto para aproximar a câmera'}
            </span>
            {(selectedCase || activeTopic !== 'all') && (
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  setSelectedCase(null)
                  setActiveTopic('all')
                }}
              >
                Resetar câmera
              </button>
            )}
          </div>

          {selectedCase && (
            <aside className="portfolio__card" aria-live="polite">
              <button
                type="button"
                className="portfolio__card-close"
                onClick={() => setSelectedCase(null)}
                aria-label="Fechar projeto"
              >
                <Close size={18} />
              </button>
              <img src={selectedCase.image} alt={selectedCase.title} />
              <div className="portfolio__card-body">
                <div className="portfolio__card-meta">
                  <span>{topics.find((t) => t.id === selectedCase.topic)?.label}</span>
                  <span>·</span>
                  <span>{selectedCase.year}</span>
                  {selectedCase.placeholder && <span className="badge badge--dev">Exemplo</span>}
                </div>
                <h3>{selectedCase.title}</h3>
                <p>{selectedCase.summary}</p>
                <ul>
                  {selectedCase.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <a
                  className="btn btn--on btn--sm"
                  href={whatsappLink(`Olá, Aegon! Vi o projeto "${selectedCase.title}" no portfólio e quero conversar sobre algo semelhante.`)}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsApp size={15} /> Quero um projeto assim
                </a>
              </div>
            </aside>
          )}
        </div>
      ) : (
        <div className="container portfolio__grid">
          {filteredCases.map((c) => (
            <article className="case-tile" key={c.id}>
              <div className="case-tile__media">
                <img src={c.image} alt={c.title} loading="lazy" />
                <span className="badge badge--category">
                  {topics.find((t) => t.id === c.topic)?.label}
                </span>
              </div>
              <div className="case-tile__body">
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                <ul>
                  {c.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}


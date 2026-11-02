import { Link } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { solutions } from '../data/solutions'
import { processSteps } from '../data/site'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'
import { SolutionLayers } from '../components/ExperienceScenes'

export function SolutionsPage() {
  usePageMeta({
    title: 'Soluções & Pilares — Estratégia, Criação e Tecnologia',
    description:
      'Conheça as frentes de atuação da Aegon: diagnóstico estratégico, identidade e design de experiência, e engenharia de software sob medida.',
  })

  return (
    <div className="spa-page solutions-page" id="conteudo">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Nossas Soluções · 3 Pilares Conectados</p>
          <h1>
            Estratégia, criação e tecnologia trabalhando na <em>mesma direção</em>.
          </h1>
          <p className="page-hero__lead">
            Você pode contratar uma frente específica ou combinar nossos três pilares em um projeto
            integrado, com um único time responsável do diagnóstico ao código em produção.
          </p>
        </div>
      </section>

      <SolutionLayers />

      <section className="page-section">
        <div className="container solutions-list">
          {solutions.map((sol) => (
            <article className="solution-overview-card" key={sol.slug}>
              <div className="solution-overview-card__media">
                <img src={sol.image} alt={sol.name} loading="lazy" />
                <div className="duotone" />
                <span className="solution-overview-card__num">{sol.number}</span>
              </div>

              <div className="solution-overview-card__body">
                <p className="eyebrow">
                  {sol.number} · Pilar de {sol.name}
                </p>
                <h2>{sol.headline}</h2>
                <p>{sol.intro}</p>

                <div className="solution-overview-card__deliverables">
                  {sol.deliverables.map((d) => (
                    <div className="mini-deliverable" key={d.title}>
                      <strong>{d.title}</strong>
                      <span>{d.text}</span>
                    </div>
                  ))}
                </div>

                <div className="solution-overview-card__actions">
                  <Link
                    to={`/solucoes/${sol.slug}`}
                    className="btn btn--on interactive"
                  >
                    Explorar {sol.name} em detalhes <ArrowRight size={17} />
                  </Link>
                  <a
                    href={whatsappLink(
                      `Olá, Aegon! Quero conversar sobre a frente de ${sol.name}.`
                    )}
                    target="_blank"
                    rel="noopener"
                    className="btn btn--ghost interactive"
                  >
                    <WhatsApp size={17} /> Solicitar proposta
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Como contratamos / Processo */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Jornada Integrada</p>
              <h2>Do primeiro diagnóstico à operação acompanhada.</h2>
            </div>
          </div>

          <div className="process-grid">
            {processSteps.map((st) => (
              <article className="process-card" key={st.n}>
                <div className="process-card__top">
                  <span className="process-card__step">{st.n}</span>
                  <span className="process-card__duration">{st.duration}</span>
                </div>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div className="container page-cta-band__inner">
          <div>
            <p className="eyebrow">Não sabe por qual pilar começar?</p>
            <h2>Comece com uma conversa diagnóstica de 30 minutos.</h2>
          </div>
          <div className="page-cta-band__actions">
            <Link to="/contato" className="btn btn--on interactive">
              Agendar diagnóstico <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import { usePageMeta } from '../lib/seo'
import { jobs } from '../data/insights'
import { values } from '../data/site'
import { WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'
import { RouteChapter } from '../components/ExperienceScenes'

export function CareersPage() {
  usePageMeta({
    title: 'Carreiras & Rede de Talentos — Trabalhe na Aegon',
    description:
      'Construa marcas, produtos e sistemas reais ao lado de estrategistas, designers e engenheiros na Aegon.',
  })

  return (
    <div className="spa-page careers-page" id="conteudo">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Carreiras & Cultura · apresentação demonstrativa</p>
          <h1>
            Construa soluções que as pessoas <em>realmente usam</em>.
          </h1>
          <p className="page-hero__lead">
            Na Aegon, trabalhamos em squads enxutos, sem microgerenciamento e com autonomia real para
            propor arquitetura, direção de arte e decisões de produto.
          </p>
        </div>
      </section>

      <RouteChapter
        variant="culture"
        index="01 / Gente que liga ideias"
        eyebrow="Cultura Aegon"
        title="Criar junto é o nosso jeito de avançar."
        description="Talento técnico, repertório criativo e curiosidade pelo negócio sentam à mesma mesa. É assim que damos forma ao que ainda não existe."
        image="/assets/img/mock/sobre-equipe.jpg"
        secondaryImage="/assets/img/mock/sobre-estudio.jpg"
        imageAlt="Equipe em colaboração"
      />

      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Como Trabalhamos</p>
              <h2>O que valorizamos no dia a dia.</h2>
            </div>
          </div>

          <div className="values-grid">
            {values.map((v, idx) => (
              <article className="value-card" key={v.title}>
                <span className="value-card__num">0{idx + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Perfis em estudo · exemplos</p>
              <h2>Talentos que queremos conectar.</h2>
            </div>
          </div>

          <div className="jobs-list">
            {jobs.map((job) => (
              <article className="job-card" key={job.id}>
                <div className="job-card__main">
                  <div className="featured-case-card__meta">
                    <span className="badge badge--category">{job.area}</span>
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </div>
                  <h3>{job.title}</h3>
                  <p>{job.summary}</p>
                  <ul className="job-card__reqs">
                    {job.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="job-card__action">
                  <a
                    href={whatsappLink(
                      `Olá, Aegon! Quero me candidatar à posição de "${job.title}" (${job.area}).`
                    )}
                    target="_blank"
                    rel="noopener"
                    className="btn btn--on interactive"
                  >
                    <WhatsApp size={17} /> Candidatar-se
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

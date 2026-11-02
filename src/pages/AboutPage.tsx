import { Link } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { company, team, values, processSteps, timeline, stats } from '../data/site'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { whatsappLink } from '../config'

export function AboutPage() {
  usePageMeta({
    title: 'Quem Somos — A História, Cultura e Time',
    description:
      'Conheça a origem da Aegon, nossos valores, os sócios fundadores e o método em 4 etapas que conecta estratégia, criação e tecnologia.',
  })

  return (
    <div className="spa-page about-page" id="conteudo">
      {/* Hero Editorial */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow">Quem Somos · Aegon</p>
            <h1>
              Um parceiro completo para <em>ligar</em> o seu negócio ao próximo nível.
            </h1>
            <p className="page-hero__lead">
              Nascemos da convicção de que tecnologia e design só têm valor quando resolvem problemas
              reais de operação, vendas e posicionamento — sem jargões e sem complexidade artificial.
            </p>
            <div className="page-hero__actions">
              <Link to="/portfolio" className="btn btn--on interactive">
                Ver trabalhos realizados <ArrowRight size={17} />
              </Link>
              <Link to="/contato" className="btn btn--ghost interactive">
                Agendar conversa com os sócios
              </Link>
            </div>
          </div>

          <div className="page-hero__media">
            <img src="/assets/img/mock/sobre-estudio.jpg" alt="Estúdio Aegon" />
            <div className="duotone" />
            <div className="page-hero__badge">
              <strong>ON</strong>
              <span>Estratégia · Criação · Tecnologia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Indicadores */}
      <section className="page-section page-section--tight">
        <div className="container">
          <div className="trust-stats">
            {stats.map((s) => (
              <div className="trust-stat-card" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Origem & Manifesto */}
      <section className="page-section">
        <div className="container about-origin">
          <div className="about-origin__media">
            <img src="/assets/img/mock/sobre-equipe.jpg" alt="Reunião estratégica Aegon" loading="lazy" />
            <div className="duotone" />
          </div>
          <div className="about-origin__copy">
            <p className="eyebrow">Nossa Origem</p>
            <h2>Por que criamos a Aegon?</h2>
            <p>
              Durante anos atuando em projetos de consultoria, tecnologia e comunicação, vimos o mesmo
              cenário se repetir: empresas contratavam uma agência para criar a marca, uma software house
              para desenvolver o sistema e uma consultoria que entregava um PDF que ninguém executava.
            </p>
            <p>
              O resultado era sempre desconexão, retrabalho e investimento desperdiçado. A{' '}
              <strong>{company.name}</strong> nasceu para unificar essas três pontas sob uma mesma direção:
              entendemos o negócio primeiro, desenhamos a identidade certa e construímos a tecnologia que
              faz a rotina rodar.
            </p>
            <div className="about-origin__quote">
              <p>“{company.tagline}”</p>
              <span>Manifesto Aegon · Desde {company.foundedYear}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Valores e Princípios */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Cultura & Princípios</p>
              <h2>O que guia cada decisão técnica e criativa.</h2>
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

      {/* Metodologia: Como Ligamos */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Nosso Método</p>
              <h2>Como ligamos estratégia, design e código em 4 etapas.</h2>
              <p className="section-header__sub">
                Um processo transparente, com entregas tangíveis a cada ciclo e foco em retorno prático.
              </p>
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

      {/* Quem Faz a Aegon (Time / Sócios) */}
      <section className="page-section page-section--alt">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Liderança & Especialistas</p>
              <h2>Quem está à frente dos projetos.</h2>
              <p className="section-header__sub">
                Na Aegon, quem faz o diagnóstico também acompanha a execução até o go-live.
              </p>
            </div>
            <Link to="/carreiras" className="btn btn--ghost interactive">
              Trabalhe conosco <ArrowRight size={16} />
            </Link>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <article className="team-card" key={member.id}>
                <div className="team-card__header">
                  <div className="team-card__avatar" aria-hidden="true">
                    {member.initials}
                  </div>
                  <div>
                    <span className="team-card__area">Liderança Aegon</span>
                    <h3>{member.name}</h3>
                    <p className="team-card__role">{member.role}</p>
                  </div>
                </div>
                <p className="team-card__bio">{member.bio}</p>
                <div className="team-card__tags">
                  {member.focus.map((sp) => (
                    <span className="deliverable-pill" key={sp}>
                      {sp}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Trajetória</p>
              <h2>Nossa evolução até aqui.</h2>
            </div>
          </div>

          <div className="timeline-list">
            {timeline.map((item) => (
              <div className="timeline-item" key={item.year}>
                <span className="timeline-item__year">{item.year}</span>
                <div className="timeline-item__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final da Página */}
      <section className="page-cta-band">
        <div className="container page-cta-band__inner">
          <div>
            <p className="eyebrow">Pronto para ligar seu próximo projeto?</p>
            <h2>Vamos conversar sobre o momento atual da sua empresa.</h2>
          </div>
          <div className="page-cta-band__actions">
            <Link to="/contato" className="btn btn--on interactive">
              Montar briefing do projeto <ArrowRight size={17} />
            </Link>
            <a
              href={whatsappLink('Olá, Aegon! Acabei de conhecer a página Quem Somos e gostaria de agendar uma conversa.')}
              target="_blank"
              rel="noopener"
              className="btn btn--ghost interactive"
            >
              <WhatsApp size={18} /> Falar direto no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

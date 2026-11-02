import { type FormEvent, useState } from 'react'
import { usePageMeta } from '../lib/seo'
import { company } from '../data/site'
import { WhatsApp, ArrowRight } from '../components/Icons'
import { whatsappLink } from '../config'

const areasOptions = [
  'Estratégia & Consultoria de Negócios',
  'Branding & Identidade Visual',
  'UX / UI & Design de Produto',
  'Desenvolvimento de Sistemas / SaaS',
  'Site Institucional / Landing Page',
  'Produtos Aegon (Financeiro / Compras / Andresa)',
]

const budgetOptions = [
  'Até R$ 15 mil',
  'De R$ 15 mil a R$ 40 mil',
  'De R$ 40 mil a R$ 100 mil',
  'Acima de R$ 100 mil',
  'Ainda estou definindo orçamento',
]

export function ContactPage() {
  usePageMeta({
    title: 'Contato & Briefing de Projeto — Vamos Ligar sua Ideia?',
    description:
      'Inicie uma conversa com a Aegon. Monte o briefing rápido do seu projeto ou fale diretamente com nossos sócios pelo WhatsApp ou e-mail.',
  })

  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedAreas, setSelectedAreas] = useState<string[]>([areasOptions[0]])
  const [budget, setBudget] = useState(budgetOptions[4])
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    )
  }

  const buildBriefingText = () => {
    return [
      `Olá, Aegon! Preenchi o briefing no site:`,
      `• Nome: ${name || 'Não informado'}`,
      `• Empresa: ${org || 'Não informada'}`,
      `• E-mail: ${email || 'Não informado'}`,
      `• Telefone: ${phone || 'Não informado'}`,
      `• Frentes de interesse: ${selectedAreas.join(', ') || 'Geral'}`,
      `• Faixa de investimento: ${budget}`,
      `• Contexto do projeto: ${message || 'Gostaria de agendar uma conversa diagnóstica.'}`,
    ].join('\n')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const url = whatsappLink(buildBriefingText())
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="spa-page contact-page" id="conteudo">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contato & Diagnóstico</p>
          <h1>
            Vamos <em>ligar</em> sua próxima ideia?
          </h1>
          <p className="page-hero__lead">
            Conte em poucas linhas o momento atual da sua empresa. Respondemos em até 1 dia útil com
            uma sugestão clara de próximos passos.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container contact-grid">
          {/* Formulário Interativo de Briefing */}
          <div className="contact-form-card">
            <h2>1. Monte o briefing rápido do seu projeto</h2>
            <p className="contact-form-card__sub">
              Ao enviar, estruturamos seu resumo automaticamente para iniciar o atendimento direto com
              o sócio responsável pela área.
            </p>

            <form className="briefing-form" onSubmit={handleSubmit}>
              <div className="briefing-form__row">
                <label className="form-field">
                  <span>Seu nome *</span>
                  <input
                    type="text"
                    required
                    placeholder="Ex.: Mariana Costa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>Empresa / Negócio</span>
                  <input
                    type="text"
                    placeholder="Ex.: Vértice Arquitetura"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                  />
                </label>
              </div>

              <div className="briefing-form__row">
                <label className="form-field">
                  <span>E-mail corporativo *</span>
                  <input
                    type="email"
                    required
                    placeholder="voce@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span>WhatsApp / Telefone *</span>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-field">
                <span>O que você quer ligar no seu negócio? (selecione um ou mais)</span>
                <div className="chip-selector">
                  {areasOptions.map((area) => {
                    const active = selectedAreas.includes(area)
                    return (
                      <button
                        key={area}
                        type="button"
                        className={`chip-option ${active ? 'is-selected' : ''}`}
                        onClick={() => toggleArea(area)}
                      >
                        {area}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="form-field">
                <span>Expectativa de investimento</span>
                <div className="chip-selector">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`chip-option ${budget === b ? 'is-selected' : ''}`}
                      onClick={() => setBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <label className="form-field">
                <span>Conte um pouco sobre o desafio ou objetivo</span>
                <textarea
                  rows={4}
                  placeholder="Qual problema você quer resolver nos próximos meses?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>

              <div className="briefing-form__actions">
                <button type="submit" className="btn btn--on interactive">
                  <WhatsApp size={18} /> Enviar briefing e iniciar conversa <ArrowRight size={16} />
                </button>
              </div>

              {submitted && (
                <div className="briefing-form__success" role="status">
                  Briefing formatado com sucesso! Caso a janela do WhatsApp não tenha aberto,{' '}
                  <a href={whatsappLink(buildBriefingText())} target="_blank" rel="noopener">
                    clique aqui para abrir diretamente
                  </a>
                  .
                </div>
              )}
            </form>
          </div>

          {/* Canais Diretos e Escritórios */}
          <aside className="contact-sidebar">
            <div className="contact-info-card">
              <p className="eyebrow">Canais Diretos</p>
              <h3>Prefere falar agora sem formulário?</h3>
              <p>Nosso time atende {company.hours}.</p>

              <div className="contact-direct-links">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener"
                  className="contact-channel-item interactive"
                >
                  <span>WhatsApp Comercial</span>
                  <strong>{company.phone}</strong>
                </a>

                <a
                  href={`mailto:${company.email}`}
                  className="contact-channel-item interactive"
                >
                  <span>Novos Negócios & Propostas</span>
                  <strong>{company.email}</strong>
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <p className="eyebrow">Presença & Atendimento</p>
              <h3>Bases de Operação</h3>
              <div className="office-block">
                <strong>Sede Principal</strong>
                <span>{company.cities.join(' · ')}</span>
                <p>{company.address}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

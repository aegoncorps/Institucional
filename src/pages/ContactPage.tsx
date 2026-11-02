import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { company } from '../data/site'
import { ArrowRight, WhatsApp } from '../components/Icons'
import { OnBrandSymbol } from '../components/Logo'
import { whatsappLink } from '../config'

type Step = 0 | 1 | 2
type Status = 'idle' | 'sending' | 'success' | 'error'

const prompts = [
  { eyebrow: '01 / A pessoa', title: 'Como podemos te chamar?', hint: 'Vamos começar pelo começo.' },
  { eyebrow: '02 / O retorno', title: 'Qual é o seu melhor e-mail?', hint: 'É por aqui que seguimos a conversa.' },
  { eyebrow: '03 / O movimento', title: 'O que você quer colocar em movimento?', hint: 'Conte o desafio com suas palavras.' },
] as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactPage() {
  usePageMeta({
    title: 'Contato — Vamos colocar sua ideia em movimento | Aegon',
    description: 'Três perguntas para começar uma conversa com a Aegon sobre sua marca, operação ou produto.',
  })

  const [searchParams] = useSearchParams()
  const origin = (searchParams.get('origem') || '').trim().slice(0, 90)
  const [step, setStep] = useState<Step>(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (status === 'success') return
    inputRef.current?.focus()
  }, [step, status])

  const current = prompts[step]
  const emailBody = [
    'Olá, Aegon!',
    '',
    `Nome: ${name.trim()}`,
    `E-mail: ${email.trim()}`,
    origin ? `Origem: ${origin}` : '',
    `Projeto: ${message.trim()}`,
  ].filter(Boolean).join('\n')

  const validate = () => {
    if (step === 0 && name.trim().length < 2) return 'Escreva seu nome para continuarmos.'
    if (step === 1 && !emailPattern.test(email.trim())) return 'Digite um e-mail válido para receber nosso retorno.'
    if (step === 2 && message.trim().length < 12) return 'Conte um pouco mais sobre o desafio ou objetivo.'
    return ''
  }

  const advance = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const website = (event.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value ?? ''
    const validation = validate()
    if (validation) {
      setError(validation)
      inputRef.current?.focus()
      return
    }
    setError('')

    if (step < 2) {
      setStep((step + 1) as Step)
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), origin, website }),
      })
      const result = await response.json()
      if (!response.ok || result?.status !== 'received') throw new Error('Não foi possível confirmar o envio.')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Não conseguimos confirmar o envio agora. Você pode tentar de novo ou usar o e-mail direto abaixo.')
    }
  }

  const goBack = () => {
    setError('')
    setStatus('idle')
    setStep((step - 1) as Step)
  }

  return (
    <div className="spa-page contact-page contact-v5" id="conteudo">
      <section className="contact-v5__stage" aria-labelledby="contact-heading">
        <div className="contact-v5__glow" aria-hidden="true" />
        <div className="container contact-v5__layout">
          <div className="contact-v5__intro">
            <p className="eyebrow">Contato / acione a próxima ideia</p>
            <h1 id="contact-heading">Tem algo para <em>colocar em movimento?</em></h1>
            <p>Três respostas bastam para começar. Conte o que você imagina e seguimos a conversa com direção.</p>
            <div className="contact-v5__brand" aria-hidden="true">
              <OnBrandSymbol />
              <span>Tudo se resolve<br />no mesmo botão.</span>
            </div>
          </div>

          <div className="contact-v5__journey">
            {status === 'success' ? (
              <div className="contact-v5__success" role="status">
                <span className="contact-v5__success-mark"><OnBrandSymbol /></span>
                <p className="eyebrow">Mensagem recebida / on</p>
                <h2>Obrigado, {name.trim().split(' ')[0]}.</h2>
                <p>Sua ideia já está a caminho da Aegon. Agora é com a gente: vamos ler seu contexto e responder pelo e-mail informado.</p>
                <Link to="/portfolio" className="btn btn--on interactive">Enquanto isso, explore nossos trabalhos <ArrowRight size={17} /></Link>
              </div>
            ) : (
              <>
                <div className="contact-v5__progress" aria-label={`Passo ${step + 1} de 3`}>
                  <span>Passo 0{step + 1} <span className="contact-v5__progress-muted">/ 03</span></span>
                  <div className="contact-v5__track"><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
                </div>
                <form className="contact-v5__form" onSubmit={advance} noValidate>
                  <label className="sr-only" aria-hidden="true">Site <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
                  <div className="contact-v5__question" key={step}>
                    <p className="eyebrow">{current.eyebrow}</p>
                    <h2>{current.title}</h2>
                    <p className="contact-v5__hint">{current.hint}</p>
                    {origin && <p className="contact-v5__origin">Você chegou por: <strong>{origin}</strong></p>}
                    <label className="contact-v5__field">
                      <span className="sr-only">{current.title}</span>
                      {step === 0 && (
                        <input ref={inputRef as React.RefObject<HTMLInputElement>} type="text" autoComplete="name" maxLength={100}
                          value={name} onChange={(event) => { setName(event.target.value); setError('') }} placeholder="Seu nome" aria-invalid={Boolean(error)} />
                      )}
                      {step === 1 && (
                        <input ref={inputRef as React.RefObject<HTMLInputElement>} type="email" autoComplete="email" maxLength={254}
                          value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} placeholder="voce@empresa.com" aria-invalid={Boolean(error)} />
                      )}
                      {step === 2 && (
                        <textarea ref={inputRef as React.RefObject<HTMLTextAreaElement>} rows={3} maxLength={1500}
                          value={message} onChange={(event) => { setMessage(event.target.value); setError('') }}
                          placeholder="Qual desafio você quer destravar?" aria-invalid={Boolean(error)} />
                      )}
                    </label>
                    {error && <p className="contact-v5__error" role="alert">{error}</p>}
                  </div>
                  <div className="contact-v5__actions">
                    {step > 0 ? <button type="button" className="contact-v5__back" onClick={goBack}>← Voltar</button> : <span className="contact-v5__keyboard">Enter para continuar ↵</span>}
                    <button type="submit" className="btn btn--on interactive" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Enviando...' : step === 2 ? 'Enviar mensagem' : 'Próximo'} <ArrowRight size={17} />
                    </button>
                  </div>
                </form>
                <p className="contact-v5__privacy">Usaremos seus dados para responder a esta conversa. <Link to="/privacidade">Privacidade</Link>.</p>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="contact-v5__channels">
        <div className="container contact-v5__channels-inner">
          <div><span className="eyebrow">Caminho direto</span><h2>Prefere conversar agora?</h2></div>
          <div className="contact-v5__links">
            <a href={`mailto:${company.email}?subject=Novo%20projeto%20Aegon&body=${encodeURIComponent(emailBody)}`}><span>E-mail</span><strong>{company.email}</strong> ↗</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsApp size={18} /><span>WhatsApp</span> ↗</a>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap } from '../lib/motion'
import { OnBrandSymbol } from './Logo'
import { ArrowRight } from './Icons'

type ChapterVariant = 'human' | 'work' | 'thinking' | 'culture' | 'case' | 'solution'

export function ActivationBridge() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.v5-bridge__aperture', { scale: 0.74 }, {
          scale: 1.18, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="v5-bridge" ref={root} aria-labelledby="v5-bridge-heading">
      <div className="v5-bridge__aperture" aria-hidden="true"><OnBrandSymbol /></div>
      <div className="container v5-bridge__content">
        <p className="eyebrow">Agência + hub / uma direção</p>
        <h2 id="v5-bridge-heading">Ideias ganham força quando tudo <em>entra em movimento.</em></h2>
        <div className="v5-bridge__bottom">
          <p>Da primeira pergunta ao produto em uso: estratégia, criação e tecnologia trabalham juntas para ativar marcas e operações.</p>
          <Link to="/sobre" className="v5-bridge__link interactive">Conheça o jeito Aegon <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  )
}

type ChapterProps = {
  variant: ChapterVariant
  index: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  secondaryImage?: string
  to?: string
  linkLabel?: string
}

export function RouteChapter(props: ChapterProps) {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.v5-chapter__image', { scale: 1.24, yPercent: -6 }, {
          scale: 1, yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'bottom 25%', scrub: 0.75 },
        })
        gsap.fromTo('.v5-chapter__copy', { y: 65, opacity: 0.25 }, {
          y: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 20%', scrub: 0.6 },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className={`v5-chapter v5-chapter--${props.variant}`} ref={root} aria-label={props.eyebrow}>
      <div className="container v5-chapter__grid">
        <div className="v5-chapter__copy">
          <div className="v5-chapter__meta"><span>{props.index}</span><span>{props.eyebrow}</span></div>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          {props.to && props.linkLabel && <Link to={props.to} className="v5-chapter__link interactive">{props.linkLabel} <ArrowRight size={17} /></Link>}
        </div>
        <div className="v5-chapter__visual">
          <img className="v5-chapter__image" src={props.image} alt={props.imageAlt} loading="lazy" />
          {props.secondaryImage && <img className="v5-chapter__secondary" src={props.secondaryImage} alt="" loading="lazy" />}
          <span className="v5-chapter__corner v5-chapter__corner--a" aria-hidden="true" />
          <span className="v5-chapter__corner v5-chapter__corner--b" aria-hidden="true" />
          <span className="v5-chapter__on" aria-hidden="true"><OnBrandSymbol /></span>
        </div>
      </div>
    </section>
  )
}

const layers = [
  {
    name: 'Estratégia',
    number: '01',
    before: 'Muitas decisões. Pouca direção.',
    after: 'Um problema claro e prioridades que cabem no plano.',
    detail: 'Diagnóstico, posicionamento e um mapa de ação.',
    image: '/assets/img/consultoria.jpg',
  },
  {
    name: 'Criação',
    number: '02',
    before: 'A marca existe, mas passa despercebida.',
    after: 'Uma linguagem que as pessoas reconhecem.',
    detail: 'Identidade, experiência e conteúdo em um sistema.',
    image: '/assets/img/brandingIdentidade.jpg',
  },
  {
    name: 'Tecnologia',
    number: '03',
    before: 'Ferramentas e processos desconectados.',
    after: 'Uma operação que funciona em conjunto.',
    detail: 'Produtos, sistemas e integrações feitos para o uso real.',
    image: '/assets/img/desenvolvimentoSistemas.jpg',
  },
] as const

export function SolutionLayers({ initial = 0 }: { initial?: number }) {
  const [active, setActive] = useState(initial)
  const layer = layers[active]
  return (
    <section className="v5-layers" aria-labelledby="v5-layers-title">
      <div className="container">
        <div className="v5-layers__head">
          <p className="eyebrow">Um desafio / três forças conectadas</p>
          <h2 id="v5-layers-title">Escolha o que precisa <em>entrar em ação.</em></h2>
        </div>
        <div className="v5-layers__tabs" role="group" aria-label="Pilares Aegon">
          {layers.map((item, index) => (
            <button type="button" aria-pressed={active === index}
              className={active === index ? 'is-active' : ''} key={item.number} onClick={() => setActive(index)}>
              <span>{item.number}</span>{item.name}
            </button>
          ))}
        </div>
        <div className="v5-layers__stage" role="region" aria-live="polite" aria-label={`Demonstração de ${layer.name}`} key={active}>
          <div className="v5-layers__before"><span>Off / ponto de partida</span><p>{layer.before}</p></div>
          <span className="v5-layers__switch" aria-hidden="true"><OnBrandSymbol /></span>
          <div className="v5-layers__after"><img src={layer.image} alt="" loading="lazy" /><div><span>On / mudança</span><p>{layer.after}</p><small>{layer.detail}</small></div></div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { Close, Menu, WhatsApp } from './Icons'
import { whatsappLink } from '../config'
import { lockScroll, ScrollTrigger } from '../lib/motion'

const links = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#portfolio', label: 'Portfólio' },
]

export function Header() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // O header só aparece depois que o usuário atravessa o portal.
    const st = ScrollTrigger.create({
      trigger: '#manifesto',
      start: 'top 85%',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header ${visible || open ? 'is-visible' : ''}`}>
      <div className="site-header__inner">
        <a href="#inicio" className="site-header__logo" aria-label="Aegon, voltar ao início">
          <Logo label={false} />
        </a>
        <nav className="site-header__nav" aria-label="Navegação principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="btn btn--on btn--sm" href={whatsappLink()} target="_blank" rel="noopener">
            <WhatsApp size={16} /> <span>Vamos conversar</span>
          </a>
          <button
            className="site-header__menu"
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Navegação móvel">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }} tabIndex={open ? 0 : -1}>
              <small>0{i + 1}</small>{l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--on" href={whatsappLink()} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
          <WhatsApp size={18} /> Falar no WhatsApp
        </a>
      </div>
    </header>
  )
}


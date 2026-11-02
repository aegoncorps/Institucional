import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { Close, Menu, Moon, Sun, WhatsApp } from './Icons'
import { whatsappLink } from '../config'
import { lockScroll, ScrollTrigger } from '../lib/motion'
import { getInitialTheme, toggleTheme, type Theme } from '../lib/theme'

const links = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#portfolio', label: 'Portfólio' },
]

export function Header() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    // Sincroniza estado local quando o tema mudar
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<{ theme: Theme }>).detail
      if (detail?.theme) setTheme(detail.theme)
    }
    window.addEventListener('aegon-theme-change', onThemeChange)
    return () => window.removeEventListener('aegon-theme-change', onThemeChange)
  }, [])

  const handleToggleTheme = () => {
    const next = toggleTheme()
    setTheme(next)
  }

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
        {/* Clique na logo para alternar tema entre claro (tons de papel/areia) e escuro (azul espacial) */}
        <button
          type="button"
          onClick={handleToggleTheme}
          className="site-header__logo-btn"
          aria-label={`Aegon — Alternar tema (atual: ${theme === 'dark' ? 'escuro' : 'claro'})`}
          title="Clique na logo para alternar modo claro / escuro"
        >
          <Logo label={false} />
        </button>

        <nav className="site-header__nav" aria-label="Navegação principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="site-header__actions">
          {/* Botão de alternar tema claro / escuro */}
          <button
            type="button"
            className="site-header__theme-toggle"
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={theme === 'dark' ? 'Mudar para modo claro (tons de papel e areia)' : 'Mudar para modo escuro (azul espacial)'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="site-header__theme-label">
              {theme === 'dark' ? 'Claro' : 'Escuro'}
            </span>
          </button>

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
        <div className="mobile-menu__top">
          <button
            type="button"
            className="site-header__theme-toggle mobile-menu__theme-toggle"
            onClick={handleToggleTheme}
            tabIndex={open ? 0 : -1}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>Tema: {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>
        </div>
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

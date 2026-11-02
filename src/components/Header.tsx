import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Logo } from './Logo'
import { Close, Menu, Moon, Sun, WhatsApp } from './Icons'
import { whatsappLink } from '../config'
import { lockScroll, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { getInitialTheme, toggleTheme, type Theme } from '../lib/theme'
import { mainNav } from '../data/site'

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [visibleOnHome, setVisibleOnHome] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
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
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setVisibleOnHome(true)
      return
    }
    // Na Home, o header só aparece depois que o usuário atravessa o portal.
    const checkInitial = () => {
      setVisibleOnHome(window.scrollY > window.innerHeight * 0.75)
    }
    checkInitial()

    const st = ScrollTrigger.create({
      trigger: '#manifesto',
      start: 'top 85%',
      onEnter: () => setVisibleOnHome(true),
      onLeaveBack: () => setVisibleOnHome(false),
    })
    return () => st.kill()
  }, [isHome])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isVisible = !isHome || visibleOnHome || open

  return (
    <header className={`site-header ${isVisible ? 'is-visible' : ''}`}>
      <div className="site-header__inner">
        <Link
          to="/"
          className="site-header__logo-btn"
          aria-label="Aegon — Voltar para a página inicial"
          onClick={() => {
            if (isHome) scrollToTarget(0)
          }}
        >
          <Logo label={false} />
        </Link>

        <nav className="site-header__nav" aria-label="Navegação principal">
          {mainNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contato"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Contato
          </NavLink>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__theme-toggle"
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={
              theme === 'dark'
                ? 'Mudar para modo claro'
                : 'Mudar para modo escuro'
            }
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="site-header__theme-label">
              {theme === 'dark' ? 'Claro' : 'Escuro'}
            </span>
          </button>

          <Link className="btn btn--on btn--sm" to="/contato">
            <WhatsApp size={16} /> <span>Vamos conversar</span>
          </Link>

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
            <span>Alternar para {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>
        </div>
        <nav aria-label="Navegação móvel">
          {[...mainNav, { to: '/contato', label: 'Contato' }].map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }}
              tabIndex={open ? 0 : -1}
            >
              <small>0{i + 1}</small>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <a
          className="btn btn--on"
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          tabIndex={open ? 0 : -1}
        >
          <WhatsApp size={18} /> Falar direto no WhatsApp
        </a>
      </div>
    </header>
  )
}

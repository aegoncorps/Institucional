import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Logo } from './Logo'
import { ArrowRight, Close, Menu, Moon, Sun } from './Icons'
import { lockScroll, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { getInitialTheme, toggleTheme, type Theme } from '../lib/theme'
import { mainNav } from '../data/site'

/**
 * Header Aegon — Design Editorial Clean (estilo Globe Express):
 * - Sem container de pílula/dock fechado: a logo respira livremente no canto superior esquerdo.
 * - Barra superior contínua full-width: transparente no topo e com vidro fosco premium ao rolar.
 * - Smart Scroll: recolhe suavemente ao rolar para baixo e reaparece ao rolar para cima.
 * - Mantém menu mobile e alternador Dark/Light mode com alinhamento impecável.
 */
export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const [portalPassed, setPortalPassed] = useState(!isHome)
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up')
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const lastScrollY = useRef(0)

  // Sincroniza tema
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

  // Fecha menu mobile na troca de rota
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Na Home, aguarda o fim do portal inicial
  useEffect(() => {
    if (!isHome) {
      setPortalPassed(true)
      return
    }

    const checkInitial = () => {
      setPortalPassed(window.scrollY > window.innerHeight * 0.7)
    }
    checkInitial()

    const st = ScrollTrigger.create({
      trigger: '#manifesto',
      start: 'top 85%',
      onEnter: () => setPortalPassed(true),
      onLeaveBack: () => setPortalPassed(false),
    })

    return () => st.kill()
  }, [isHome])

  // Detecção inteligente de direção do scroll (down: esconde / up: mostra)
  useEffect(() => {
    lastScrollY.current = Math.max(0, window.scrollY)
    let ticking = false
    const threshold = 6

    const updateScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)
      const diff = currentScrollY - lastScrollY.current

      setIsScrolled(currentScrollY > 20)

      if (currentScrollY <= 60) {
        setScrollDir('up')
      } else if (Math.abs(diff) > threshold) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
          setScrollDir('down')
        } else if (currentScrollY < lastScrollY.current) {
          setScrollDir('up')
        }
        lastScrollY.current = currentScrollY
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Trava scroll ao abrir menu mobile
  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const shouldShow =
    open || (portalPassed && (scrollDir === 'up' || !isScrolled))

  return (
    <header
      className={`site-header site-header--editorial ${shouldShow ? 'is-visible' : 'is-hidden'} ${
        isScrolled ? 'site-header--scrolled' : ''
      }`}
    >
      <div className="site-header__container">
        {/* Logo oficial da marca alinhada à esquerda com respiro nobre */}
        <Link
          to="/"
          className="site-header__brand interactive"
          aria-label="Aegon — Início"
          onClick={() => {
            if (isHome) scrollToTarget(0)
          }}
        >
          <Logo label={false} />
        </Link>

        {/* Links de navegação centrais limpos e arejados */}
        <nav className="site-header__nav" aria-label="Navegação principal">
          {mainNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `site-header__nav-link interactive ${isActive ? 'is-active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contato"
            className={({ isActive }) =>
              `site-header__nav-link interactive ${isActive ? 'is-active' : ''}`
            }
          >
            Contato
          </NavLink>
        </nav>

        {/* Ações da direita: Alternador de tema discreto + CTA WhatsApp + Menu Mobile */}
        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__theme-btn interactive"
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link className="site-header__cta-btn interactive" to="/contato">
            <span>Vamos conversar</span>
            <ArrowRight size={15} />
          </Link>

          <button
            className="site-header__menu-btn interactive"
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__top">
          <button
            type="button"
            className="site-header__theme-toggle mobile-menu__theme-toggle interactive"
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
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              <small>0{i + 1}</small>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link
          className="btn btn--on interactive"
          to="/contato"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Iniciar um projeto <ArrowRight size={17} />
        </Link>
      </div>
    </header>
  )
}

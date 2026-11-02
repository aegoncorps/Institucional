import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Logo } from './Logo'
import { Close, Menu, Moon, Sun, WhatsApp } from './Icons'
import { whatsappLink } from '../config'
import { lockScroll, ScrollTrigger, scrollToTarget } from '../lib/motion'
import { getInitialTheme, toggleTheme, type Theme } from '../lib/theme'
import { mainNav } from '../data/site'

/**
 * Header Principal da Aegon (Design Moderno 2026):
 * - Inspirado em navbars modernas (Arcode / Nexora / Bluestack):
 *   cantos arredondados elegantes (20px), logo encaixada com proporção e respiro perfeitos,
 *   navegação com microinterações e botão CTA harmônico.
 * - Smart Hide / Show on Scroll:
 *   - Scroll down: recolhe suavemente para fora da tela (translateY(-120%)).
 *   - Scroll up: desce e reaparece imediatamente (translateY(0)).
 *   - Na Home: respeita a abertura do Portal cósmico no topo.
 *   - No topo de páginas internas: fica visível fixo.
 *   - Mantém-se visível quando o menu mobile está aberto.
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

  // Escuta alteração externa de tema
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

  // Fecha menu mobile ao mudar de rota
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Controle de passagem do portal cósmico na Home
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

  // Smart Hide on Scroll Down & Show on Scroll Up
  useEffect(() => {
    lastScrollY.current = Math.max(0, window.scrollY)
    let ticking = false
    const threshold = 6 // pixels mínimos de rolagem para disparar a troca (evita jitter no trackpad do Mac)

    const updateScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY)
      const diff = currentScrollY - lastScrollY.current

      setIsScrolled(currentScrollY > 20)

      // Se estiver próximo ao topo, sempre visível
      if (currentScrollY <= 60) {
        setScrollDir('up')
      } else if (Math.abs(diff) > threshold) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Rolando para baixo: oculta o header
          setScrollDir('down')
        } else if (currentScrollY < lastScrollY.current) {
          // Rolando para cima: mostra o header
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

  // Trava scroll quando menu mobile estiver aberto
  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Define se a barra deve estar visível
  // 1. Na Home, precisa ter passado o portal (ou estar com menu mobile aberto)
  // 2. Quando rola para baixo (scrollDir === 'down') e já passou do topo (isScrolled), oculta!
  // 3. Quando rola para cima (scrollDir === 'up') ou está no topo, mostra!
  const shouldShow =
    open ||
    (portalPassed && (scrollDir === 'up' || !isScrolled))

  return (
    <header
      className={`site-header ${shouldShow ? 'is-visible' : 'is-hidden'} ${
        isScrolled ? 'site-header--scrolled' : ''
      }`}
    >
      <div className="site-header__inner">
        {/* Logo oficial da Aegon com container e encaixe perfeito */}
        <Link
          to="/"
          className="site-header__logo-btn interactive"
          aria-label="Aegon — Início"
          onClick={() => {
            if (isHome) scrollToTarget(0)
          }}
        >
          <div className="site-header__logo-wrapper">
            <Logo label={false} />
          </div>
        </Link>

        {/* Links de navegação centralizados */}
        <nav className="site-header__nav" aria-label="Navegação principal">
          {mainNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `site-header__nav-link interactive ${isActive ? 'is-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contato"
            className={({ isActive }) => `site-header__nav-link interactive ${isActive ? 'is-active' : ''}`}
          >
            Contato
          </NavLink>
        </nav>

        {/* Ações da direita: Tema + CTA WhatsApp + Menu Mobile */}
        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__theme-toggle interactive"
            onClick={handleToggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span className="site-header__theme-label">
              {theme === 'dark' ? 'Claro' : 'Escuro'}
            </span>
          </button>

          <Link className="btn btn--header-cta interactive" to="/contato">
            <WhatsApp size={16} />
            <span>Vamos conversar</span>
          </Link>

          <button
            className="site-header__menu interactive"
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
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
        <a
          className="btn btn--on interactive"
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

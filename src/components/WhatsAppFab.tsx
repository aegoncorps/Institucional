import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { WhatsApp } from './Icons'
import { whatsappLink } from '../config'
import { ScrollTrigger } from '../lib/motion'

/**
 * Botão flutuante:
 * - Na Home (/): aparece após o portal e some no CTA final (evita duplicidade).
 * - Nas abas internas: fica sempre visível (exceto em /contato onde já há o briefing).
 */
export function WhatsAppFab() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isContact = pathname === '/contato'
  const [afterIntro, setAfterIntro] = useState(!isHome)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setAfterIntro(true)
      setAtEnd(false)
      return
    }

    setAfterIntro(window.scrollY > window.innerHeight * 0.6)
    setAtEnd(false)

    const a = ScrollTrigger.create({
      trigger: '#manifesto',
      start: 'top 60%',
      end: 'max',
      onToggle: (self) => setAfterIntro(self.isActive),
    })
    const b = ScrollTrigger.create({
      trigger: '#contato',
      start: 'top 70%',
      end: 'max',
      onToggle: (self) => setAtEnd(self.isActive),
    })
    return () => {
      a.kill()
      b.kill()
    }
  }, [isHome, pathname])

  const visible = !isContact && afterIntro && !atEnd

  return (
    <a
      className={`wa-fab ${visible ? 'is-visible' : ''}`}
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a Aegon no WhatsApp"
    >
      <WhatsApp size={26} />
    </a>
  )
}

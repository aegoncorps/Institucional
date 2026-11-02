import { useEffect, useState } from 'react'
import { WhatsApp } from './Icons'
import { whatsappLink } from '../config'
import { ScrollTrigger } from '../lib/motion'

/** Botão flutuante: aparece após o portal e some no CTA final (evita duplicidade). */
export function WhatsAppFab() {
  const [afterIntro, setAfterIntro] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
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
  }, [])

  return (
    <a
      className={`wa-fab ${afterIntro && !atEnd ? 'is-visible' : ''}`}
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a Aegon no WhatsApp"
    >
      <WhatsApp size={26} />
    </a>
  )
}

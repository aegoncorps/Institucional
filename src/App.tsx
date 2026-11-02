import { useEffect } from 'react'
import { initSmoothScroll, scrollToTarget, ScrollTrigger } from './lib/motion'
import { Header } from './components/Header'
import { CustomCursor } from './components/CustomCursor'
import { ProgressBar } from './components/ProgressBar'
import { WhatsAppFab } from './components/WhatsAppFab'
import { Footer } from './components/Footer'
import { Portal } from './sections/Portal'
import { Manifesto } from './sections/Manifesto'
import { Pillars } from './sections/Pillars'
import { Products } from './sections/Products'
import { Portfolio } from './sections/Portfolio'
import { FinalCta } from './sections/FinalCta'

export default function App() {
  useEffect(() => {
    initSmoothScroll()

    // Links internos (#ancora) usam o smooth scroll.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      scrollToTarget(el as HTMLElement)
    }
    document.addEventListener('click', onClick)

    // Recalcula pins depois que fontes e imagens carregarem.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <CustomCursor />
      <ProgressBar />
      <Header />
      <main>
        <Portal />
        <div id="conteudo">
          <Manifesto />
          <Pillars />
          <Products />
          <Portfolio />
          <FinalCta />
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}


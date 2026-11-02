import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { initSmoothScroll, scrollToTarget, ScrollTrigger } from './lib/motion'
import { RouteController } from './components/RouteController'
import { Header } from './components/Header'
import { CustomCursor } from './components/CustomCursor'
import { ProgressBar } from './components/ProgressBar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { SolutionsPage } from './pages/SolutionsPage'
import { SolutionDetailPage } from './pages/SolutionDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { InsightsPage } from './pages/InsightsPage'
import { InsightPostPage } from './pages/InsightPostPage'
import { CareersPage } from './pages/CareersPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFoundPage'

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
    <BrowserRouter>
      <RouteController />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <CustomCursor />
      <ProgressBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/solucoes" element={<SolutionsPage />} />
          <Route path="/solucoes/:slug" element={<SolutionDetailPage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/produtos/:slug" element={<ProductDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightPostPage />} />
          <Route path="/carreiras" element={<CareersPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<LegalPage type="privacidade" />} />
          <Route path="/termos" element={<LegalPage type="termos" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

import { Logo } from './Logo'
import { whatsappLink } from '../config'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Logo />
          <p>Estratégia, criação e tecnologia. Juntos, on.</p>
        </div>
        <nav aria-label="Rodapé" className="footer__links">
          <a href="#solucoes">Soluções</a>
          <a href="#produtos">Produtos</a>
          <a href="#portfolio">Portfólio</a>
          <a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp</a>
        </nav>
        <small>© {new Date().getFullYear()} Aegon. Todos os direitos reservados.</small>
      </div>
    </footer>
  )
}


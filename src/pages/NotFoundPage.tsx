import { Link } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { ArrowRight } from '../components/Icons'

export function NotFoundPage() {
  usePageMeta({
    title: 'Página não encontrada (404)',
    description: 'O endereço que você tentou acessar não existe ou foi movido.',
  })

  return (
    <div className="spa-page not-found-page" id="conteudo">
      <section className="page-hero">
        <div className="container not-found__inner">
          <p className="eyebrow">Erro 404 · Sinal desligado</p>
          <h1>Esta página não foi encontrada.</h1>
          <p className="page-hero__lead">
            O link que você acessou pode ter mudado de endereço ou não existe mais. Escolha um dos
            caminhos abaixo para continuar navegando pela Aegon.
          </p>
          <div className="page-hero__actions">
            <Link to="/" className="btn btn--on interactive">
              Voltar para a página inicial <ArrowRight size={17} />
            </Link>
            <Link to="/portfolio" className="btn btn--ghost interactive">
              Explorar portfólio
            </Link>
            <Link to="/contato" className="btn btn--ghost interactive">
              Falar com a Aegon
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

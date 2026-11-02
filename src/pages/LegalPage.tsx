import { Link } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { company } from '../data/site'

export function LegalPage({ type }: { type: 'privacidade' | 'termos' }) {
  const isPrivacy = type === 'privacidade'

  usePageMeta({
    title: isPrivacy ? 'Privacidade — Aegon' : 'Termos — Aegon',
    description: isPrivacy
      ? 'Informações demonstrativas sobre a jornada de contato da Aegon.'
      : 'Informações demonstrativas sobre o conteúdo do site Aegon.',
  })

  return (
    <div className="spa-page legal-page" id="conteudo">
      <section className="page-hero">
        <div className="container article-reader__container">
          <nav className="breadcrumb" aria-label="Navegação estrutural">
            <Link to="/">Início</Link>
            <span>/</span>
            <span aria-current="page">
              {isPrivacy ? 'Política de Privacidade' : 'Termos de Uso'}
            </span>
          </nav>

          <p className="eyebrow">Transparência / versão demonstrativa</p>
          <h1>{isPrivacy ? 'Privacidade' : 'Termos de uso'}</h1>
          <p className="page-hero__lead">
            Esta página é um texto de composição para a v5. A versão jurídica final será publicada com os dados reais da operação.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container article-reader__container article-reader__body">
          {isPrivacy ? (
            <>
              <h2>Como funciona o contato nesta demonstração</h2>
              <p>O fluxo pede nome, e-mail e uma descrição do projeto. O envio só é confirmado quando o serviço de e-mail configurado aceita a mensagem. Sem essa configuração, o site informa que a entrega não foi confirmada.</p>
              <h2>Antes do lançamento comercial</h2>
              <p>É necessário substituir este texto por uma política completa, com identificação real do responsável, finalidades, retenção, compartilhamento e canal de direitos dos titulares.</p>
              <p>Canal de contato previsto no layout: <strong>{company.email}</strong>.</p>
            </>
          ) : (
            <>
              <h2>Conteúdo demonstrativo</h2>
              <p>Projetos, clientes, indicadores, depoimentos, equipe e produtos apresentados nesta versão servem para avaliar narrativa e layout. Eles não representam comprovação de entregas, disponibilidade comercial ou resultados obtidos.</p>
              <h2>Antes do lançamento comercial</h2>
              <p>Estes termos devem ser substituídos por uma versão jurídica completa, com identificação da empresa, condições de uso, direitos sobre conteúdo e canais de atendimento reais.</p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}


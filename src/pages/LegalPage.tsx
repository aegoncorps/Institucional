import { Link } from 'react-router'
import { usePageMeta } from '../lib/seo'
import { company } from '../data/site'

export function LegalPage({ type }: { type: 'privacidade' | 'termos' }) {
  const isPrivacy = type === 'privacidade'

  usePageMeta({
    title: isPrivacy ? 'Política de Privacidade & LGPD' : 'Termos de Uso',
    description: isPrivacy
      ? 'Política de Privacidade e tratamento de dados pessoais da Aegon conforme a LGPD.'
      : 'Termos e condições gerais de uso do site e plataformas digitais da Aegon.',
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

          <p className="eyebrow">Governança & Transparência</p>
          <h1>{isPrivacy ? 'Política de Privacidade (LGPD)' : 'Termos e Condições de Uso'}</h1>
          <p className="page-hero__lead">
            Última atualização: Março de 2026 · {company.legalName} ({company.cnpj})
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container article-reader__container article-reader__body">
          {isPrivacy ? (
            <>
              <h2>1. Compromisso com a sua privacidade</h2>
              <p>
                A <strong>{company.legalName}</strong> respeita a privacidade de todos os visitantes,
                clientes e usuários de nossas soluções digitais, atuando em conformidade com a Lei
                Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
              </p>
              <h2>2. Dados coletados</h2>
              <p>
                Coletamos apenas as informações fornecidas voluntariamente por você em nossos
                formulários de briefing, newsletter ou contato via WhatsApp (nome, empresa, e-mail e
                telefone), além de métricas anônimas de navegação para melhoria de performance.
              </p>
              <h2>3. Finalidade do tratamento</h2>
              <p>
                Os dados são utilizados exclusivamente para responder às suas solicitações comerciais,
                elaborar diagnósticos e propostas técnicas, e enviar conteúdos relevantes quando
                autorizado. Não comercializamos dados pessoais com terceiros.
              </p>
              <h2>4. Direitos do titular</h2>
              <p>
                Você pode solicitar a confirmação, correção, portabilidade ou exclusão de seus dados a
                qualquer momento enviando um e-mail para <strong>{company.email}</strong>.
              </p>
            </>
          ) : (
            <>
              <h2>1. Aceitação dos termos</h2>
              <p>
                Ao acessar e utilizar o site e os conteúdos da <strong>{company.name}</strong>, você
                concorda com estes Termos de Uso e com nossa Política de Privacidade.
              </p>
              <h2>2. Propriedade intelectual</h2>
              <p>
                Todo o conteúdo editorial, marcas, códigos, layouts e metodologias apresentados neste
                portal pertencem à {company.legalName} ou aos respectivos clientes citados nos estudos
                de caso demonstrativos.
              </p>
              <h2>3. Estudos de caso e dados demonstrativos</h2>
              <p>
                Alguns estudos de caso exibidos no acervo possuem caráter demonstrativo de arquitetura
                e experiência do usuário, preservando informações confidenciais de clientes sob acordo
                de sigilo (NDA).
              </p>
              <h2>4. Contato jurídico</h2>
              <p>
                Para dúvidas contratuais ou solicitações formais, entre em contato através do endereço{' '}
                <strong>{company.email}</strong>.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

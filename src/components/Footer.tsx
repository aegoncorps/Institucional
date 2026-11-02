import { Link } from 'react-router'
import { Logo } from './Logo'
import {
  ArrowRight,
  GitHub,
  Instagram,
  LinkedIn,
  TwitterX,
  WhatsApp,
  YouTube,
} from './Icons'
import { whatsappLink } from '../config'
import { company } from '../data/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navColumns = [
    {
      title: 'Produtos & Tech',
      links: [
        { label: 'BWS 365 Cockpit', to: '/portfolio/bws-365-cockpit' },
        { label: 'Gestão Financeira Modular', to: '/produtos/financeiro' },
        { label: 'Consultoria PMEs', to: '/produtos/consultoria' },
        { label: 'Assistente de Compras', to: '/produtos/compras' },
        { label: 'Projeto Andresa (IA)', to: '/produtos/andresa' },
        { label: 'Todos os Produtos', to: '/produtos' },
      ],
    },
    {
      title: 'Soluções & Pilares',
      links: [
        { label: '01 · Estratégia & Diagnóstico', to: '/solucoes/estrategia' },
        { label: '02 · Criação, Branding & UX', to: '/solucoes/criacao' },
        { label: '03 · Tecnologia & Sistemas', to: '/solucoes/tecnologia' },
        { label: 'Visão Geral de Soluções', to: '/solucoes' },
        { label: 'Solicitar Diagnóstico', to: '/contato' },
      ],
    },
    {
      title: 'Portfólio & Cases',
      links: [
        { label: 'Explorar Portfólio Completo', to: '/portfolio' },
        { label: 'Cases de Sistemas & SaaS', to: '/portfolio?area=sistemas' },
        { label: 'Cases de Branding & Marca', to: '/portfolio?area=branding' },
        { label: 'Cases de Design & UX/UI', to: '/portfolio?area=design' },
        { label: 'Cases de Consultoria', to: '/portfolio?area=consultoria' },
        { label: 'Insights & Artigos', to: '/insights' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Quem Somos & História', to: '/sobre' },
        { label: 'Nossos Sócios & Liderança', to: '/sobre#equipe' },
        { label: 'Como Ligamos (Processo)', to: '/sobre#processo' },
        { label: 'Carreiras (Trabalhe Conosco)', to: '/carreiras' },
        { label: 'Fale Conosco', to: '/contato' },
      ],
    },
  ]

  const socialLinks = [
    { label: 'Instagram', icon: <Instagram size={17} />, href: 'https://instagram.com' },
    { label: 'LinkedIn', icon: <LinkedIn size={17} />, href: 'https://linkedin.com' },
    { label: 'YouTube', icon: <YouTube size={17} />, href: 'https://youtube.com' },
    { label: 'X (Twitter)', icon: <TwitterX size={15} />, href: 'https://x.com' },
    { label: 'GitHub', icon: <GitHub size={17} />, href: 'https://github.com' },
    { label: 'WhatsApp', icon: <WhatsApp size={17} />, href: whatsappLink() },
  ]

  const legalLinks = [
    { label: 'Termos de Uso', to: '/termos' },
    { label: 'Política de Privacidade', to: '/privacidade' },
    { label: 'Trabalhe Conosco', to: '/carreiras' },
    { label: 'Contato Comercial', to: '/contato' },
  ]

  return (
    <footer className="site-footer" id="rodape" aria-label="Rodapé institucional Aegon">
      <div className="site-footer__container">
        <div className="site-footer__grid">
          {navColumns.map((col) => (
            <div key={col.title} className="site-footer__col">
              <h4 className="site-footer__title">{col.title}</h4>
              <ul className="site-footer__list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="site-footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Coluna de Destaque da Marca */}
          <div className="site-footer__brand-col">
            <Link to="/" className="site-footer__brand-logo" aria-label="Aegon, voltar ao início">
              <Logo label={false} />
            </Link>
            <p className="site-footer__bio">
              A Aegon é um ecossistema integrado de estratégia de negócios, criação de alto impacto
              e engenharia tecnológica. Transformamos desafios complexos em produtos digitais
              escaláveis com propósito humano. Tudo no mesmo botão. Juntos, on.
            </p>

            <div className="site-footer__contact-card">
              <span className="site-footer__contact-kicker">Atendimento Estratégico</span>
              <Link to="/contato" className="site-footer__cta-link">
                <span>Iniciar um projeto com a Aegon</span>
                <ArrowRight size={16} />
              </Link>
              <div className="site-footer__meta-info">
                <span>{company.cities.join(' · ')}</span>
                <a href={`mailto:${company.email}`} className="site-footer__email-link">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer__divider" />

        <div className="site-footer__bottom-bar">
          <div className="site-footer__socials" aria-label="Redes sociais da Aegon">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__social-btn"
                aria-label={item.label}
                title={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>

          <nav className="site-footer__legal-nav" aria-label="Links legais e privacidade">
            {legalLinks.map((item) => (
              <Link key={item.label} to={item.to} className="site-footer__legal-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-footer__copyright">
            © {currentYear} AEGON. Todos os direitos reservados.
          </div>
        </div>

        <div className="site-footer__corporate">
          {company.legalName} · CNPJ: {company.cnpj} · {company.address} · Central de Atendimento:{' '}
          {company.email}
        </div>
      </div>
    </footer>
  )
}

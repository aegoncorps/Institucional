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

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navColumns = [
    {
      title: 'Produtos & Tech',
      links: [
        { label: 'BWS 365 Cockpit', href: '#produtos' },
        { label: 'Gestão Financeira Modular', href: '#produtos' },
        { label: 'Sistemas Sob Medida', href: '#produtos' },
        { label: 'Plataformas & Portais Web', href: '#portfolio' },
        { label: 'Design System & UI/UX', href: '#solucoes' },
        { label: 'Automação & IA Integrada', href: '#solucoes' },
        { label: 'Infraestrutura Cloud & APIs', href: '#solucoes' },
      ],
    },
    {
      title: 'Soluções & Estratégia',
      links: [
        { label: 'Consultoria para Pequenos Negócios', href: '#produtos' },
        { label: 'Diagnóstico Operacional & Comercial', href: '#produtos' },
        { label: 'Branding & Posicionamento', href: '#produtos' },
        { label: 'Transformação Digital Ágil', href: '#solucoes' },
        { label: 'Escala & Otimização de Processos', href: '#solucoes' },
        { label: 'Criação de Conteúdo & Mídia', href: '#produtos' },
        { label: 'Consultoria Executiva Wake', href: '#manifesto' },
      ],
    },
    {
      title: 'Ecossistema',
      links: [
        { label: 'Manifesto Aegon', href: '#manifesto' },
        { label: 'Pilares Estratégicos', href: '#solucoes' },
        { label: 'Cases & Portfólio 3D', href: '#portfolio' },
        { label: 'Reunião Estratégica 2026', href: '#inicio' },
        { label: 'Central de Inteligência', href: '#manifesto' },
        { label: 'Status dos Serviços', href: '#inicio' },
        { label: 'Acessibilidade Digital', href: '#inicio' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre a Aegon', href: '#manifesto' },
        { label: 'Nossa Equipe & Liderança', href: '#manifesto' },
        { label: 'Cultura & DNA Digital', href: '#manifesto' },
        {
          label: 'Trabalhe Conosco',
          href: whatsappLink('Olá! Gostaria de saber sobre oportunidades na Aegon.'),
        },
        { label: 'Sala de Imprensa', href: '#manifesto' },
        { label: 'Código de Ética & Conduta', href: '#manifesto' },
        { label: 'Canal de Transparência', href: '#manifesto' },
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
    { label: 'Termos de Uso', href: '#termos' },
    { label: 'Política de Privacidade', href: '#privacidade' },
    { label: 'Segurança da Informação & LGPD', href: '#seguranca' },
    { label: 'Preferências de Cookies', href: '#cookies' },
  ]

  return (
    <footer className="site-footer" id="rodape" aria-label="Rodapé institucional Aegon">
      <div className="site-footer__container">
        {/* Grade Principal com Navegação Multicolunas e Bio da Marca */}
        <div className="site-footer__grid">
          {navColumns.map((col) => (
            <div key={col.title} className="site-footer__col">
              <h4 className="site-footer__title">{col.title}</h4>
              <ul className="site-footer__list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="site-footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Coluna de Destaque da Marca (Identidade + Bio + Contato) */}
          <div className="site-footer__brand-col">
            <a href="#inicio" className="site-footer__brand-logo" aria-label="Aegon, voltar ao início">
              <Logo label={false} />
            </a>
            <p className="site-footer__bio">
              A Aegon é um ecossistema integrado de estratégia de negócios, criação de alto impacto
              e engenharia tecnológica. Transformamos desafios complexos em produtos digitais
              escaláveis com propósito humano. Tudo no mesmo botão. Juntos, on.
            </p>

            <div className="site-footer__contact-card">
              <span className="site-footer__contact-kicker">Atendimento Estratégico</span>
              <a
                href={whatsappLink('Olá! Gostaria de conversar com um estrategista da Aegon.')}
                target="_blank"
                rel="noopener"
                className="site-footer__cta-link"
              >
                <span>Falar com nosso time</span>
                <ArrowRight size={16} />
              </a>
              <div className="site-footer__meta-info">
                <span>São Paulo · Rio de Janeiro · Curitiba</span>
                <a href="mailto:contato@aegon.com.br" className="site-footer__email-link">
                  contato@aegon.com.br
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="site-footer__divider" />

        {/* Barra Inferior com Redes Sociais, Links Legais e Copyright */}
        <div className="site-footer__bottom-bar">
          {/* Redes Sociais */}
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

          {/* Links Legais */}
          <nav className="site-footer__legal-nav" aria-label="Links legais e privacidade">
            {legalLinks.map((item) => (
              <a key={item.label} href={item.href} className="site-footer__legal-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="site-footer__copyright">
            © {currentYear} AEGON. Todos os direitos reservados.
          </div>
        </div>

        {/* Informações Corporativas Oficiais / Compliance */}
        <div className="site-footer__corporate">
          Aegon Soluções Digitais e Consultoria Empresarial Ltda. · CNPJ: 48.729.104/0001-82 ·
          Av. Brigadeiro Faria Lima, 3477 - 14º andar, Itaim Bibi, São Paulo - SP, CEP 04538-133 ·
          Central de Atendimento: atendimento@aegon.com.br
        </div>
      </div>
    </footer>
  )
}

/**
 * Conteúdo do site. Textos marcados com `placeholder: true` são exemplos
 * e devem ser substituídos pelos cases/artes reais antes da divulgação.
 */

const IMG = '/assets/img'

export type Pillar = {
  id: string
  number: string
  kicker: string
  title: string
  text: string
  items: string[]
  image: string
}

export const pillars: Pillar[] = [
  {
    id: 'estrategia',
    number: '01',
    kicker: 'Estratégia',
    title: 'Clareza antes da execução.',
    text: 'Entendemos o negócio, o mercado e as pessoas antes de propor qualquer solução. Cada entrega nasce de um diagnóstico.',
    items: ['Diagnóstico de negócio', 'Posicionamento', 'Planejamento de projetos', 'Organização financeira'],
    image: `${IMG}/consultoria.jpg`,
  },
  {
    id: 'criacao',
    number: '02',
    kicker: 'Criação',
    title: 'Marcas que se reconhecem.',
    text: 'Identidade, experiência e conteúdo com consistência. Uma marca que comunica o que você é em qualquer ponto de contato.',
    items: ['Branding e identidade visual', 'UX / UI', 'Conteúdo e campanhas', 'Materiais institucionais'],
    image: `${IMG}/brandingIdentidade.jpg`,
  },
  {
    id: 'tecnologia',
    number: '03',
    kicker: 'Tecnologia',
    title: 'Do protótipo ao sistema.',
    text: 'Sites, aplicativos e sistemas sob medida, construídos para resolver o problema certo e evoluir com o seu negócio.',
    items: ['Sites e landing pages', 'Aplicativos', 'Sistemas sob medida', 'Integrações e automações'],
    image: `${IMG}/desenvolvimentoSistemas.jpg`,
  },
]

export type ProductStatus = 'disponivel' | 'desenvolvimento'

export type Product = {
  id: string
  status: ProductStatus
  category: string
  name: string
  summary: string
  image: string
  forWho: string
  problem: string
  features: string[]
  model?: string
  note?: string
  ctaLabel: string
  whatsappMessage: string
}

export const products: Product[] = [
  {
    id: 'consultoria',
    status: 'disponivel',
    category: 'Consultoria',
    name: 'Consultoria para Pequenos Negócios',
    summary: 'Organize a presença digital e os processos do seu negócio sem contratar o que você não precisa.',
    image: `${IMG}/consultoria.jpg`,
    forWho: 'Pequenos negócios e empreendedores que querem crescer com mais organização.',
    problem:
      'Muitos negócios investem em soluções digitais desconectadas da realidade. Começamos pequeno, ouvimos o empreendedor e entregamos melhorias que ele percebe no dia a dia.',
    features: ['01 · Diagnóstico', '02 · Plano de ação', '03 · Implementação', '04 · Acompanhamento'],
    ctaLabel: 'Quero um diagnóstico',
    whatsappMessage: 'Olá, Aegon! Quero saber mais sobre a Consultoria para Pequenos Negócios.',
  },
  {
    id: 'financeiro',
    status: 'disponivel',
    category: 'SaaS · Gestão',
    name: 'Gestão Financeira Modular',
    summary: 'Gestão financeira que cresce por módulos, sem impor complexidade desnecessária.',
    image: `${IMG}/financeiro.jpg`,
    forWho: 'Pequenas e médias empresas que precisam de controle sem sistemas caros e complexos.',
    problem:
      'Você contrata apenas os módulos de que precisa e evolui conforme a empresa cresce.',
    features: [
      'Planejamento e acompanhamento orçamentário',
      'Receitas, despesas e centros de custo',
      'Estoque, compras e aprovações',
      'Relatórios e dashboards',
    ],
    model: 'Assinatura mensal da plataforma-base + módulos.',
    ctaLabel: 'Quero conhecer',
    whatsappMessage: 'Olá, Aegon! Quero conhecer a Gestão Financeira Modular.',
  },
  {
    id: 'compras',
    status: 'desenvolvimento',
    category: 'App · Consumo',
    name: 'Assistente de Compras',
    summary: 'Compras mais inteligentes, conectando preços locais e decisões de consumo.',
    image: `${IMG}/compras.jpg`,
    forWho: 'Famílias e pessoas que querem economizar sem perder tempo comparando preços.',
    problem: 'Comparar preços, marcas e distâncias toma tempo. O assistente simplifica essa decisão.',
    features: [
      'Listas recorrentes (semanal, quinzenal, mensal)',
      'Raio de busca e marcas preferidas',
      'Comparação pelo custo total da lista',
      'Histórico de gastos e consumo',
    ],
    ctaLabel: 'Quero ser avisado',
    whatsappMessage: 'Olá, Aegon! Quero ser avisado sobre o lançamento do Assistente de Compras.',
  },
  {
    id: 'andresa',
    status: 'desenvolvimento',
    category: 'IA · Cuidado',
    name: 'Projeto Andresa',
    summary: 'Tecnologia de apoio à comunicação entre pessoas com Alzheimer, familiares e cuidadores.',
    image: `${IMG}/andresa.jpg`,
    forWho: 'Famílias, cuidadores e instituições de cuidado.',
    problem:
      'Acompanhar conversas, necessidades e mudanças de rotina é um desafio diário. O Andresa propõe um canal de comunicação assistida e informações úteis para quem cuida.',
    features: [
      'Chamadas de voz assistidas por IA',
      'Resumos das conversas para o responsável',
      'Painel de acompanhamento para familiares autorizados',
    ],
    note: 'Em desenvolvimento com orientação de especialistas. Não substitui acompanhamento médico.',
    ctaLabel: 'Quero acompanhar',
    whatsappMessage: 'Olá, Aegon! Quero acompanhar o desenvolvimento do Projeto Andresa.',
  },
]

export type Topic = { id: string; label: string; color: string }

export const topics: Topic[] = [
  { id: 'branding', label: 'Branding', color: '#e5bd5a' },
  { id: 'sistemas', label: 'Sistemas', color: '#3b7bff' },
  { id: 'design', label: 'Design', color: '#8fb4ff' },
  { id: 'consultoria', label: 'Consultoria', color: '#f4f2ec' },
]

export type PortfolioCase = {
  id: string
  topic: string
  title: string
  client: string
  year: string
  summary: string
  deliverables: string[]
  image: string
  placeholder: boolean
}

const T = `${IMG}/3d`

export const cases: PortfolioCase[] = [
  // Branding
  { id: 'b1', topic: 'branding', title: 'Identidade visual completa', client: 'Cliente exemplo · Varejo', year: '2026', summary: 'Criação de marca, paleta, tipografia e aplicações para lojas físicas e digitais.', deliverables: ['Logo e sistema visual', 'Manual de marca', 'Papelaria e embalagens'], image: `${T}/brandingIdentidade.jpg`, placeholder: true },
  { id: 'b2', topic: 'branding', title: 'Reposicionamento de marca', client: 'Cliente exemplo · Serviços', year: '2025', summary: 'Nova narrativa e tom de voz para aproximar a marca de um público mais jovem.', deliverables: ['Plataforma de marca', 'Tom de voz', 'Campanha de lançamento'], image: `${T}/criacaoConteudo.jpg`, placeholder: true },
  { id: 'b3', topic: 'branding', title: 'Conteúdo para redes', client: 'Cliente exemplo · Gastronomia', year: '2025', summary: 'Direção criativa e produção de conteúdo mensal para Instagram e TikTok.', deliverables: ['Linha editorial', 'Produção de vídeo', 'Templates'], image: `${T}/design.jpg`, placeholder: true },
  // Sistemas
  { id: 's1', topic: 'sistemas', title: 'Plataforma de gestão', client: 'Cliente exemplo · Indústria', year: '2026', summary: 'Sistema web para orçamento, compras e aprovações com dashboards em tempo real.', deliverables: ['Discovery', 'Sistema web', 'Integrações'], image: `${T}/financeiro.jpg`, placeholder: true },
  { id: 's2', topic: 'sistemas', title: 'App de compras', client: 'Cliente exemplo · Consumo', year: '2026', summary: 'Aplicativo mobile com listas inteligentes e comparação de preços regionais.', deliverables: ['UX / UI', 'App iOS e Android', 'API'], image: `${T}/compras.jpg`, placeholder: true },
  { id: 's3', topic: 'sistemas', title: 'Site institucional', client: 'Cliente exemplo · Tecnologia', year: '2025', summary: 'Site rápido, otimizado para SEO e conversão, com painel de conteúdo próprio.', deliverables: ['Arquitetura de informação', 'Desenvolvimento', 'SEO técnico'], image: `${T}/desenvolvimentoSistemas.jpg`, placeholder: true },
  // Design
  { id: 'd1', topic: 'design', title: 'UX de aplicativo de saúde', client: 'Cliente exemplo · Saúde', year: '2026', summary: 'Pesquisa com usuários e redesenho completo da experiência de agendamento.', deliverables: ['Pesquisa', 'Wireframes', 'Protótipo navegável'], image: `${T}/andresa.jpg`, placeholder: true },
  { id: 'd2', topic: 'design', title: 'Design system', client: 'Cliente exemplo · Fintech', year: '2025', summary: 'Biblioteca de componentes para acelerar o time de produto com consistência.', deliverables: ['Tokens', 'Componentes', 'Documentação'], image: `${T}/design.jpg`, placeholder: true },
  { id: 'd3', topic: 'design', title: 'Materiais institucionais', client: 'Cliente exemplo · Educação', year: '2025', summary: 'Apresentações, relatórios e peças impressas com linguagem visual unificada.', deliverables: ['Apresentações', 'Relatório anual', 'Peças gráficas'], image: `${T}/brandingIdentidade.jpg`, placeholder: true },
  // Consultoria
  { id: 'c1', topic: 'consultoria', title: 'Diagnóstico digital', client: 'Cliente exemplo · Comércio local', year: '2026', summary: 'Mapeamento da presença digital e plano de ação de 90 dias para um pequeno negócio.', deliverables: ['Diagnóstico', 'Plano de ação', 'Acompanhamento'], image: `${T}/consultoria.jpg`, placeholder: true },
  { id: 'c2', topic: 'consultoria', title: 'Organização de processos', client: 'Cliente exemplo · Serviços', year: '2025', summary: 'Redesenho de processos de atendimento e financeiro com ferramentas simples.', deliverables: ['Mapeamento', 'Ferramentas', 'Treinamento'], image: `${T}/financeiro.jpg`, placeholder: true },
  { id: 'c3', topic: 'consultoria', title: 'Estratégia de lançamento', client: 'Cliente exemplo · Startup', year: '2025', summary: 'Posicionamento, oferta e funil para o lançamento de um novo produto digital.', deliverables: ['Posicionamento', 'Oferta', 'Funil'], image: `${T}/criacaoConteudo.jpg`, placeholder: true },
]


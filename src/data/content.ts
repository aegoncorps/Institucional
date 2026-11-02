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
    status: 'desenvolvimento',
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
    status: 'desenvolvimento',
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
  slug?: string
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
const M = `${IMG}/mock`

export const cases: PortfolioCase[] = [
  // Branding
  { id: 'b1', slug: 'vertice-arquitetura', topic: 'branding', title: 'Vértice Arquitetura · Rebranding', client: 'Vértice Arquitetura', year: '2025', summary: 'Reposicionamento estratégico, sistema tipográfico suíço e novo portal editorial de projetos.', deliverables: ['Logo e sistema visual', 'Manual de marca', 'Site portfólio'], image: `${M}/case-vertice.jpg`, placeholder: true },
  { id: 'b2', slug: 'sabor-da-vila', topic: 'branding', title: 'Sabor da Vila · Embalagens & Marca', client: 'Sabor da Vila', year: '2025', summary: 'Nova identidade visual artesanal, linha de embalagens premium e direção de arte para redes.', deliverables: ['Identidade visual', 'Embalagens (14 SKUs)', 'Campanha de lançamento'], image: `${M}/case-sabor.jpg`, placeholder: true },
  { id: 'b3', slug: 'trilha-edu', topic: 'branding', title: 'Trilha Edu · Marca & Plataforma', client: 'Trilha Edu', year: '2025', summary: 'Identidade visual vibrante e experiência gamificada de aprendizado para jovens profissionais.', deliverables: ['Branding', 'Sistema de badges', 'UX/UI Web & Mobile'], image: `${M}/case-edu.jpg`, placeholder: true },
  // Sistemas
  { id: 's1', slug: 'bws-365-cockpit', topic: 'sistemas', title: 'BWS 365 · Cockpit Operacional', client: 'Grupo BWS Logística', year: '2026', summary: 'Plataforma web integrada de telemetria, aprovações financeiras e BI executivo em tempo real.', deliverables: ['Discovery', 'Sistema web modular', 'Integrações ERP'], image: `${M}/case-bws365.jpg`, placeholder: true },
  { id: 's2', slug: 'gestao-financeira-modular', topic: 'sistemas', title: 'Gestão Financeira Modular', client: 'Produto Próprio Aegon', year: '2026', summary: 'SaaS financeiro que cresce por módulos (orçamento, fluxo de caixa, compras e aprovações).', deliverables: ['Arquitetura SaaS', 'UX / UI', 'Motor de conciliação'], image: `${M}/case-financeiro.jpg`, placeholder: true },
  { id: 's3', slug: 'clinica-bem-estar', topic: 'sistemas', title: 'Clínica Bem-Estar · Portal & Agenda', client: 'Clínica Bem-Estar', year: '2025', summary: 'Ecossistema digital de agendamento online em 3 passos, triagem inteligente e confirmação via WhatsApp.', deliverables: ['Portal institucional', 'Motor de agendamento', 'Automação WhatsApp'], image: `${M}/case-clinica.jpg`, placeholder: true },
  // Design
  { id: 'd1', slug: 'projeto-andresa', topic: 'design', title: 'Projeto Andresa · IA & Cuidado', client: 'Iniciativa Aegon Labs', year: '2026', summary: 'Interface de voz assistida por IA e painel familiar para apoio ao cuidado de pessoas com Alzheimer.', deliverables: ['Pesquisa clínica', 'UX acessível', 'Painel da família'], image: `${M}/case-andresa.jpg`, placeholder: true },
  { id: 'd2', slug: 'nexo-design-system', topic: 'design', title: 'Nexo · Design System Multi-marca', client: 'Nexo Pagamentos', year: '2025', summary: 'Arquitetura de design tokens, 68 componentes acessíveis e documentação viva para 4 squads.', deliverables: ['Design Tokens', 'Biblioteca React + Figma', 'Documentação'], image: `${M}/case-nexo.jpg`, placeholder: true },
  { id: 'd3', slug: 'trilha-edu', topic: 'design', title: 'Trilha Edu · Experiência do Aluno', client: 'Trilha Edu', year: '2025', summary: 'Redesenho completo da jornada de aulas interativas, trilhas de estudo e comunidade.', deliverables: ['Pesquisa UX', 'Design System', 'Protótipo de alta fidelidade'], image: `${ T }/brandingIdentidade.jpg`, placeholder: true },
  // Consultoria
  { id: 'c1', slug: 'mercado-sao-jorge', topic: 'consultoria', title: 'Mercado São Jorge · Transformação 90d', client: 'Rede São Jorge', year: '2026', summary: 'Diagnóstico operacional, implantação de compras centralizadas e canal de vendas pelo WhatsApp.', deliverables: ['Diagnóstico 360°', 'Processos de compras', 'Canal digital'], image: `${M}/case-mercado.jpg`, placeholder: true },
  { id: 'c2', slug: 'gestao-financeira-modular', topic: 'consultoria', title: 'Reestruturação Financeira PME', client: 'Grupo Horizonte', year: '2025', summary: 'Organização de centros de custo, DRE gerencial e rituais mensais de governança financeira.', deliverables: ['Mapeamento financeiro', 'Implantação SaaS', 'Treinamento'], image: `${T}/financeiro.jpg`, placeholder: true },
  { id: 'c3', slug: 'bws-365-cockpit', topic: 'consultoria', title: 'Governança & Indicadores de Frota', client: 'Grupo BWS Logística', year: '2025', summary: 'Redesenho de alçadas de aprovação de manutenção e painel executivo para diretoria.', deliverables: ['Mapeamento de processos', 'Matriz de alçadas', 'KPIs executivos'], image: `${T}/consultoria.jpg`, placeholder: true },
]


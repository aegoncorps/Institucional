/**
 * Informações institucionais da Aegon.
 * ⚠️ Dados de equipe, clientes, números, depoimentos e endereço são MOCK.
 */

export const company = {
  name: 'Aegon',
  legalName: 'Aegon Soluções Digitais e Consultoria Empresarial Ltda. (mock)',
  cnpj: '00.000.000/0001-00 (mock)',
  tagline: 'Estratégia, criação e tecnologia. Juntos, on.',
  email: 'contato@aegon.com.br',
  phone: '+55 (11) 0000-0000',
  address: 'Av. Brigadeiro Faria Lima, 3477 · 14º andar · Itaim Bibi · São Paulo, SP (mock)',
  cities: ['São Paulo', 'Rio de Janeiro', 'Curitiba'],
  hours: 'Segunda a sexta, das 9h às 18h',
  foundedYear: 2024,
}

export type NavItem = { to: string; label: string }

export const mainNav: NavItem[] = [
  { to: '/sobre', label: 'Quem somos' },
  { to: '/solucoes', label: 'Soluções' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/portfolio', label: 'Portfólio' },
  { to: '/insights', label: 'Insights' },
]

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  focus: string[]
  initials: string
  linkedin?: string
}

export const team: TeamMember[] = [
  {
    id: 'adilson',
    name: 'Adilson',
    role: 'Sócio · Estratégia & Negócios',
    bio: 'Conduz diagnósticos, modelos de negócio e a organização financeira dos clientes. Acredita que toda solução começa por entender o caixa e as pessoas. (bio mock)',
    focus: ['Diagnóstico', 'Finanças', 'Consultoria'],
    initials: 'AD',
  },
  {
    id: 'gabriel',
    name: 'Gabriel',
    role: 'Sócio · Criação & Produto',
    bio: 'Lidera marca, UX e direção criativa. Traduz estratégia em experiências que as pessoas entendem na primeira vez. (bio mock)',
    focus: ['Branding', 'UX / UI', 'Conteúdo'],
    initials: 'GA',
  },
  {
    id: 'emanuel',
    name: 'Emanuel',
    role: 'Sócio · Tecnologia & Engenharia',
    bio: 'Responsável por arquitetura, sistemas e IA. Constrói do protótipo ao sistema em produção, sempre com entregas incrementais. (bio mock)',
    focus: ['Sistemas', 'IA', 'Integrações'],
    initials: 'EM',
  },
]

export const values = [
  { title: 'Clareza antes da execução', text: 'Nenhuma linha de código ou peça de marca começa sem diagnóstico.' },
  { title: 'Propósito humano', text: 'Tecnologia serve pessoas. Medimos sucesso pelo impacto no dia a dia de quem usa.' },
  { title: 'Entrega incremental', text: 'Valor percebido cedo, em ciclos curtos, com o cliente dentro do processo.' },
  { title: 'Tudo no mesmo botão', text: 'Estratégia, criação e tecnologia integradas, sem terceirizar o essencial.' },
]

export const processSteps = [
  { n: '01', title: 'Diagnóstico', text: 'Imersão no negócio, nos dados e nas pessoas para definir o problema certo.', duration: '1–2 semanas' },
  { n: '02', title: 'Plano', text: 'Prioridades, escopo enxuto, métricas de sucesso e cronograma transparente.', duration: '1 semana' },
  { n: '03', title: 'Construção', text: 'Ciclos quinzenais de design e desenvolvimento, com entregas validadas.', duration: '4–16 semanas' },
  { n: '04', title: 'Acompanhamento', text: 'Medição, ajustes e evolução contínua depois que tudo está no ar.', duration: 'Contínuo' },
]

export const timeline = [
  { year: '2024', title: 'O primeiro "on"', text: 'Três sócios unem estratégia, criação e tecnologia em um só estúdio. (mock)' },
  { year: '2025', title: 'Primeiros produtos', text: 'Nasce a Gestão Financeira Modular e os primeiros clientes recorrentes. (mock)' },
  { year: '2026', title: 'Novo capítulo', text: 'Lançamento do BWS 365, Projeto Andresa e expansão para três capitais. (mock)' },
]

export const stats = [
  { value: '40+', label: 'projetos entregues' },
  { value: '12', label: 'setores atendidos' },
  { value: '3', label: 'produtos próprios' },
  { value: '96%', label: 'de clientes que renovam' },
]

export const clients = [
  'BWS Cooperativa',
  'Grupo Lume',
  'Vértice',
  'Nexo Pay',
  'Rede Bem-Estar',
  'Instituto Trilha',
  'Sabor da Vila',
  'Mercado São Jorge',
]

export const testimonials = [
  {
    quote: 'Pela primeira vez a diretoria olha um painel e confia no número. O atendimento deixou de apagar incêndio.',
    author: 'Marina Albuquerque',
    role: 'Gerente de Atendimento · BWS (mock)',
  },
  {
    quote: 'Contratamos só o que precisávamos e fomos crescendo. Hoje aprovo uma compra pelo celular em segundos.',
    author: 'Rafael Monteiro',
    role: 'Sócio-diretor · Grupo Lume (mock)',
  },
  {
    quote: 'Eles não me venderam sistema nenhum. Me ensinaram a enxergar o meu negócio.',
    author: 'Jorge Almeida',
    role: 'Proprietário · Mercado São Jorge (mock)',
  },
]


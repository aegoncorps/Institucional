/**
 * Insights (blog) e vagas.
 * ⚠️ Conteúdo MOCK. Os artigos usam blocos simples (parágrafo, título, citação, lista).
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: 'Estratégia' | 'Criação' | 'Tecnologia'
  date: string
  readTime: string
  author: string
  cover: string
  body: PostBlock[]
  placeholder: boolean
}

const IMG = '/assets/img'

const lorem = (topic: string): PostBlock[] => [
  { type: 'p', text: `Este é um artigo de exemplo sobre ${topic}. O texto serve apenas para validar a tipografia, o ritmo de leitura e o layout da página de insights. Substitua pelo conteúdo real antes da publicação.` },
  { type: 'h2', text: 'O problema que quase ninguém mede' },
  { type: 'p', text: 'Pequenas e médias empresas costumam investir em ferramentas antes de entender o próprio processo. O resultado é tecnologia cara que ninguém usa e decisões tomadas no escuro.' },
  { type: 'quote', text: 'Antes de escolher a ferramenta, escolha o problema.' },
  { type: 'h2', text: 'Três perguntas para começar' },
  { type: 'list', items: ['Qual decisão você toma toda semana sem dados?', 'Qual tarefa manual consome mais horas da equipe?', 'O que o seu cliente reclama com mais frequência?'] },
  { type: 'p', text: 'Responder essas perguntas com honestidade costuma revelar mais oportunidades do que qualquer novo sistema. É por isso que todo projeto da Aegon começa por um diagnóstico.' },
]

export const posts: Post[] = [
  {
    slug: 'diagnostico-antes-da-ferramenta',
    title: 'Diagnóstico antes da ferramenta: por que tantos projetos digitais falham',
    excerpt: 'O erro mais caro de uma PME não é escolher o sistema errado. É resolver o problema errado.',
    category: 'Estratégia',
    date: '2026-10-21',
    readTime: '6 min',
    author: 'Adilson',
    cover: `${IMG}/consultoria.jpg`,
    body: lorem('diagnóstico de negócios'),
    placeholder: true,
  },
  {
    slug: 'ia-pratica-para-pequenas-empresas',
    title: 'IA prática para pequenas empresas: 5 automações que pagam a conta',
    excerpt: 'Sem modismo: onde a inteligência artificial já economiza horas reais em operações pequenas.',
    category: 'Tecnologia',
    date: '2026-10-08',
    readTime: '8 min',
    author: 'Emanuel',
    cover: `${IMG}/desenvolvimentoSistemas.jpg`,
    body: lorem('automação e inteligência artificial'),
    placeholder: true,
  },
  {
    slug: 'marca-consistente-em-todo-ponto-de-contato',
    title: 'Marca consistente em todo ponto de contato, sem um time gigante',
    excerpt: 'Um sistema de marca bem feito vale mais do que um logo bonito. Veja como montar o seu.',
    category: 'Criação',
    date: '2026-09-25',
    readTime: '5 min',
    author: 'Gabriel',
    cover: `${IMG}/brandingIdentidade.jpg`,
    body: lorem('sistemas de marca'),
    placeholder: true,
  },
  {
    slug: 'dashboards-que-a-diretoria-confia',
    title: 'Dashboards que a diretoria realmente confia',
    excerpt: 'Indicador bonito que ninguém usa é decoração. O que muda quando o número é confiável.',
    category: 'Tecnologia',
    date: '2026-09-10',
    readTime: '7 min',
    author: 'Emanuel',
    cover: `${IMG}/financeiro.jpg`,
    body: lorem('dashboards e indicadores'),
    placeholder: true,
  },
  {
    slug: 'ux-para-quem-nao-e-digital',
    title: 'UX para quem não é digital: desenhando para todas as idades',
    excerpt: 'Lições do Projeto Andresa e do app da Clínica Bem-Estar sobre acessibilidade de verdade.',
    category: 'Criação',
    date: '2026-08-28',
    readTime: '6 min',
    author: 'Gabriel',
    cover: `${IMG}/design.jpg`,
    body: lorem('acessibilidade e UX'),
    placeholder: true,
  },
  {
    slug: 'fluxo-de-caixa-em-30-minutos-por-semana',
    title: 'Fluxo de caixa em 30 minutos por semana',
    excerpt: 'Uma rotina simples que tira o financeiro do caderno sem contratar um ERP.',
    category: 'Estratégia',
    date: '2026-08-14',
    readTime: '4 min',
    author: 'Adilson',
    cover: `${IMG}/compras.jpg`,
    body: lorem('organização financeira'),
    placeholder: true,
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

export type Job = {
  id: string
  title: string
  area: 'Tecnologia' | 'Criação' | 'Estratégia'
  type: string
  location: string
  summary: string
  requirements: string[]
}

export const jobs: Job[] = [
  {
    id: 'dev-fullstack',
    title: 'Pessoa Desenvolvedora Full-stack Pleno',
    area: 'Tecnologia',
    type: 'PJ · Tempo integral',
    location: 'Remoto (Brasil)',
    summary: 'Construir sistemas sob medida e produtos próprios com React, TypeScript e Node.js. (vaga mock)',
    requirements: ['3+ anos com React e TypeScript', 'Experiência com APIs e bancos relacionais', 'Vontade de falar com cliente'],
  },
  {
    id: 'designer-ux',
    title: 'Product Designer (UX/UI)',
    area: 'Criação',
    type: 'PJ · Tempo integral',
    location: 'Híbrido · São Paulo',
    summary: 'Pesquisar, prototipar e desenhar experiências para clientes e produtos Aegon. (vaga mock)',
    requirements: ['Portfólio com cases de produto', 'Domínio de Figma e design systems', 'Experiência com pesquisa'],
  },
  {
    id: 'consultor-pme',
    title: 'Consultor(a) de Negócios para PMEs',
    area: 'Estratégia',
    type: 'PJ · Meio período',
    location: 'Curitiba ou Rio de Janeiro',
    summary: 'Conduzir diagnósticos e planos de ação com pequenos negócios. (vaga mock)',
    requirements: ['Vivência em gestão de pequenos negócios', 'Noções de finanças', 'Didática e empatia'],
  },
]


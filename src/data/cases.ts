/**
 * Estudos de caso do portfólio.
 * ⚠️ TODO o conteúdo abaixo é MOCK (placeholder: true) para validar estrutura, layout e UX.
 * Substitua por cases reais (textos, imagens e métricas) antes da publicação.
 */

export type CaseArea = 'branding' | 'sistemas' | 'design' | 'consultoria'

export type CaseStudy = {
  slug: string
  title: string
  headline: string
  client: { name: string; sector: string }
  year: string
  duration: string
  areas: CaseArea[]
  services: string[]
  stack?: string[]
  team: string[]
  cover: string
  /** Cor de acento usada no hero e nos detalhes do case */
  accent: string
  summary: string
  challenge: string
  approach: { title: string; text: string }[]
  solution: string
  gallery: { src: string; caption: string; layout: 'full' | 'half' }[]
  results: { value: string; label: string }[]
  testimonial?: { quote: string; author: string; role: string }
  featured: boolean
  placeholder: boolean
}

export const caseAreas: { id: CaseArea; label: string; color: string }[] = [
  { id: 'branding', label: 'Branding', color: '#e5bd5a' },
  { id: 'sistemas', label: 'Sistemas', color: '#3b7bff' },
  { id: 'design', label: 'Design / UX', color: '#8fb4ff' },
  { id: 'consultoria', label: 'Consultoria', color: '#7fd1c7' },
]

const M = '/assets/img/mock'
const L = '/assets/img'

export const caseStudies: CaseStudy[] = [
  {
    slug: 'bws-365-cockpit',
    title: 'BWS 365 Cockpit',
    headline: 'Um cockpit único para a cooperativa enxergar, priorizar e resolver.',
    client: { name: 'BWS Cooperativa (mock)', sector: 'Cooperativismo · Serviços' },
    year: '2026',
    duration: '16 semanas',
    areas: ['sistemas', 'design'],
    services: ['Discovery', 'UX / UI', 'Sistema web', 'Integrações', 'Dashboards'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Power BI Embedded'],
    team: ['Emanuel · Tech Lead', 'Gabriel · Produto & UX', 'Adilson · Estratégia'],
    cover: `${M}/case-bws365.jpg`,
    accent: '#3b7bff',
    summary:
      'Central de atendimento e indicadores que unificou chamados, jornada do cooperado e métricas mensais em um único painel.',
    challenge:
      'A cooperativa operava com planilhas, e-mails e três sistemas que não conversavam. Os chamados se perdiam entre áreas, ninguém tinha visão do tempo de resposta e o fechamento mensal de indicadores levava quase uma semana de trabalho manual.',
    approach: [
      { title: 'Imersão', text: 'Duas semanas acompanhando atendentes e gestores para mapear a jornada real do cooperado, do primeiro contato ao encerramento.' },
      { title: 'Arquitetura', text: 'Desenhamos um modelo único de chamado e um barramento de integrações para os três sistemas legados, sem substituí-los de uma vez.' },
      { title: 'Entrega incremental', text: 'Releases quinzenais: primeiro a fila de chamados, depois os alertas de SLA e por fim os dashboards executivos.' },
    ],
    solution:
      'Um cockpit web com fila inteligente de chamados, alertas de SLA, histórico completo do cooperado e dashboards mensais gerados automaticamente para a diretoria.',
    gallery: [
      { src: `${M}/case-bws365.jpg`, caption: 'Visão geral do cockpit com KPIs do mês', layout: 'full' },
      { src: `${L}/3d/financeiro.jpg`, caption: 'Dashboard executivo de indicadores', layout: 'half' },
      { src: `${L}/3d/desenvolvimentoSistemas.jpg`, caption: 'Fila de chamados por prioridade', layout: 'half' },
    ],
    results: [
      { value: '-62%', label: 'no tempo médio de resposta' },
      { value: '5 dias → 2h', label: 'no fechamento mensal de indicadores' },
      { value: '98%', label: 'dos chamados dentro do SLA' },
    ],
    testimonial: {
      quote: 'Pela primeira vez a diretoria olha um painel e confia no número. O atendimento deixou de apagar incêndio.',
      author: 'Marina Albuquerque (mock)',
      role: 'Gerente de Atendimento',
    },
    featured: true,
    placeholder: true,
  },
  {
    slug: 'projeto-andresa',
    title: 'Projeto Andresa',
    headline: 'Tecnologia que cuida da conversa entre quem esquece e quem cuida.',
    client: { name: 'Projeto proprietário Aegon', sector: 'Saúde · Cuidado' },
    year: '2026',
    duration: 'Em andamento',
    areas: ['sistemas', 'design'],
    services: ['Pesquisa com famílias', 'UX de voz', 'IA conversacional', 'App de acompanhamento'],
    stack: ['React Native', 'Python', 'LLM', 'Speech-to-text'],
    team: ['Emanuel · IA & Engenharia', 'Gabriel · UX Research'],
    cover: `${M}/case-andresa.jpg`,
    accent: '#e5bd5a',
    summary:
      'Assistente de voz que acompanha pessoas com Alzheimer e entrega resumos e alertas para familiares e cuidadores.',
    challenge:
      'Familiares de pessoas com Alzheimer relatam dificuldade em acompanhar a rotina, as conversas e as pequenas mudanças de comportamento do dia a dia, especialmente quando não moram junto.',
    approach: [
      { title: 'Escuta', text: 'Entrevistas com 18 famílias e 6 cuidadores profissionais para entender rotinas, medos e limites éticos.' },
      { title: 'Voz primeiro', text: 'Interface sem telas para a pessoa assistida: só voz, com ritmo lento, frases curtas e repetição gentil.' },
      { title: 'Ética e segurança', text: 'Protocolos validados com especialistas: nada substitui acompanhamento médico e todo dado é compartilhado apenas com autorização.' },
    ],
    solution:
      'Chamadas de voz assistidas por IA, resumos diários para o responsável e um painel com humor, temas recorrentes e alertas de mudança de padrão.',
    gallery: [
      { src: `${M}/case-andresa.jpg`, caption: 'Chamada assistida por voz', layout: 'full' },
      { src: `${L}/3d/andresa.jpg`, caption: 'Painel do familiar', layout: 'half' },
      { src: `${L}/3d/design.jpg`, caption: 'Protótipo de resumo diário', layout: 'half' },
    ],
    results: [
      { value: '18', label: 'famílias na pesquisa inicial' },
      { value: '4,8/5', label: 'de conforto relatado no piloto' },
      { value: '3', label: 'especialistas no comitê de ética' },
    ],
    featured: true,
    placeholder: true,
  },
  {
    slug: 'gestao-financeira-modular',
    title: 'Gestão Financeira Modular',
    headline: 'Controle financeiro que cresce por módulos, no ritmo da empresa.',
    client: { name: 'Produto Aegon · Cliente piloto Grupo Lume (mock)', sector: 'Indústria · PME' },
    year: '2025',
    duration: '20 semanas',
    areas: ['sistemas', 'consultoria'],
    services: ['Consultoria financeira', 'SaaS', 'Dashboards', 'Treinamento'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'n8n'],
    team: ['Adilson · Finanças', 'Emanuel · Engenharia', 'Gabriel · Produto'],
    cover: `${M}/case-financeiro.jpg`,
    accent: '#7fd1c7',
    summary:
      'Plataforma de orçamento, compras e aprovações que substituiu 14 planilhas sem impor um ERP caro e complexo.',
    challenge:
      'O Grupo Lume crescia rápido, mas o financeiro ainda vivia de planilhas. Aprovações de compra dependiam de WhatsApp e o orçamento só era conferido no fim do trimestre.',
    approach: [
      { title: 'Diagnóstico', text: 'Mapeamos fluxos de compra, aprovação e fechamento e priorizamos os módulos de maior impacto.' },
      { title: 'Módulo base', text: 'Receitas, despesas e centros de custo entraram em produção em 6 semanas.' },
      { title: 'Expansão', text: 'Compras, aprovações e orçamento foram ativados conforme a equipe ganhava confiança.' },
    ],
    solution:
      'Um SaaS modular com orçamento versus realizado em tempo real, fluxo de aprovação por alçada e relatórios automáticos para os sócios.',
    gallery: [
      { src: `${M}/case-financeiro.jpg`, caption: 'Orçado versus realizado', layout: 'full' },
      { src: `${L}/financeiro.jpg`, caption: 'Fluxo de aprovação de compras', layout: 'half' },
      { src: `${L}/3d/consultoria.jpg`, caption: 'Treinamento da equipe', layout: 'half' },
    ],
    results: [
      { value: '14 → 0', label: 'planilhas críticas eliminadas' },
      { value: '+31%', label: 'de previsibilidade de caixa' },
      { value: '6 sem.', label: 'até o primeiro módulo em produção' },
    ],
    testimonial: {
      quote: 'Contratamos só o que precisávamos e fomos crescendo. Hoje aprovo uma compra pelo celular em segundos.',
      author: 'Rafael Monteiro (mock)',
      role: 'Sócio-diretor, Grupo Lume',
    },
    featured: true,
    placeholder: true,
  },
  {
    slug: 'vertice-arquitetura',
    title: 'Vértice Arquitetura',
    headline: 'Uma identidade precisa como uma planta baixa.',
    client: { name: 'Vértice Arquitetura (mock)', sector: 'Arquitetura · Serviços' },
    year: '2025',
    duration: '8 semanas',
    areas: ['branding', 'design'],
    services: ['Plataforma de marca', 'Identidade visual', 'Manual de marca', 'Papelaria', 'Site institucional'],
    team: ['Gabriel · Direção de arte', 'Adilson · Estratégia de marca'],
    cover: `${M}/case-vertice.jpg`,
    accent: '#e5bd5a',
    summary: 'Reposicionamento e nova identidade para um escritório que queria sair do "mais um" e disputar projetos corporativos.',
    challenge:
      'Com 12 anos de mercado, a Vértice tinha portfólio forte, mas uma marca genérica que não comunicava o rigor técnico do escritório.',
    approach: [
      { title: 'Plataforma de marca', text: 'Workshops com os sócios para definir propósito, território e tom de voz.' },
      { title: 'Sistema visual', text: 'Monograma construído sobre a grade modular usada nos próprios projetos do escritório.' },
      { title: 'Aplicações', text: 'Papelaria, sinalização, apresentações comerciais e site institucional.' },
    ],
    solution: 'Um sistema visual modular, com monograma geométrico, paleta sóbria e tipografia técnica, aplicado de ponta a ponta.',
    gallery: [
      { src: `${M}/case-vertice.jpg`, caption: 'Papelaria e monograma', layout: 'full' },
      { src: `${L}/brandingIdentidade.jpg`, caption: 'Manual de marca', layout: 'half' },
      { src: `${L}/3d/brandingIdentidade.jpg`, caption: 'Sinalização', layout: 'half' },
    ],
    results: [
      { value: '3x', label: 'mais propostas corporativas no semestre' },
      { value: '+120%', label: 'de visitas no site institucional' },
      { value: '40+', label: 'peças no sistema de marca' },
    ],
    testimonial: {
      quote: 'A marca finalmente tem a cara do nosso trabalho. Mudou até a forma como apresentamos projetos.',
      author: 'Helena Prado (mock)',
      role: 'Sócia fundadora, Vértice',
    },
    featured: false,
    placeholder: true,
  },
  {
    slug: 'sabor-da-vila',
    title: 'Sabor da Vila',
    headline: 'Conteúdo que dá fome e enche o salão.',
    client: { name: 'Sabor da Vila (mock)', sector: 'Gastronomia · Varejo local' },
    year: '2025',
    duration: 'Contrato contínuo',
    areas: ['branding'],
    services: ['Linha editorial', 'Produção de foto e vídeo', 'Gestão de redes', 'Campanhas'],
    team: ['Gabriel · Direção criativa'],
    cover: `${M}/case-sabor.jpg`,
    accent: '#ff8a3d',
    summary: 'Direção criativa e produção mensal de conteúdo para um restaurante de bairro que queria lotar os dias de semana.',
    challenge: 'O restaurante lotava aos sábados, mas tinha mesas vazias de segunda a quinta e um Instagram parado havia meses.',
    approach: [
      { title: 'Linha editorial', text: 'Pilares de conteúdo: bastidores da cozinha, histórias dos clientes e pratos da semana.' },
      { title: 'Produção enxuta', text: 'Uma diária de gravação por mês gera 30 dias de conteúdo.' },
      { title: 'Campanhas', text: 'Ações "Terça da Vila" com cardápio exclusivo e reserva pelo WhatsApp.' },
    ],
    solution: 'Calendário editorial mensal, templates de marca e campanhas focadas nos dias de menor movimento.',
    gallery: [
      { src: `${M}/case-sabor.jpg`, caption: 'Posts da campanha Terça da Vila', layout: 'full' },
      { src: `${L}/criacaoConteudo.jpg`, caption: 'Bastidores de gravação', layout: 'half' },
      { src: `${L}/3d/criacaoConteudo.jpg`, caption: 'Templates de stories', layout: 'half' },
    ],
    results: [
      { value: '+48%', label: 'de ocupação de segunda a quinta' },
      { value: '12k', label: 'novos seguidores em 6 meses' },
      { value: '320', label: 'reservas via WhatsApp por mês' },
    ],
    featured: false,
    placeholder: true,
  },
  {
    slug: 'clinica-bem-estar',
    title: 'Clínica Bem-Estar',
    headline: 'Agendar consulta em três toques, sem ligação.',
    client: { name: 'Rede Bem-Estar (mock)', sector: 'Saúde' },
    year: '2026',
    duration: '10 semanas',
    areas: ['design'],
    services: ['Pesquisa com usuários', 'Arquitetura de informação', 'Protótipo navegável', 'Testes de usabilidade'],
    team: ['Gabriel · UX Lead'],
    cover: `${M}/case-clinica.jpg`,
    accent: '#8fb4ff',
    summary: 'Redesenho completo da experiência de agendamento do aplicativo de uma rede com 9 clínicas.',
    challenge: '62% dos pacientes abandonavam o agendamento pelo app e preferiam ligar, sobrecarregando a central.',
    approach: [
      { title: 'Pesquisa', text: 'Entrevistas e análise de gravações de sessão para localizar os pontos de abandono.' },
      { title: 'Redesenho', text: 'Fluxo reduzido de 9 para 3 etapas, com sugestão inteligente de horários.' },
      { title: 'Validação', text: 'Três rodadas de teste com pacientes de 22 a 74 anos.' },
    ],
    solution: 'Um novo fluxo de agendamento, acessível e direto, com lembretes e reagendamento em um toque.',
    gallery: [
      { src: `${M}/case-clinica.jpg`, caption: 'Novo fluxo de agendamento', layout: 'full' },
      { src: `${L}/design.jpg`, caption: 'Wireframes de alta fidelidade', layout: 'half' },
      { src: `${L}/3d/design.jpg`, caption: 'Testes de usabilidade', layout: 'half' },
    ],
    results: [
      { value: '-71%', label: 'de abandono no agendamento' },
      { value: '-40%', label: 'de ligações na central' },
      { value: 'SUS 86', label: 'de nota de usabilidade' },
    ],
    featured: false,
    placeholder: true,
  },
  {
    slug: 'nexo-design-system',
    title: 'Nexo Design System',
    headline: 'Componentes que fazem o time de produto andar na mesma direção.',
    client: { name: 'Nexo Pay (mock)', sector: 'Fintech' },
    year: '2025',
    duration: '12 semanas',
    areas: ['design', 'sistemas'],
    services: ['Auditoria de interface', 'Design tokens', 'Biblioteca de componentes', 'Documentação'],
    stack: ['Figma', 'React', 'Storybook', 'Style Dictionary'],
    team: ['Gabriel · Design System', 'Emanuel · Front-end'],
    cover: `${M}/case-nexo.jpg`,
    accent: '#3b7bff',
    summary: 'Design system completo, do Figma ao código, para uma fintech com quatro squads de produto.',
    challenge: 'Quatro squads criavam botões, modais e formulários diferentes. Cada tela nova levava semanas e quebrava a consistência da marca.',
    approach: [
      { title: 'Auditoria', text: 'Inventário de mais de 400 variações de componentes em produção.' },
      { title: 'Tokens', text: 'Cores, tipografia, espaçamentos e raios sincronizados entre Figma e código.' },
      { title: 'Adoção', text: 'Documentação viva no Storybook e embaixadores em cada squad.' },
    ],
    solution: 'Mais de 60 componentes acessíveis, tokens multimarca e documentação com exemplos de uso.',
    gallery: [
      { src: `${M}/case-nexo.jpg`, caption: 'Biblioteca de componentes', layout: 'full' },
      { src: `${L}/3d/design.jpg`, caption: 'Tokens de cor e tipografia', layout: 'half' },
      { src: `${L}/desenvolvimentoSistemas.jpg`, caption: 'Documentação no Storybook', layout: 'half' },
    ],
    results: [
      { value: '-45%', label: 'no tempo de entrega de telas' },
      { value: '400 → 64', label: 'variações de componentes' },
      { value: 'AA', label: 'de acessibilidade (WCAG 2.2)' },
    ],
    featured: false,
    placeholder: true,
  },
  {
    slug: 'mercado-sao-jorge',
    title: 'Mercado São Jorge',
    headline: 'Do caderno ao painel: um mercado de bairro organizado em 90 dias.',
    client: { name: 'Mercado São Jorge (mock)', sector: 'Varejo · Pequeno negócio' },
    year: '2026',
    duration: '90 dias',
    areas: ['consultoria'],
    services: ['Diagnóstico', 'Plano de ação', 'Ferramentas simples', 'Acompanhamento'],
    team: ['Adilson · Consultor líder'],
    cover: `${M}/case-mercado.jpg`,
    accent: '#7fd1c7',
    summary: 'Consultoria para pequeno negócio: estoque, caixa e presença digital organizados sem sistemas caros.',
    challenge: 'O dono controlava estoque e fiado em um caderno, perdia produtos por validade e não sabia qual era o lucro real do mês.',
    approach: [
      { title: 'Diagnóstico', text: 'Uma semana dentro do mercado entendendo compras, vendas e fiado.' },
      { title: 'Ferramentas certas', text: 'Planilha guiada, app de PDV gratuito e Google Meu Negócio. Nada além do necessário.' },
      { title: 'Acompanhamento', text: 'Reuniões quinzenais durante 90 dias para consolidar o hábito.' },
    ],
    solution: 'Um painel simples de caixa e estoque, rotina semanal de compras e perfil digital ativo no bairro.',
    gallery: [
      { src: `${M}/case-mercado.jpg`, caption: 'Revisão do painel semanal', layout: 'full' },
      { src: `${L}/consultoria.jpg`, caption: 'Workshop de rotina de compras', layout: 'half' },
      { src: `${L}/3d/compras.jpg`, caption: 'Controle de estoque', layout: 'half' },
    ],
    results: [
      { value: '-35%', label: 'de perdas por validade' },
      { value: '+22%', label: 'de margem em 3 meses' },
      { value: '4,9★', label: 'no Google Meu Negócio' },
    ],
    testimonial: {
      quote: 'Eles não me venderam sistema nenhum. Me ensinaram a enxergar o meu negócio.',
      author: 'Seu Jorge Almeida (mock)',
      role: 'Proprietário',
    },
    featured: false,
    placeholder: true,
  },
  {
    slug: 'trilha-edu',
    title: 'Trilha EDU',
    headline: 'Uma plataforma de cursos que o aluno quer terminar.',
    client: { name: 'Instituto Trilha (mock)', sector: 'Educação' },
    year: '2025',
    duration: '18 semanas',
    areas: ['sistemas', 'design', 'branding'],
    services: ['Identidade visual', 'UX / UI', 'Plataforma web', 'Gamificação'],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Mux Video'],
    team: ['Emanuel · Engenharia', 'Gabriel · UX & Marca', 'Adilson · Modelo de negócio'],
    cover: `${M}/case-edu.jpg`,
    accent: '#8fb4ff',
    summary: 'Marca, experiência e plataforma de ensino online com trilhas gamificadas para um instituto educacional.',
    challenge: 'Os cursos do instituto tinham conteúdo excelente, mas só 14% dos alunos concluíam as trilhas na plataforma antiga.',
    approach: [
      { title: 'Marca', text: 'Nova identidade jovem e acolhedora, pensada para telas pequenas.' },
      { title: 'Experiência', text: 'Aulas curtas, progresso visível e metas semanais.' },
      { title: 'Plataforma', text: 'Desenvolvimento próprio com player adaptativo e painel do tutor.' },
    ],
    solution: 'Uma plataforma de trilhas com gamificação leve, certificados automáticos e painel de engajamento para tutores.',
    gallery: [
      { src: `${M}/case-edu.jpg`, caption: 'Trilha do aluno', layout: 'full' },
      { src: `${L}/3d/desenvolvimentoSistemas.jpg`, caption: 'Painel do tutor', layout: 'half' },
      { src: `${L}/3d/brandingIdentidade.jpg`, caption: 'Nova identidade', layout: 'half' },
    ],
    results: [
      { value: '14% → 52%', label: 'de conclusão das trilhas' },
      { value: '8.400', label: 'alunos ativos no primeiro ano' },
      { value: '+3,1x', label: 'de tempo médio de estudo' },
    ],
    featured: false,
    placeholder: true,
  },
]

export const featuredCases = caseStudies.filter((c) => c.featured)

export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug)

export const areaLabel = (id: CaseArea) => caseAreas.find((a) => a.id === id)?.label ?? id
export const areaColor = (id: CaseArea) => caseAreas.find((a) => a.id === id)?.color ?? '#3b7bff'


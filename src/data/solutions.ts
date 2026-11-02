/**
 * Páginas de solução (um por pilar) e conteúdo extra das páginas de produto.
 * ⚠️ Conteúdo MOCK para validação de estrutura.
 */
import type { CaseArea } from './cases'

export type Solution = {
  slug: 'estrategia' | 'criacao' | 'tecnologia'
  number: string
  name: string
  headline: string
  intro: string
  image: string
  problems: string[]
  deliverables: { title: string; text: string }[]
  formats: { name: string; text: string; duration: string }[]
  relatedAreas: CaseArea[]
  faq: { q: string; a: string }[]
}

const IMG = '/assets/img'

export const solutions: Solution[] = [
  {
    slug: 'estrategia',
    number: '01',
    name: 'Estratégia',
    headline: 'Clareza antes da execução.',
    intro:
      'Entendemos o negócio, o mercado e as pessoas antes de propor qualquer solução. Cada entrega nasce de um diagnóstico honesto.',
    image: `${IMG}/consultoria.jpg`,
    problems: [
      'Você sente que investe em marketing e tecnologia, mas não vê retorno.',
      'O financeiro vive em planilhas e ninguém confia nos números.',
      'O negócio cresceu e os processos não acompanharam.',
      'Falta clareza sobre qual deve ser o próximo passo.',
    ],
    deliverables: [
      { title: 'Diagnóstico de negócio', text: 'Mapa de processos, gargalos e oportunidades, com dados.' },
      { title: 'Posicionamento', text: 'Proposta de valor, público e diferenciais claros.' },
      { title: 'Organização financeira', text: 'Fluxo de caixa, centros de custo e indicadores essenciais.' },
      { title: 'Plano de ação', text: 'Roadmap priorizado de 90 dias com responsáveis e métricas.' },
    ],
    formats: [
      { name: 'Diagnóstico Express', text: 'Imersão rápida e relatório com prioridades.', duration: '2 semanas' },
      { name: 'Consultoria 90 dias', text: 'Diagnóstico, plano e acompanhamento quinzenal.', duration: '3 meses' },
      { name: 'Conselho contínuo', text: 'Reunião mensal estratégica com os sócios.', duration: 'Mensal' },
    ],
    relatedAreas: ['consultoria'],
    faq: [
      { q: 'Preciso ter um sistema para começar?', a: 'Não. Muitas vezes a primeira entrega é organizar o que já existe com ferramentas simples.' },
      { q: 'Vocês atendem pequenos negócios?', a: 'Sim. Temos um formato pensado para quem está começando a se organizar.' },
      { q: 'Quanto tempo até ver resultado?', a: 'Os primeiros ganhos costumam aparecer nas 4 primeiras semanas do plano de ação.' },
    ],
  },
  {
    slug: 'criacao',
    number: '02',
    name: 'Criação',
    headline: 'Marcas que se reconhecem.',
    intro:
      'Identidade, experiência e conteúdo com consistência. Uma marca que comunica o que você é em qualquer ponto de contato.',
    image: `${IMG}/brandingIdentidade.jpg`,
    problems: [
      'Sua marca parece genérica e não reflete a qualidade do seu trabalho.',
      'Cada material sai com uma cara diferente.',
      'O site ou app é bonito, mas as pessoas não conseguem usar.',
      'As redes sociais estão paradas ou sem estratégia.',
    ],
    deliverables: [
      { title: 'Branding e identidade', text: 'Plataforma de marca, logo, paleta, tipografia e manual.' },
      { title: 'UX / UI', text: 'Pesquisa, arquitetura de informação, protótipos e interfaces.' },
      { title: 'Conteúdo e campanhas', text: 'Linha editorial, produção de foto e vídeo e gestão de redes.' },
      { title: 'Materiais institucionais', text: 'Apresentações, relatórios, papelaria e sinalização.' },
    ],
    formats: [
      { name: 'Identidade visual', text: 'Marca completa com manual e aplicações principais.', duration: '6–8 semanas' },
      { name: 'Sprint de UX', text: 'Pesquisa e protótipo validado de um fluxo crítico.', duration: '3 semanas' },
      { name: 'Conteúdo mensal', text: 'Calendário, produção e gestão de redes.', duration: 'Mensal' },
    ],
    relatedAreas: ['branding', 'design'],
    faq: [
      { q: 'Vocês fazem só o logo?', a: 'Preferimos entregar um sistema de marca, mas adaptamos o escopo à fase do negócio.' },
      { q: 'Quantas rodadas de ajuste?', a: 'Trabalhamos com checkpoints de validação em cada etapa, sem surpresas no final.' },
      { q: 'Vocês produzem fotos e vídeos?', a: 'Sim, com equipe própria e parceiros para produções maiores.' },
    ],
  },
  {
    slug: 'tecnologia',
    number: '03',
    name: 'Tecnologia',
    headline: 'Do protótipo ao sistema.',
    intro:
      'Sites, aplicativos e sistemas sob medida, construídos para resolver o problema certo e evoluir com o seu negócio.',
    image: `${IMG}/desenvolvimentoSistemas.jpg`,
    problems: [
      'Seus sistemas não conversam entre si e tudo depende de retrabalho manual.',
      'Você precisa de um app ou plataforma, mas não sabe por onde começar.',
      'O site atual é lento, difícil de atualizar e não converte.',
      'Quer usar IA e automação de forma prática, sem modismo.',
    ],
    deliverables: [
      { title: 'Sites e landing pages', text: 'Rápidos, otimizados para SEO e fáceis de atualizar.' },
      { title: 'Aplicativos', text: 'iOS, Android e web com foco em experiência.' },
      { title: 'Sistemas sob medida', text: 'Plataformas, dashboards e portais para operações reais.' },
      { title: 'Integrações e automações', text: 'APIs, n8n, IA aplicada e eliminação de tarefas manuais.' },
    ],
    formats: [
      { name: 'MVP', text: 'Primeira versão funcional para validar com usuários.', duration: '6–10 semanas' },
      { name: 'Sistema sob medida', text: 'Discovery, construção incremental e implantação.', duration: '3–6 meses' },
      { name: 'Squad contínuo', text: 'Time dedicado para evoluir o seu produto.', duration: 'Mensal' },
    ],
    relatedAreas: ['sistemas'],
    faq: [
      { q: 'O código fica com quem?', a: 'Com você. Entregamos repositório, documentação e acessos.' },
      { q: 'Vocês dão suporte depois?', a: 'Sim, com planos de sustentação e evolução contínua.' },
      { q: 'Quais tecnologias usam?', a: 'React, TypeScript, Node.js, Python, bancos relacionais e nuvem. Escolhemos a stack pelo problema.' },
    ],
  },
]

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)

/** Conteúdo extra de cada produto (chave = id do produto em content.ts). */
export type ProductPage = {
  tagline: string
  modules: { name: string; text: string }[]
  steps: { title: string; text: string }[]
  plans?: { name: string; price: string; items: string[]; highlight?: boolean }[]
  faq: { q: string; a: string }[]
  relatedCase?: string
}

export const productPages: Record<string, ProductPage> = {
  consultoria: {
    tagline: 'Organização prática para quem quer crescer sem complicar.',
    modules: [
      { name: 'Presença digital', text: 'Google Meu Negócio, redes e site enxuto.' },
      { name: 'Processos', text: 'Rotinas de compra, venda, atendimento e estoque.' },
      { name: 'Financeiro', text: 'Fluxo de caixa, precificação e margem real.' },
      { name: 'Ferramentas', text: 'Só o necessário, de preferência gratuito.' },
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Uma semana dentro do seu negócio.' },
      { title: 'Plano de ação', text: '90 dias priorizados.' },
      { title: 'Implementação', text: 'Fazemos junto com você.' },
      { title: 'Acompanhamento', text: 'Reuniões quinzenais.' },
    ],
    plans: [
      { name: 'Diagnóstico', price: 'R$ 1.900 (mock)', items: ['Imersão de 1 semana', 'Relatório de prioridades', 'Reunião de devolutiva'] },
      { name: 'Consultoria 90 dias', price: 'R$ 4.900 (mock)', items: ['Diagnóstico completo', 'Plano de ação', '6 encontros de acompanhamento', 'Suporte por WhatsApp'], highlight: true },
      { name: 'Contínuo', price: 'R$ 990/mês (mock)', items: ['Encontro mensal', 'Indicadores do mês', 'Suporte prioritário'] },
    ],
    faq: [
      { q: 'Atende fora de São Paulo?', a: 'Sim, presencialmente nas capitais em que atuamos e remotamente em todo o Brasil.' },
      { q: 'Preciso comprar algum sistema?', a: 'Não. Priorizamos ferramentas que você já tem ou gratuitas.' },
    ],
    relatedCase: 'mercado-sao-jorge',
  },
  financeiro: {
    tagline: 'Contrate só os módulos de que precisa. Evolua quando quiser.',
    modules: [
      { name: 'Base financeira', text: 'Receitas, despesas, contas e centros de custo.' },
      { name: 'Orçamento', text: 'Planejado versus realizado em tempo real.' },
      { name: 'Compras & aprovações', text: 'Fluxo por alçada, pelo celular.' },
      { name: 'Estoque', text: 'Entradas, saídas e alertas de reposição.' },
      { name: 'Relatórios', text: 'Dashboards automáticos para os sócios.' },
    ],
    steps: [
      { title: 'Configuração', text: 'Importamos seus dados e planilhas.' },
      { title: 'Módulo base', text: 'Em produção em até 6 semanas.' },
      { title: 'Treinamento', text: 'Equipe autônoma desde o primeiro mês.' },
      { title: 'Expansão', text: 'Novos módulos conforme a necessidade.' },
    ],
    plans: [
      { name: 'Base', price: 'R$ 390/mês (mock)', items: ['Módulo financeiro', 'Até 5 usuários', 'Suporte por e-mail'] },
      { name: 'Crescimento', price: 'R$ 790/mês (mock)', items: ['Base + Orçamento + Compras', 'Até 15 usuários', 'Suporte prioritário'], highlight: true },
      { name: 'Completo', price: 'Sob consulta', items: ['Todos os módulos', 'Usuários ilimitados', 'Integrações dedicadas'] },
    ],
    faq: [
      { q: 'Substitui o meu ERP?', a: 'Pode complementar ou substituir, dependendo do porte e da necessidade.' },
      { q: 'Meus dados ficam seguros?', a: 'Sim. Hospedagem em nuvem com backups diários e controle de acesso por perfil.' },
    ],
    relatedCase: 'gestao-financeira-modular',
  },
  compras: {
    tagline: 'A lista certa, no lugar certo, pelo menor custo total.',
    modules: [
      { name: 'Listas recorrentes', text: 'Semanal, quinzenal ou mensal.' },
      { name: 'Comparador', text: 'Custo total da lista por mercado.' },
      { name: 'Preferências', text: 'Marcas, raio de busca e restrições.' },
      { name: 'Histórico', text: 'Gastos e consumo ao longo do tempo.' },
    ],
    steps: [
      { title: 'Monte sua lista', text: 'Uma vez, reutilize sempre.' },
      { title: 'Defina o raio', text: 'Mercados perto de você.' },
      { title: 'Compare', text: 'Veja o custo total.' },
      { title: 'Economize', text: 'Acompanhe o histórico.' },
    ],
    faq: [
      { q: 'Quando lança?', a: 'Previsão de beta fechado no próximo semestre. Entre na lista de espera.' },
      { q: 'Vai ser gratuito?', a: 'Haverá uma versão gratuita com recursos essenciais.' },
    ],
  },
  andresa: {
    tagline: 'Comunicação assistida para quem cuida de quem esquece.',
    modules: [
      { name: 'Chamadas de voz', text: 'Conversas gentis assistidas por IA.' },
      { name: 'Resumos', text: 'O que foi conversado, para o responsável.' },
      { name: 'Painel familiar', text: 'Humor, temas e rotina, com autorização.' },
      { name: 'Alertas', text: 'Mudanças de padrão sinalizadas cedo.' },
    ],
    steps: [
      { title: 'Cadastro', text: 'Família e cuidadores autorizados.' },
      { title: 'Rotina', text: 'Horários e temas preferidos.' },
      { title: 'Conversas', text: 'Chamadas diárias por voz.' },
      { title: 'Acompanhamento', text: 'Resumos e alertas.' },
    ],
    faq: [
      { q: 'Substitui acompanhamento médico?', a: 'Não. É uma ferramenta de apoio, desenvolvida com orientação de especialistas.' },
      { q: 'Como participar do piloto?', a: 'Entre na lista de acompanhamento e entraremos em contato.' },
    ],
    relatedCase: 'projeto-andresa',
  },
}


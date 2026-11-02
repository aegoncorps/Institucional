# AEGON v5 — site institucional

Experiência narrativa “Do off ao on” para apresentar a AEGON como agência e hub de estratégia, criação, tecnologia e produtos. A direção visual parte do manual de identidade: Core Pulse `#fff1e4`, Azul System Wake `#0045ba`, Shadow State `#0a2844`, tipografia Mulish e o símbolo “on”.

**Prévia publicada da v5:** [aegon-institucional-v5.vercel.app](https://aegon-institucional-v5.vercel.app). É um projeto de demonstração separado dos domínios AEGON existentes.

## Executar

Requer Node.js 22 ou superior.

```bash
npm ci
npm run dev
```

Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## O que existe na v5

- Portal inicial, passagem luminosa com aproximação, capítulos editoriais com zoom e constelação 3D opcional.
- Cenas próprias para Sobre, Soluções, Produtos, Portfólio, Cases, Insights e Carreiras.
- Demonstrações navegáveis dos três pilares e dos quatro conceitos de produto.
- Portfólio com case em destaque, acervo editorial filtrável e exploração 3D.
- Contato com três perguntas, uma de cada vez: nome, e-mail e projeto. A origem de produto, solução ou case segue para a conversa.
- Endpoint `/api/leads` para entrega por Resend em um deploy Vercel. O sucesso só aparece após o provedor aceitar o envio.

## Conteúdo desta etapa

**Cases, clientes, indicadores, depoimentos, equipe e produtos são demonstrativos.** A v5 prioriza layout, movimento, narrativa e entendimento das ofertas. As etiquetas no site identificam o acervo e os conceitos em evolução. Substitua os dados e revise as páginas legais antes do lançamento comercial.

Os dois PDFs de marca são arquivos locais de referência e estão ignorados pelo Git em `dist/assets/brand/*.pdf`. O build preserva esses arquivos; há também uma cópia de segurança fora de `dist`, em `D:\Trabalhos\Aegon\v4\brand-reference`. O diagnóstico derivado deles está em [`docs/EVOLUCAO_UX_AEGON_V4.md`](docs/EVOLUCAO_UX_AEGON_V4.md). O registro da implementação está em [`docs/IMPLEMENTACAO_V5.md`](docs/IMPLEMENTACAO_V5.md).

## Contato

O layout funciona sem credenciais. Para receber leads em produção na Vercel, configure as variáveis de [`.env.example`](.env.example):

- `RESEND_API_KEY`
- `LEAD_FROM_EMAIL` (remetente de domínio verificado no Resend)
- `LEAD_TO_EMAIL` (caixa de destino)

Sem essas variáveis, o endpoint responde indisponível e a interface oferece e-mail e WhatsApp como caminhos alternativos. Atualize também o número em [`src/config.ts`](src/config.ts) e o e-mail em [`src/data/site.ts`](src/data/site.ts) antes de usar esses canais como contato real. O `npm run dev` do Vite serve a interface; para executar o endpoint localmente, use o ambiente de desenvolvimento da Vercel.

## Estrutura

- `src/components/ExperienceScenes.tsx`: cenas de passagem, capítulo e pilares.
- `src/components/ProductDemo.tsx`: demonstrações narrativas com dados ilustrativos.
- `src/pages/ContactPage.tsx`: jornada de três perguntas.
- `src/styles/v5.css`: direção de arte e adaptação responsiva da v5.
- `api/leads.ts`: validação e entrega do contato.
- `docs/IMPLEMENTACAO_V5.md`: decisões, rotas, testes e pendências de conteúdo real.
- `vercel.json`: build Vite e roteamento direto da SPA.
- `scripts/clean-generated.mjs`: limpa apenas os bundles gerados, preservando os PDFs locais durante a build.


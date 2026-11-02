# AEGON v5 — implementação e visão do site

**Fase:** layout, direção de arte, storytelling e protótipos interativos com conteúdo demonstrativo.

**Referência:** [diagnóstico e proposta da v4](EVOLUCAO_UX_AEGON_V4.md).

**Prévia publicada:** [aegon-institucional-v5.vercel.app](https://aegon-institucional-v5.vercel.app), em um projeto Vercel separado dos domínios existentes.

## Visão

O site conduz a pessoa do problema disperso (“off”) à decisão e à ação (“on”). O símbolo de marca aparece como passagem e comando; azul marca ativação, creme cria pausa editorial e Shadow State sustenta profundidade. Mulish e os SVGs existentes preservam a identidade. A agência cria desejo por meio de cenas e cases; o hub torna legível a união entre as três disciplinas e os conceitos de produto.

### Percurso principal

| Momento | Ideia | Experiência |
| --- | --- | --- |
| Portal | AEGON liga possibilidades | Abertura imersiva com símbolo “on” e aproximação existente. |
| Manifesto | Do automático à intenção | Texto de marca e passagem para Core Pulse. |
| Ponte | Agência + hub numa direção | Segunda aproximação vinculada à narrativa, com convite ao método. |
| Três forças | Estratégia, criação, tecnologia | Camadas alternáveis “off → on” com resultado concreto por pilar. |
| Conceitos | Mostrar antes de prometer | Demonstração guiada em três estados por produto, com dados rotulados como ilustrativos. |
| Acervo | Pensamento aplicado | Case em destaque, lista editorial e modo 3D opcional. |
| Contato | Da curiosidade à conversa | Nome, e-mail e projeto, uma pergunta visível por etapa. |

## Cenas por rota

| Rota | Gesto principal | Continuação |
| --- | --- | --- |
| `/` | Portal + ponte com zoom | Pilares, produtos, acervo e convite final. |
| `/sobre` | Retratos conectados em capítulo humano | Método, equipe e valores. |
| `/solucoes` e detalhes | Alternador das três camadas | Sintomas, entregas e cases relacionados. |
| `/produtos` e detalhes | Demo navegável de cada conceito | Público, módulos e condições demonstrativas. |
| `/portfolio` | Case em foco que responde ao filtro | Lista editorial ou constelação 3D. |
| `/portfolio/:slug` | Aproximação da imagem que conduz ao desafio | Contexto, abordagem, solução, galeria e próximo case. |
| `/insights` e artigo | Capítulo editorial da pergunta | Leitura e acervo. |
| `/carreiras` | Capítulo humano em azul | Cultura e oportunidades ilustrativas. |
| `/contato` | Três perguntas progressivas | Envio confirmado ou erro explícito, com canais diretos. |

## Interação e acessibilidade

- As cenas de zoom por rolagem usam GSAP apenas em telas a partir de 768 px e sem preferência por movimento reduzido. O conteúdo permanece presente e legível depois da revelação.
- Produto e pilar usam botões nativos com `aria-pressed`; a região demonstrativa anuncia a mudança. O contato foca a resposta a cada etapa e informa erros junto ao campo.
- O portfólio editorial continua disponível para quem não usa a constelação 3D. O teclado e a alternativa de movimento reduzido mantêm o percurso principal.
- Em telas menores, as cenas passam para composição vertical; não há pin obrigatório nos novos capítulos.

## Captura de lead

O formulário reúne apenas nome, e-mail e mensagem. CTAs de case, produto e solução levam uma etiqueta `origem` pela URL. O endpoint `/api/leads` valida os dados, usa um campo de proteção simples contra bots e encaminha o texto via Resend. A confirmação só é exibida com resposta positiva do provedor. Sem `RESEND_API_KEY`, `LEAD_FROM_EMAIL` e `LEAD_TO_EMAIL`, a página exibe erro e oferece os canais diretos. O envio real depende de credenciais e endereços fornecidos pela AEGON.

## Conteúdo e limites desta entrega

Os casos, métricas, nomes de clientes, depoimentos, equipe, vagas e produtos desta versão são **mocks para validar a experiência**. Não foram convertidos em alegações de trabalho realizado. Os conceitos de produto aparecem como “em evolução”. As páginas legais são demonstrativas e devem receber texto jurídico e dados da empresa antes da operação comercial. O e-mail e o WhatsApp em configuração também exigem confirmação dos canais reais.

Os PDFs de identidade permanecem apenas na máquina de trabalho porque são grandes; `.gitignore` impede que entrem no commit ou no push. O documento de diagnóstico registra as decisões extraídas deles.

## Verificação

- `npm run build`: TypeScript e Vite compilados com sucesso. O bundle 3D opcional gera aviso de tamanho, sem falha de build.
- `npm run verify:leads`: validação, ausência de configuração, honeypot, entrega simulada e falha do provedor verificados sem enviar e-mail real.
- `npm run verify:assets`: 34 referências de imagens e mídias conferidas no diretório público.
- O servidor local respondeu `200` para `/`, `/contato`, `/portfolio` e para o pattern de marca.
- O deploy Vercel compilou a interface e a função. A URL publicada respondeu `200` nas rotas `/`, `/contato`, `/portfolio` e `/produtos/financeiro`, além do asset de marca. O endpoint retornou `400` para payload inválido e `503` para payload válido sem credenciais, como esperado nesta fase.

A revisão visual automatizada no navegador não ficou disponível nesta sessão porque o controle do Chrome não conseguiu determinar a URL atual com confiança; a entrega não deve ser descrita como validada visualmente em desktop e mobile.

## Próxima fase de conteúdo

1. Trocar mocks por casos autorizados, com fotos, contexto e métricas comprováveis.
2. Definir estágio comercial de cada produto e substituir as demonstrações por interfaces representativas do produto real.
3. Confirmar e-mail, WhatsApp, remetente e destino de leads; configurar o provedor de e-mail.
4. Publicar política de privacidade e termos jurídicos finais.
5. Fazer revisão visual e de usabilidade em desktop e mobile com pessoas da equipe.

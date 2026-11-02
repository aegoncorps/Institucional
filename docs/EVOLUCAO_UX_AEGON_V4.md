# AEGON v4 — diagnóstico de experiência e direção de evolução

**Data da análise:** 2 de novembro de 2026  
**Objetivo desta fase:** construir layout, direção de arte, storytelling e interações com conteúdo demonstrativo. A substituição por dados, clientes e produtos reais fica para uma etapa posterior.

## 1. Parecer executivo

A v4 já tem uma ideia de experiência forte: a abertura pelo símbolo “on”, o zoom do portal, os três pilares em cenas, a faixa horizontal de produtos e a constelação 3D. O problema principal é a **descontinuidade de linguagem**. Depois da abertura, várias páginas retornam ao padrão “hero + parágrafo + grade de cards + CTA”. Há movimento nessas páginas, mas frequentemente é o mesmo movimento aplicado a blocos diferentes. O visitante percebe animação; ainda não percebe uma história própria em cada seção.

A direção recomendada é transformar **“on” em gramática de navegação**: ativar, aproximar, revelar, conectar e concluir. Cada efeito deve ajudar a compreender uma ideia. O site precisa demonstrar simultaneamente duas capacidades: a AEGON como **agência que cria experiências marcantes** e como **hub que conecta estratégia, criação, tecnologia e produtos**. A primeira gera desejo; a segunda dá clareza comercial.

A maior mudança imediata é o contato. O briefing atual exige muitos dados no mesmo quadro. A referência enviada apresenta três perguntas sequenciais — nome, e-mail e projeto — e coloca toda a atenção em uma resposta por vez. Vale levar esse princípio para a v4, mantendo a identidade AEGON e um caminho real de entrega do lead.

## 2. O que os materiais de marca definem

Fontes: [Identidade Visual, 13 páginas](<../dist/assets/brand/Indentidade Visual.pdf>) e [Apresentação de aplicações, 10 páginas](<../dist/assets/brand/Apresentação pra os rapazes (1).pdf>). A leitura combinou texto extraído e inspeção visual de todas as páginas.

| Elemento | Evidência nos PDFs | Tradução para o digital |
| --- | --- | --- |
| Ideia central | “Tudo se resolve no mesmo botão” (manual, p. 2, 6 e 7). O “on” aparece como símbolo, cápsula e padrão repetido. | O “on” deve funcionar como ação e transição, além de marca estática: abrir um case, ativar uma camada, avançar um passo, conectar áreas. |
| Promessa | O manifesto (p. 3) fala em tirar marcas do automático, dar clareza, intenção, presença e lembrança. | A narrativa precisa mostrar a passagem de um problema disperso para uma solução clara. “Transformar” sozinho é genérico; “ativar” é mais proprietário. |
| Logo | A marca em caixa baixa usa VomZom (p. 8). As apresentações mostram versões em azul, branco e preto/creme. | Preservar a silhueta e as proporções do logo. Usar os SVGs existentes para a marca e o glifo, evitando reconstruções tipográficas aproximadas. |
| Tipografia | Mulish é a fonte primária; VomZom serve ao logo (p. 8). | Mulish sustenta interface e texto. Títulos podem ter escala, peso e quebras expressivas sem depender de uma terceira voz tipográfica recorrente. |
| Paleta codificada | Core Pulse `#fff1e4`, Azul System Wake `#0045ba`, Shadow State `#0a2844` (p. 9). | Criar cenas alternando creme, azul e escuro. Reservar o azul para ativação e orientação, não apenas para todo botão. |
| Cores de apoio | Amarelo, laranja, vermelho, azul claro e cinza aparecem como amostras e nas aplicações (p. 2–7, 9), sem uma especificação equivalente às três cores centrais. | Usá-las pontualmente em campanhas, estados ou narrativas de cases. Não transformá-las em uma segunda paleta dominante sem decisão de marca. |
| Fotografia e composição | Retratos humanos, recortes, preto e branco, molduras angulares, módulos editoriais, sobreposições do “on” e pattern (p. 2–7, 10–12; apresentação p. 3–10). | O visual não precisa depender sempre de “espaço/planeta/3D”. Pessoas, contraste editorial e enquadramentos gráficos são parte tão forte da marca quanto o azul. |
| Tom | A marca se apresenta como direta, próxima e voltada a crescimento e direção. | Trocar abstrações repetidas por frases com tensão e consequência: o que estava parado, o que foi ligado e o que muda para o cliente. |

**Leitura estratégica:** o manual é mais humano, claro e editorial do que uma estética exclusivamente “tech espacial”. O portal atual é uma interpretação válida do “on”, mas não deve engolir o restante da identidade. O contraste entre a escala imersiva e os momentos humanos da marca pode ser o diferencial.

## 3. Como a v4 aplica a identidade hoje

| Aspecto | O que já funciona | O que precisa evoluir |
| --- | --- | --- |
| Símbolo e conceito | O [Portal](../src/sections/Portal.tsx), o [Manifesto](../src/sections/Manifesto.tsx) e o [CTA final](../src/sections/FinalCta.tsx) usam o “on” como eixo da experiência. | O símbolo aparece com força na home, mas não estrutura a narrativa das demais rotas. Criar um vocabulário consistente de aproximação, ativação e retorno. |
| Cores | Os três valores oficiais estão definidos no [CSS global](../src/styles/global.css). | A interface opera predominantemente em azul marinho escuro, branco e azul. O Core Pulse, tão presente nos materiais, pode criar pausas luminosas e contraste de ritmo. Cores de apoio devem ganhar papéis claros. |
| Tipografia | Mulish está carregada no [HTML](../index.html), e o logo tem geometria vetorial no [componente](../src/components/Logo.tsx). | A hierarquia de textos internos tende a se repetir. Dar a cada rota uma manchete, uma composição e uma escala próprias. O token `VomZom` no CSS não carrega uma fonte; se usado para texto fora do SVG, cai no fallback. |
| Imagem | Há mídia grande, duotone, máscaras e parallax. | As imagens de produto e case ainda cumprem papel de capa genérica. Precisam de **direção de arte por assunto**: interface em contexto, detalhe, textura, pessoa, protótipo ou resultado. Os mocks são adequados nesta fase para testar esse sistema. |
| Movimento | GSAP, ScrollTrigger, Lenis, zoom, pin e fallback para movimento reduzido já existem. | O [motor global](../src/lib/scrollChoreography.ts) aplica entrada, platô e saída a muitos blocos. Repetir a mesma fórmula reduz surpresa e pode diminuir textos para opacidade 0,08 antes de a leitura terminar. Alguns seletores não correspondem aos componentes atuais, como `.product-catalog-card` versus `.catalog-product-card`. |
| Conversão | CTAs aparecem em vários pontos e há acesso direto ao WhatsApp. | O [Contato](../src/pages/ContactPage.tsx) pede nome, empresa, e-mail, telefone, áreas, investimento e contexto na mesma tela. Ao enviar, abre uma URL do WhatsApp; isso depende de a pessoa completar o envio no outro aplicativo. A v4 precisa de um fluxo de três passos e confirmação verificável. |

O conceito da home está mais avançado do que o das rotas internas. Isso é uma boa base, não um motivo para aumentar a quantidade de efeitos indiscriminadamente. A próxima etapa deve distribuir **cenas memoráveis** ao longo do site e deixar zonas calmas para leitura.

### Um problema visual concreto

O [CTA final](../src/sections/FinalCta.tsx) usa `/assets/media/cta-bg.jpg`, mas esse arquivo não aparece em `public` nem em `dist`. A cena final pode ficar sem sua imagem de fundo. Como ela fecha o percurso, é uma correção de alto impacto antes de refinar a animação.

## 4. Pesquisa de referências

As comparações abaixo vêm dos próprios sites das agências, consultados em 2 de novembro de 2026. São referências de **estrutura de experiência e narrativa**, não receitas visuais para copiar.

| Referência | O que ela faz | Lição aplicável à AEGON |
| --- | --- | --- |
| [Locomotive](https://locomotive.ca/en) e [Work](https://locomotive.ca/en/work) | Define-se rapidamente como agência “digital-first”, destaca poucos trabalhos na entrada e oferece um acervo filtrável com caminho para o case e para o site entregue. | Manter a entrada seletiva e usar o portfólio completo como arquivo navegável. O destaque precisa convidar a entrar no trabalho, não despejar todas as informações na capa. |
| [makemepulse](https://www.makemepulse.com/) e [cases](https://www.makemepulse.com/case-studies/) | Abre com uma promessa curta, mostra projetos distintos, usa showreel e apresenta capacidades em uma seção própria. O [case Sea Shepherd](https://www.makemepulse.com/case-study/no-fishing-net/) explica a mecânica interativa e a ligação dela com o objetivo da campanha. | A experiência deve demonstrar a competência criativa; o case precisa explicar por que o efeito existiu e o que ele tornou mais compreensível. |
| [BASIC/DEPT®](https://www.basicagency.com/) e [case Tempo](https://www.basicagency.com/case-studies/tempo) | Combina reel, seleção de trabalhos e estudo de caso com contexto, foco, direção de arte e resultado da experiência. | Para a AEGON, mostrar um produto ou trabalho em uso vale mais do que uma lista de tecnologias e entregáveis sem demonstração. |

**Padrão observado:** as referências de maior impacto não usam apenas mais animação. Elas editam o acervo, criam uma proposição clara, alternam densidade visual e tornam cada projeto uma história navegável. A inferência para a v4 é que a qualidade do ritmo e da curadoria terá mais efeito do que adicionar zoom a todas as seções.

## 5. Direção criativa proposta: “Do off ao on”

A marca já fornece um arco simples:

1. **Off — tensão:** problema, ruído, dispersão ou oportunidade adormecida.
2. **Acionamento — direção:** a AEGON encontra o ponto certo e une as disciplinas necessárias.
3. **On — demonstração:** marca, operação ou produto aparece em funcionamento.
4. **Expansão — consequência:** o visitante vê possibilidades, prova, desdobramentos e próximo passo.

Esse arco pode ordenar a home e reaparecer em escalas menores nas páginas. A frase do manual, **“Tudo se resolve no mesmo botão”**, pode ser o fio condutor. “Juntos, on.” funciona como assinatura curta; “estratégia, criação e tecnologia” explica as capacidades; “ativar marcas, operações e produtos” aproxima o discurso do modelo agência + hub.

### Gramática visual e de movimento

| Gesto | Uso recomendado | Limite |
| --- | --- | --- |
| **Zoom de entrada** | Abrir uma área a partir de uma forma ou detalhe relevante: cápsula “on”, tela de produto, arte de case, rosto ou dado. | Uma transição principal por rota. Evitar zoom decorativo em toda imagem. |
| **Zoom de descoberta** | Aproximar uma parte de um protótipo ou case para revelar decisão, uso ou mudança de escala. | A aproximação precisa acrescentar informação. |
| **Máscara e enquadramento** | Retomar as molduras angulares, recortes e módulos das peças de marca. | Variar formato e cadência; não aplicar a mesma máscara em todos os cards. |
| **Mudança de estado off → on** | Comparação visual de antes/depois, ligação entre pilares e escolha do próximo passo. | O estado inicial deve continuar legível e navegável. |
| **Parallax e 3D** | Dar profundidade a uma peça autoral, à constelação ou a uma demonstração de produto. | Manter opção editorial clara e equivalência de conteúdo no mobile e em movimento reduzido. |
| **Pausa editorial** | Texto grande em Core Pulse, retratos, detalhes de processo e silêncio visual após cenas intensas. | Pausa não significa página genérica; a composição ainda deve ser própria da marca. |

**Cadência sugerida:** impacto → clareza → participação → prova → respiro → convite. Duas cenas com pin/scroll longo seguidas cansam; uma cena forte seguida de uma seção navegável dá controle ao visitante.

## 6. Proposta por rota

| Rota | Papel na jornada | Cena de impacto proposta | Ajuste de conteúdo e layout |
| --- | --- | --- | --- |
| **Home** | Definir a promessa e abrir caminhos. | Preservar o portal “on”. Inserir uma segunda aproximação ligada a um trabalho ou produto real do acervo demonstrativo, após um respiro em Core Pulse. | Reduzir repetição de CTAs e explicar cedo o binômio agência + hub. Curar 2–3 histórias em destaque; deixar a constelação como exploração opcional. |
| **Quem somos / DNA** | Mostrar quem pensa e como a AEGON trabalha. | Uma composição de retratos e fragmentos que se conectam quando a pessoa avança, inspirada nas páginas 2, 3 e 7 do manual. | Trocar a sequência extensa de grades de valores, processo e equipe por uma narrativa de origem → método → pessoas. Os mocks podem preencher os módulos até a fotografia final. |
| **Soluções** | Tornar as três disciplinas compreensíveis. | O “on” ativa três camadas sobre o mesmo desafio: estratégia revela o diagnóstico, criação dá forma, tecnologia põe em operação. | Cada pilar deve ter resultado visível, exemplo de entregável e um caminho claro ao detalhe. Evitar repetir a mesma ficha descritiva três vezes. |
| **Detalhe de solução** | Ajudar o visitante a se reconhecer no problema. | Uma demonstração curta e específica da área: mapa de diagnóstico, construção de identidade ou sistema em uso. | Sequência: sintoma → decisão → processo → tipo de entrega → projeto relacionado → contato contextual. |
| **Produtos** | Apresentar o hub sem confundir estágio e público. | “Prateleira de experiências”: cada produto abre uma cena própria com uma interação demonstrativa. | Separar visualmente **oferta de consultoria**, **SaaS disponível** e **conceitos em desenvolvimento**. Status e objetivo do CTA devem ser inequívocos; a faixa horizontal da home pode permanecer como teaser. |
| **Detalhe de produto** | Fazer compreender valor antes de listar módulos. | Uma tarefa guiada de 20–40 segundos: o visitante vê entrada, decisão e saída do produto. | Começar por “para quem / o que muda / como se usa”; depois módulos, formatos e perguntas. Para Andresa, o tom visual precisa ser acolhedor e cuidadoso, diferente do SaaS financeiro. |
| **Portfólio** | Demonstrar repertório e permitir descoberta. | Uma entrada editorial com 1 case em grande escala; a constelação vira modo de exploração alternativo. | A grade editorial deve ter capas menos textuais e mais respiro. Filtros continuam úteis; cada card mostra nome, área, uma tensão e um convite para abrir. |
| **Estudo de caso** | Provar raciocínio e execução. | Um zoom atravessa o detalhe que define o projeto — interface, marca, operação ou experiência — e conduz ao problema. | Estrutura: contexto → desafio → escolha estratégica → processo visual → solução em uso → consequência. Usar as métricas mock como placeholders de composição, sem deixar números dominarem antes da história. |
| **Contato** | Converter interesse em conversa. | Três perguntas, uma por tela, com transições “on” e progresso sempre visível. | Ver seção 7. A página deve sentir-se como continuação da experiência, não como painel administrativo. |
| **Insights / Carreiras** | Mostrar pensamento e cultura. | Insights: manchete editorial e leitura progressiva. Carreiras: retratos, bastidores e uma pergunta convidativa. | Podem usar a mesma base de design, mas cada uma precisa de uma composição inicial própria e um gesto de navegação específico. |

### Portfólio: curadoria antes de densidade

A [home](../src/sections/HomeShowcase.tsx) já possui cases com ficha técnica, escopo, métricas, clientes, indicadores e depoimentos. A [página de portfólio](../src/pages/PortfolioPage.tsx) repete muitos desses elementos em cada card e oferece a constelação como segundo modo. Isso cria riqueza de informação, mas a seleção inicial fica densa. Recomendo três níveis:

1. **Vitrine:** imagem/movimento forte, título, área e a pergunta que o projeto resolveu.
2. **Exploração:** filtros, breve descrição e prévia visual.
3. **Case:** raciocínio, processo, artefatos e resultado em uma sequência própria.

Os dados demonstrativos são suficientes para construir e testar essa hierarquia agora. Cada tipo de case deveria ter uma linguagem de arte específica; uma mesma capa com duotone para todos pode fazer trabalhos distintos parecerem intercambiáveis.

### Produtos: mostrar o uso

O [catálogo](../src/pages/ProductsPage.tsx) e os [detalhes](../src/pages/ProductDetailPage.tsx) comunicam quantidade de recursos, público e modelo. Falta uma amostra concreta da experiência. Um visitante deve compreender em poucos segundos o que faz cada produto:

- **Consultoria:** um quadro de “situação atual → decisão → plano acionável”.
- **Financeiro Modular:** uma interação breve que liga um módulo e atualiza uma visão de caixa.
- **Assistente de Compras:** uma lista que compara cenários de compra e mostra a economia estimada.
- **Andresa:** uma conversa simulada e seu resumo para o cuidador, com direção de arte sensível ao tema.

Essas cenas podem usar dados fictícios e protótipos. Elas servem ao storytelling desta fase e poderão receber conteúdo real sem refazer a estrutura.

## 7. Contato: especificação de três perguntas

**Referência verificada:** o site [aegon-com-88qe.vercel.app](https://aegon-com-88qe.vercel.app/) implementa as etapas “Como podemos te chamar?”, “Qual o seu melhor e-mail?” e “Fale sobre o seu projeto”, com uma pergunta isolada por vez. A captura enviada mostra o acerto de foco, escala e progresso. O código consultado termina com um alerta local de sucesso; a v4 deve mostrar sucesso apenas após confirmar o envio.

### Fluxo proposto

| Etapa | Pergunta | Componente | Por quê |
| --- | --- | --- | --- |
| 01 | **Como podemos te chamar?** | Nome, uma linha. | Entrada fácil e pessoal. |
| 02 | **Qual e-mail podemos usar para responder?** | E-mail, uma linha, validação imediata. | Canal de retorno sem exigir telefone e empresa logo de início. |
| 03 | **O que você quer colocar em movimento?** | Campo aberto com exemplo curto; contexto de origem já aparece como etiqueta, se veio de um produto, solução ou case. | Mantém a liberdade da pessoa e fornece contexto comercial. |

**Comportamento:** Enter avança nas duas primeiras etapas; na terceira, Enter insere linha e um botão explícito envia. Há “Voltar”, progresso 1/3 → 2/3 → 3/3, preservação das respostas, foco no título/campo ao avançar, erros próximos ao campo e tela final com próximos passos. O caminho direto por WhatsApp e e-mail permanece visível, mas secundário. Em mobile, o teclado não deve esconder pergunta, progresso ou CTA.

**Captura real:** persistir o lead por um endpoint ou serviço de recebimento, com confirmação de sucesso/erro. A abertura de WhatsApp pode ser oferecida **depois** da confirmação, com resumo pré-preenchido. Assim, o lead não depende da pessoa concluir a ação em outra aba. Informar de forma breve como a AEGON usará o contato e ligar à política de privacidade. A escolha técnica do destino pode ser feita na implementação; o layout não depende dela.

**Direção visual:** a pergunta ocupa o centro da cena, o progresso é uma linha azul que “liga” cada passo, e o símbolo “on” muda de estado entre etapas. Fundo escuro no início, uma passagem luminosa breve em Core Pulse no envio, e resposta final personalizada pelo primeiro nome. Animações curtas (cerca de 300–500 ms), sem pin ou scroll forçado.

## 8. Sistema para dar impacto a todas as páginas

Proponho criar um pequeno **kit de cenas**, não um conjunto maior de cards genéricos:

1. **Abertura de rota:** título e mídia com uma ideia visual exclusiva da página.
2. **Capítulo narrativo:** texto e imagem em proporções editoriais, com mudança clara de escala.
3. **Demonstração:** interação que explica um serviço, produto ou projeto.
4. **Acervo:** lista ou grade para navegação livre, com filtros quando necessários.
5. **Convite contextual:** CTA que retoma o assunto de origem e abre o contato já contextualizado.

Cada rota usa pelo menos uma abertura própria e uma demonstração. Os componentes compartilhados garantem coerência de marca; a combinação e o comportamento variam conforme a história. As transições entre rotas podem usar uma cápsula curta de “on”, mas não devem atrasar a navegação.

### Critérios de qualidade para motion

- Toda animação responde a uma pergunta: **o que foi revelado ou entendido?**
- Texto permanece legível durante o tempo de leitura; evitar reduzir a opacidade de blocos inteiros enquanto ainda estão na viewport.
- Pins têm saída clara, progresso perceptível e alternativa simples em telas menores.
- A constelação 3D tem uma alternativa editorial equivalente, já prevista no projeto.
- `prefers-reduced-motion`, teclado, foco visível e performance móvel são condições de aceite da cena, não ajustes tardios.
- Medir experiência real: tempo até primeira mensagem útil, conclusão do contato, entrada em cases, engajamento com demonstrações e abandono de cenas longas.

## 9. Ordem de execução sugerida

| Prioridade | Trabalho | Entrega verificável |
| --- | --- | --- |
| **P0 — direção** | Consolidar narrativa “Do off ao on”, paleta por função, tipos de cenas, estilo de imagens e hierarquia tipográfica. | Um guia curto de direção de arte e storyboard de home + rotas principais. |
| **P0 — contato** | Substituir o briefing simultâneo pelo fluxo de três perguntas e preparar entrega confirmada do lead. | Protótipo navegável desktop/mobile; envio, erro, retorno e teclado testados. |
| **P1 — consistência** | Corrigir o asset ausente do CTA final, revisar seletores de coreografia e retirar movimentos que prejudiquem leitura. | Home completa com início, meio e fim coerentes; nenhuma mídia quebrada. |
| **P1 — portfólio** | Redesenhar vitrine, grade e estrutura dos cases; manter modo 3D como exploração. | Dois cases demonstrativos com direções de arte diferentes e percurso completo. |
| **P1 — produtos** | Criar a gramática de apresentação e uma demonstração por tipo de oferta. | Catálogo que diferencia status e 1 produto com demo funcional ou protótipo animado. |
| **P2 — rotas internas** | Aplicar abertura própria + demonstração a Sobre, Soluções, detalhes, Insights e Carreiras. | Revisão de todas as rotas em desktop e mobile, sem repetição automática de “hero + cards”. |
| **P2 — refinamento** | Afinar duração, contraste, transições, acessibilidade e carga de mídia. | Revisão de percurso completo, movimento reduzido e medição dos eventos principais. |

### Aceite da evolução

A v4 estará no nível desejado quando alguém conseguir: (1) reconhecer a AEGON nos três primeiros segundos; (2) explicar o que ela faz como agência e hub após a home; (3) lembrar de pelo menos um case e um produto por sua demonstração; (4) navegar por qualquer rota sem queda perceptível de qualidade visual; e (5) concluir o contato em três respostas, com confirmação real.

## 10. Escopo e limites desta análise

Foram revisados os dois PDFs completos, a estrutura e os principais componentes React/CSS da v4, a captura fornecida e o código público do fluxo de referência, além dos sites oficiais listados na pesquisa. Os comentários sobre a implementação local são sustentados pelo código; uma avaliação visual quadro a quadro do site v4 em execução e testes de usabilidade ainda devem acompanhar o redesenho. O conteúdo mock foi tratado como **insumo intencional de projeto**.

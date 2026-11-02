# Changelog — AEGON v4 (Portal Zoom-Screen & Experiência Espacial)

Todas as alterações notáveis deste projeto estão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/).

---

## [4.0.2] - 2026-11-01 (Versão Estável - Foco em Zoom-Screen & Cards Sobrepostos à Esquerda)

### 🌟 Destaques desta Atualização
- **Produtos & Consultoria em Stacking Cards na Lateral Esquerda**:
  - Restaura a posição lateral original da sidebar (título `O que a Aegon liga no seu negócio`, subtítulo e contador à esquerda).
  - O primeiro card inicia posicionado ao lado do título; ao iniciar a rolagem, desliza suavemente para a esquerda sobrepondo o título da sidebar.
  - Conforme o usuário continua rolando a página (`scrub`), cada card seguinte (Gestão Financeira, Assistente de Compras, Projeto Andresa, Sob Medida) chega da direita e **empilha diretamente por cima do anterior na lateral esquerda** como um baralho.
  - Cada card empilhado reduz suavemente de escala (`scale: 0.95 -> 0.89 -> 0.85`), recua lateralmente em cascata (`x: -18px, -34px, -48px`) e atenua sua luminosidade, criando profundidade visual e sensação tátil de sobreposição física.
  - O contador numérico `01 / 05` e a barra de progresso no rodapé atualizam dinamicamente a cada card que assume o topo da pilha.

- **Tela Inicial Estática & Foco 100% no Zoom-Screen**:
  - Logo estática, limpa e elegante no centro da tela inicial (sem tilt 3D ou distração com mouse).
  - Planeta 3D (`world.mp4`) cravado com precisão métrica dentro da cápsula do switch "on".
  - Abertura de portal em estádio contínuo 100% arredondado (`round 9999px`) acionada pelo scroll.

### 🎨 Identidade Visual Oficial (v1 e v2)
- Tipografia primária: **Mulish** (`weights: 300, 400, 500, 600, 700, 800`).
- Tipografia de marca e glifo do switch: **VomZom** oficial com curvas métricas exatas.
- Paleta cromática oficial: **Core Pulse** (`#FFF1E4`), **Azul System Wake** (`#0045BA`), **Shadow State** (`#0A2844`), **Dark Space** (`#020B1F`).
- Headline do hero: `"Um novo capítulo. Juntos, on."` integrando o componente oficial `<OnBrandPill />`.

### 🚀 Funcionalidades Principais
- **Portal Zoom-Screen (Hero)**: Alinhamento preciso do planeta dentro do "on" e transição contínua para tela cheia ao rolar.
- **Stacking Cards de Produtos à Esquerda**: Cartões que chegam da direita e se sobrepõem na lateral esquerda cobrindo o título com efeito baralho.
- **Portfólio 3D em Constelação (Three.js)**: Navegação espacial interativa com zoom cinematográfico de câmera.
- **Custom Cursor v2**: Cursor duplo (anel suave + ponto ágil em Azul Wake) com expansão em elementos interativos.

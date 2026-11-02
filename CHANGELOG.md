# Changelog — AEGON v4 (Portal Zoom-Screen & Experiência Espacial)

Todas as alterações notáveis deste projeto estão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/).

---

## [4.0.2] - 2026-11-01 (Versão Estável - Foco em Zoom-Screen & Cards Sobrepostos)

### 🌟 Destaques desta Atualização
- **Produtos & Consultoria em Cartões Sobrepostos (Stacking Cards)**:
  - O bloco de texto e cabeçalho agora repousa no topo da seção (`em cima`), com eyebrow, título principal, subtítulo, contador dinâmico e pills navegáveis.
  - Conforme o usuário rola a página (`scrub`), os cards sobem do fundo e **se sobrepõem um por cima do outro** como um baralho, com efeito de profundidade, escala reduzida nos cartões inferiores (`scale: 0.95 -> 0.90 -> 0.85`), recuo vertical e sombra projetada profunda.
  - Layout horizontal moderno (imagem e badges à esquerda, especificações e botões de ação à direita).
  - Empilhamento sticky nativo no mobile para garantir performance e navegação tátil fluida.

- **Tela Inicial Estática & Foco 100% no Zoom-Screen**:
  - Logo estável e elegante no centro da tela inicial (sem tilt 3D ou distração com mouse).
  - O planeta 3D (`world.mp4`) permanece perfeitamente alinhado dentro do "on".
  - A abertura em estádio 100% arredondado (`round 9999px`) é acionada exclusivamente pela rolagem (scroll do usuário).

### 🎨 Identidade Visual Oficial (v1 e v2)
- Tipografia primária: **Mulish** (`weights: 300, 400, 500, 600, 700, 800`).
- Tipografia de marca e glifo do switch: **VomZom** oficial com curvas métricas exatas.
- Paleta cromática oficial: **Core Pulse** (`#FFF1E4`), **Azul System Wake** (`#0045BA`), **Shadow State** (`#0A2844`), **Dark Space** (`#020B1F`).
- Headline do hero: `"Um novo capítulo. Juntos, on."` integrando o componente oficial `<OnBrandPill />`.

### 🚀 Funcionalidades Principais
- **Portal Zoom-Screen (Hero)**: Alinhamento preciso do planeta dentro do "on" e transição contínua para tela cheia ao rolar.
- **Stacking Cards de Produtos**: Cartões que sobem e se sobrepõem com profundidade espacial e gaveta de detalhes completos.
- **Portfólio 3D em Constelação (Three.js)**: Navegação espacial interativa com zoom cinematográfico de câmera.
- **Custom Cursor v2**: Cursor duplo (anel suave + ponto ágil em Azul Wake) com expansão em elementos interativos.

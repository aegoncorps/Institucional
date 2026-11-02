# Changelog — AEGON v4 (Portal Zoom-Screen & Experiência Espacial)

Todas as alterações notáveis deste projeto estão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/).

---

## [4.0.4] - 2026-11-01 (Atual)

### 🌟 Adicionado
- **Efeito Antigravidade 3D (Zero-G Float)**:
  - Sistema de perspectiva espacial (`perspective: 1200px`) com inclinação e rotação 3D responsiva ao mouse (`rotateY: nx * 18deg`, `rotateX: -ny * 14deg`, `translateZ: 20px`, `x: nx * 36px`, `y: ny * 24px`).
  - Animação de flutuação contínua e peso zero (`.portal__logo-zerog` com keyframe `zeroGFloat` senoidal de 5.2s), mantendo a logo levitando no espaço profundo mesmo com o mouse em repouso.
  - Componente `<AntigravityDust />`: campo de 70 partículas de poeira espacial suspensas em gravidade zero que reagem com paralaxe de profundidade ($Z$) e movimento orbital suave ao cursor.
- **Luz Azul Viva de DENTRO da Logo**:
  - Novo recorte vetorial `<clipPath id="switch-clip">` que restringe a iluminação dinamicamente ao interior da cápsula azul e ao círculo interno do "g".
  - Feixe volumétrico interno (`innerLightEl`) com gradiente radial de alta saturação e difusão por filtro SVG.
  - Ponto focal especular brilhante (`innerSpecularEl`) com `mix-blend-mode: screen`.
  - Mapeamento cinemático das coordenadas do mouse diretamente na geometria da logo: ao deslocar o mouse para a esquerda, o feixe desliza para o olho da letra "g" (`x = 141`); ao mover para a direita, varre os contornos do switch "on".
- **Custom Cursor Idêntico ao da v2 (`aegon-spa`)**:
  - Ocultação global do cursor nativo do sistema operacional (`cursor: none !important`) para ponteiros finos/desktop.
  - Anel externo de 32px (`border: 1px solid rgba(255, 255, 255, 0.5)`) com trail amortecido por inércia física GSAP (`duration: 0.6, ease: 'power3.out'`).
  - Ponto central ágil de 4px em **Azul System Wake** (`#0045ba` / `#0057ff`) com glow e tracking instantâneo (`duration: 0.1`).
  - Efeito hover expansivo (`scale: 2.0`, fundo `rgba(0, 87, 255, 0.2)` e borda `#0057ff`) ao sobrevoar qualquer elemento interativo, link, botão ou pill.
  - Reação de clique elástico (`scale: 0.8` no mousedown).

---

## [4.0.2] - 2026-11-01

### 🌟 Adicionado
- **Integração das Regras Oficiais de Identidade Visual (v1 e v2)**:
  - Tipografia primária definida em **Mulish** (`weights: 300, 400, 500, 600, 700, 800`).
  - Tipografia de marca e glifo especial "on" vetorizado com fidelidade métrica da fonte **VomZom** (caixa baixa, círculos puros de 41px de raio e haste aberta do "n").
  - Paleta cromática oficial: **Core Pulse** (`#FFF1E4`), **Azul System Wake** (`#0045BA`), **Shadow State** (`#0A2844`), **Dark Space** (`#020B1F`) e acentos secundários.
  - Headline do hero: `"Um novo capítulo. Juntos, on."` integrando o componente oficial `<OnBrandPill />`.
- **Portal Zoom-Screen GTA VI (Hero)**:
  - Janela de observação centralizada na cápsula do "on".
  - Alinhamento submétrico do planeta 3D (`world.mp4`), compensando o centro luminoso do vídeo (43.5% X / 50% Y) para casar perfeitamente com a janela do "on".
  - Transição de abertura 100% arredondada (`pillClipString` mantendo curvatura de estádio contínua `round 9999px` sem cantos retos durante todo o scrub).
- **Rolagem Lateral de Produtos (Estilo Dexa)**:
  - Pinned scroll horizontal com cartões dos 4 produtos de ponta (Consultoria PN, Gestão Financeira Modular, Assistente de Compras, Projeto Andresa).
  - Parallax de camadas, contador dinâmico e gaveta lateral de especificações técnicas.
- **Portfólio 3D em Constelação (Three.js / React Three Fiber)**:
  - Galeria espacial com hubs de categoria (Branding, Sistemas, Design, Consultoria) e zoom cinematográfico de câmera ao clicar.
- **Micro-interações e Polish**:
  - Lenis smooth scroll a 120fps integrado ao GSAP ScrollTrigger.
  - Fechamento reverso no CTA final reintegrando a marca ao switch do WhatsApp.

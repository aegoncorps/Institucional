# Changelog — AEGON v4 (Portal Zoom-Screen & Experiência Espacial)

Todas as alterações notáveis deste projeto estão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/).

---

## [4.0.2] - 2026-11-01 (Versão Estável - Foco em Zoom-Screen Puro)

### 🌟 Destaques
- **Tela Inicial Estática & Foco 100% no Zoom-Screen**:
  - Removidas animações de movimento com o mouse na tela inicial (sem tilt 3D, sem deslocamento da luz azul interna e sem partículas).
  - A logo repousa estática, limpa e com elegância máxima no centro da tela.
  - O planeta 3D (`world.mp4`) permanece milimetricamente alinhado dentro do "on".
  - A abertura em estádio 100% arredondado (`round 9999px`) é acionada exclusivamente pela rolagem (scroll do usuário).

### 🎨 Identidade Visual Oficial (v1 e v2)
- Tipografia primária: **Mulish** (`weights: 300, 400, 500, 600, 700, 800`).
- Tipografia de marca e glifo do switch: **VomZom** oficial com curvas métricas exatas.
- Paleta cromática oficial: **Core Pulse** (`#FFF1E4`), **Azul System Wake** (`#0045BA`), **Shadow State** (`#0A2844`), **Dark Space** (`#020B1F`).
- Headline do hero: `"Um novo capítulo. Juntos, on."` integrando o componente oficial `<OnBrandPill />`.

### 🚀 Funcionalidades Principais
- **Portal Zoom-Screen (Hero)**: Alinhamento preciso do planeta dentro do "on" e transição para tela cheia ao rolar.
- **Rolagem Lateral de Produtos (Estilo Dexa)**: Scroll horizontal suave com parallax e especificações técnicas.
- **Portfólio 3D em Constelação (Three.js)**: Navegação espacial interativa com zoom cinematográfico de câmera.
- **Custom Cursor v2**: Cursor duplo (anel suave + ponto ágil em Azul Wake) com expansão em elementos interativos.

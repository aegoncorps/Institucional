# Aegon v4 — Site Institucional Público

Experiência imersiva focada em **zoom-screen (Portal "on")**, **rolagem lateral de produtos** e **portfólio 3D em constelação**.

## Como rodar localmente

```bash
cd /Users/emanuelsantossouzadejesus/dev_emanuel/aegon.com/v4
npm run dev
```

Para validar tipos e gerar a versão de produção:

```bash
npm run build
npm run preview
```

## O que ajustar antes de publicar

1. **Número do WhatsApp**: edite `WHATSAPP_NUMBER` em [`src/config.ts`](./src/config.ts).
2. **Cases reais do portfólio**: edite a lista `cases` em [`src/data/content.ts`](./src/data/content.ts) e coloque as imagens em `public/assets/img/3d/`.
3. **Artes finais**: substitua os arquivos em `public/assets/img/` e o vídeo `public/assets/video/world.mp4` mantendo os mesmos nomes (ou ajuste os caminhos em `src/data/content.ts`).


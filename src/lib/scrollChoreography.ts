import { gsap, prefersReducedMotion, ScrollTrigger } from './motion'

/**
 * Motor Global de Coreografia de Scroll (Entrada + Platô de Leitura + Saída).
 *
 * Faz com que cada seção do site se construa progressivamente conforme o usuário
 * desce a página (scroll down) e se desconstrua/transicione suavemente ao sair
 * pelo topo da viewport — mantendo o mesmo padrão cinético das 2 primeiras telas.
 */
export function mountScrollChoreography(scope: HTMLElement | Document = document): () => void {
  if (prefersReducedMotion()) {
    return () => {}
  }

  const ctx = gsap.context(() => {
    // 1. Linhas divisórias arquitetônicas (desenham da esquerda p/ direita na entrada e recolhem na saída)
    const lines = gsap.utils.toArray<HTMLElement>(
      '[data-scroll-line], .editorial-rule',
      scope
    )

    lines.forEach((line) => {
      gsap.set(line, { scaleX: 0, opacity: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: 'top 94%',
          end: 'bottom 6%',
          scrub: 0.5,
        },
      })

      tl.to(line, {
        scaleX: 1,
        opacity: 1,
        duration: 0.32,
        ease: 'power2.out',
      })
        .to(line, {
          scaleX: 1,
          opacity: 1,
          duration: 0.44,
          ease: 'none',
        })
        .to(line, {
          scaleX: 0.25,
          opacity: 0.15,
          transformOrigin: 'right center',
          duration: 0.24,
          ease: 'power2.in',
        })
    })

    // 2. Mídias & Imagens Editoriais (máscara clip-path + parallax interno na entrada e saída)
    const mediaBlocks = gsap.utils.toArray<HTMLElement>(
      '[data-scroll-media], .editorial-case__media, .page-hero__media, .about-origin__media, .portfolio-showcase-card__media, .case-hero__cover, .solution-pillar-block__media, .product-catalog-card__media',
      scope
    )

    mediaBlocks.forEach((media) => {
      const img = media.querySelector('img')
      gsap.set(media, {
        clipPath: 'inset(12% 7% 12% 7% round 20px)',
        opacity: 0.15,
        y: 44,
      })
      if (img) {
        gsap.set(img, { scale: 1.16, yPercent: -5 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: media,
          start: 'top 95%',
          end: 'bottom 4%',
          scrub: 0.65,
        },
      })

      // Entrada: abre a máscara e assenta no lugar
      tl.to(
        media,
        {
          clipPath: 'inset(0% 0% 0% 0% round 20px)',
          opacity: 1,
          y: 0,
          duration: 0.34,
          ease: 'power3.out',
        },
        0
      )
        // Platô de leitura
        .to(
          media,
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'none',
          },
          0.34
        )
        // Saída: fecha suavemente a máscara e sobe
        .to(
          media,
          {
            clipPath: 'inset(8% 4% 8% 4% round 20px)',
            opacity: 0.12,
            y: -42,
            duration: 0.26,
            ease: 'power2.in',
          },
          0.74
        )

      if (img) {
        tl.to(
          img,
          {
            scale: 1,
            yPercent: 5,
            duration: 1,
            ease: 'none',
          },
          0
        )
      }
    })

    // 3. Blocos Individuais de Revelação + Saída (Títulos, Cabeçalhos, Textos, Cards Editoriais)
    const revealBlocks = gsap.utils.toArray<HTMLElement>(
      [
        '[data-scroll-reveal]',
        '.page-hero__copy',
        '.section-header',
        '.about-origin__copy',
        '.portfolio-showcase-card__body',
        '.solution-pillar-block__copy',
        '.product-catalog-card__body',
        '.page-cta-band__inner',
        '.site-footer__grid',
      ].join(', '),
      scope
    )

    revealBlocks.forEach((block) => {
      const fromX = Number(block.dataset.scrollX || 0)
      const fromY = Number(block.dataset.scrollY || 46)

      gsap.set(block, {
        x: fromX,
        y: fromY,
        opacity: 0,
        scale: 0.975,
        willChange: 'transform, opacity',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 95%',
          end: 'bottom 5%',
          scrub: 0.6,
        },
      })

      // Fase 1: Entrada (constrói ao descer)
      tl.to(block, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.32,
        ease: 'power3.out',
      })
        // Fase 2: Platô central (leitura nítida)
        .to(block, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.42,
          ease: 'none',
        })
        // Fase 3: Saída pelo topo (desconstrói ao continuar descendo)
        .to(block, {
          x: fromX * -0.35,
          y: -40,
          opacity: 0.08,
          scale: 0.97,
          duration: 0.26,
          ease: 'power2.in',
        })
    })

    // 4. Grupos em Cascata (Staggered Grids: métricas, entregas, valores, etapas, equipe, depoimentos)
    const staggerGroups = gsap.utils.toArray<HTMLElement>(
      [
        '[data-scroll-stagger]',
        '.values-grid',
        '.process-grid',
        '.team-grid',
        '.insights-grid',
        '.case-results-grid',
        '.case-narrative-grid',
        '.contact-channels',
      ].join(', '),
      scope
    )

    staggerGroups.forEach((group) => {
      const items = Array.from(group.children) as HTMLElement[]
      if (!items.length) return

      gsap.set(items, {
        y: 44,
        opacity: 0,
        scale: 0.965,
        willChange: 'transform, opacity',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: 'top 94%',
          end: 'bottom 6%',
          scrub: 0.65,
        },
      })

      // Entrada em cascata
      tl.to(items, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.06,
        duration: 0.34,
        ease: 'power3.out',
      })
        // Platô de leitura
        .to(items, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.38,
          ease: 'none',
        })
        // Saída em cascata conforme sobe para fora da tela
        .to(items, {
          y: -36,
          opacity: 0.08,
          scale: 0.97,
          stagger: 0.04,
          duration: 0.28,
          ease: 'power2.in',
        })
    })

    ScrollTrigger.refresh()
  }, scope)

  return () => ctx.revert()
}

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/motion'
import { pillars } from '../data/content'

/**
 * Ato 3 — Três pilares em "zoom-through":
 * cada cena dá zoom-in e se funde com a próxima (como os personagens do site do GTA VI).
 */
export function Pillars() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scenes = gsap.utils.toArray<HTMLElement>('.pillar-scene')
        const copies = gsap.utils.toArray<HTMLElement>('.pillar-copy')
        const n = scenes.length

        gsap.set(scenes.slice(1), { opacity: 0 })
        gsap.set(copies.slice(1), { opacity: 0, y: 50 })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: `+=${n * 100}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
          },
        })

        scenes.forEach((scene, i) => {
          const img = scene.querySelector('img')
          const at = i
          // zoom lento contínuo durante a cena
          tl.fromTo(img, { scale: i === 0 ? 1.08 : 1.22 }, { scale: 1.32, duration: 1.15 }, at === 0 ? 0 : at - 0.15)
          if (i < n - 1) {
            const next = scenes[i + 1]
            // transição: a cena atual "atravessa" a câmera e a próxima surge
            tl.to(scene, { opacity: 0, duration: 0.3 }, at + 0.7)
              .to(next, { opacity: 1, duration: 0.3 }, at + 0.7)
              .to(copies[i], { opacity: 0, y: -50, duration: 0.2 }, at + 0.65)
              .to(copies[i + 1], { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, at + 0.85)
          }
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="pillars" id="solucoes" ref={root} aria-label="Soluções">
      <div className="pillars__scenes" aria-hidden="true">
        {pillars.map((p) => (
          <div className="pillar-scene" key={p.id}>
            <img src={p.image} alt="" loading="lazy" decoding="async" />
            <div className="duotone" />
          </div>
        ))}
      </div>

      <div className="pillars__copy container">
        <p className="eyebrow">O que fazemos</p>
        <div className="pillars__stack">
          {pillars.map((p) => (
            <article className="pillar-copy" key={p.id}>
              <span className="pillar-copy__number">{p.number}</span>
              <div>
                <p className="pillar-copy__kicker">{p.kicker}</p>
                <h2>{p.title}</h2>
                <p className="pillar-copy__text">{p.text}</p>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ol className="pillars__dots" aria-hidden="true">
        {pillars.map((p, i) => (
          <li key={p.id} className={i === active ? 'is-active' : ''}>
            <span>{p.number}</span> {p.kicker}
          </li>
        ))}
      </ol>
    </section>
  )
}


import { usePageMeta } from '../lib/seo'
import { Portal } from '../sections/Portal'
import { Manifesto } from '../sections/Manifesto'
import { Pillars } from '../sections/Pillars'
import { Products } from '../sections/Products'
import { HomeShowcase } from '../sections/HomeShowcase'
import { FinalCta } from '../sections/FinalCta'
import { ActivationBridge } from '../components/ExperienceScenes'

export function HomePage() {
  usePageMeta({
    title: 'Aegon — Tecnologia, Criatividade e Soluções Digitais',
    description:
      'Estratégia, criação e tecnologia para transformar ideias em soluções digitais que funcionam de verdade.',
  })

  return (
    <>
      <Portal />
      <div id="conteudo">
        <Manifesto />
        <ActivationBridge />
        <Pillars />
        <Products />
        <HomeShowcase />
        <FinalCta />
      </div>
    </>
  )
}


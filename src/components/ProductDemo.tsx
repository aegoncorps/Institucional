import { useState } from 'react'
import { Link } from 'react-router'
import { products } from '../data/content'
import { ArrowRight } from './Icons'
import { OnBrandSymbol } from './Logo'

const choices: Record<string, string[]> = {
  consultoria: ['Diagnóstico', 'Prioridades', 'Plano em movimento'],
  financeiro: ['Visão geral', 'Compras', 'Fluxo de caixa'],
  compras: ['Mercado próximo', 'Menor preço', 'Melhor rota'],
  andresa: ['Conversa', 'Resumo', 'Cuidado compartilhado'],
}

const demoContent: Record<string, { title: string; body: string; metric: string }[]> = {
  consultoria: [
    { title: 'Entender antes de agir', body: 'A operação, a marca e o caixa entram no mesmo mapa. O primeiro passo é enxergar onde a energia se perde.', metric: '01 / clareza' },
    { title: 'Escolher o que importa', body: 'Cada oportunidade recebe impacto, esforço e responsável. O time sabe o que fazer primeiro.', metric: '02 / direção' },
    { title: 'Tirar do papel', body: 'O plano vira ciclos curtos de execução, revisão e aprendizado. A mudança acontece no dia a dia.', metric: '03 / ação' },
  ],
  financeiro: [
    { title: 'Tudo em uma visão', body: 'Entradas, saídas e compromissos futuros reunidos para uma decisão mais tranquila.', metric: 'R$ 42,8 mil / saldo simulado' },
    { title: 'Aprovação sem ruído', body: 'Um pedido de compra segue para a pessoa certa com contexto, limite e histórico.', metric: '03 / pedidos em análise' },
    { title: 'Antecipar o próximo mês', body: 'O fluxo previsto mostra o que muda antes que a decisão chegue ao caixa.', metric: '+18% / projeção simulada' },
  ],
  compras: [
    { title: 'Sua lista, seu bairro', body: 'Os itens recorrentes e as preferências formam o ponto de partida da comparação.', metric: '12 / itens na lista' },
    { title: 'Compare o total', body: 'A melhor compra considera o custo da lista inteira, não o preço isolado de uma oferta.', metric: 'R$ 38 / economia simulada' },
    { title: 'Escolha o caminho', body: 'Distância, tempo e preço entram na mesma decisão, de um jeito fácil de entender.', metric: '2,4 km / rota simulada' },
  ],
  andresa: [
    { title: 'Uma conversa com calma', body: 'Uma interface de voz respeita o ritmo de cada pessoa e ajuda a manter a conexão.', metric: 'Voz / interface principal' },
    { title: 'O que importa, com cuidado', body: 'Um resumo simples ajuda o familiar a acompanhar assuntos e necessidades do dia.', metric: '01 / resumo ilustrativo' },
    { title: 'Mais gente no mesmo cuidado', body: 'Informações autorizadas podem aproximar família e cuidadores na rotina.', metric: 'Rede / apoio compartilhado' },
  ],
}

export function ProductDemo({ productId, showSwitcher = false }: { productId: string; showSwitcher?: boolean }) {
  const [selectedProduct, setSelectedProduct] = useState(productId)
  const [step, setStep] = useState(0)
  const product = products.find((item) => item.id === selectedProduct) ?? products[0]
  const options = choices[product.id]
  const content = demoContent[product.id][step]

  const selectProduct = (id: string) => {
    setSelectedProduct(id)
    setStep(0)
  }

  return (
    <section className={`v5-demo v5-demo--${product.id}`} aria-labelledby="v5-demo-title">
      <div className="container">
        <div className="v5-demo__header">
          <div><p className="eyebrow">Experimente a ideia / dados demonstrativos</p><h2 id="v5-demo-title">Veja o que muda quando <em>ligamos</em> a solução.</h2></div>
          <span className="v5-demo__symbol" aria-hidden="true"><OnBrandSymbol /></span>
        </div>
        {showSwitcher && <div className="v5-demo__products" role="group" aria-label="Escolha um produto para explorar">
          {products.map((item) => <button key={item.id} type="button" aria-pressed={item.id === product.id}
            className={item.id === product.id ? 'is-active' : ''} onClick={() => selectProduct(item.id)}>{item.name}</button>)}
        </div>}
        <div className="v5-demo__stage" role="region" aria-live="polite" aria-label={`Demonstração de ${product.name}`}>
          <div className="v5-demo__visual" key={product.id + step}>
            <div className="v5-demo__visual-top"><span>AEGON / {product.category}</span><span>0{step + 1} / 03</span></div>
            <div className="v5-demo__visual-center">
              <span className="v5-demo__metric">{content.metric}</span>
              <div className="v5-demo__bars" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <span className="v5-demo__visual-caption">{options[step]}</span>
            </div>
            <div className="v5-demo__visual-bottom"><span>Protótipo de narrativa</span><span className="v5-demo__live-dot" /> Em movimento</div>
          </div>
          <div className="v5-demo__copy">
            <p className="v5-demo__product-name">{product.name} <span>Conceito demonstrativo</span></p>
            <h3>{content.title}</h3>
            <p>{content.body}</p>
            <div className="v5-demo__steps" role="group" aria-label="Etapas da demonstração">
              {options.map((option, index) => <button type="button" key={option} aria-pressed={step === index}
                className={step === index ? 'is-active' : ''} onClick={() => setStep(index)}><span>0{index + 1}</span>{option}</button>)}
            </div>
            <Link className="v5-demo__link interactive" to={`/produtos/${product.id}`}>Conhecer a solução <ArrowRight size={17} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

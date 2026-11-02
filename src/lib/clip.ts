export type Box = { top: number; right: number; bottom: number; left: number; radius: number }

export const FULL_BOX: Box = { top: 0, right: 0, bottom: 0, left: 0, radius: 0 }

export type PillGeometry = {
  cx: number
  cy: number
  w0: number
  h0: number
  maxRadius: number
  targetW: number
  targetH: number
}

/**
 * Calcula a geometria necessária para que uma pílula/cápsula expanda a partir
 * do seu centro mantendo as bordas 100% redondas (formato de cápsula contínua),
 * até cobrir completamente todos os cantos da tela sem cantos retos/quadrados.
 */
export function getPillGeometry(el: HTMLElement, container: HTMLElement): PillGeometry {
  const r = el.getBoundingClientRect()
  const c = container.getBoundingClientRect()

  const cx = r.left + r.width / 2 - c.left
  const cy = r.top + r.height / 2 - c.top
  const w0 = Math.max(1, r.width)
  const h0 = Math.max(1, r.height)

  const W = c.width
  const H = c.height

  // Distância máxima do centro da pílula até os 4 cantos da tela
  const d1 = Math.hypot(cx, cy)
  const d2 = Math.hypot(W - cx, cy)
  const d3 = Math.hypot(cx, H - cy)
  const d4 = Math.hypot(W - cx, H - cy)
  const maxD = Math.max(d1, d2, d3, d4)

  // Raio final com folga para que a curva redonda passe por fora dos cantos da tela
  const maxRadius = maxD * 1.15
  const aspect = Math.max(1.1, w0 / h0)
  const targetH = maxRadius * 2
  const targetW = targetH * aspect

  return {
    cx,
    cy,
    w0,
    h0,
    maxRadius,
    targetW,
    targetH,
  }
}

/**
 * Gera a string de `clip-path: inset(...)` mantendo SEMPRE o formato de pílula
 * com bordas arredondadas (stadium/capsule), sem nenhum canto quadrado durante o puxar.
 */
export function pillClipString(geom: PillGeometry, container: HTMLElement, progress: number): string {
  if (progress >= 1) return 'none'

  const c = container.getBoundingClientRect()
  const p = Math.max(0, Math.min(1, progress))

  // Interpolação de largura e altura
  const w = geom.w0 + (geom.targetW - geom.w0) * p
  const h = geom.h0 + (geom.targetH - geom.h0) * p

  const top = geom.cy - h / 2
  const bottom = c.height - (geom.cy + h / 2)
  const left = geom.cx - w / 2
  const right = c.width - (geom.cx + w / 2)

  // Raio sempre igual à metade da altura (cápsula 100% redonda)
  const radius = Math.min(w, h) / 2

  return `inset(${top.toFixed(2)}px ${right.toFixed(2)}px ${bottom.toFixed(2)}px ${left.toFixed(2)}px round ${radius.toFixed(2)}px)`
}

/**
 * Calcula a posição e o offset do vídeo para que o planeta fique
 * perfeitamente alinhado e centralizado dentro da pílula do "on".
 *
 * O planeta no vídeo original (1280x720) tem o centro da sua esfera
 * iluminada em torno de 43.5% da largura e 50% da altura.
 */
export function getPlanetOffset(
  pillEl: HTMLElement,
  stageEl: HTMLElement,
  scale: number = 1.55,
): { x: number; y: number; scale: number } {
  const pillRect = pillEl.getBoundingClientRect()
  const stageRect = stageEl.getBoundingClientRect()

  const pillCenterX = pillRect.left + pillRect.width / 2 - stageRect.left
  const pillCenterY = pillRect.top + pillRect.height / 2 - stageRect.top

  const W = stageRect.width
  const H = stageRect.height
  const stageCenterX = W / 2
  const stageCenterY = H / 2

  const videoAspect = 1280 / 720
  let renderW = W
  let renderH = H
  let videoLeft = 0
  let videoTop = 0

  if (W / H > videoAspect) {
    renderW = W
    renderH = W / videoAspect
    videoTop = (H - renderH) / 2
  } else {
    renderH = H
    renderW = H * videoAspect
    videoLeft = (W - renderW) / 2
  }

  // Ponto central do planeta dentro do vídeo renderizado na tela
  const planetCenterX = videoLeft + renderW * 0.435
  const planetCenterY = videoTop + renderH * 0.5

  // Deslocamento necessário para que o planeta caia exatamente no centro da pílula
  const tx = pillCenterX - stageCenterX - (planetCenterX - stageCenterX) * scale
  const ty = pillCenterY - stageCenterY - (planetCenterY - stageCenterY) * scale

  return {
    x: tx,
    y: ty,
    scale,
  }
}

/** Mede a posição de `el` relativa a `container` como insets (compatibilidade). */
export function boxFromElement(el: HTMLElement, container: HTMLElement): Box {
  const r = el.getBoundingClientRect()
  const c = container.getBoundingClientRect()
  return {
    top: r.top - c.top,
    left: r.left - c.left,
    right: c.right - r.right,
    bottom: c.bottom - r.bottom,
    radius: r.height / 2,
  }
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function lerpBox(a: Box, b: Box, t: number): Box {
  return {
    top: lerp(a.top, b.top, t),
    right: lerp(a.right, b.right, t),
    bottom: lerp(a.bottom, b.bottom, t),
    left: lerp(a.left, b.left, t),
    radius: lerp(a.radius, b.radius, t),
  }
}

export const clipString = (b: Box): string =>
  `inset(${b.top.toFixed(2)}px ${b.right.toFixed(2)}px ${b.bottom.toFixed(2)}px ${b.left.toFixed(2)}px round ${b.radius.toFixed(2)}px)`

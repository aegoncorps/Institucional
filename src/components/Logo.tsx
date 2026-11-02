import { forwardRef, useId } from 'react'

/** Caminhos vetoriais exatos da logo completa do projeto aegon-spa (viewBox 36 22 198 62). */
export const LOGO_PATHS = {
  a: 'M58 25 A19 19 0 1 0 58 63 C62.2 63 65.8 61.5 68.5 59.2 V62.5 H77 V25.5 H68.5 V28.8 C65.8 26.5 62.2 25 58 25 Z M58 34.8 A9.2 9.2 0 1 1 58 53.2 A9.2 9.2 0 1 1 58 34.8 Z',
  e: 'M100 25 C89.5 25 81 33.5 81 44 C81 54.5 89.5 63 100 63 C107.4 63 113.8 59.1 117 53.2 H106.8 C105 54.6 102.6 55.4 100 55.4 C94.4 55.4 89.8 51.5 89.1 46.2 H118.8 C119 45.4 119 44.6 119 43.8 C119 33.4 110.5 25 100 25 Z M90.5 39.2 C91.8 35.1 95.5 32.2 100 32.2 C104.5 32.2 108.2 35.1 109.5 39.2 H90.5 Z',
  g: 'M141 25 A19 19 0 1 0 141 63 C144.6 63 147.8 62 150.2 60.2 V63.8 C150.2 69 146.8 72.2 141 72.2 V81 C152.6 81 160 74.4 160 63.8 V25.5 H150.2 V27.8 C147.8 26 144.6 25 141 25 Z M141 34.8 A9.2 9.2 0 1 1 141 53.2 A9.2 9.2 0 1 1 141 34.8 Z',
  gMaskRing:
    'M141 25 A19 19 0 1 0 141 63 A19 19 0 1 0 141 25 Z M141 35 A9 9 0 1 1 141 53 A9 9 0 1 1 141 35 Z',
  gMaskStem: 'M150 25 H160 V64 C160 74.5 152.5 81 141 81 V72 C147 72 150 69 150 64 Z',
  o: 'M179 32 A12 12 0 1 0 179 56 A12 12 0 1 0 179 32 Z M179 38 A6 6 0 1 1 179 50 A6 6 0 1 1 179 38 Z',
  n: 'M194 43.5 C194 36.8 199 32 206 32 C213 32 218 36.8 218 43.5 V55.5 H212 V43.8 C212 40.2 209.6 37.8 206 37.8 C202.4 37.8 200 40.2 200 43.8 V55.5 H194 V43.5 Z',
}

/**
 * Caminhos vetoriais do símbolo oficial "on" isolado da identidade visual
 * (extraído com fidelidade submétrica de Prancheta 2.png / fonte VomZom, viewBox 0 0 172 82).
 */
export const ON_SYMBOL_PATHS = {
  o: 'M 41,0 A 41,41 0 1,0 41,82 A 41,41 0 1,0 41,0 Z M 41,21 A 20,20 0 1,1 41,61 A 20,20 0 1,1 41,21 Z',
  n: 'M 89,82 V 41.5 A 41.5,41.5 0 0,1 172,41.5 V 82 H 150 V 41.5 A 19.5,19.5 0 0,0 111,41.5 V 82 Z',
}

type LogoProps = { className?: string; label?: boolean }

/**
 * Logo oficial da Aegon:
 * Utiliza os ativos oficiais da Apresentação:
 * - `logo-branco.png` para fundos escuros
 * - `logo-azul.png` para fundos claros
 */
export function Logo({ className = '', label = true }: LogoProps) {
  return (
    <span
      className={`brand-mark ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label ? 'Aegon' : undefined}
      aria-hidden={label ? undefined : true}
    >
      <img
        src="/assets/img/logo-branco.png"
        alt={label ? 'Aegon' : ''}
        className="brand-mark__img brand-mark__img--dark"
      />
      <img
        src="/assets/img/logo-azul.png"
        alt={label ? 'Aegon' : ''}
        className="brand-mark__img brand-mark__img--light"
      />
    </span>
  )
}

/**
 * Glifo vetorial isolado do símbolo "on" da identidade visual oficial (VomZom).
 * Renderiza o "o" circular perfeito e o "n" em arco contínuo.
 */
export const OnBrandSymbol = forwardRef<
  SVGSVGElement,
  { className?: string; color?: string; style?: React.CSSProperties }
>(function OnBrandSymbol({ className = '', color = 'currentColor', style }, ref) {
  return (
    <svg
      ref={ref}
      className={`on-brand-symbol ${className}`}
      viewBox="0 0 172 82"
      fill="none"
      style={style}
      aria-label="on"
      role="img"
    >
      <path fill={color} fillRule="evenodd" d={ON_SYMBOL_PATHS.o} />
      <path fill={color} d={ON_SYMBOL_PATHS.n} />
    </svg>
  )
})

/**
 * Cápsula oficial "on" da marca (pílula em Azul System Wake / Pulse com o glifo VomZom),
 * usada para títulos de destaque como "Juntos, on."
 */
export function OnBrandPill({
  className = '',
  variant = 'pulse-on-blue',
}: {
  className?: string
  variant?: 'pulse-on-blue' | 'blue-on-pulse' | 'solid-pulse'
}) {
  return (
    <span className={`brand-on-pill brand-on-pill--${variant} ${className}`}>
      <OnBrandSymbol className="brand-on-pill__glyph" />
    </span>
  )
}

/**
 * Pílula "on" isolada no mesmo padrão visual do switch da logo oficial
 * (usada no Manifesto e no botão final de conversão).
 */
export const OnSwitchBadge = forwardRef<SVGSVGElement, { className?: string }>(function OnSwitchBadge(
  { className = '' },
  ref,
) {
  const uid = useId().replace(/:/g, '')
  const maskId = `aegon-switch-${uid}`

  return (
    <svg
      ref={ref}
      className={`logo-switch-svg ${className}`}
      viewBox="120 23 112 42"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="118" y="20" width="116" height="48">
          <rect x="118" y="20" width="116" height="48" fill="white" />
          <rect x="160.5" y="28.5" width="65" height="31" rx="15.5" fill="black" />
          <circle cx="141" cy="44" r="13.5" fill="black" />
        </mask>
      </defs>
      <rect x="122" y="25" width="107.5" height="38" rx="19" fill="#0045ba" mask={`url(#${maskId})`} />
      <circle cx="141" cy="44" r="9.2" fill="#0045ba" />
      <circle cx="141" cy="44" r="13.5" stroke="#ffffff" strokeWidth="5" />
      <path fill="#ffffff" fillRule="evenodd" d={LOGO_PATHS.o} />
      <path fill="#ffffff" d={LOGO_PATHS.n} />
    </svg>
  )
})

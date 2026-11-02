export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'aegon-theme'

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // LocalStorage indisponível, fallback seguro
  }
  return 'dark'
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Silencia em modo privado
  }
  window.dispatchEvent(new CustomEvent('aegon-theme-change', { detail: { theme } }))
}

export function toggleTheme(): Theme {
  const current =
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  const next: Theme = current === 'light' ? 'dark' : 'light'
  applyTheme(next)
  return next
}


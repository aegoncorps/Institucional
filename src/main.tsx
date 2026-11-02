import { createRoot } from 'react-dom/client'
import App from './App'
import { getInitialTheme, applyTheme } from './lib/theme'
import './styles/global.css'

// Aplica o tema salvo (ou padrão 'dark') antes do primeiro render para evitar flash
applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(<App />)

import { useEffect } from 'react'

type MetaOptions = {
  title: string
  description?: string
}

/**
 * Atualiza dinamicamente o <title> e a meta description em cada rota da SPA.
 */
export function usePageMeta({ title, description }: MetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes('Aegon') ? title : `${title} · Aegon`
    document.title = fullTitle

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
  }, [title, description])
}


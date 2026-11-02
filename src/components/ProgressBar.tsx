import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../lib/motion'

export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (ref.current) ref.current.style.transform = `scaleX(${self.progress})`
      },
    })
    return () => st.kill()
  }, [])

  return <div className="progress-bar" ref={ref} aria-hidden="true" />
}


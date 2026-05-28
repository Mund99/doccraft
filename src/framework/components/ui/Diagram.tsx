import { useEffect, useRef, useState } from 'react'

interface Props { chart: string }

let _id = 0

export default function Diagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useRef(`mmd-${++_id}`)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    ;(async () => {
      try {
        const m = (await import('mermaid')).default
        m.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#dbeafe', primaryTextColor: '#1e3a8a',
            primaryBorderColor: '#93c5fd', lineColor: '#3b5bdb',
            secondaryColor: '#eff6ff', tertiaryColor: '#f0f9ff',
            edgeLabelBackground: '#eef2ff',
            fontFamily: "'Outfit', sans-serif", fontSize: '13px',
            clusterBkg: '#f8faff', clusterBorder: '#c7d2fe', titleColor: '#1e3a8a',
          },
          flowchart: { curve: 'basis', htmlLabels: false },
        })
        const { svg } = await m.render(id.current, chart.trim())
        if (live && ref.current) ref.current.innerHTML = svg
      } catch (e) {
        if (live) setErr(String(e))
      }
    })()
    return () => { live = false }
  }, [chart])

  if (err) return (
    <div className="diagram-wrap" style={{ textAlign: 'left' }}>
      <p style={{ color: '#ef4444', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
        Diagram error: {err}
      </p>
    </div>
  )

  return <div className="diagram-wrap" ref={ref} />
}

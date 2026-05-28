import { useState, useCallback } from 'react'

interface Props {
  language?: string
  children: string
}

export default function CodeBlock({ language = '', children }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(children.trim()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [children])

  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <span className="code-dot" />
          <span className="code-dot" />
          <span className="code-dot" />
        </div>
        {language && <span className="code-lang">{language}</span>}
        <button className={`code-copy ${copied ? 'ok' : ''}`} onClick={copy}>
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <div className="code-body">
        <pre>{children.trim()}</pre>
      </div>
    </div>
  )
}

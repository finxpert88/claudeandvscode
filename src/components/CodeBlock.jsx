import { useState } from 'react'

export default function CodeBlock({ code, label = 'terminal' }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard can be blocked by the browser; fail quietly.
    }
  }

  return (
    <div className="codeblock">
      <div className="codeblock-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="codeblock-label">{label}</span>
        <button className="copy-btn" onClick={copy}>{copied ? 'Copied ✓' : 'Copy'}</button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}

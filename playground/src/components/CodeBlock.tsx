import { useState } from 'react'
import { Highlight } from 'prism-react-renderer'
import { docsPrismTheme } from '../prismTheme'

export type CodeBlockProps = {
  code: string
  language?: 'tsx' | 'ts' | 'bash' | 'css' | 'scss' | 'json'
  /** Filename shown in the chrome bar. */
  title?: string
  showCopy?: boolean
}

export function CodeBlock({ code, language = 'tsx', title, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const source = code.trimEnd()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard access can be denied; the code is selectable either way.
    }
  }

  return (
    <div className="code">
      {(title || showCopy) && (
        <div className="code__bar">
          <span className="code__name">{title}</span>
          {showCopy && (
            <button type="button" className="code__copy" onClick={copy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <Highlight theme={docsPrismTheme} code={source} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          // Wide code scrolls sideways; tabindex lets a keyboard reach it.
          <pre className="code__pre" tabIndex={0}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

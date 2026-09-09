import type { PrismTheme } from 'prism-react-renderer'

/**
 * Every colour is a CSS custom property reference rather than a literal.
 * prism-react-renderer applies theme styles inline, and var() resolves there
 * just as it does in a stylesheet, so light/dark switching is a token swap in
 * app.scss — no React state, no second theme object, no flash on toggle.
 */
export const docsPrismTheme: PrismTheme = {
  plain: {
    color: 'var(--code-fg)',
    backgroundColor: 'transparent',
  },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--code-comment)', fontStyle: 'italic' } },
    { types: ['keyword', 'operator', 'boolean'], style: { color: 'var(--code-keyword)' } },
    { types: ['string', 'char', 'attr-value', 'inserted'], style: { color: 'var(--code-string)' } },
    { types: ['function', 'class-name', 'tag'], style: { color: 'var(--code-function)' } },
    { types: ['attr-name', 'property', 'variable', 'constant'], style: { color: 'var(--code-attr)' } },
    { types: ['number', 'symbol', 'deleted'], style: { color: 'var(--code-number)' } },
    { types: ['punctuation'], style: { color: 'var(--code-punct)' } },
    { types: ['builtin', 'regex'], style: { color: 'var(--code-builtin)' } },
  ],
}

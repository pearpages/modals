import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);

/**
 * These run against the built dist/, like the rest of this suite.
 *
 * The stylesheet is documented as an import into a cascade layer
 * (`@import '@pearpages/modals/styles.css' layer(vendor)`). An `@charset` rule
 * inside a layer is invalid: browsers drop it and bundlers warn on every build.
 * Sass prepends one as soon as any non-ASCII character reaches the output, so
 * this is one build option away at all times.
 */
describe('the published stylesheet', () => {
  const css = readFileSync(require.resolve('@pearpages/modals/styles.css'), 'utf8');

  it('starts with a rule, not an at-rule that cannot live inside a layer', () => {
    expect(css.startsWith('@charset')).toBe(false);
    expect(css).not.toContain('@charset');
  });

  it('still declares the --modal-* custom properties a consumer maps', () => {
    expect(css).toContain('--modal-bg:');
    expect(css).toContain('--modal-width-md:');
  });
});

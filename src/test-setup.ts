// Test setup for vitest
import { beforeEach } from 'vitest'

// Setup DOM environment
beforeEach(() => {
  // Clean up DOM after each test
  document.body.innerHTML = ''
})
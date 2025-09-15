// Test setup for vitest
import { beforeEach } from 'vitest'
import '@testing-library/jest-dom'

// Setup DOM environment
beforeEach(() => {
  // Clean up DOM after each test
  document.body.innerHTML = ''
})
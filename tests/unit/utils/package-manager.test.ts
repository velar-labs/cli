import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
  },
  existsSync: vi.fn(),
}))

import fs from 'fs'
import { detectPackageManager } from '../../../src/utils/package-manager'

const mockFs = vi.mocked(fs)

describe('detectPackageManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns pnpm when pnpm lock file exists', () => {
    mockFs.existsSync.mockImplementation((file) => file === 'pnpm-lock.yaml')

    expect(detectPackageManager()).toBe('pnpm')
  })

  it('returns yarn when yarn.lock exists and no pnpm lock exists', () => {
    mockFs.existsSync.mockImplementation((file) => file === 'yarn.lock')

    expect(detectPackageManager()).toBe('yarn')
  })

  it('defaults to npm when no lock file exists', () => {
    mockFs.existsSync.mockReturnValue(false)

    expect(detectPackageManager()).toBe('npm')
  })
})

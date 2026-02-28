import { describe, expect, it, vi } from 'vitest'
import { AddService } from '../../../src/services/add-service'
import { logger } from '../../../src/utils/logger'
import type { AddResult } from '../../../src/types'
import type {
  IConfigManager,
  IRegistryService,
} from '../../../src/types/interfaces'

describe('AddService output', () => {
  it('logs added, skipped and failed items in displayResults', () => {
    const successSpy = vi.spyOn(logger, 'success').mockImplementation(() => undefined)
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => undefined)
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => undefined)

    const registryService = {
      fetchRegistry: vi.fn(),
      fetchComponent: vi.fn(),
      resolveDependencies: vi.fn(),
    } as unknown as IRegistryService
    const configManager = {
      load: vi.fn(),
      getPackageManager: vi.fn(),
      validate: vi.fn(),
      getComponentsPath: vi.fn(),
      getThemePath: vi.fn(),
      getJsEntryPath: vi.fn(),
      getTheme: vi.fn(),
    } as unknown as IConfigManager
    const componentService = {
      addComponents: vi.fn(),
    } as any

    const service = new AddService(
      registryService,
      configManager,
      componentService,
    )

    const result: AddResult = {
      added: ['button/resources/views/components/ui/button/button.blade.php'],
      skipped: ['card/resources/js/ui/card.js'],
      failed: [{ name: 'badge', error: 'network error' }],
    }

    service.displayResults(result)

    expect(successSpy).toHaveBeenCalledWith(
      'Added button/resources/views/components/ui/button/button.blade.php',
    )
    expect(warnSpy).toHaveBeenCalledWith('Skipped card/resources/js/ui/card.js')
    expect(errorSpy).toHaveBeenCalledWith(
      'Failed to add badge: network error',
    )
  })

  it('prints next steps only when there are added files', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const registryService = {
      fetchRegistry: vi.fn(),
      fetchComponent: vi.fn(),
      resolveDependencies: vi.fn(),
    } as unknown as IRegistryService
    const configManager = {
      load: vi.fn(),
      getPackageManager: vi.fn(),
      validate: vi.fn(),
      getComponentsPath: vi.fn(),
      getThemePath: vi.fn(),
      getJsEntryPath: vi.fn(),
      getTheme: vi.fn(),
    } as unknown as IConfigManager
    const componentService = {
      addComponents: vi.fn(),
    } as any

    const service = new AddService(
      registryService,
      configManager,
      componentService,
    )

    service.displayNextSteps({ added: [], skipped: [], failed: [] })
    expect(logSpy).not.toHaveBeenCalled()

    service.displayNextSteps({ added: ['button/file'], skipped: [], failed: [] })
    expect(logSpy).toHaveBeenCalledTimes(1)
  })
})

import fs from 'fs-extra'
import path from 'path'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('prompts', () => ({
  default: vi.fn(),
}))

import prompts from 'prompts'
import { addComponents } from '../../../src/utils/add-components'
import { RegistryService } from '../../../src/services/registry-service'
import type {
  RegistryComponentWithFiles,
  VelyxComponentMeta,
} from '../../../src/types'
import {
  cleanupTempProject,
  createTempProjectFromFixture,
} from '../../helpers/temp-project'

const mockedPrompts = vi.mocked(prompts)

const buttonMeta: VelyxComponentMeta = {
  name: 'button',
  description: 'Button component',
  latest: '1.0.0',
  versions: ['1.0.0'],
  categories: ['forms'],
  requires_alpine: false,
  requires: [],
  laravel: '^11 || ^12',
}

const buttonWithFiles: RegistryComponentWithFiles = {
  ...buttonMeta,
  files: {
    'resources/views/components/ui/button/button.blade.php':
      '<button class="btn">From registry</button>\n',
  },
}

async function seedVelyxConfig(projectPath: string): Promise<void> {
  await fs.writeJson(
    path.join(projectPath, 'velyx.json'),
    {
      version: '1.0.0',
      theme: 'neutral',
      packageManager: 'npm',
      css: {
        entry: 'resources/css/app.css',
        velyx: 'resources/css/velyx.css',
      },
      js: {
        entry: 'resources/js/app.js',
      },
      components: {
        path: 'resources/views/components/ui',
      },
    },
    { spaces: 2 },
  )
}

describe('addComponents conflicts integration', () => {
  const projectPaths: string[] = []
  const initialCwd = process.cwd()

  afterEach(async () => {
    process.chdir(initialCwd)
    vi.restoreAllMocks()
    mockedPrompts.mockReset()
    for (const projectPath of projectPaths) {
      await cleanupTempProject(projectPath)
    }
    projectPaths.length = 0
  })

  it('keeps existing file when conflict action is "skip"', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined)
    vi.spyOn(RegistryService.prototype, 'fetchRegistry').mockResolvedValue({
      components: [buttonMeta],
      count: 1,
    })
    vi.spyOn(RegistryService.prototype, 'fetchComponent').mockResolvedValue(
      buttonWithFiles,
    )
    vi.spyOn(RegistryService.prototype, 'resolveDependencies').mockResolvedValue(
      [buttonMeta],
    )
    mockedPrompts.mockResolvedValueOnce({ action: 'skip' })

    const projectPath = await createTempProjectFromFixture('laravel-minimal')
    projectPaths.push(projectPath)
    await seedVelyxConfig(projectPath)

    const bladePath = path.join(
      projectPath,
      'resources/views/components/ui/button/button.blade.php',
    )
    await fs.ensureDir(path.dirname(bladePath))
    await fs.writeFile(bladePath, '<button>Existing</button>\n', 'utf8')

    await addComponents({
      cwd: projectPath,
      all: false,
      components: ['button'],
    })

    const content = await fs.readFile(bladePath, 'utf8')
    expect(content).toBe('<button>Existing</button>\n')
  })

  it('replaces existing file when conflict action is "overwrite"', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined)
    vi.spyOn(RegistryService.prototype, 'fetchRegistry').mockResolvedValue({
      components: [buttonMeta],
      count: 1,
    })
    vi.spyOn(RegistryService.prototype, 'fetchComponent').mockResolvedValue(
      buttonWithFiles,
    )
    vi.spyOn(RegistryService.prototype, 'resolveDependencies').mockResolvedValue(
      [buttonMeta],
    )
    mockedPrompts.mockResolvedValueOnce({ action: 'overwrite' })

    const projectPath = await createTempProjectFromFixture('laravel-minimal')
    projectPaths.push(projectPath)
    await seedVelyxConfig(projectPath)

    const bladePath = path.join(
      projectPath,
      'resources/views/components/ui/button/button.blade.php',
    )
    await fs.ensureDir(path.dirname(bladePath))
    await fs.writeFile(bladePath, '<button>Existing</button>\n', 'utf8')

    await addComponents({
      cwd: projectPath,
      all: false,
      components: ['button'],
    })

    const content = await fs.readFile(bladePath, 'utf8')
    expect(content).toBe('<button class="btn">From registry</button>\n')
  })
})

import fs from 'fs-extra'
import path from 'path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ProjectInfo } from '../../../src/utils/preflight-init'
import {
  cleanupTempProject,
  createTempProjectFromFixture,
} from '../../helpers/temp-project'

describe('initProject integration', () => {
  const projectPaths: string[] = []

  afterEach(async () => {
    for (const projectPath of projectPaths) {
      await cleanupTempProject(projectPath)
    }
    projectPaths.length = 0
    vi.restoreAllMocks()
  })

  it('creates config, theme and injects CSS import in a Laravel fixture', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const projectPath = await createTempProjectFromFixture('laravel-minimal')
    projectPaths.push(projectPath)
    const previousArgv1 = process.argv[1]
    process.argv[1] = path.resolve(process.cwd(), 'src/index.ts')

    const projectInfo: ProjectInfo = {
      name: 'acme/laravel-app',
      framework: {
        name: 'laravel',
        label: 'Laravel',
        version: '^12.0',
      },
      hasAlpine: true,
      hasVite: true,
      packageManager: 'npm',
      paths: {
        views: 'resources/views',
        assets: 'resources/js',
        public: 'public',
        config: 'config',
      },
    }

    const { initProject } = await import('../../../src/utils/init-project')

    try {
      await initProject(
        {
          baseColor: 'neutral',
          defaults: true,
          force: true,
          cwd: projectPath,
        },
        projectInfo,
      )

      const configPath = path.join(projectPath, 'velyx.json')
      const themePath = path.join(projectPath, 'resources/css/velyx.css')
      const cssPath = path.join(projectPath, 'resources/css/app.css')

      expect(await fs.pathExists(configPath)).toBe(true)
      expect(await fs.pathExists(themePath)).toBe(true)

      const config = await fs.readJson(configPath)
      expect(config.theme).toBe('neutral')
      expect(config.packageManager).toBe('npm')
      expect(config.components.path).toBe('resources/views/components/ui')

      const cssContent = await fs.readFile(cssPath, 'utf8')
      expect(cssContent).toContain('@import "tailwindcss";')
      expect(cssContent).toContain('@import "./velyx.css";')
    } finally {
      process.argv[1] = previousArgv1
    }
  })
})

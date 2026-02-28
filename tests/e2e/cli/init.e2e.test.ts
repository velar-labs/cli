import fs from 'fs-extra'
import path from 'path'
import { existsSync } from 'fs'
import { afterEach, describe, expect, it } from 'vitest'
import {
  cleanupTempProject,
  createTempProjectFromFixture,
} from '../../helpers/temp-project'
import { getDistEntryPath, runCli } from '../../helpers/cli-runner'

describe('CLI E2E smoke', () => {
  const projectPaths: string[] = []

  afterEach(async () => {
    for (const projectPath of projectPaths) {
      await cleanupTempProject(projectPath)
    }
    projectPaths.length = 0
  })

  it.skipIf(!existsSync(getDistEntryPath()))(
    'runs "init" successfully against a Laravel fixture',
    async () => {
      const projectPath = await createTempProjectFromFixture('laravel-minimal')
      projectPaths.push(projectPath)

      const result = runCli(
        ['init', '--defaults', '--base-color', 'neutral', '--cwd', projectPath],
        projectPath,
      )
      expect(result.status).toBe(0)

      const configPath = path.join(projectPath, 'velyx.json')
      const themePath = path.join(projectPath, 'resources/css/velyx.css')
      expect(await fs.pathExists(configPath)).toBe(true)
      expect(await fs.pathExists(themePath)).toBe(true)

      const config = await fs.readJson(configPath)
      expect(config.theme).toBe('neutral')
    },
  )
})

import fs from 'fs-extra'
import path from 'path'
import { existsSync } from 'fs'
import { afterEach, describe, expect, it } from 'vitest'
import {
  cleanupTempProject,
  createTempProjectFromFixture,
} from '../../helpers/temp-project'
import { getDistEntryPath, runCli } from '../../helpers/cli-runner'
import { startMockRegistryServer } from '../../helpers/mock-registry-server'

describe('CLI list E2E', () => {
  const projectPaths: string[] = []
  const serverStops: Array<() => Promise<void>> = []

  afterEach(async () => {
    for (const stop of serverStops) {
      await stop()
    }
    serverStops.length = 0

    for (const projectPath of projectPaths) {
      await cleanupTempProject(projectPath)
    }
    projectPaths.length = 0
  })

  it.skipIf(!existsSync(getDistEntryPath()))(
    'returns JSON output with --json',
    async (ctx) => {
      const projectPath = await createTempProjectFromFixture('laravel-minimal')
      projectPaths.push(projectPath)

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

      let server: Awaited<ReturnType<typeof startMockRegistryServer>>
      try {
        server = await startMockRegistryServer()
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('operation not permitted')
        ) {
          return ctx.skip()
        }
        throw error
      }
      serverStops.push(server.stop)

      const result = runCli(['list', '--json', '--cwd', projectPath], projectPath, {
        VELYX_REGISTRY_URL: `${server.url}/api/v1`,
      })
      const output = `${result.stdout}\n${result.stderr}`

      expect(result.status).toBe(0)
      expect(output).toContain('"components"')
      expect(output).toContain('"name": "button"')
      expect(output).toContain('"count": 1')
    },
  )
})

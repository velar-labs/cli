import fs from 'fs-extra'
import os from 'os'
import path from 'path'

const FIXTURES_ROOT = path.resolve(process.cwd(), 'tests/fixtures')

export async function createTempProjectFromFixture(
  fixtureName: string,
): Promise<string> {
  const fixturePath = path.join(FIXTURES_ROOT, fixtureName)
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'velyx-test-'))
  await fs.copy(fixturePath, tempRoot)
  return tempRoot
}

export async function cleanupTempProject(projectPath: string): Promise<void> {
  await fs.remove(projectPath)
}

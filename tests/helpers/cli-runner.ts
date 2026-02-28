import { spawnSync } from 'child_process'
import path from 'path'

const DIST_ENTRY = path.resolve(process.cwd(), 'dist/index.js')

export type CliRunResult = {
  status: number | null
  stdout: string
  stderr: string
}

export function runCli(
  args: readonly string[],
  cwd: string,
  env: Record<string, string> = {},
): CliRunResult {
  const run = spawnSync('node', [DIST_ENTRY, ...args], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      FORCE_COLOR: '0',
      ...env,
    },
  })

  return {
    status: run.status,
    stdout: run.stdout ?? '',
    stderr: run.stderr ?? '',
  }
}

export function getDistEntryPath(): string {
  return DIST_ENTRY
}

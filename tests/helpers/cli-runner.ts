import { spawn } from 'child_process'
import path from 'path'

const DIST_ENTRY = path.resolve(process.cwd(), 'dist/index.js')

export type CliRunResult = {
  status: number | null
  stdout: string
  stderr: string
}

export async function runCli(
  args: readonly string[],
  cwd: string,
  env: Record<string, string> = {},
): Promise<CliRunResult> {
  return await new Promise((resolve, reject) => {
    const child = spawn('node', [DIST_ENTRY, ...args], {
      cwd,
      env: {
        ...process.env,
        FORCE_COLOR: '0',
        ...env,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString()
    })

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    child.on('error', reject)
    child.on('close', (status) => {
      resolve({
        status,
        stdout,
        stderr,
      })
    })
  })
}

export function getDistEntryPath(): string {
  return DIST_ENTRY
}

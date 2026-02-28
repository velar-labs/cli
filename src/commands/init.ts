import { Command } from 'commander'
import path from 'path'
import { deleteFileBackup, restoreFileBackup } from '@/src/utils/file-helper'
import { initOptionsSchema, initProject } from '@/src/utils/init-project'

process.on('exit', (code) => {
  const filePath = path.resolve(process.cwd(), 'velyx.json')

  // Delete backup if successful.
  if (code === 0) {
    return deleteFileBackup(filePath)
  }

  // Restore backup if error.
  return restoreFileBackup(filePath)
})

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option(
    '-b, --base-color <base-color>',
    'the base color to use. (neutral, gray, zinc, stone, slate)',
    undefined,
  )
  .option('-d, --defaults', 'use default configuration.', false)
  .option('-f, --force', 'force overwrite of existing configuration.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    const options = initOptionsSchema.parse({
      baseColor: opts.baseColor,
      defaults: Boolean(opts.defaults),
      force: Boolean(opts.force),
      cwd: path.resolve(opts.cwd),
    })

    await initProject(options)
  })

import fs from 'fs'

/**
 * Check if the current directory is a Laravel project
 * @returns True if Laravel project is detected
 */
export function isLaravelProject(): boolean {
  return fs.existsSync('composer.json') && fs.existsSync('artisan')
}

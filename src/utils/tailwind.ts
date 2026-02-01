import fs from 'fs'

/**
 * Package.json structure
 */
interface PackageJson {
  dependencies?: Readonly<Record<string, string>>
  devDependencies?: Readonly<Record<string, string>>
}

/**
 * Read package.json file
 * @returns Package.json object or null if file doesn't exist or is invalid
 */
export function readPackageJson(): PackageJson | null {
  try {
    return JSON.parse(fs.readFileSync('package.json', 'utf8')) as PackageJson
  } catch {
    return null
  }
}

/**
 * Detect if Tailwind CSS v4 is installed
 * @param pkg - Package.json object
 * @returns True if Tailwind v4 is detected
 */
export function detectTailwindV4(pkg: PackageJson): boolean {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  if (deps['@tailwindcss/vite'] || deps['@tailwindcss/postcss']) {
    return true
  }
  if (deps['tailwindcss']) {
    const version = String(deps['tailwindcss'])
    const match = version.match(/(\d+)/)
    return match ? Number(match[1]) >= 4 : false
  }
  return false
}

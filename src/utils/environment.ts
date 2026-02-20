/**
 * Get Velyx Registry API v1 URL
 * @returns Velyx Registry API URL
 */
export const getRegistryApiUrl = (): string => {
  // Allow override via environment variable for development
  if (process.env.VELYX_REGISTRY_URL) {
    return process.env.VELYX_REGISTRY_URL.replace(/\/$/, '') // Remove trailing slash
  }

  // Default to local registry for development
  // In production, this would be https://registry.velyx.dev/api/v1
  return 'http://velyx.test/api/v1'
}

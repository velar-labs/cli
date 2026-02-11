import type { VelyxComponentMeta } from '../types'
import type { IRegistryService } from '../types/interfaces'
import { VelyxRegistryService } from './velyx-registry-service'
import { spinner } from '../utils/spinner'

/**
 * Service for interacting with Velyx component registry
 * This is a wrapper around VelyxRegistryService for backward compatibility
 */
export class RegistryService implements IRegistryService {
  private readonly velyxService: VelyxRegistryService

  /**
   * Create a new RegistryService instance
   */
  constructor() {
    this.velyxService = new VelyxRegistryService()
  }

  /**
   * Fetch complete registry data
   * @returns Promise resolving to registry data
   * @throws NetworkError if fetch fails
   */
  async fetchRegistry(): Promise<{ components: readonly VelyxComponentMeta[] }> {
    return await spinner.withTask(
      'Fetching registry...',
      () => this.velyxService.fetchRegistry(),
      undefined,
      'Failed to fetch registry',
    )
  }

  /**
   * Fetch metadata for a specific component
   * @param name - Component name
   * @returns Promise resolving to component metadata
   * @throws ComponentNotFoundError if component doesn't exist
   * @throws NetworkError if fetch fails
   */
  async fetchComponent(name: string): Promise<VelyxComponentMeta> {
    return await spinner.withTask(
      `Fetching component "${name}" metadata...`,
      () => this.velyxService.fetchComponent(name),
      undefined,
      `Failed to fetch component "${name}"`,
    )
  }

  /**
   * Fetch file content for a component
   * @param componentUrl - Component URL or name
   * @param path - File path within component
   * @returns Promise resolving to file content
   * @throws ComponentNotFoundError if component or file doesn't exist
   * @throws NetworkError if fetch fails
   */
  async fetchFile(componentUrl: string, path: string): Promise<string> {
    return await spinner.withTask(
      `Downloading ${path}...`,
      () => this.velyxService.fetchFile(componentUrl, path),
      undefined,
      `Failed to fetch file "${path}"`,
    )
  }

  /**
   * Resolve component dependencies
   * @param component - Component metadata
   * @returns Promise resolving to array of components including dependencies
   */
  async resolveDependencies(
    component: VelyxComponentMeta,
  ): Promise<readonly VelyxComponentMeta[]> {
    return await spinner.withTask(
      'Resolving dependencies...',
      () => this.velyxService.resolveDependencies(component),
      undefined,
      'Failed to resolve dependencies',
    )
  }
}
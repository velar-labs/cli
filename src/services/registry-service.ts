import type {
  VelyxComponentMeta,
  RegistryComponentWithFiles,
} from '../types'
import type {
  IRegistryService,
  FetchComponentOptions,
} from '../types/interfaces'
import { VelyxRegistryService } from './velyx-registry-service'
import { spinner } from '../utils/spinner'

/**
 * Service for interacting with Velyx component registry
 * This is a wrapper around VelyxRegistryService with UI feedback
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
  async fetchRegistry(): Promise<{
    components: readonly VelyxComponentMeta[]
    count: number
  }> {
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
   * @param options - Optional parameters (version, includeFiles)
   * @returns Promise resolving to component metadata (with files if includeFiles is true)
   * @throws ComponentNotFoundError if component doesn't exist
   * @throws NetworkError if fetch fails
   */
  async fetchComponent(
    name: string,
    options?: FetchComponentOptions,
  ): Promise<VelyxComponentMeta | RegistryComponentWithFiles> {
    const taskMessage = options?.includeFiles
      ? `Fetching component "${name}" with files...`
      : `Fetching component "${name}" metadata...`

    return await spinner.withTask(
      taskMessage,
      () => this.velyxService.fetchComponent(name, options),
      undefined,
      `Failed to fetch component "${name}"`,
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

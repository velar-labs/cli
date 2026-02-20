import type {
  RegistryComponent,
  RegistryComponentsResponse,
  RegistryVersionsResponse,
  VelyxComponentMeta,
} from '../types'
import type { IRegistryService } from '../types/interfaces'
import { NetworkError, ComponentNotFoundError } from '../errors/errors'
import { HttpService } from './http-service'
import { getRegistryApiUrl } from '../utils/environment'

/**
 * Service for interacting with Velyx Registry API v1
 */
export class VelyxRegistryService implements IRegistryService {
  private readonly httpService: HttpService
  private readonly baseUrl: string

  /**
   * Create a new VelyxRegistryService instance
   * @param httpService - Optional HTTP service instance (creates new one if not provided)
   */
  constructor(httpService?: HttpService) {
    this.httpService = httpService ?? new HttpService()
    this.baseUrl = getRegistryApiUrl()
  }

  /**
   * Fetch complete registry data
   * @returns Promise resolving to registry data
   * @throws NetworkError if fetch fails
   */
  async fetchRegistry(): Promise<{
    components: readonly VelyxComponentMeta[]
  }> {
    try {
      const response = await this.httpService.fetch(
        `${this.baseUrl}/components`,
      )

      if (!response.ok) {
        throw new NetworkError(
          `Failed to fetch registry: ${response.status} ${response.statusText}`,
        )
      }

      const data = await this.httpService.fetchJson<RegistryComponentsResponse>(
        `${this.baseUrl}/components`,
      )

      // Convert Registry API v1 format to VelyxComponentMeta format
      const components = data.data.map((component) =>
        this.convertRegistryComponentToMeta(component),
      )

      return { components }
    } catch (error) {
      if (error instanceof NetworkError) {
        throw error
      }
      throw new NetworkError(
        `Failed to fetch registry: ${(error as Error).message}`,
      )
    }
  }

  /**
   * Fetch metadata for a specific component
   * @param name - Component name
   * @returns Promise resolving to component metadata
   * @throws ComponentNotFoundError if component doesn't exist
   * @throws NetworkError if fetch fails
   */
  async fetchComponent(name: string): Promise<VelyxComponentMeta> {
    try {
      const response = await this.httpService.fetch(
        `${this.baseUrl}/components/${name}`,
      )

      if (response.status === 404) {
        throw new ComponentNotFoundError(name)
      }

      if (!response.ok) {
        throw new NetworkError(
          `Failed to fetch component: ${response.status} ${response.statusText}`,
        )
      }

      const component = await this.httpService.fetchJson<RegistryComponent>(
        `${this.baseUrl}/components/${name}`,
      )

      return this.convertRegistryComponentToMeta(component)
    } catch (error) {
      if (
        error instanceof ComponentNotFoundError ||
        error instanceof NetworkError
      ) {
        throw error
      }
      throw new NetworkError(
        `Failed to fetch component "${name}": ${(error as Error).message}`,
      )
    }
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
    try {
      const componentName = componentUrl.split('/').pop() || componentUrl

      const response = await this.httpService.fetch(
        `${this.baseUrl}/components/${componentName}`,
      )

      if (response.status === 404) {
        throw new ComponentNotFoundError(componentName)
      }

      if (!response.ok) {
        throw new NetworkError(
          `Failed to fetch component: ${response.status} ${response.statusText}`,
        )
      }

      const component = await this.httpService.fetchJson<RegistryComponent>(
        `${this.baseUrl}/components/${componentName}`,
      )

      // Find the file in the component's files
      const fileContent = component.files[path]
      if (fileContent === undefined) {
        throw new NetworkError(
          `File "${path}" not found in component "${componentName}"`,
        )
      }

      return fileContent
    } catch (error) {
      if (
        error instanceof ComponentNotFoundError ||
        error instanceof NetworkError
      ) {
        throw error
      }
      throw new NetworkError(
        `Failed to fetch file "${path}": ${(error as Error).message}`,
      )
    }
  }

  /**
   * Resolve component dependencies
   * @param component - Component metadata
   * @returns Promise resolving to array of components including dependencies
   */
  async resolveDependencies(
    component: VelyxComponentMeta,
  ): Promise<readonly VelyxComponentMeta[]> {
    const visited = new Set<string>()
    const resolved: VelyxComponentMeta[] = []

    const resolve = async (comp: VelyxComponentMeta) => {
      if (visited.has(comp.name)) return
      visited.add(comp.name)
      resolved.push(comp)

      // Resolve dependencies from the 'requires' field
      if (comp.dependencies?.composer) {
        for (const dep of comp.dependencies.composer) {
          try {
            // Try to fetch dependency as a Velyx component
            const depComponent = await this.fetchComponent(dep)
            await resolve(depComponent)
          } catch {
            // Skip if dependency is not a Velyx component (might be a composer package)
          }
        }
      }
    }

    await resolve(component)
    return resolved
  }

  /**
   * Convert Registry API v1 component format to VelyxComponentMeta
   */
  private convertRegistryComponentToMeta(
    component: RegistryComponent,
  ): VelyxComponentMeta {
    // List format from /components endpoint
    return {
      name: component.name,
      description: component.description,
      files: [], // Empty for list format, populated when needed
      dependencies: {
        composer: component.requires,
        npm: component.requires_alpine ? ['alpinejs'] : [],
      },
      path: component.name,
      categories: component.categories || [],
    }
  }

  /**
   * Get available versions for a component
   * @param name - Component name
   * @returns Promise resolving to versions data
   */
  async getComponentVersions(name: string): Promise<RegistryVersionsResponse> {
    try {
      const response = await this.httpService.fetch(
        `${this.baseUrl}/components/${name}/versions`,
      )

      if (response.status === 404) {
        throw new ComponentNotFoundError(name)
      }

      if (!response.ok) {
        throw new NetworkError(
          `Failed to fetch component versions: ${response.status} ${response.statusText}`,
        )
      }

      return await this.httpService.fetchJson<RegistryVersionsResponse>(
        `${this.baseUrl}/components/${name}/versions`,
      )
    } catch (error) {
      if (
        error instanceof ComponentNotFoundError ||
        error instanceof NetworkError
      ) {
        throw error
      }
      throw new NetworkError(
        `Failed to fetch versions for "${name}": ${(error as Error).message}`,
      )
    }
  }
}

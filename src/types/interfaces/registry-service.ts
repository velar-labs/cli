import type {
  VelyxComponentMeta,
  RegistryData,
  RegistryComponentWithFiles,
} from '..'

/**
 * Options for fetching a component
 */
export interface FetchComponentOptions {
  /** Specific version to fetch (e.g., "1.0.0") */
  version?: string
  /** Whether to include file contents in the response */
  includeFiles?: boolean
}

/**
 * Interface for registry service operations
 */
export interface IRegistryService {
  /**
   * Fetch complete registry data
   * @returns Promise resolving to registry data
   * @throws NetworkError if fetch fails
   */
  fetchRegistry(): Promise<RegistryData>

  /**
   * Fetch metadata for a specific component
   * @param name - Component name
   * @param options - Optional parameters for version and file inclusion
   * @returns Promise resolving to component metadata (with files if includeFiles is true)
   * @throws ComponentNotFoundError if component doesn't exist
   * @throws NetworkError if fetch fails
   */
  fetchComponent(
    name: string,
    options?: FetchComponentOptions,
  ): Promise<VelyxComponentMeta | RegistryComponentWithFiles>

  /**
   * Resolve component dependencies
   * @param component - Component metadata
   * @returns Promise resolving to array of components including dependencies
   */
  resolveDependencies(
    component: VelyxComponentMeta,
  ): Promise<readonly VelyxComponentMeta[]>
}

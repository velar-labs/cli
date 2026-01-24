import type {
  VelarComponentMeta,
  RegistryData,
  GitHubFile,
} from "../types/index.js";
import type { IRegistryService } from "../types/interfaces.js";
import {
  fetchGitHubRegistry,
  fetchComponent,
  fetchComponentFile,
} from "../utils/remote-registry.js";
import { logger } from "../utils/logger.js";
import { HttpService } from "./HttpService.js";

/**
 * Service for interacting with the Velar component registry
 */
export class RegistryService implements IRegistryService {
  private readonly httpService: HttpService;

  /**
   * Create a new RegistryService instance
   * @param httpService - Optional HTTP service instance (creates new one if not provided)
   */
  constructor(httpService?: HttpService) {
    this.httpService = httpService ?? new HttpService();
  }

  /**
   * Fetch the complete registry data
   * @returns Promise resolving to registry data
   * @throws NetworkError if fetch fails
   */
  async fetchRegistry(): Promise<RegistryData> {
    try {
      return await fetchGitHubRegistry();
    } catch (error) {
      logger.error("Failed to fetch registry");
      throw error;
    }
  }

  /**
   * Fetch metadata for a specific component
   * @param name - Component name
   * @returns Promise resolving to component metadata
   * @throws ComponentNotFoundError if component doesn't exist
   * @throws NetworkError if fetch fails
   */
  async fetchComponent(name: string): Promise<VelarComponentMeta> {
    try {
      const file = await fetchComponent(name);
      return await this.parseComponentMeta(file);
    } catch (error) {
      logger.error(`Failed to fetch component "${name}"`);
      throw error;
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
      const componentName = componentUrl.split("/").pop() || componentUrl;
      return await fetchComponentFile(componentName, path);
    } catch (error) {
      logger.error(
        `Failed to fetch file "${path}" for component "${componentUrl}"`,
      );
      throw error;
    }
  }

  /**
   * Resolve component dependencies
   * @param component - Component metadata
   * @returns Promise resolving to array of components including dependencies
   */
  async resolveDependencies(
    component: VelarComponentMeta,
  ): Promise<readonly VelarComponentMeta[]> {
    const visited = new Set<string>();
    const resolved: VelarComponentMeta[] = [];

    const resolve = async (comp: VelarComponentMeta) => {
      if (visited.has(comp.name)) return;
      visited.add(comp.name);
      resolved.push(comp);

      // Component dependencies would be resolved here if they exist
      // For now, just add the component itself
    };

    await resolve(component);
    return resolved;
  }

  /**
   * Parse component metadata from GitHub file
   * @param file - GitHub file metadata
   * @returns Promise resolving to component metadata
   * @throws NetworkError if download or parsing fails
   */
  private async parseComponentMeta(
    file: GitHubFile,
  ): Promise<VelarComponentMeta> {
    if (!file.download_url) {
      throw new Error("GitHub file has no download URL");
    }

    try {
      const raw = await this.httpService.fetchText(file.download_url);
      return JSON.parse(raw) as VelarComponentMeta;
    } catch (error) {
      throw new Error(
        `Failed to parse component meta: ${(error as Error).message}`,
      );
    }
  }
}

import type { RegistryData, VelarComponentMeta } from "../types/index.js";
import type { IRegistryService } from "../types/interfaces.js";
import { HttpService } from "./HttpService.js";
/**
 * Service for interacting with the Velar component registry
 */
export declare class RegistryService implements IRegistryService {
    private readonly httpService;
    /**
     * Create a new RegistryService instance
     * @param httpService - Optional HTTP service instance (creates new one if not provided)
     */
    constructor(httpService?: HttpService);
    /**
     * Fetch the complete registry data
     * @returns Promise resolving to registry data
     * @throws NetworkError if fetch fails
     */
    fetchRegistry(): Promise<RegistryData>;
    /**
     * Fetch metadata for a specific component
     * @param name - Component name
     * @returns Promise resolving to component metadata
     * @throws ComponentNotFoundError if component doesn't exist
     * @throws NetworkError if fetch fails
     */
    fetchComponent(name: string): Promise<VelarComponentMeta>;
    /**
     * Fetch file content for a component
     * @param componentUrl - Component URL or name
     * @param path - File path within component
     * @returns Promise resolving to file content
     * @throws ComponentNotFoundError if component or file doesn't exist
     * @throws NetworkError if fetch fails
     */
    fetchFile(componentUrl: string, path: string): Promise<string>;
    /**
     * Resolve component dependencies
     * @param component - Component metadata
     * @returns Promise resolving to array of components including dependencies
     */
    resolveDependencies(component: VelarComponentMeta): Promise<readonly VelarComponentMeta[]>;
    /**
     * Parse component metadata from GitHub file
     * @param file - GitHub file metadata
     * @returns Promise resolving to component metadata
     * @throws NetworkError if download or parsing fails
     */
    private parseComponentMeta;
}
//# sourceMappingURL=RegistryService.d.ts.map
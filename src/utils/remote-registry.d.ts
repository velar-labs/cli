import type { GitHubFile, RegistryData, VelarComponentMeta } from "../types/index.js";
/**
 * Fetch a meta.json from a given URL and return as VelarComponentMeta
 * @param metaUrl - URL to fetch meta.json from
 * @returns Promise resolving to VelarComponentMeta
 * @throws NetworkError if fetch or parsing fails
 */
export declare function fetchComponentMetaFromUrl(metaUrl: string): Promise<VelarComponentMeta>;
/**
 * Fetch the GitHub registry data
 * @param branch - Git branch to fetch from (default: "main")
 * @returns Promise resolving to RegistryData
 * @throws NetworkError if fetch fails
 */
export declare function fetchGitHubRegistry(branch?: string): Promise<RegistryData>;
/**
 * Fetch component metadata from GitHub
 * @param componentName - Name of the component to fetch
 * @returns Promise resolving to GitHubFile
 * @throws ComponentNotFoundError if component doesn't exist
 * @throws NetworkError if fetch fails
 */
export declare function fetchComponent(componentName: string): Promise<GitHubFile>;
/**
 * Fetch a component file content from GitHub
 * @param componentName - Name of the component
 * @param filePath - Path to the file within the component directory
 * @returns Promise resolving to file content as string
 * @throws ComponentNotFoundError if component or file doesn't exist
 * @throws NetworkError if fetch fails
 */
export declare function fetchComponentFile(componentName: string, filePath: string): Promise<string>;
//# sourceMappingURL=remote-registry.d.ts.map
import type { AddResult } from "@/src/types";
import type { IConfigManager, IFileSystemService, IRegistryService } from "@/src/types/interfaces";
/**
 * Service for managing component operations
 */
export declare class ComponentService {
    private readonly registryService;
    private readonly configManager?;
    private readonly fileSystem;
    /**
     * Create a new ComponentService instance
     * @param registryService - Service for registry operations
     * @param fileSystem - Optional file system service (creates new one if not provided)
     * @param configManager - Service for configuration management
     */
    constructor(registryService: IRegistryService, fileSystem?: IFileSystemService, configManager?: IConfigManager);
    /**
     * Add multiple components to the project
     * @param componentNames - Array of component names to add
     * @returns Promise resolving to result of the operation
     */
    addComponents(componentNames: readonly string[]): Promise<AddResult>;
    /**
     * Add a single component to the project
     * @param componentName - Name of the component to add
     * @returns Promise resolving to result of the operation
     * @throws Error if component fetch fails
     */
    private addComponent;
    /**
     * Automatically import component JS into the main JS entry
     * @param componentName - Name of the component
     */
    private autoImportJs;
    /**
     * Get the destination path for a component file
     * @param component - Component metadata
     * @param file - File metadata
     * @param componentsPath - Base components path
     * @returns Destination file path
     */
    private getDestinationPath;
    /**
     * Handle file conflict by prompting user
     * @param filePath - Path of the conflicting file
     * @returns Promise resolving to user action ("skip", "overwrite", or "cancel")
     */
    private handleFileConflict;
    private applyFileBatch;
}
//# sourceMappingURL=ComponentService.d.ts.map
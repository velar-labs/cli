import type { AddResult, RegistryData } from "../types/index.js";
import type { IRegistryService } from "../types/interfaces.js";
import type { IConfigManager } from "../types/interfaces.js";
import { ComponentService } from "./ComponentService.js";
/**
 * Service for handling component addition operations
 */
export declare class AddService {
    private readonly registryService;
    private readonly configManager;
    private readonly componentService;
    /**
     * Create a new AddService instance
     * @param registryService - Service for registry operations
     * @param configManager - Service for configuration management
     * @param componentService - Optional component service (creates new one if not provided)
     */
    constructor(registryService: IRegistryService, configManager: IConfigManager, componentService?: ComponentService);
    /**
     * Validate that Velar is initialized
     * @throws Error if not initialized
     */
    validateInitialization(): void;
    /**
     * Validate that components exist in the registry
     * @param componentNames - Names of components to validate
     * @param registry - Registry data
     * @throws Error if any component is not found
     */
    validateComponents(componentNames: readonly string[], registry: RegistryData): void;
    /**
     * Get available components from registry
     * @returns Promise resolving to registry data
     * @throws NetworkError if fetch fails
     */
    getAvailableComponents(): Promise<RegistryData>;
    /**
     * Add components to the project
     * @param componentNames - Names of components to add
     * @returns Promise resolving to result of the operation
     */
    addComponents(componentNames: readonly string[]): Promise<AddResult>;
    /**
     * Display the results of adding components
     * @param result - Result of the add operation
     */
    displayResults(result: AddResult): void;
    /**
     * Display next steps after adding components
     * @param result - Result of the add operation
     */
    displayNextSteps(result: AddResult): void;
}
//# sourceMappingURL=AddService.d.ts.map
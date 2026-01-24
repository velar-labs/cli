import path from "path";
import { RegistryService } from "./RegistryService.js";
import { ConfigManager } from "../config/ConfigManager.js";
import { FileSystemService } from "./FileSystemService.js";
import type { VelarComponentMeta, RegistryData } from "../types/index.js";

/**
 * Service for the business logic of the 'list' command
 */
export class ListService {
  constructor(
    private readonly registryService: RegistryService,
    private readonly configManager: ConfigManager,
    private readonly fileSystem: FileSystemService,
  ) {}

  /**
   * Fetches the component registry
   * @returns Component registry
   */
  async fetchRegistry(): Promise<RegistryData> {
    return await this.registryService.fetchRegistry();
  }

  /**
   * Checks if a component is already installed in the project
   * @param component - Component metadata
   * @returns True if the component is installed
   */
  async isComponentInstalled(component: VelarComponentMeta): Promise<boolean> {
    try {
      if (!this.configManager.validate()) {
        await this.configManager.load();
      }
      
      const componentsPath = this.configManager.getComponentsPath();
      // Check if the main blade file exists
      const componentPath = path.join(
        componentsPath,
        `${component.name}.blade.php`,
      );
      
      return await this.fileSystem.fileExists(componentPath);
    } catch {
      return false;
    }
  }

  /**
   * Sorts components by name
   * @param components - List of components
   * @returns Sorted list
   */
  sortComponents(components: readonly VelarComponentMeta[]): VelarComponentMeta[] {
    return [...components].sort((a, b) => a.name.localeCompare(b.name));
  }
}

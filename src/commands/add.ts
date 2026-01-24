#!/usr/bin/env node
import { Command } from "commander";
import * as p from "@clack/prompts";
import { RegistryService } from "../services/RegistryService.js";
import { ConfigManager } from "../config/ConfigManager.js";
import { AddService } from "../services/AddService.js";
import { ErrorHandler } from "../errors/ErrorHandler.js";
import { logger } from "../utils/logger.js";

/**
 * Prompt user to select components
 * @param availableComponents - List of available component names
 * @returns Selected component names or undefined if aborted
 */
async function promptComponentSelection(
  availableComponents: readonly string[],
): Promise<string[] | undefined> {
  const selected = await p.multiselect({
    message: "Select components to add",
    options: availableComponents.map((name) => ({ label: name, value: name })),
    required: true,
  });

  if (p.isCancel(selected)) {
    return undefined;
  }

  return selected as string[];
}

/**
 * Register the 'add' command with the CLI program
 * @param program - Commander program instance
 */
export default function registerAddCommand(program: Command): void {
  program
    .command("add")
    .argument("[components...]", "Names of components to add")
    .description("Add one or more UI components to your Laravel project")
    .action(async (components?: string[]) => {
      const errorHandler = new ErrorHandler();

      try {
        // 1. Initialize services
        const configManager = new ConfigManager();
        await configManager.load();

        const registryService = new RegistryService();
        const addService = new AddService(registryService, configManager);

        // 2. Validate initialization
        try {
          addService.validateInitialization();
        } catch {
          logger.error("Velar is not initialized");
          logger.step("Run velar init first");
          process.exit(1);
        }

        // 3. Load registry (spinner handle inside addService/registryService)
        const registry = await addService.getAvailableComponents();

        // 4. Prompt for components if none provided
        let componentNames = components;
        if (!componentNames || componentNames.length === 0) {
          const available = registry.components.map((c) => c.name);
          const selected = await promptComponentSelection(available.sort((a, b) => a.localeCompare(b)));

          if (!selected || selected.length === 0) {
            logger.warning("No component selected");
            process.exit(0);
          }
          componentNames = selected;
        }

        // 5. Validate components exist
        try {
          addService.validateComponents(componentNames, registry);
        } catch (err) {
          logger.error((err as Error).message);
          logger.step("Run velar list to see available components");
          process.exit(1);
        }

        // 6. Add components
        const result = await addService.addComponents(componentNames);

        // 7. Display results
        addService.displayResults(result);
        addService.displayNextSteps(result);
      } catch (error) {
        errorHandler.handle(error as Error, "add command");
        process.exit(1);
      }
    });
}

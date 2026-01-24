import chalk from "chalk";
import { Command } from "commander";
import Table from "cli-table3";
import { ConfigManager } from "../config/ConfigManager.js";
import { ErrorHandler } from "../errors/ErrorHandler.js";
import { FileSystemService } from "../services/FileSystemService.js";
import { RegistryService } from "../services/RegistryService.js";
import { ListService } from "../services/ListService.js";
import { logger } from "../utils/logger.js";

/**
 * Register the 'list' command with the CLI program
 * @param program - Commander program instance
 */
export default function registerListCommand(program: Command): void {
  program
    .command("list")
    .description("List available UI components from the registry")
    .action(async () => {
      const errorHandler = new ErrorHandler();

      try {
        // 1. Initialize services
        const registryService = new RegistryService();
        const configManager = new ConfigManager();
        const fileSystem = new FileSystemService();
        const listService = new ListService(
          registryService,
          configManager,
          fileSystem,
        );

        // 2. Fetch registry (spinner handle inside registryService)
        const registry = await listService.fetchRegistry();

        if (registry.components.length === 0) {
          logger.warning("No components found in the registry.");
          return;
        }

        console.log(chalk.bold("\nAvailable components:"));
        console.log("");

        const sortedComponents = listService.sortComponents(registry.components);

        const table = new Table({
          head: [
            chalk.bold("Component"),
            chalk.bold("Status"),
            chalk.bold("Description"),
          ],
          colWidths: [20, 15, 50],
          wordWrap: true,
          style: {
            head: [],
            border: [],
          },
        });

        for (const component of sortedComponents) {
          const isInstalled = await listService.isComponentInstalled(component);
          const status = isInstalled
            ? chalk.green("Installed")
            : chalk.gray("-");

          table.push([
            chalk.cyan(component.name),
            status,
            chalk.white(component.description || "No description"),
          ]);
        }

        console.log(table.toString());

        console.log("");
        logger.info(
          `Run ${chalk.green("velar add <component>")} to add a component to your project.`,
        );
      } catch (error) {
        errorHandler.handle(error as Error, "list command");
        process.exit(1);
      }
    });
}

import { Command } from "commander";

/**
 * Register the 'list' command with the CLI program
 * @param program - Commander program instance
 */
export default function registerListCommand(program: Command): void {
  program
    .command("list")
    .description("List available UI components from the registry")
    .action(async () => {
      console.log("Not implemented yet.");
    });
}

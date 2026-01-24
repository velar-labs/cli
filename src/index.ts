import chalk from "chalk";
import { Command } from "commander";
import registerInitCommand from "./commands/init.js";
import registerAddCommand from "./commands/add.js";
import registerListCommand from "./commands/list.js";

/**
 * Display a nice introduction banner
 */
function displayIntro(): void {
  console.log("");
  console.log(chalk.bold.cyan("  ▼ VELAR CLI v0.1.0"));
  console.log(chalk.gray("  Tailwind CSS v4+ components for Laravel"));
  console.log("");
}

/**
 * Velar CLI program entry point
 */
const program = new Command();
program
  .name("velar")
  .description("Velar CLI: Copy UI components into your Laravel project")
  .version("0.1.0")
  .hook("preAction", () => {
    displayIntro();
  });

registerInitCommand(program);
registerAddCommand(program);
registerListCommand(program);

program.parse(process.argv);

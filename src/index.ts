import chalk from "chalk";
import { Command } from "commander";
import { init } from "@/src/commands/init";
import { add } from "@/src/commands/add";
import { search } from "@/src/commands/list";

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

program
  .addCommand(add)
  .addCommand(init)
  .addCommand(search);

program.parse(process.argv);

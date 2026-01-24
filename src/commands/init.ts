import { Command } from "commander";
import prompts from "prompts";
import { logger } from "../utils/logger.js";
import { FileSystemService } from "../services/FileSystemService.js";
import { InitService } from "../services/InitService.js";
import { THEMES } from "../utils/theme.js";
import type { PackageManager, VelarTheme } from "../types/index.js";

/**
 * Prompt user to select package manager
 * @param detectedPm - Detected package manager
 * @returns Selected package manager or undefined if aborted
 */
async function promptPackageManager(
  detectedPm: PackageManager,
): Promise<PackageManager | undefined> {
  const packageManagerPrompt = await prompts({
    type: "select",
    name: "packageManager",
    message: "Which package manager are you using?",
    choices: [
      { title: "npm", value: "npm" },
      { title: "yarn", value: "yarn" },
      { title: "pnpm", value: "pnpm" },
      { title: "bun", value: "bun" },
    ],
    initial: ["npm", "yarn", "pnpm", "bun"].indexOf(detectedPm),
  });

  return packageManagerPrompt.packageManager as PackageManager | undefined;
}

/**
 * Prompt user to select theme
 * @returns Selected theme or undefined if aborted
 */
async function promptTheme(): Promise<VelarTheme | undefined> {
  const themePrompt = await prompts({
    type: "select",
    name: "theme",
    message: "Choose a base color theme",
    choices: THEMES.map((t) => ({
      title: t.charAt(0).toUpperCase() + t.slice(1),
      value: t,
    })),
    initial: 0,
  });

  return themePrompt.theme as VelarTheme | undefined;
}

/**
 * Prompt user to confirm style import
 * @returns True if user wants to import styles
 */
async function promptStyleImport(): Promise<boolean> {
  const res = await prompts({
    type: "confirm",
    name: "import",
    message: "Import Velar styles into your main CSS file?",
    initial: true,
  });

  return Boolean(res.import);
}

/**
 * Register the 'init' command with the CLI program
 * @param program - Commander program instance
 */
export default function registerInitCommand(program: Command): void {
  program
    .command("init")
    .description("Initialize Velar in a Laravel project")
    .action(async () => {
      const fileSystem = new FileSystemService();
      const initService = new InitService(fileSystem);

      try {
        // 1. Validate environment
        const validation = initService.validateEnvironment();
        initService.displayEnvironmentInfo(validation);

        // 2. Prompt for package manager
        const packageManager = await promptPackageManager(
          validation.detectedPackageManager,
        );
        if (!packageManager) {
          logger.error("Package manager selection aborted");
          process.exit(1);
        }

        // 3. Prompt for theme
        const theme = await promptTheme();
        if (!theme) {
          logger.error("Theme selection aborted");
          process.exit(1);
        }

        // 4. Create directories and files
        await initService.createComponentsDirectory();
        await initService.createThemeFile(theme);

        // 5. Handle style import
        let stylesImported = false;
        if (validation.cssFile && validation.canInjectCss) {
          const shouldImport = await promptStyleImport();
          if (shouldImport) {
            await initService.injectStylesImport(validation.cssFile.path);
            stylesImported = true;
          }
        }

        // 6. Generate configuration
        await initService.generateConfig(
          {
            packageManager,
            theme,
            importStyles: stylesImported,
          },
          validation,
        );

        // 7. Display summary
        initService.displaySummary(
          {
            packageManager,
            theme,
            importStyles: stylesImported,
          },
          validation,
          stylesImported,
        );
      } catch (error) {
        logger.error((error as Error).message);
        if (error instanceof Error) {
          if (error.message.includes("Laravel project")) {
            logger.step("Run velar init at the root of a Laravel project");
          } else if (error.message.includes("Tailwind")) {
            logger.step("Velar requires Tailwind CSS v4+");
          }
        }
        process.exit(1);
      }
    });
}

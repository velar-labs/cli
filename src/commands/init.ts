import { Command } from "commander";
import * as p from "@clack/prompts";
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
  const packageManager = await p.select({
    message: "Which package manager are you using?",
    options: [
      { label: "npm", value: "npm" },
      { label: "yarn", value: "yarn" },
      { label: "pnpm", value: "pnpm" },
      { label: "bun", value: "bun" },
    ],
    initialValue: detectedPm,
  });

  if (p.isCancel(packageManager)) {
    return undefined;
  }

  return packageManager as PackageManager;
}

/**
 * Prompt user to select theme
 * @returns Selected theme or undefined if aborted
 */
async function promptTheme(): Promise<VelarTheme | undefined> {
  const theme = await p.select({
    message: "Choose a base color theme",
    options: THEMES.map((t) => ({
      label: t.charAt(0).toUpperCase() + t.slice(1),
      value: t,
    })),
  });

  if (p.isCancel(theme)) {
    return undefined;
  }

  return theme as VelarTheme;
}

/**
 * Prompt user to confirm style import
 * @returns True if user wants to import styles
 */
async function promptStyleImport(): Promise<boolean> {
  const shouldImport = await p.confirm({
    message: "Import Velar styles into your main CSS file?",
    initialValue: true,
  });

  if (p.isCancel(shouldImport)) {
    return false;
  }

  return shouldImport;
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

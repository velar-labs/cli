import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { VelarTheme } from "@/src/types";

/**
 * Available Velar themes
 */
export const THEMES: readonly VelarTheme[] = [
  "neutral",
  "blue",
  "green",
  "orange",
  "red",
  "rose",
  "violet",
  "yellow",
] as const;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_THEMES_DIR = path.resolve(__dirname, "../registry/themes");

/**
 * Copy a theme CSS file to the target location
 * @param theme - Theme name to copy
 * @param target - Target file path
 * @throws Error if theme doesn't exist or copy fails
 */
export function copyTheme(theme: VelarTheme, target: string): void {
  const source = path.join(REGISTRY_THEMES_DIR, `${theme}.css`);
  if (!fs.existsSync(source)) {
    throw new Error(`Theme "${theme}" not found in registry.`);
  }
  fs.copyFileSync(source, target, fs.constants.COPYFILE_EXCL);
}

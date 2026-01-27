import type { VelarTheme } from "@/src/types";
/**
 * Available Velar themes
 */
export declare const THEMES: readonly VelarTheme[];
/**
 * Copy a theme CSS file to the target location
 * @param theme - Theme name to copy
 * @param target - Target file path
 * @throws Error if theme doesn't exist or copy fails
 */
export declare function copyTheme(theme: VelarTheme, target: string): void;
//# sourceMappingURL=theme.d.ts.map
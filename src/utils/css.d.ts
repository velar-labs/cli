import type { FileInfo } from "../types/index.js";
/**
 * Common CSS file paths to check for main stylesheet
 */
export declare const CSS_CANDIDATES: readonly ["resources/css/app.css", "resources/css/app.scss", "resources/css/main.css", "resources/css/style.css", "resources/css/styles.css"];
/**
 * Find the main CSS file in the project
 * @returns CSS file info if found, null otherwise
 */
export declare function findMainCss(): FileInfo | null;
/**
 * Check if CSS content has Tailwind import
 * @param css - CSS content to check
 * @returns True if Tailwind import is found
 */
export declare function hasTailwindImport(css: string): boolean;
/**
 * Inject Velar CSS import into main CSS file
 * @param cssPath - Path to the CSS file
 * @throws Error if file read/write fails
 */
export declare function injectVelarImport(cssPath: string): void;
//# sourceMappingURL=css.d.ts.map
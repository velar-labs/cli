import type { FileInfo } from "../types/index.js";
/**
 * Common JS file paths to check for main script
 */
export declare const JS_CANDIDATES: readonly ["resources/js/app.js", "resources/js/main.js", "resources/js/index.js"];
/**
 * Find the main JS file in the project
 * @returns JS file info if found, null otherwise
 */
export declare function findMainJs(): FileInfo | null;
/**
 * Inject component JS import and Alpine initialization into main JS file
 * @param jsPath - Path to the JS file
 * @param componentName - Name of the component
 * @param componentImportPath - Path to import the component from
 * @throws Error if file read/write fails
 */
export declare function injectComponentJs(jsPath: string, componentName: string, componentImportPath: string): void;
//# sourceMappingURL=js.d.ts.map
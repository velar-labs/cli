/**
 * Package.json structure
 */
interface PackageJson {
    dependencies?: Readonly<Record<string, string>>;
    devDependencies?: Readonly<Record<string, string>>;
}
/**
 * Read package.json file
 * @returns Package.json object or null if file doesn't exist or is invalid
 */
export declare function readPackageJson(): PackageJson | null;
/**
 * Detect if Tailwind CSS v4 is installed
 * @param pkg - Package.json object
 * @returns True if Tailwind v4 is detected
 */
export declare function detectTailwindV4(pkg: PackageJson): boolean;
export {};
//# sourceMappingURL=tailwind.d.ts.map
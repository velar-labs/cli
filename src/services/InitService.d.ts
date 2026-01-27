import type { PackageManager, VelarTheme, FileInfo } from "../types/index.js";
import type { IFileSystemService } from "../types/interfaces.js";
/**
 * Environment validation result
 */
export interface EnvironmentValidation {
    /** Whether Laravel project is detected */
    isLaravel: boolean;
    /** Whether Tailwind v4 is detected */
    hasTailwindV4: boolean;
    /** Whether Alpine.js is detected */
    hasAlpine: boolean;
    /** Whether Livewire is detected */
    hasLivewire: boolean;
    /** Detected package manager */
    detectedPackageManager: PackageManager;
    /** Main CSS file info if found */
    cssFile: FileInfo | null;
    /** Main JS file info if found */
    jsFile: FileInfo | null;
    /** Whether CSS can be injected */
    canInjectCss: boolean;
}
/**
 * Initialization options
 */
export interface InitOptions {
    /** Selected package manager */
    packageManager: PackageManager;
    /** Selected theme */
    theme: VelarTheme;
    /** Whether to import styles */
    importStyles: boolean;
}
/**
 * Service for handling Velar initialization
 */
export declare class InitService {
    private readonly fileSystem;
    /**
     * Create a new InitService instance
     * @param fileSystem - File system service
     */
    constructor(fileSystem: IFileSystemService);
    /**
     * Validate the project environment
     * @returns Environment validation result
     * @throws Error if critical requirements are not met
     */
    validateEnvironment(): EnvironmentValidation;
    /**
     * Display environment information and warnings
     * @param validation - Environment validation result
     */
    displayEnvironmentInfo(validation: EnvironmentValidation): void;
    /**
     * Create the UI components directory
     * @param path - Directory path (default: "resources/views/components/ui")
     * @returns Promise that resolves when directory is created
     */
    createComponentsDirectory(path?: string): Promise<void>;
    /**
     * Create the Velar theme CSS file
     * @param theme - Theme to use
     * @param targetPath - Target CSS file path (default: "resources/css/velar.css")
     * @returns Promise that resolves when theme is created
     * @throws Error if theme creation fails
     */
    createThemeFile(theme: VelarTheme, targetPath?: string): Promise<void>;
    /**
     * Inject Velar styles import into main CSS file
     * @param cssPath - Path to main CSS file
     * @returns Promise that resolves when import is injected
     */
    injectStylesImport(cssPath: string): Promise<void>;
    /**
     * Generate and write Velar configuration file
     * @param options - Initialization options
     * @param validation - Environment validation result
     * @returns Promise that resolves when config is written
     */
    generateConfig(options: InitOptions, validation: EnvironmentValidation): Promise<void>;
    /**
     * Display initialization summary
     * @param options - Initialization options
     * @param validation - Environment validation result
     * @param stylesImported - Whether styles were imported
     */
    displaySummary(options: InitOptions, validation: EnvironmentValidation, stylesImported: boolean): void;
}
//# sourceMappingURL=InitService.d.ts.map
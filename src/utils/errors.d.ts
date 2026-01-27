export declare const RegistryErrorCode: {
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly FETCH_ERROR: "FETCH_ERROR";
    readonly NOT_CONFIGURED: "NOT_CONFIGURED";
    readonly INVALID_CONFIG: "INVALID_CONFIG";
    readonly MISSING_ENV_VARS: "MISSING_ENV_VARS";
    readonly LOCAL_FILE_ERROR: "LOCAL_FILE_ERROR";
    readonly PARSE_ERROR: "PARSE_ERROR";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly UNKNOWN_ERROR: "UNKNOWN_ERROR";
};
export type RegistryErrorCode = (typeof RegistryErrorCode)[keyof typeof RegistryErrorCode];
export declare class RegistryError extends Error {
    readonly code: RegistryErrorCode;
    readonly statusCode?: number;
    readonly context?: Record<string, unknown>;
    readonly suggestion?: string;
    readonly timestamp: Date;
    readonly cause?: unknown;
    constructor(message: string, options?: {
        code?: RegistryErrorCode;
        statusCode?: number;
        cause?: unknown;
        context?: Record<string, unknown>;
        suggestion?: string;
    });
    toJSON(): {
        name: string;
        message: string;
        code: RegistryErrorCode;
        statusCode: number | undefined;
        context: Record<string, unknown> | undefined;
        suggestion: string | undefined;
        timestamp: Date;
        stack: string | undefined;
    };
}
export declare class RegistryNotFoundError extends RegistryError {
    readonly url: string;
    constructor(url: string, cause?: unknown);
}
export declare class RegistryUnauthorizedError extends RegistryError {
    readonly url: string;
    constructor(url: string, cause?: unknown);
}
export declare class RegistryForbiddenError extends RegistryError {
    readonly url: string;
    constructor(url: string, cause?: unknown);
}
export declare class RegistryFetchError extends RegistryError {
    readonly url: string;
    readonly responseBody?: string | undefined;
    constructor(url: string, statusCode?: number, responseBody?: string | undefined, cause?: unknown);
}
export declare class RegistryNotConfiguredError extends RegistryError {
    readonly registryName: string | null;
    constructor(registryName: string | null);
}
export declare class RegistryLocalFileError extends RegistryError {
    readonly filePath: string;
    constructor(filePath: string, cause?: unknown);
}
export declare class RegistryParseError extends RegistryError {
    readonly item: string;
    readonly parseError: unknown;
    constructor(item: string, parseError: unknown);
}
export declare class RegistryMissingEnvironmentVariablesError extends RegistryError {
    readonly registryName: string;
    readonly missingVars: string[];
    constructor(registryName: string, missingVars: string[]);
}
export declare class RegistryInvalidNamespaceError extends RegistryError {
    readonly name: string;
    constructor(name: string);
}
export declare class ConfigMissingError extends RegistryError {
    readonly cwd: string;
    constructor(cwd: string);
}
export declare class ConfigParseError extends RegistryError {
    readonly cwd: string;
    constructor(cwd: string, parseError: unknown);
}
export declare class RegistriesIndexParseError extends RegistryError {
    readonly parseError: unknown;
    constructor(parseError: unknown);
}
export declare class InvalidConfigIconLibraryError extends RegistryError {
    readonly iconLibrary: string;
    readonly validOptions: string[];
    constructor(iconLibrary: string, validOptions: string[]);
}
export declare const MISSING_DIR_OR_EMPTY_PROJECT = "1";
export declare const EXISTING_CONFIG = "2";
export declare const MISSING_CONFIG = "3";
export declare const FAILED_CONFIG_READ = "4";
export declare const TAILWIND_NOT_CONFIGURED = "5";
export declare const IMPORT_ALIAS_MISSING = "6";
export declare const UNSUPPORTED_FRAMEWORK = "7";
export declare const COMPONENT_URL_NOT_FOUND = "8";
export declare const COMPONENT_URL_UNAUTHORIZED = "9";
export declare const COMPONENT_URL_FORBIDDEN = "10";
export declare const COMPONENT_URL_BAD_REQUEST = "11";
export declare const COMPONENT_URL_INTERNAL_SERVER_ERROR = "12";
export declare const BUILD_MISSING_REGISTRY_FILE = "13";
export declare const INVALID_CONFIG_ICON_LIBRARY = "14";
//# sourceMappingURL=errors.d.ts.map
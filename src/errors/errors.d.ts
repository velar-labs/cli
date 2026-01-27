/**
 * Base error class for registry-related errors
 */
export declare class RegistryError extends Error {
    readonly cause?: Error | undefined;
    /**
     * Create a new RegistryError
     * @param message - Error message
     * @param cause - Original error that caused this error
     */
    constructor(message: string, cause?: Error | undefined);
}
/**
 * Error thrown when a network request fails
 */
export declare class NetworkError extends RegistryError {
    /**
     * Create a new NetworkError
     * @param message - Error message
     * @param cause - Original error that caused this error
     */
    constructor(message: string, cause?: Error);
}
/**
 * Error thrown when a component is not found in the registry
 */
export declare class ComponentNotFoundError extends RegistryError {
    /**
     * Create a new ComponentNotFoundError
     * @param componentName - Name of the component that was not found
     * @param cause - Original error that caused this error
     */
    constructor(componentName: string, cause?: Error);
}
//# sourceMappingURL=errors.d.ts.map
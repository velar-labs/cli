/**
 * Custom error class for Velar-specific errors with code and context
 */
export declare class VelarError extends Error {
    readonly code: string;
    readonly context?: Readonly<Record<string, unknown>> | undefined;
    /**
     * Create a new VelarError
     * @param message - Error message
     * @param code - Error code for categorization
     * @param context - Additional context data
     */
    constructor(message: string, code: string, context?: Readonly<Record<string, unknown>> | undefined);
}
/**
 * Handles and formats errors for display
 */
export declare class ErrorHandler {
    /**
     * Handle an error and display it appropriately
     * @param error - Error to handle
     * @param context - Context where the error occurred
     */
    handle(error: Error, context: string): void;
}
//# sourceMappingURL=ErrorHandler.d.ts.map
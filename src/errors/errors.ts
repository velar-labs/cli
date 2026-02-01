/**
 * Base error class for registry-related errors
 */
export class RegistryError extends Error {
  /**
   * Create a new RegistryError
   * @param message - Error message
   * @param cause - Original error that caused this error
   */
  constructor(
    message: string,
    public readonly cause?: Error,
  ) {
    super(message)
    this.name = 'RegistryError'
  }
}

/**
 * Error thrown when a network request fails
 */
export class NetworkError extends RegistryError {
  /**
   * Create a new NetworkError
   * @param message - Error message
   * @param cause - Original error that caused this error
   */
  constructor(message: string, cause?: Error) {
    super(message, cause)
    this.name = 'NetworkError'
  }
}

/**
 * Error thrown when a component is not found in the registry
 */
export class ComponentNotFoundError extends RegistryError {
  /**
   * Create a new ComponentNotFoundError
   * @param componentName - Name of the component that was not found
   * @param cause - Original error that caused this error
   */
  constructor(componentName: string, cause?: Error) {
    super(`Component "${componentName}" not found`, cause)
    this.name = 'ComponentNotFoundError'
  }
}

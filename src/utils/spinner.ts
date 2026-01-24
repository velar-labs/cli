import ora, { type Ora } from "ora";

/**
 * Utility to manage loading spinners
 */
export const spinner = {
  /**
   * Starts a spinner with a message
   * @param message - Message to display
   * @returns Ora spinner instance
   */
  start(message: string): Ora {
    return ora(message).start();
  },

  /**
   * Executes an asynchronous task with a spinner
   * @param message - Message during loading
   * @param task - Asynchronous function to execute
   * @param successMessage - Optional success message
   * @param failMessage - Optional error message
   * @returns Task result
   */
  async withTask<T>(
    message: string,
    task: () => Promise<T>,
    successMessage?: string,
    failMessage?: string,
  ): Promise<T> {
    const s = this.start(message);
    try {
      const result = await task();
      if (successMessage) {
        s.succeed(successMessage);
      } else {
        s.stop();
      }
      return result;
    } catch (error) {
      s.fail(failMessage || "Operation failed");
      throw error;
    }
  },
};

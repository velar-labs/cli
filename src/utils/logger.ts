import chalk from "chalk";
import logSymbols from "log-symbols";

/**
 * Logger utility for formatted console output
 */
export const logger = {
  /**
   * Log an error message
   * @param message - Error message
   * @param details - Optional details to display
   */
  error: (message: string, details?: string): void => {
    console.error(chalk.red(logSymbols.error), message);
    if (details) {
      console.error(chalk.gray("→"), details);
    }
  },

  /**
   * Log a success message
   * @param message - Success message
   */
  success: (message: string): void => {
    console.log(chalk.green(logSymbols.success), message);
  },

  /**
   * Log a warning message
   * @param message - Warning message
   */
  warning: (message: string): void => {
    console.log(chalk.yellow(logSymbols.warning), message);
  },

  /**
   * Log an info message
   * @param message - Info message
   */
  info: (message: string): void => {
    console.log(chalk.blue(logSymbols.info), message);
  },

  /**
   * Log a step message
   * @param message - Step message
   */
  step: (message: string): void => {
    console.log(chalk.cyan("→"), message);
  },
};

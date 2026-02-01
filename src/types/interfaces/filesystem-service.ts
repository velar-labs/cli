/**
 * Interface for file system operations
 */
export interface IFileSystemService {
  /**
   * Check if a file exists
   * @param filePath - Path to check
   * @returns Promise resolving to true if file exists
   */
  fileExists(filePath: string): Promise<boolean>;

  /**
   * Write content to a file
   * @param filePath - Path to write to
   * @param content - Content to write
   * @returns Promise that resolves when file is written
   */
  writeFile(filePath: string, content: string): Promise<void>;

  /**
   * Read content from a file
   * @param filePath - Path to read from
   * @returns Promise resolving to file content
   */
  readFile(filePath: string): Promise<string>;

  /**
   * Ensure a directory exists, creating it if necessary
   * @param dirPath - Directory path
   * @returns Promise that resolves when directory is ensured
   */
  ensureDir(dirPath: string): Promise<void>;
}

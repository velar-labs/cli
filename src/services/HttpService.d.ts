import type { FetchOptions } from "../types/index.js";
/**
 * HTTP service with retry logic and timeout support
 */
export declare class HttpService {
    /**
     * Fetch a URL with retry logic and timeout
     * @param url - URL to fetch
     * @param options - Fetch options including retry configuration
     * @returns Promise resolving to Response
     * @throws NetworkError if all retries fail
     */
    fetch(url: string, options?: FetchOptions): Promise<Response>;
    /**
     * Fetch JSON from a URL with retry logic
     * @param url - URL to fetch
     * @param options - Fetch options
     * @returns Promise resolving to parsed JSON
     * @throws NetworkError if fetch or parsing fails
     */
    fetchJson<T>(url: string, options?: FetchOptions): Promise<T>;
    /**
     * Fetch text from a URL with retry logic
     * @param url - URL to fetch
     * @param options - Fetch options
     * @returns Promise resolving to text content
     * @throws NetworkError if fetch fails
     */
    fetchText(url: string, options?: FetchOptions): Promise<string>;
}
//# sourceMappingURL=HttpService.d.ts.map
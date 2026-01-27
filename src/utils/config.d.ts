import type { VelarConfig } from "../types/index.js";
/**
 * Write Velar configuration to velar.json file
 * @param config - Configuration object to write
 * @throws Error if file write fails
 */
export declare function writeVelarConfig(config: VelarConfig): void;
/**
 * Read Velar configuration from velar.json file
 * @returns Configuration object
 * @throws Error if file doesn't exist or is invalid
 */
export declare function readVelarConfig(): VelarConfig;
//# sourceMappingURL=config.d.ts.map
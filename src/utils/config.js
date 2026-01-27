"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVelarConfig = writeVelarConfig;
exports.readVelarConfig = readVelarConfig;
var fs_1 = __importDefault(require("fs"));
/**
 * Write Velar configuration to velar.json file
 * @param config - Configuration object to write
 * @throws Error if file write fails
 */
function writeVelarConfig(config) {
    fs_1.default.writeFileSync("velar.json", JSON.stringify(config, null, 2) + "\n", "utf8");
}
/**
 * Read Velar configuration from velar.json file
 * @returns Configuration object
 * @throws Error if file doesn't exist or is invalid
 */
function readVelarConfig() {
    if (!fs_1.default.existsSync("velar.json")) {
        throw new Error("Velar configuration not found.");
    }
    return JSON.parse(fs_1.default.readFileSync("velar.json", "utf8"));
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPackageManager = detectPackageManager;
var fs_1 = __importDefault(require("fs"));
/**
 * Detect the package manager used in the project
 * @returns Detected package manager name (defaults to "npm")
 */
function detectPackageManager() {
    // Check lock files
    if (fs_1.default.existsSync("pnpm-lock.yaml") || fs_1.default.existsSync("pnpm-lock.yml")) {
        return "pnpm";
    }
    if (fs_1.default.existsSync("yarn.lock")) {
        return "yarn";
    }
    if (fs_1.default.existsSync("package-lock.json")) {
        return "npm";
    }
    if (fs_1.default.existsSync("bun.lockb")) {
        return "bun";
    }
    // Default to npm
    return "npm";
}

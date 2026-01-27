"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLaravelProject = isLaravelProject;
var fs_1 = __importDefault(require("fs"));
/**
 * Check if the current directory is a Laravel project
 * @returns True if Laravel project is detected
 */
function isLaravelProject() {
    return fs_1.default.existsSync("composer.json") && fs_1.default.existsSync("artisan");
}

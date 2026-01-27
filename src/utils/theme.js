"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.THEMES = void 0;
exports.copyTheme = copyTheme;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var url_1 = require("url");
/**
 * Available Velar themes
 */
exports.THEMES = [
    "neutral",
    "blue",
    "green",
    "orange",
    "red",
    "rose",
    "violet",
    "yellow",
];
var __dirname = path_1.default.dirname((0, url_1.fileURLToPath)(import.meta.url));
var REGISTRY_THEMES_DIR = path_1.default.resolve(__dirname, "../registry/themes");
/**
 * Copy a theme CSS file to the target location
 * @param theme - Theme name to copy
 * @param target - Target file path
 * @throws Error if theme doesn't exist or copy fails
 */
function copyTheme(theme, target) {
    var source = path_1.default.join(REGISTRY_THEMES_DIR, "".concat(theme, ".css"));
    if (!fs_1.default.existsSync(source)) {
        throw new Error("Theme \"".concat(theme, "\" not found in registry."));
    }
    fs_1.default.copyFileSync(source, target, fs_1.default.constants.COPYFILE_EXCL);
}

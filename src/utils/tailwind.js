"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPackageJson = readPackageJson;
exports.detectTailwindV4 = detectTailwindV4;
var fs_1 = __importDefault(require("fs"));
/**
 * Read package.json file
 * @returns Package.json object or null if file doesn't exist or is invalid
 */
function readPackageJson() {
    try {
        return JSON.parse(fs_1.default.readFileSync("package.json", "utf8"));
    }
    catch (_a) {
        return null;
    }
}
/**
 * Detect if Tailwind CSS v4 is installed
 * @param pkg - Package.json object
 * @returns True if Tailwind v4 is detected
 */
function detectTailwindV4(pkg) {
    var deps = __assign(__assign({}, pkg.dependencies), pkg.devDependencies);
    if (deps["@tailwindcss/vite"] || deps["@tailwindcss/postcss"]) {
        return true;
    }
    if (deps["tailwindcss"]) {
        var version = String(deps["tailwindcss"]);
        var match = version.match(/(\d+)/);
        return match ? Number(match[1]) >= 4 : false;
    }
    return false;
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAlpineInPackageJson = hasAlpineInPackageJson;
exports.hasAlpineInLayouts = hasAlpineInLayouts;
exports.hasLivewire = hasLivewire;
exports.hasAlpineJs = hasAlpineJs;
exports.hasInteractivitySupport = hasInteractivitySupport;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
 * Check if Alpine.js is listed in package.json dependencies
 * @returns True if Alpine.js is found in dependencies
 */
function hasAlpineInPackageJson() {
    try {
        var pkg = JSON.parse(fs_1.default.readFileSync("package.json", "utf8"));
        var hasInDeps = pkg.dependencies &&
            Object.keys(pkg.dependencies).some(function (dep) {
                return dep.toLowerCase().includes("alpine");
            });
        var hasInDevDeps = pkg.devDependencies &&
            Object.keys(pkg.devDependencies).some(function (dep) {
                return dep.toLowerCase().includes("alpine");
            });
        return Boolean(hasInDeps || hasInDevDeps);
    }
    catch (_a) {
        return false;
    }
}
/**
 * Check if Alpine.js is referenced in layout files
 * @returns True if Alpine.js is found in layout files
 */
function hasAlpineInLayouts() {
    var layoutDir = "resources/views/layouts";
    if (!fs_1.default.existsSync(layoutDir))
        return false;
    try {
        var files = fs_1.default.readdirSync(layoutDir, { recursive: true });
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (file.endsWith(".blade.php")) {
                var content = fs_1.default.readFileSync(path_1.default.join(layoutDir, file), "utf8");
                if (content.toLowerCase().includes("alpine")) {
                    return true;
                }
            }
        }
    }
    catch (_a) {
        return false;
    }
    return false;
}
/**
 * Check if Livewire is installed via Composer
 * @returns True if Livewire is found in composer.json
 */
function hasLivewire() {
    try {
        var composer = JSON.parse(fs_1.default.readFileSync("composer.json", "utf8"));
        var hasInRequire = composer.require &&
            Object.keys(composer.require).some(function (dep) {
                return dep.toLowerCase().includes("livewire");
            });
        var hasInRequireDev = composer["require-dev"] &&
            Object.keys(composer["require-dev"]).some(function (dep) {
                return dep.toLowerCase().includes("livewire");
            });
        return Boolean(hasInRequire || hasInRequireDev);
    }
    catch (_a) {
        return false;
    }
}
/**
 * Check if Alpine.js is available in the project
 * @returns True if Alpine.js is detected
 */
function hasAlpineJs() {
    return hasAlpineInPackageJson() || hasAlpineInLayouts();
}
/**
 * Check if project has interactivity support (Alpine.js or Livewire)
 * @returns True if interactivity framework is detected
 */
function hasInteractivitySupport() {
    return hasAlpineJs() || hasLivewire();
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JS_CANDIDATES = void 0;
exports.findMainJs = findMainJs;
exports.injectComponentJs = injectComponentJs;
var fs_1 = __importDefault(require("fs"));
/**
 * Common JS file paths to check for main script
 */
exports.JS_CANDIDATES = [
    "resources/js/app.js",
    "resources/js/main.js",
    "resources/js/index.js",
];
/**
 * Find the main JS file in the project
 * @returns JS file info if found, null otherwise
 */
function findMainJs() {
    for (var _i = 0, JS_CANDIDATES_1 = exports.JS_CANDIDATES; _i < JS_CANDIDATES_1.length; _i++) {
        var rel = JS_CANDIDATES_1[_i];
        if (fs_1.default.existsSync(rel)) {
            return {
                path: rel,
                content: fs_1.default.readFileSync(rel, "utf8"),
            };
        }
    }
    return null;
}
/**
 * Inject component JS import and Alpine initialization into main JS file
 * @param jsPath - Path to the JS file
 * @param componentName - Name of the component
 * @param componentImportPath - Path to import the component from
 * @throws Error if file read/write fails
 */
function injectComponentJs(jsPath, componentName, componentImportPath) {
    var _a;
    var content = fs_1.default.readFileSync(jsPath, "utf8");
    // Avoid duplicate imports
    var importStatement = "import ".concat(componentName, " from '").concat(componentImportPath, "'");
    if (content.includes(importStatement) || content.includes("import ".concat(componentName, " from \"").concat(componentImportPath, "\""))) {
        return;
    }
    // Add import at the top (after other imports if possible)
    var lines = content.split("\n");
    var lastImportIndex = -1;
    for (var i = 0; i < lines.length; i++) {
        if ((_a = lines[i]) === null || _a === void 0 ? void 0 : _a.startsWith("import ")) {
            lastImportIndex = i;
        }
    }
    lines.splice(lastImportIndex + 1, 0, importStatement);
    content = lines.join("\n");
    // Handle Alpine.data registration
    var alpineDataRegistration = "Alpine.data('".concat(componentName, "', ").concat(componentName, ");");
    if (content.includes("document.addEventListener('alpine:init'")) {
        // Inject into existing listener
        if (!content.includes(alpineDataRegistration)) {
            content = content.replace(/document\.addEventListener\('alpine:init',\s*\(\)\s*=>\s*\{/, function (match) { return "".concat(match, "\n    ").concat(alpineDataRegistration); });
        }
    }
    else {
        // Create new listener at the end
        content += "\n\ndocument.addEventListener('alpine:init', () => {\n    ".concat(alpineDataRegistration, "\n});\n");
    }
    fs_1.default.writeFileSync(jsPath, content, "utf8");
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS_CANDIDATES = void 0;
exports.findMainCss = findMainCss;
exports.hasTailwindImport = hasTailwindImport;
exports.injectVelarImport = injectVelarImport;
var fs_1 = __importDefault(require("fs"));
/**
 * Common CSS file paths to check for main stylesheet
 */
exports.CSS_CANDIDATES = [
    "resources/css/app.css",
    "resources/css/app.scss",
    "resources/css/main.css",
    "resources/css/style.css",
    "resources/css/styles.css",
];
/**
 * Find the main CSS file in the project
 * @returns CSS file info if found, null otherwise
 */
function findMainCss() {
    for (var _i = 0, CSS_CANDIDATES_1 = exports.CSS_CANDIDATES; _i < CSS_CANDIDATES_1.length; _i++) {
        var rel = CSS_CANDIDATES_1[_i];
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
 * Check if CSS content has Tailwind import
 * @param css - CSS content to check
 * @returns True if Tailwind import is found
 */
function hasTailwindImport(css) {
    return /@import\s+["']tailwindcss["']/.test(css);
}
/**
 * Inject Velar CSS import into main CSS file
 * @param cssPath - Path to the CSS file
 * @throws Error if file read/write fails
 */
function injectVelarImport(cssPath) {
    var content = fs_1.default.readFileSync(cssPath, "utf8");
    if (content.includes('@import "./velar.css"')) {
        return;
    }
    if (hasTailwindImport(content)) {
        content = content.replace(/@import\s+["']tailwindcss["'];?/, function (match) { return "".concat(match, "\n@import \"./velar.css\";"); });
    }
    else {
        content += '\n@import "./velar.css";\n';
    }
    fs_1.default.writeFileSync(cssPath, content, "utf8");
}

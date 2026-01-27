"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_1 = __importDefault(require("@eslint/js"));
var json_1 = __importDefault(require("@eslint/json"));
var markdown_1 = __importDefault(require("@eslint/markdown"));
var config_1 = require("eslint/config");
var globals_1 = __importDefault(require("globals"));
var typescript_eslint_1 = __importDefault(require("typescript-eslint"));
exports.default = (0, config_1.defineConfig)([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js: js_1.default },
        extends: ["js/recommended", "turbo", "prettier"],
        languageOptions: { globals: globals_1.default.browser },
    },
    typescript_eslint_1.default.configs.recommended,
    (0, config_1.globalIgnores)(["node_modules/**", "dist/**", "src/__tests__"]),
    {
        files: ["**/*.jsonc"],
        plugins: { json: json_1.default },
        language: "json/jsonc",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.md"],
        plugins: { markdown: markdown_1.default },
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
    },
], {
    rules: {
        "no-explicit-any": "off",
    },
});

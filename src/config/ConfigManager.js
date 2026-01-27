"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
var config_1 = require("@/src/utils/config");
var logger_1 = require("@/src/utils/logger");
var handle_error_1 = require("@/src/utils/handle-error");
/**
 * Manages Velar configuration loading and access
 */
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
    }
    /**
     * Load configuration from file
     * @returns Promise resolving to configuration
     * @throws Error if configuration not found or invalid
     */
    ConfigManager.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.config = (0, config_1.readVelarConfig)();
                    if (!this.config) {
                        logger_1.logger.error("");
                        (0, handle_error_1.handleError)(new Error("Configuration not found"));
                        process.exit(1);
                    }
                    return [2 /*return*/, this.config];
                }
                catch (error) {
                    logger_1.logger.error("");
                    (0, handle_error_1.handleError)(new Error("Something went wrong. Please try again."));
                    process.exit(1);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Get the package manager from config
     * @returns Package manager name
     * @throws Error if config not loaded
     */
    ConfigManager.prototype.getPackageManager = function () {
        if (!this.config) {
            throw new Error("Configuration not loaded");
        }
        return (this.config.packageManager || "npm");
    };
    /**
     * Validate that configuration is loaded
     * @returns True if configuration is valid
     */
    ConfigManager.prototype.validate = function () {
        return !!this.config;
    };
    /**
     * Get the components path from config
     * @returns Components directory path
     * @throws Error if config not loaded
     */
    ConfigManager.prototype.getComponentsPath = function () {
        if (!this.config) {
            throw new Error("Configuration not loaded");
        }
        return this.config.components.path;
    };
    /**
     * Get the theme CSS path from config
     * @returns Theme CSS file path
     * @throws Error if config not loaded
     */
    ConfigManager.prototype.getThemePath = function () {
        if (!this.config) {
            throw new Error("Configuration not loaded");
        }
        return this.config.css.velar;
    };
    /**
     * Get the JS entry path from config
     * @returns JS entry file path
     * @throws Error if config not loaded
     */
    ConfigManager.prototype.getJsEntryPath = function () {
        var _a, _b;
        if (!this.config) {
            throw new Error("Configuration not loaded");
        }
        return (_b = (_a = this.config.js) === null || _a === void 0 ? void 0 : _a.entry) !== null && _b !== void 0 ? _b : "";
    };
    /**
     * Get the selected theme from config
     * @returns Theme name
     * @throws Error if config not loaded
     */
    ConfigManager.prototype.getTheme = function () {
        if (!this.config) {
            throw new Error("Configuration not loaded");
        }
        return this.config.theme;
    };
    return ConfigManager;
}());
exports.ConfigManager = ConfigManager;

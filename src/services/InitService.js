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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitService = void 0;
var laravel_js_1 = require("../utils/laravel.js");
var tailwind_js_1 = require("../utils/tailwind.js");
var requirements_js_1 = require("../utils/requirements.js");
var package_manager_js_1 = require("../utils/package-manager.js");
var css_js_1 = require("../utils/css.js");
var js_js_1 = require("../utils/js.js");
var theme_js_1 = require("../utils/theme.js");
var config_js_1 = require("../utils/config.js");
var fs_1 = __importDefault(require("fs"));
var logger_js_1 = require("../utils/logger.js");
/**
 * Service for handling Velar initialization
 */
var InitService = /** @class */ (function () {
    /**
     * Create a new InitService instance
     * @param fileSystem - File system service
     */
    function InitService(fileSystem) {
        this.fileSystem = fileSystem;
    }
    /**
     * Validate the project environment
     * @returns Environment validation result
     * @throws Error if critical requirements are not met
     */
    InitService.prototype.validateEnvironment = function () {
        // Validate Laravel project
        if (!(0, laravel_js_1.isLaravelProject)()) {
            throw new Error("No Laravel project detected");
        }
        // Check Tailwind v4
        var pkg = (0, tailwind_js_1.readPackageJson)();
        if (!pkg || !(0, tailwind_js_1.detectTailwindV4)(pkg)) {
            throw new Error("Tailwind CSS v4 was not detected");
        }
        // Check interactivity frameworks
        var hasAlpine = (0, requirements_js_1.hasAlpineJs)();
        var hasLivewireSupport = (0, requirements_js_1.hasLivewire)();
        var detectedPm = (0, package_manager_js_1.detectPackageManager)();
        // Find CSS and JS files
        var css = (0, css_js_1.findMainCss)();
        var js = (0, js_js_1.findMainJs)();
        var canInject = css ? (0, css_js_1.hasTailwindImport)(css.content) : false;
        return {
            isLaravel: true,
            hasTailwindV4: true,
            hasAlpine: hasAlpine,
            hasLivewire: hasLivewireSupport,
            detectedPackageManager: detectedPm,
            cssFile: css,
            jsFile: js,
            canInjectCss: canInject,
        };
    };
    /**
     * Display environment information and warnings
     * @param validation - Environment validation result
     */
    InitService.prototype.displayEnvironmentInfo = function (validation) {
        // Display interactivity framework status
        if (!(0, requirements_js_1.hasInteractivitySupport)()) {
            logger_js_1.logger.warn("No interactivity framework detected");
            logger_js_1.logger.log("Velar components work best with Alpine.js or Livewire");
            logger_js_1.logger.log("Install Alpine.js: ".concat(validation.detectedPackageManager, " install alpinejs"));
            logger_js_1.logger.log("Or install Livewire: composer require livewire/livewire");
        }
        else if (validation.hasAlpine) {
            logger_js_1.logger.success("Alpine.js detected - components will be fully interactive");
        }
        else if (validation.hasLivewire) {
            logger_js_1.logger.success("Livewire detected - components will work with Livewire");
        }
        // Display CSS file status
        if (!validation.cssFile) {
            logger_js_1.logger.warn("No main CSS file found");
            logger_js_1.logger.log("Styles will be created but not auto-imported");
        }
        else if (!validation.canInjectCss) {
            logger_js_1.logger.warn("Tailwind import not found in CSS");
            logger_js_1.logger.log("Velar styles will not be auto-imported");
        }
        // Display JS file status
        if (!validation.jsFile) {
            logger_js_1.logger.warn("No main JS file found");
            logger_js_1.logger.log("Component scripts will not be auto-imported");
        }
    };
    /**
     * Create the UI components directory
     * @param path - Directory path (default: "resources/views/components/ui")
     * @returns Promise that resolves when directory is created
     */
    InitService.prototype.createComponentsDirectory = function () {
        return __awaiter(this, arguments, void 0, function (path) {
            if (path === void 0) { path = "resources/views/components/ui"; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileSystem.ensureDir(path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create the Velar theme CSS file
     * @param theme - Theme to use
     * @param targetPath - Target CSS file path (default: "resources/css/velar.css")
     * @returns Promise that resolves when theme is created
     * @throws Error if theme creation fails
     */
    InitService.prototype.createThemeFile = function (theme_1) {
        return __awaiter(this, arguments, void 0, function (theme, targetPath) {
            var dirPath;
            if (targetPath === void 0) { targetPath = "resources/css/velar.css"; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dirPath = targetPath.split("/").slice(0, -1).join("/");
                        return [4 /*yield*/, this.fileSystem.ensureDir(dirPath)];
                    case 1:
                        _a.sent();
                        // Create theme file if it doesn't exist
                        if (!fs_1.default.existsSync(targetPath)) {
                            try {
                                (0, theme_js_1.copyTheme)(theme, targetPath);
                                logger_js_1.logger.success("Velar theme created");
                                logger_js_1.logger.info(targetPath);
                            }
                            catch (error) {
                                throw new Error("Failed to create theme file: ".concat(error.message));
                            }
                        }
                        else {
                            logger_js_1.logger.info("velar.css already exists");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Inject Velar styles import into main CSS file
     * @param cssPath - Path to main CSS file
     * @returns Promise that resolves when import is injected
     */
    InitService.prototype.injectStylesImport = function (cssPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, css_js_1.injectVelarImport)(cssPath);
                logger_js_1.logger.success("Velar styles imported");
                logger_js_1.logger.info(cssPath);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Generate and write Velar configuration file
     * @param options - Initialization options
     * @param validation - Environment validation result
     * @returns Promise that resolves when config is written
     */
    InitService.prototype.generateConfig = function (options, validation) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                config = {
                    version: "0.1",
                    theme: options.theme,
                    packageManager: options.packageManager,
                    css: {
                        entry: (_b = (_a = validation.cssFile) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : "",
                        velar: "resources/css/velar.css",
                    },
                    js: {
                        entry: (_d = (_c = validation.jsFile) === null || _c === void 0 ? void 0 : _c.path) !== null && _d !== void 0 ? _d : "",
                    },
                    components: {
                        path: "resources/views/components/ui",
                    },
                };
                (0, config_js_1.writeVelarConfig)(config);
                logger_js_1.logger.success("velar.json config generated");
                return [2 /*return*/];
            });
        });
    };
    /**
     * Display initialization summary
     * @param options - Initialization options
     * @param validation - Environment validation result
     * @param stylesImported - Whether styles were imported
     */
    InitService.prototype.displaySummary = function (options, validation, stylesImported) {
        console.log("\n---");
        logger_js_1.logger.success("Laravel project detected");
        logger_js_1.logger.success("Tailwind CSS v4 detected");
        logger_js_1.logger.success("Theme selected: ".concat(options.theme));
        logger_js_1.logger.success("Package manager: ".concat(options.packageManager));
        logger_js_1.logger.success("UI components directory ready");
        if (validation.jsFile) {
            logger_js_1.logger.success("Main JS file detected");
        }
        logger_js_1.logger.success(stylesImported ? "Styles import complete" : "Styles import pending");
        logger_js_1.logger.success("velar.json created");
        console.log("\nNext steps:");
        console.log("  velar add button");
        console.log("\n💡 Want to customize your Tailwind palette? Try https://tweakcn.com/ — a visual generator for Tailwind-compatible color scales.");
    };
    return InitService;
}());
exports.InitService = InitService;

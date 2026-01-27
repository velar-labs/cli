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
exports.initOptionsSchema = void 0;
exports.initProject = initProject;
var prompts_1 = __importDefault(require("prompts"));
var FileSystemService_1 = require("@/src/services/FileSystemService");
var InitService_1 = require("@/src/services/InitService");
var theme_1 = require("@/src/utils/theme");
var logger_1 = require("@/src/utils/logger");
var highlighter_1 = require("@/src/utils/highlighter");
var zod_1 = require("zod");
exports.initOptionsSchema = zod_1.z.object({
    baseColor: zod_1.z.string().optional(),
    yes: zod_1.z.boolean(),
    defaults: zod_1.z.boolean(),
    force: zod_1.z.boolean(),
    cwd: zod_1.z.string(),
    silent: zod_1.z.boolean(),
});
function promptPackageManager(detectedPm) {
    return __awaiter(this, void 0, void 0, function () {
        var packageManager;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, prompts_1.default)({
                        type: "select",
                        name: "packageManager",
                        message: "Which package manager are you using?",
                        choices: [
                            { title: "npm", value: "npm" },
                            { title: "yarn", value: "yarn" },
                            { title: "pnpm", value: "pnpm" },
                            { title: "bun", value: "bun" },
                        ],
                        initial: ["npm", "yarn", "pnpm", "bun"].indexOf(detectedPm),
                    }, {
                        onCancel: function () {
                            logger_1.logger.error("Package manager selection aborted");
                            process.exit(1);
                        },
                    })];
                case 1:
                    packageManager = (_a.sent()).packageManager;
                    return [2 /*return*/, packageManager];
            }
        });
    });
}
function promptTheme() {
    return __awaiter(this, void 0, void 0, function () {
        var theme;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, prompts_1.default)({
                        type: "select",
                        name: "theme",
                        message: "Choose a base color theme",
                        choices: theme_1.THEMES.map(function (t) { return ({
                            title: t.charAt(0).toUpperCase() + t.slice(1),
                            value: t,
                        }); }),
                    }, {
                        onCancel: function () {
                            logger_1.logger.error("Theme selection aborted");
                            process.exit(1);
                        },
                    })];
                case 1:
                    theme = (_a.sent()).theme;
                    return [2 /*return*/, theme];
            }
        });
    });
}
function promptStyleImport() {
    return __awaiter(this, void 0, void 0, function () {
        var shouldImport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, prompts_1.default)({
                        type: "confirm",
                        name: "shouldImport",
                        message: "Import Velar styles into your main CSS file?",
                        initial: true,
                    }, {
                        onCancel: function () { return false; },
                    })];
                case 1:
                    shouldImport = (_a.sent()).shouldImport;
                    return [2 /*return*/, Boolean(shouldImport)];
            }
        });
    });
}
function resolveThemeFromOptions(options) {
    if (!options.baseColor) {
        return undefined;
    }
    if (theme_1.THEMES.includes(options.baseColor)) {
        return options.baseColor;
    }
    logger_1.logger.warn("Unknown base color \"".concat(options.baseColor, "\"."));
    return undefined;
}
function initProject(options) {
    return __awaiter(this, void 0, void 0, function () {
        var fileSystem, initService, validation, packageManager, _a, theme, _b, stylesImported, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    process.chdir(options.cwd);
                    fileSystem = new FileSystemService_1.FileSystemService();
                    initService = new InitService_1.InitService(fileSystem);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 16, , 17]);
                    validation = initService.validateEnvironment();
                    initService.displayEnvironmentInfo(validation);
                    if (!options.defaults) return [3 /*break*/, 2];
                    _a = validation.detectedPackageManager;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, promptPackageManager(validation.detectedPackageManager)];
                case 3:
                    _a = _d.sent();
                    _d.label = 4;
                case 4:
                    packageManager = _a;
                    theme = resolveThemeFromOptions(options);
                    if (!!theme) return [3 /*break*/, 8];
                    if (!options.defaults) return [3 /*break*/, 5];
                    _b = theme_1.THEMES[0];
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, promptTheme()];
                case 6:
                    _b = _d.sent();
                    _d.label = 7;
                case 7:
                    theme = _b;
                    _d.label = 8;
                case 8: return [4 /*yield*/, initService.createComponentsDirectory()];
                case 9:
                    _d.sent();
                    return [4 /*yield*/, initService.createThemeFile(theme)];
                case 10:
                    _d.sent();
                    stylesImported = false;
                    if (!(validation.cssFile && validation.canInjectCss)) return [3 /*break*/, 14];
                    _c = options.defaults;
                    if (_c) return [3 /*break*/, 12];
                    return [4 /*yield*/, promptStyleImport()];
                case 11:
                    _c = (_d.sent());
                    _d.label = 12;
                case 12:
                    if (!_c) return [3 /*break*/, 14];
                    return [4 /*yield*/, initService.injectStylesImport(validation.cssFile.path)];
                case 13:
                    _d.sent();
                    stylesImported = true;
                    _d.label = 14;
                case 14: return [4 /*yield*/, initService.generateConfig({
                        packageManager: packageManager,
                        theme: theme,
                        importStyles: stylesImported,
                    }, validation)];
                case 15:
                    _d.sent();
                    initService.displaySummary({
                        packageManager: packageManager,
                        theme: theme,
                        importStyles: stylesImported,
                    }, validation, stylesImported);
                    return [3 /*break*/, 17];
                case 16:
                    error_1 = _d.sent();
                    logger_1.logger.error(error_1.message);
                    if (error_1 instanceof Error) {
                        if (error_1.message.includes("Laravel project")) {
                            logger_1.logger.log("Run velar init at the root of a Laravel project");
                        }
                        else if (error_1.message.includes("Tailwind")) {
                            logger_1.logger.log("Velar requires ".concat(highlighter_1.highlighter.info("Tailwind CSS v4+")));
                        }
                    }
                    process.exit(1);
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}

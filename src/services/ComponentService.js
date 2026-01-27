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
exports.ComponentService = void 0;
var prompts_1 = __importDefault(require("prompts"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var FileSystemService_1 = require("@/src/services/FileSystemService");
var js_1 = require("@/src/utils/js");
var logger_1 = require("@/src/utils/logger");
var file_helper_1 = require("@/src/utils/file-helper");
/**
 * Service for managing component operations
 */
var ComponentService = /** @class */ (function () {
    /**
     * Create a new ComponentService instance
     * @param registryService - Service for registry operations
     * @param fileSystem - Optional file system service (creates new one if not provided)
     * @param configManager - Service for configuration management
     */
    function ComponentService(registryService, fileSystem, configManager) {
        this.registryService = registryService;
        this.configManager = configManager;
        this.fileSystem = fileSystem !== null && fileSystem !== void 0 ? fileSystem : new FileSystemService_1.FileSystemService();
        if (!this.configManager) {
            throw new Error("ConfigManager is required");
        }
    }
    /**
     * Add multiple components to the project
     * @param componentNames - Array of component names to add
     * @returns Promise resolving to result of the operation
     */
    ComponentService.prototype.addComponents = function (componentNames) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, componentNames_1, componentName, componentResult, error_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = {
                            added: [],
                            skipped: [],
                            failed: [],
                        };
                        _i = 0, componentNames_1 = componentNames;
                        _d.label = 1;
                    case 1:
                        if (!(_i < componentNames_1.length)) return [3 /*break*/, 6];
                        componentName = componentNames_1[_i];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.addComponent(componentName)];
                    case 3:
                        componentResult = _d.sent();
                        (_a = result.added).push.apply(_a, componentResult.added);
                        (_b = result.skipped).push.apply(_b, componentResult.skipped);
                        (_c = result.failed).push.apply(_c, componentResult.failed);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _d.sent();
                        result.failed.push({
                            name: componentName,
                            error: error_1.message,
                        });
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Add a single component to the project
     * @param componentName - Name of the component to add
     * @returns Promise resolving to result of the operation
     * @throws Error if component fetch fails
     */
    ComponentService.prototype.addComponent = function (componentName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, component, componentsToAdd, componentsPath, plannedFiles, _i, componentsToAdd_1, comp, _a, _b, file, dest, existedBefore, action, content, jsComponents, _c, _d, jsComponent, error_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        result = {
                            added: [],
                            skipped: [],
                            failed: [],
                        };
                        return [4 /*yield*/, this.registryService.fetchComponent(componentName)];
                    case 1:
                        component = _e.sent();
                        return [4 /*yield*/, this.registryService.resolveDependencies(component)];
                    case 2:
                        componentsToAdd = _e.sent();
                        componentsPath = this.configManager.getComponentsPath();
                        plannedFiles = [];
                        _i = 0, componentsToAdd_1 = componentsToAdd;
                        _e.label = 3;
                    case 3:
                        if (!(_i < componentsToAdd_1.length)) return [3 /*break*/, 11];
                        comp = componentsToAdd_1[_i];
                        _a = 0, _b = comp.files;
                        _e.label = 4;
                    case 4:
                        if (!(_a < _b.length)) return [3 /*break*/, 10];
                        file = _b[_a];
                        dest = this.getDestinationPath(comp, file, componentsPath);
                        return [4 /*yield*/, this.fileSystem.fileExists(dest)];
                    case 5:
                        existedBefore = _e.sent();
                        if (!existedBefore) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.handleFileConflict(file.path)];
                    case 6:
                        action = _e.sent();
                        if (action === "skip") {
                            result.skipped.push("".concat(comp.name, "/").concat(file.path));
                            return [3 /*break*/, 9];
                        }
                        else if (action === "cancel") {
                            logger_1.logger.error("Cancelled.");
                            process.exit(0);
                        }
                        _e.label = 7;
                    case 7: return [4 /*yield*/, this.registryService.fetchFile(comp.name, file.path)];
                    case 8:
                        content = _e.sent();
                        plannedFiles.push({
                            componentName: comp.name,
                            filePath: file.path,
                            fileType: file.type,
                            destPath: dest,
                            content: content,
                            existedBefore: existedBefore,
                        });
                        _e.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 4];
                    case 10:
                        _i++;
                        return [3 /*break*/, 3];
                    case 11:
                        if (!(plannedFiles.length > 0)) return [3 /*break*/, 19];
                        _e.label = 12;
                    case 12:
                        _e.trys.push([12, 18, , 19]);
                        return [4 /*yield*/, this.applyFileBatch(plannedFiles)];
                    case 13:
                        _e.sent();
                        plannedFiles.forEach(function (file) {
                            return result.added.push("".concat(file.componentName, "/").concat(file.filePath));
                        });
                        jsComponents = new Set(plannedFiles
                            .filter(function (file) { return file.fileType === "js"; })
                            .map(function (file) { return file.componentName; }));
                        _c = 0, _d = Array.from(jsComponents);
                        _e.label = 14;
                    case 14:
                        if (!(_c < _d.length)) return [3 /*break*/, 17];
                        jsComponent = _d[_c];
                        return [4 /*yield*/, this.autoImportJs(jsComponent)];
                    case 15:
                        _e.sent();
                        _e.label = 16;
                    case 16:
                        _c++;
                        return [3 /*break*/, 14];
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        error_2 = _e.sent();
                        plannedFiles.forEach(function (file) {
                            return result.failed.push({
                                name: "".concat(file.componentName, "/").concat(file.filePath),
                                error: error_2.message,
                            });
                        });
                        return [3 /*break*/, 19];
                    case 19: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Automatically import component JS into the main JS entry
     * @param componentName - Name of the component
     */
    ComponentService.prototype.autoImportJs = function (componentName) {
        return __awaiter(this, void 0, void 0, function () {
            var jsEntry, _a, importPath, error_3;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        jsEntry = (_b = this.configManager) === null || _b === void 0 ? void 0 : _b.getJsEntryPath();
                        _a = !jsEntry;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fileSystem.fileExists(jsEntry)];
                    case 1:
                        _a = !(_c.sent());
                        _c.label = 2;
                    case 2:
                        if (_a) {
                            return [2 /*return*/];
                        }
                        importPath = "./ui/".concat(componentName);
                        (0, js_1.injectComponentJs)(jsEntry, componentName, importPath);
                        logger_1.logger.success("Auto-imported ".concat(componentName, " into ").concat(jsEntry));
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _c.sent();
                        logger_1.logger.warn("Failed to auto-import JS for ".concat(componentName, ": ").concat(error_3.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the destination path for a component file
     * @param component - Component metadata
     * @param file - File metadata
     * @param componentsPath - Base components path
     * @returns Destination file path
     */
    ComponentService.prototype.getDestinationPath = function (component, file, componentsPath) {
        switch (file.type) {
            case "blade":
                return path_1.default.join(componentsPath, "".concat(component.name, ".blade.php"));
            case "js":
                return path_1.default.join("resources/js/ui", "".concat(component.name, ".js"));
            case "css":
                return path_1.default.join("resources/css/components", "".concat(component.name, ".css"));
            default:
                return path_1.default.join(componentsPath, file.path);
        }
    };
    /**
     * Handle file conflict by prompting user
     * @param filePath - Path of the conflicting file
     * @returns Promise resolving to user action ("skip", "overwrite", or "cancel")
     */
    ComponentService.prototype.handleFileConflict = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, prompts_1.default)({
                            type: "select",
                            name: "action",
                            message: "File \"".concat(filePath, "\" already exists. What do you want to do?"),
                            choices: [
                                { title: "Skip", value: "skip" },
                                { title: "Overwrite", value: "overwrite" },
                                { title: "Cancel", value: "cancel" },
                            ],
                            initial: 0,
                        }, {
                            onCancel: function () {
                                logger_1.logger.error("Cancelled.");
                                process.exit(0);
                            },
                        })];
                    case 1:
                        action = (_a.sent()).action;
                        return [2 /*return*/, action];
                }
            });
        });
    };
    ComponentService.prototype.applyFileBatch = function (plannedFiles) {
        return __awaiter(this, void 0, void 0, function () {
            var tempFiles, backupTargets, _i, plannedFiles_1, file, tempPath, _a, plannedFiles_2, file, backupPath, _b, plannedFiles_3, file, tempPath, error_4, _c, plannedFiles_4, file, _d, tempFiles_1, tempFile;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        tempFiles = [];
                        backupTargets = [];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 10, , 22]);
                        _i = 0, plannedFiles_1 = plannedFiles;
                        _e.label = 2;
                    case 2:
                        if (!(_i < plannedFiles_1.length)) return [3 /*break*/, 5];
                        file = plannedFiles_1[_i];
                        tempPath = "".concat(file.destPath, ".velar-tmp");
                        return [4 /*yield*/, this.fileSystem.writeFile(tempPath, file.content)];
                    case 3:
                        _e.sent();
                        tempFiles.push(tempPath);
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        for (_a = 0, plannedFiles_2 = plannedFiles; _a < plannedFiles_2.length; _a++) {
                            file = plannedFiles_2[_a];
                            if (!file.existedBefore) {
                                continue;
                            }
                            backupPath = (0, file_helper_1.createFileBackup)(file.destPath);
                            if (!backupPath) {
                                throw new Error("Failed to create backup for ".concat(file.destPath));
                            }
                            backupTargets.push(file.destPath);
                        }
                        _b = 0, plannedFiles_3 = plannedFiles;
                        _e.label = 6;
                    case 6:
                        if (!(_b < plannedFiles_3.length)) return [3 /*break*/, 9];
                        file = plannedFiles_3[_b];
                        tempPath = "".concat(file.destPath, ".velar-tmp");
                        return [4 /*yield*/, fs_extra_1.default.move(tempPath, file.destPath, { overwrite: true })];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8:
                        _b++;
                        return [3 /*break*/, 6];
                    case 9:
                        backupTargets.forEach(function (filePath) { return (0, file_helper_1.deleteFileBackup)(filePath); });
                        return [3 /*break*/, 22];
                    case 10:
                        error_4 = _e.sent();
                        _c = 0, plannedFiles_4 = plannedFiles;
                        _e.label = 11;
                    case 11:
                        if (!(_c < plannedFiles_4.length)) return [3 /*break*/, 16];
                        file = plannedFiles_4[_c];
                        return [4 /*yield*/, this.fileSystem.fileExists(file.destPath)];
                    case 12:
                        if (!_e.sent()) return [3 /*break*/, 14];
                        return [4 /*yield*/, fs_extra_1.default.remove(file.destPath)];
                    case 13:
                        _e.sent();
                        _e.label = 14;
                    case 14:
                        if (file.existedBefore) {
                            (0, file_helper_1.restoreFileBackup)(file.destPath);
                        }
                        _e.label = 15;
                    case 15:
                        _c++;
                        return [3 /*break*/, 11];
                    case 16:
                        _d = 0, tempFiles_1 = tempFiles;
                        _e.label = 17;
                    case 17:
                        if (!(_d < tempFiles_1.length)) return [3 /*break*/, 21];
                        tempFile = tempFiles_1[_d];
                        return [4 /*yield*/, this.fileSystem.fileExists(tempFile)];
                    case 18:
                        if (!_e.sent()) return [3 /*break*/, 20];
                        return [4 /*yield*/, fs_extra_1.default.remove(tempFile)];
                    case 19:
                        _e.sent();
                        _e.label = 20;
                    case 20:
                        _d++;
                        return [3 /*break*/, 17];
                    case 21: throw error_4;
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    return ComponentService;
}());
exports.ComponentService = ComponentService;

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
exports.AddService = void 0;
var ComponentService_js_1 = require("./ComponentService.js");
var FileSystemService_js_1 = require("./FileSystemService.js");
var logger_js_1 = require("../utils/logger.js");
/**
 * Service for handling component addition operations
 */
var AddService = /** @class */ (function () {
    /**
     * Create a new AddService instance
     * @param registryService - Service for registry operations
     * @param configManager - Service for configuration management
     * @param componentService - Optional component service (creates new one if not provided)
     */
    function AddService(registryService, configManager, componentService) {
        this.registryService = registryService;
        this.configManager = configManager;
        // ComponentService will be created if not provided
        // This allows for dependency injection in tests
        this.componentService =
            componentService !== null && componentService !== void 0 ? componentService : new ComponentService_js_1.ComponentService(registryService, new FileSystemService_js_1.FileSystemService(), configManager);
    }
    /**
     * Validate that Velar is initialized
     * @throws Error if not initialized
     */
    AddService.prototype.validateInitialization = function () {
        if (!this.configManager.validate()) {
            throw new Error("Velar is not initialized");
        }
    };
    /**
     * Validate that components exist in the registry
     * @param componentNames - Names of components to validate
     * @param registry - Registry data
     * @throws Error if any component is not found
     */
    AddService.prototype.validateComponents = function (componentNames, registry) {
        var _loop_1 = function (componentName) {
            var found = registry.components.find(function (c) { return c.name === componentName; });
            if (!found) {
                throw new Error("Component \"".concat(componentName, "\" not found"));
            }
        };
        for (var _i = 0, componentNames_1 = componentNames; _i < componentNames_1.length; _i++) {
            var componentName = componentNames_1[_i];
            _loop_1(componentName);
        }
    };
    /**
     * Get available components from registry
     * @returns Promise resolving to registry data
     * @throws NetworkError if fetch fails
     */
    AddService.prototype.getAvailableComponents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registryService.fetchRegistry()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Add components to the project
     * @param componentNames - Names of components to add
     * @returns Promise resolving to result of the operation
     */
    AddService.prototype.addComponents = function (componentNames) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.componentService.addComponents(componentNames)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Display the results of adding components
     * @param result - Result of the add operation
     */
    AddService.prototype.displayResults = function (result) {
        result.added.forEach(function (name) { return logger_js_1.logger.success("Added ".concat(name)); });
        result.skipped.forEach(function (name) { return logger_js_1.logger.warn("Skipped ".concat(name)); });
        result.failed.forEach(function (_a) {
            var name = _a.name, error = _a.error;
            return logger_js_1.logger.error("Failed to add ".concat(name, ": ").concat(error));
        });
    };
    /**
     * Display next steps after adding components
     * @param result - Result of the add operation
     */
    AddService.prototype.displayNextSteps = function (result) {
        if (result.added.length === 0) {
            return;
        }
        console.log("\nNext steps:");
        console.log("  Use <x-ui.COMPONENT> in your Blade views");
        // Check if JS files were added but not auto-imported
        var jsFiles = result.added.filter(function (name) { return name.endsWith(".js"); });
        var hasJsEntry = this.configManager.validate() && this.configManager.getJsEntryPath();
        if (jsFiles.length > 0 && !hasJsEntry) {
            console.log("  Import JS files in your app.js:");
            jsFiles.forEach(function (file) {
                var fileName = file.split("/")[1];
                if (fileName) {
                    console.log("    import './ui/".concat(fileName, "'"));
                }
            });
        }
    };
    return AddService;
}());
exports.AddService = AddService;

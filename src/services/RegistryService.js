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
exports.RegistryService = void 0;
var remote_registry_js_1 = require("../utils/remote-registry.js");
var HttpService_js_1 = require("./HttpService.js");
var spinner_js_1 = require("../utils/spinner.js");
/**
 * Service for interacting with the Velar component registry
 */
var RegistryService = /** @class */ (function () {
    /**
     * Create a new RegistryService instance
     * @param httpService - Optional HTTP service instance (creates new one if not provided)
     */
    function RegistryService(httpService) {
        this.httpService = httpService !== null && httpService !== void 0 ? httpService : new HttpService_js_1.HttpService();
    }
    /**
     * Fetch the complete registry data
     * @returns Promise resolving to registry data
     * @throws NetworkError if fetch fails
     */
    RegistryService.prototype.fetchRegistry = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, spinner_js_1.spinner.withTask("Fetching registry...", function () { return (0, remote_registry_js_1.fetchGitHubRegistry)(); }, undefined, "Failed to fetch registry")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch metadata for a specific component
     * @param name - Component name
     * @returns Promise resolving to component metadata
     * @throws ComponentNotFoundError if component doesn't exist
     * @throws NetworkError if fetch fails
     */
    RegistryService.prototype.fetchComponent = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, spinner_js_1.spinner.withTask("Fetching component \"".concat(name, "\" metadata..."), function () { return (0, remote_registry_js_1.fetchComponent)(name); }, undefined, "Failed to fetch component \"".concat(name, "\""))];
                    case 1:
                        file = _a.sent();
                        return [4 /*yield*/, this.parseComponentMeta(file)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch file content for a component
     * @param componentUrl - Component URL or name
     * @param path - File path within component
     * @returns Promise resolving to file content
     * @throws ComponentNotFoundError if component or file doesn't exist
     * @throws NetworkError if fetch fails
     */
    RegistryService.prototype.fetchFile = function (componentUrl, path) {
        return __awaiter(this, void 0, void 0, function () {
            var componentName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        componentName = componentUrl.split("/").pop() || componentUrl;
                        return [4 /*yield*/, spinner_js_1.spinner.withTask("Downloading ".concat(path, "..."), function () { return (0, remote_registry_js_1.fetchComponentFile)(componentName, path); }, undefined, "Failed to fetch file \"".concat(path, "\""))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Resolve component dependencies
     * @param component - Component metadata
     * @returns Promise resolving to array of components including dependencies
     */
    RegistryService.prototype.resolveDependencies = function (component) {
        return __awaiter(this, void 0, void 0, function () {
            var visited, resolved, resolve;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        visited = new Set();
                        resolved = [];
                        resolve = function (comp) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (visited.has(comp.name))
                                    return [2 /*return*/];
                                visited.add(comp.name);
                                resolved.push(comp);
                                return [2 /*return*/];
                            });
                        }); };
                        return [4 /*yield*/, resolve(component)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, resolved];
                }
            });
        });
    };
    /**
     * Parse component metadata from GitHub file
     * @param file - GitHub file metadata
     * @returns Promise resolving to component metadata
     * @throws NetworkError if download or parsing fails
     */
    RegistryService.prototype.parseComponentMeta = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var raw, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!file.download_url) {
                            throw new Error("GitHub file has no download URL");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpService.fetchText(file.download_url)];
                    case 2:
                        raw = _a.sent();
                        return [2 /*return*/, JSON.parse(raw)];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Failed to parse component meta: ".concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RegistryService;
}());
exports.RegistryService = RegistryService;

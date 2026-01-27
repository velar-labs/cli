"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.fetchComponentMetaFromUrl = fetchComponentMetaFromUrl;
exports.fetchGitHubRegistry = fetchGitHubRegistry;
exports.fetchComponent = fetchComponent;
exports.fetchComponentFile = fetchComponentFile;
var environment_js_1 = require("./environment.js");
var errors_js_1 = require("../errors/errors.js");
var HttpService_js_1 = require("../services/HttpService.js");
/**
 * HTTP service instance for making requests
 */
var httpService = new HttpService_js_1.HttpService();
/**
 * Fetch a meta.json from a given URL and return as VelarComponentMeta
 * @param metaUrl - URL to fetch meta.json from
 * @returns Promise resolving to VelarComponentMeta
 * @throws NetworkError if fetch or parsing fails
 */
function fetchComponentMetaFromUrl(metaUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var raw, meta, file, meta, e_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, httpService.fetchText(metaUrl)];
                case 1:
                    raw = _a.sent();
                    // Try to parse as VelarComponentMeta directly (raw JSON)
                    try {
                        meta = JSON.parse(raw);
                        if (meta && Array.isArray(meta.files)) {
                            return [2 /*return*/, meta];
                        }
                    }
                    catch (_b) {
                        // Fallback to next logic
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    file = JSON.parse(raw);
                    if (!file.download_url) {
                        throw new errors_js_1.NetworkError("GitHubFile missing download_url");
                    }
                    return [4 /*yield*/, httpService.fetchJson(file.download_url)];
                case 3:
                    meta = _a.sent();
                    if (meta && Array.isArray(meta.files)) {
                        return [2 /*return*/, meta];
                    }
                    throw new errors_js_1.NetworkError("Invalid meta.json structure");
                case 4:
                    e_1 = _a.sent();
                    if (e_1 instanceof errors_js_1.NetworkError) {
                        throw e_1;
                    }
                    throw new errors_js_1.NetworkError("Failed to parse meta.json from ".concat(metaUrl, ": ").concat(e_1.message), e_1);
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    if (error_1 instanceof errors_js_1.NetworkError) {
                        throw error_1;
                    }
                    throw new errors_js_1.NetworkError("Failed to fetch component meta from ".concat(metaUrl, ": ").concat(error_1.message), error_1);
                case 7: return [2 /*return*/];
            }
        });
    });
}
/**
 * Fetch the GitHub registry data
 * @param branch - Git branch to fetch from (default: "main")
 * @returns Promise resolving to RegistryData
 * @throws NetworkError if fetch fails
 */
function fetchGitHubRegistry() {
    return __awaiter(this, arguments, void 0, function (branch) {
        var registryUrl, registryData, _a, files, components, _i, files_1, file, meta, _b, error_2;
        if (branch === void 0) { branch = "main"; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 12, , 13]);
                    registryUrl = "https://raw.githubusercontent.com/velar-ui/registry/".concat(branch, "/registry.json");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, httpService.fetchJson(registryUrl)];
                case 2:
                    registryData = _c.sent();
                    return [2 /*return*/, registryData];
                case 3:
                    _a = _c.sent();
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, httpService.fetchJson("".concat((0, environment_js_1.getGitHubRegistryUrl)(), "/components"))];
                case 5:
                    files = _c.sent();
                    components = [];
                    _i = 0, files_1 = files;
                    _c.label = 6;
                case 6:
                    if (!(_i < files_1.length)) return [3 /*break*/, 11];
                    file = files_1[_i];
                    if (!(file.type === "dir")) return [3 /*break*/, 10];
                    _c.label = 7;
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, httpService.fetchJson("".concat((0, environment_js_1.getGitHubRegistryUrl)(), "/components/").concat(file.name, "/meta.json"))];
                case 8:
                    meta = _c.sent();
                    components.push(__assign(__assign({}, meta), { name: file.name, path: file.path }));
                    return [3 /*break*/, 10];
                case 9:
                    _b = _c.sent();
                    // Skip failed components but continue with others
                    components.push({
                        name: file.name,
                        path: file.path,
                        files: [],
                    });
                    return [3 /*break*/, 10];
                case 10:
                    _i++;
                    return [3 /*break*/, 6];
                case 11: return [2 /*return*/, { components: components }];
                case 12:
                    error_2 = _c.sent();
                    if (error_2 instanceof errors_js_1.NetworkError) {
                        throw error_2;
                    }
                    throw new errors_js_1.NetworkError("Failed to fetch remote registry: ".concat(error_2.message), error_2);
                case 13: return [2 /*return*/];
            }
        });
    });
}
/**
 * Fetch component metadata from GitHub
 * @param componentName - Name of the component to fetch
 * @returns Promise resolving to GitHubFile
 * @throws ComponentNotFoundError if component doesn't exist
 * @throws NetworkError if fetch fails
 */
function fetchComponent(componentName) {
    return __awaiter(this, void 0, void 0, function () {
        var metaUrl, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    metaUrl = "".concat((0, environment_js_1.getGitHubRegistryUrl)(), "/components/").concat(componentName, "/meta.json");
                    return [4 /*yield*/, httpService.fetch(metaUrl)];
                case 1:
                    response = _a.sent();
                    if (response.status === 404) {
                        throw new errors_js_1.ComponentNotFoundError(componentName);
                    }
                    if (!response.ok) {
                        throw new errors_js_1.NetworkError("Component meta not found: ".concat(response.status, " ").concat(response.statusText));
                    }
                    return [4 /*yield*/, httpService.fetchJson(metaUrl)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_3 = _a.sent();
                    if (error_3 instanceof errors_js_1.ComponentNotFoundError ||
                        error_3 instanceof errors_js_1.NetworkError) {
                        throw error_3;
                    }
                    throw new errors_js_1.NetworkError("Failed to fetch component meta for \"".concat(componentName, "\": ").concat(error_3.message), error_3);
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Fetch a component file content from GitHub
 * @param componentName - Name of the component
 * @param filePath - Path to the file within the component directory
 * @returns Promise resolving to file content as string
 * @throws ComponentNotFoundError if component or file doesn't exist
 * @throws NetworkError if fetch fails
 */
function fetchComponentFile(componentName, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileUrl, response, file, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    fileUrl = "".concat((0, environment_js_1.getGitHubRegistryUrl)(), "/components/").concat(componentName, "/").concat(filePath);
                    return [4 /*yield*/, httpService.fetch(fileUrl)];
                case 1:
                    response = _a.sent();
                    if (response.status === 404) {
                        throw new errors_js_1.ComponentNotFoundError(componentName);
                    }
                    if (!response.ok) {
                        throw new errors_js_1.NetworkError("File not found: ".concat(response.status, " ").concat(response.statusText));
                    }
                    return [4 /*yield*/, httpService.fetchJson(fileUrl)];
                case 2:
                    file = _a.sent();
                    if (!file.download_url) {
                        throw new errors_js_1.NetworkError("File has no download URL");
                    }
                    return [4 /*yield*/, httpService.fetchText(file.download_url)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_4 = _a.sent();
                    if (error_4 instanceof errors_js_1.ComponentNotFoundError ||
                        error_4 instanceof errors_js_1.NetworkError) {
                        throw error_4;
                    }
                    throw new errors_js_1.NetworkError("Failed to fetch file \"".concat(filePath, "\" for component \"").concat(componentName, "\": ").concat(error_4.message), error_4);
                case 5: return [2 /*return*/];
            }
        });
    });
}

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComponents = addComponents;
var ConfigManager_1 = require("@/src/config/ConfigManager");
var AddService_1 = require("@/src/services/AddService");
var RegistryService_1 = require("@/src/services/RegistryService");
var logger_1 = require("@/src/utils/logger");
var zod_1 = require("zod");
var prompts_1 = __importDefault(require("prompts"));
function promptForRegistryComponents(options, availableComponents) {
    return __awaiter(this, void 0, void 0, function () {
        var components, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (options.all) {
                        return [2 /*return*/, __spreadArray([], availableComponents, true)];
                    }
                    if ((_a = options.components) === null || _a === void 0 ? void 0 : _a.length) {
                        return [2 /*return*/, options.components];
                    }
                    logger_1.logger.info("Use arrow keys and space to select, then press enter.");
                    return [4 /*yield*/, (0, prompts_1.default)({
                            type: "multiselect",
                            name: "components",
                            message: "Which components would you like to add?",
                            hint: "Space to select. A to toggle all. Enter to submit.",
                            instructions: false,
                            choices: availableComponents.map(function (name) {
                                var _a;
                                return ({
                                    title: name,
                                    value: name,
                                    selected: options.all ? true : (_a = options.components) === null || _a === void 0 ? void 0 : _a.includes(name),
                                });
                            }),
                        })];
                case 1:
                    components = (_b.sent()).components;
                    if (!(components === null || components === void 0 ? void 0 : components.length)) {
                        logger_1.logger.warn("No components selected. Exiting.");
                        logger_1.logger.info("");
                        process.exit(1);
                    }
                    result = zod_1.z.array(zod_1.z.string()).safeParse(components);
                    if (!result.success) {
                        logger_1.logger.error("Something went wrong. Please try again.");
                        process.exit(1);
                    }
                    return [2 /*return*/, result.data];
            }
        });
    });
}
function addComponents(options) {
    return __awaiter(this, void 0, void 0, function () {
        var configManager, registryService, addService, registry, available, componentNames, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configManager = new ConfigManager_1.ConfigManager();
                    return [4 /*yield*/, configManager.load()];
                case 1:
                    _a.sent();
                    registryService = new RegistryService_1.RegistryService();
                    addService = new AddService_1.AddService(registryService, configManager);
                    try {
                        addService.validateInitialization();
                    }
                    catch (_b) {
                        logger_1.logger.error("Velar is not initialized");
                        logger_1.logger.log("Run velar init first");
                        process.exit(1);
                    }
                    return [4 /*yield*/, addService.getAvailableComponents()];
                case 2:
                    registry = _a.sent();
                    available = registry.components
                        .map(function (component) { return component.name; })
                        .sort(function (a, b) { return a.localeCompare(b); });
                    return [4 /*yield*/, promptForRegistryComponents(options, available)];
                case 3:
                    componentNames = _a.sent();
                    try {
                        addService.validateComponents(componentNames, registry);
                    }
                    catch (err) {
                        logger_1.logger.error(err.message);
                        logger_1.logger.log("Run velar list to see available components");
                        process.exit(1);
                    }
                    return [4 /*yield*/, addService.addComponents(componentNames)];
                case 4:
                    result = _a.sent();
                    addService.displayResults(result);
                    addService.displayNextSteps(result);
                    return [2 /*return*/];
            }
        });
    });
}

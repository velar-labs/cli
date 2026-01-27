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
exports.listComponents = listComponents;
var chalk_1 = __importDefault(require("chalk"));
var cli_table3_1 = __importDefault(require("cli-table3"));
var RegistryService_1 = require("@/src/services/RegistryService");
var logger_1 = require("@/src/utils/logger");
function filterComponents(components, query) {
    if (!query) {
        return __spreadArray([], components, true);
    }
    var normalized = query.toLowerCase();
    return components.filter(function (component) {
        var nameMatch = component.name.toLowerCase().includes(normalized);
        var descriptionMatch = component.description
            ? component.description.toLowerCase().includes(normalized)
            : false;
        var categoryMatch = component.categories
            ? component.categories.some(function (category) {
                return category.toLowerCase().includes(normalized);
            })
            : false;
        return nameMatch || descriptionMatch || categoryMatch;
    });
}
function sliceComponents(components, offset, limit) {
    var start = Math.max(0, offset !== null && offset !== void 0 ? offset : 0);
    if (limit === undefined) {
        return components.slice(start);
    }
    return components.slice(start, start + Math.max(0, limit));
}
function listComponents(options) {
    return __awaiter(this, void 0, void 0, function () {
        var registryService, registry, sorted, filtered, sliced, table, _i, sliced_1, component;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    registryService = new RegistryService_1.RegistryService();
                    return [4 /*yield*/, registryService.fetchRegistry()];
                case 1:
                    registry = _d.sent();
                    sorted = __spreadArray([], registry.components, true).sort(function (a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    filtered = filterComponents(sorted, options.query);
                    sliced = sliceComponents(filtered, options.offset, options.limit);
                    if (options.json) {
                        console.log(JSON.stringify({
                            total: filtered.length,
                            count: sliced.length,
                            offset: (_a = options.offset) !== null && _a !== void 0 ? _a : 0,
                            limit: (_b = options.limit) !== null && _b !== void 0 ? _b : null,
                            components: sliced,
                        }, null, 2));
                        return [2 /*return*/];
                    }
                    if (sliced.length === 0) {
                        logger_1.logger.warn("No components found.");
                        return [2 /*return*/];
                    }
                    console.log(chalk_1.default.bold("\nAvailable components:"));
                    console.log("");
                    table = new cli_table3_1.default({
                        head: [
                            chalk_1.default.bold("Component"),
                            chalk_1.default.bold("Description"),
                            chalk_1.default.bold("Categories"),
                        ],
                        colWidths: [24, 50, 24],
                        wordWrap: true,
                        style: {
                            head: [],
                            border: [],
                        },
                    });
                    for (_i = 0, sliced_1 = sliced; _i < sliced_1.length; _i++) {
                        component = sliced_1[_i];
                        table.push([
                            chalk_1.default.cyan(component.name),
                            chalk_1.default.white(component.description || "No description"),
                            chalk_1.default.gray(((_c = component.categories) === null || _c === void 0 ? void 0 : _c.join(", ")) || "-"),
                        ]);
                    }
                    console.log(table.toString());
                    console.log("");
                    logger_1.logger.info("Run ".concat(chalk_1.default.green("velar add <component>"), " to add one."));
                    return [2 /*return*/];
            }
        });
    });
}

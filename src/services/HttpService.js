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
exports.HttpService = void 0;
var errors_js_1 = require("../errors/errors.js");
/**
 * Default retry options
 */
var DEFAULT_RETRY_OPTIONS = {
    maxRetries: 3,
    initialDelay: 1000,
    backoffFactor: 2,
    maxDelay: 10000,
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
    timeout: 30000,
    headers: {},
};
/**
 * Sleep utility for retry delays
 * @param ms - Milliseconds to sleep
 */
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
/**
 * Calculate delay for retry attempt with exponential backoff
 * @param attempt - Current attempt number (0-indexed)
 * @param initialDelay - Initial delay in milliseconds
 * @param backoffFactor - Factor to multiply delay by each attempt
 * @param maxDelay - Maximum delay in milliseconds
 * @returns Delay in milliseconds
 */
function calculateDelay(attempt, initialDelay, backoffFactor, maxDelay) {
    var delay = initialDelay * Math.pow(backoffFactor, attempt);
    return Math.min(delay, maxDelay);
}
/**
 * Check if a status code is retryable
 * @param status - HTTP status code
 * @param retryableStatusCodes - List of retryable status codes
 * @returns True if status code is retryable
 */
function isRetryableStatus(status, retryableStatusCodes) {
    return retryableStatusCodes.includes(status);
}
/**
 * Create a fetch request with timeout
 * @param url - URL to fetch
 * @param options - Fetch options including timeout
 * @returns Promise resolving to Response
 */
function fetchWithTimeout(url, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, timeout, _b, headers, controller, timeoutId, response, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = options.timeout, timeout = _a === void 0 ? DEFAULT_RETRY_OPTIONS.timeout : _a, _b = options.headers, headers = _b === void 0 ? {} : _b;
                    controller = new AbortController();
                    timeoutId = setTimeout(function () { return controller.abort(); }, timeout);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch(url, {
                            signal: controller.signal,
                            headers: __assign({ "User-Agent": "Velar-CLI" }, headers),
                        })];
                case 2:
                    response = _c.sent();
                    return [2 /*return*/, response];
                case 3:
                    error_1 = _c.sent();
                    if (error_1 instanceof Error && error_1.name === "AbortError") {
                        throw new errors_js_1.NetworkError("Request timeout after ".concat(timeout, "ms for ").concat(url), error_1);
                    }
                    throw error_1;
                case 4:
                    clearTimeout(timeoutId);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * HTTP service with retry logic and timeout support
 */
var HttpService = /** @class */ (function () {
    function HttpService() {
    }
    /**
     * Fetch a URL with retry logic and timeout
     * @param url - URL to fetch
     * @param options - Fetch options including retry configuration
     * @returns Promise resolving to Response
     * @throws NetworkError if all retries fail
     */
    HttpService.prototype.fetch = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, options) {
            var retryOptions, lastError, attempt, response, delay, error_2, delay_1, delay;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        retryOptions = {
                            maxRetries: (_a = options.maxRetries) !== null && _a !== void 0 ? _a : DEFAULT_RETRY_OPTIONS.maxRetries,
                            initialDelay: (_b = options.initialDelay) !== null && _b !== void 0 ? _b : DEFAULT_RETRY_OPTIONS.initialDelay,
                            backoffFactor: (_c = options.backoffFactor) !== null && _c !== void 0 ? _c : DEFAULT_RETRY_OPTIONS.backoffFactor,
                            maxDelay: (_d = options.maxDelay) !== null && _d !== void 0 ? _d : DEFAULT_RETRY_OPTIONS.maxDelay,
                            retryableStatusCodes: (_e = options.retryableStatusCodes) !== null && _e !== void 0 ? _e : DEFAULT_RETRY_OPTIONS.retryableStatusCodes,
                            timeout: (_f = options.timeout) !== null && _f !== void 0 ? _f : DEFAULT_RETRY_OPTIONS.timeout,
                            headers: (_g = options.headers) !== null && _g !== void 0 ? _g : DEFAULT_RETRY_OPTIONS.headers,
                        };
                        lastError = null;
                        attempt = 0;
                        _j.label = 1;
                    case 1:
                        if (!(attempt <= retryOptions.maxRetries)) return [3 /*break*/, 10];
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 5, , 9]);
                        return [4 /*yield*/, fetchWithTimeout(url, __assign(__assign({}, options), { timeout: retryOptions.timeout, headers: retryOptions.headers }))];
                    case 3:
                        response = _j.sent();
                        // If response is successful or not retryable, return it
                        if (response.ok ||
                            !isRetryableStatus(response.status, retryOptions.retryableStatusCodes)) {
                            return [2 /*return*/, response];
                        }
                        console.log("Attempt: ", attempt);
                        // If this is the last attempt, throw error
                        if (attempt === retryOptions.maxRetries) {
                            throw new errors_js_1.NetworkError("Request failed after ".concat(retryOptions.maxRetries + 1, " attempts: ").concat(response.status, " ").concat(response.statusText));
                        }
                        delay = calculateDelay(attempt, retryOptions.initialDelay, retryOptions.backoffFactor, retryOptions.maxDelay);
                        return [4 /*yield*/, sleep(delay)];
                    case 4:
                        _j.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        error_2 = _j.sent();
                        lastError = error_2;
                        if (!(error_2 instanceof errors_js_1.NetworkError &&
                            error_2.message.includes("timeout"))) return [3 /*break*/, 7];
                        if (attempt === retryOptions.maxRetries) {
                            throw error_2;
                        }
                        delay_1 = calculateDelay(attempt, retryOptions.initialDelay, retryOptions.backoffFactor, retryOptions.maxDelay);
                        return [4 /*yield*/, sleep(delay_1)];
                    case 6:
                        _j.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        // If this is the last attempt, throw error
                        if (attempt === retryOptions.maxRetries) {
                            if (lastError instanceof errors_js_1.NetworkError) {
                                throw lastError;
                            }
                            throw new errors_js_1.NetworkError("Request failed after ".concat(retryOptions.maxRetries + 1, " attempts: ").concat(lastError.message), lastError);
                        }
                        delay = calculateDelay(attempt, retryOptions.initialDelay, retryOptions.backoffFactor, retryOptions.maxDelay);
                        return [4 /*yield*/, sleep(delay)];
                    case 8:
                        _j.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 10: throw new errors_js_1.NetworkError("Request failed after ".concat(retryOptions.maxRetries + 1, " attempts: ").concat((_h = lastError === null || lastError === void 0 ? void 0 : lastError.message) !== null && _h !== void 0 ? _h : "Unknown error"), lastError !== null && lastError !== void 0 ? lastError : undefined);
                }
            });
        });
    };
    /**
     * Fetch JSON from a URL with retry logic
     * @param url - URL to fetch
     * @param options - Fetch options
     * @returns Promise resolving to parsed JSON
     * @throws NetworkError if fetch or parsing fails
     */
    HttpService.prototype.fetchJson = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new errors_js_1.NetworkError("Failed to fetch JSON from ".concat(url, ": ").concat(response.status, " ").concat(response.statusText));
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 3: return [2 /*return*/, (_a.sent())];
                    case 4:
                        error_3 = _a.sent();
                        throw new errors_js_1.NetworkError("Failed to parse JSON from ".concat(url, ": ").concat(error_3.message), error_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetch text from a URL with retry logic
     * @param url - URL to fetch
     * @param options - Fetch options
     * @returns Promise resolving to text content
     * @throws NetworkError if fetch fails
     */
    HttpService.prototype.fetchText = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new errors_js_1.NetworkError("Failed to fetch text from ".concat(url, ": ").concat(response.status, " ").concat(response.statusText));
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.text()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_4 = _a.sent();
                        throw new errors_js_1.NetworkError("Failed to read text from ".concat(url, ": ").concat(error_4.message), error_4);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return HttpService;
}());
exports.HttpService = HttpService;

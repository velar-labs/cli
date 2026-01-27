"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_CONFIG_ICON_LIBRARY = exports.BUILD_MISSING_REGISTRY_FILE = exports.COMPONENT_URL_INTERNAL_SERVER_ERROR = exports.COMPONENT_URL_BAD_REQUEST = exports.COMPONENT_URL_FORBIDDEN = exports.COMPONENT_URL_UNAUTHORIZED = exports.COMPONENT_URL_NOT_FOUND = exports.UNSUPPORTED_FRAMEWORK = exports.IMPORT_ALIAS_MISSING = exports.TAILWIND_NOT_CONFIGURED = exports.FAILED_CONFIG_READ = exports.MISSING_CONFIG = exports.EXISTING_CONFIG = exports.MISSING_DIR_OR_EMPTY_PROJECT = exports.InvalidConfigIconLibraryError = exports.RegistriesIndexParseError = exports.ConfigParseError = exports.ConfigMissingError = exports.RegistryInvalidNamespaceError = exports.RegistryMissingEnvironmentVariablesError = exports.RegistryParseError = exports.RegistryLocalFileError = exports.RegistryNotConfiguredError = exports.RegistryFetchError = exports.RegistryForbiddenError = exports.RegistryUnauthorizedError = exports.RegistryNotFoundError = exports.RegistryError = exports.RegistryErrorCode = void 0;
var zod_1 = require("zod");
// Error codes for programmatic error handling
exports.RegistryErrorCode = {
    // Network errors
    NETWORK_ERROR: "NETWORK_ERROR",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    FETCH_ERROR: "FETCH_ERROR",
    // Configuration errors
    NOT_CONFIGURED: "NOT_CONFIGURED",
    INVALID_CONFIG: "INVALID_CONFIG",
    MISSING_ENV_VARS: "MISSING_ENV_VARS",
    // File system errors
    LOCAL_FILE_ERROR: "LOCAL_FILE_ERROR",
    // Parsing errors
    PARSE_ERROR: "PARSE_ERROR",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    // Generic errors
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
};
var RegistryError = /** @class */ (function (_super) {
    __extends(RegistryError, _super);
    function RegistryError(message, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, message) || this;
        _this.name = "RegistryError";
        _this.code = options.code || exports.RegistryErrorCode.UNKNOWN_ERROR;
        _this.statusCode = options.statusCode;
        _this.cause = options.cause;
        _this.context = options.context;
        _this.suggestion = options.suggestion;
        _this.timestamp = new Date();
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }
    RegistryError.prototype.toJSON = function () {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            statusCode: this.statusCode,
            context: this.context,
            suggestion: this.suggestion,
            timestamp: this.timestamp,
            stack: this.stack,
        };
    };
    return RegistryError;
}(Error));
exports.RegistryError = RegistryError;
var RegistryNotFoundError = /** @class */ (function (_super) {
    __extends(RegistryNotFoundError, _super);
    function RegistryNotFoundError(url, cause) {
        var _this = this;
        var message = "The item at ".concat(url, " was not found. It may not exist at the registry.");
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.NOT_FOUND,
            statusCode: 404,
            cause: cause,
            context: { url: url },
            suggestion: "Check if the item name is correct and the registry URL is accessible.",
        }) || this;
        _this.url = url;
        _this.name = "RegistryNotFoundError";
        return _this;
    }
    return RegistryNotFoundError;
}(RegistryError));
exports.RegistryNotFoundError = RegistryNotFoundError;
var RegistryUnauthorizedError = /** @class */ (function (_super) {
    __extends(RegistryUnauthorizedError, _super);
    function RegistryUnauthorizedError(url, cause) {
        var _this = this;
        var message = "You are not authorized to access the item at ".concat(url, ". If this is a remote registry, you may need to authenticate.");
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.UNAUTHORIZED,
            statusCode: 401,
            cause: cause,
            context: { url: url },
            suggestion: "Check your authentication credentials and environment variables.",
        }) || this;
        _this.url = url;
        _this.name = "RegistryUnauthorizedError";
        return _this;
    }
    return RegistryUnauthorizedError;
}(RegistryError));
exports.RegistryUnauthorizedError = RegistryUnauthorizedError;
var RegistryForbiddenError = /** @class */ (function (_super) {
    __extends(RegistryForbiddenError, _super);
    function RegistryForbiddenError(url, cause) {
        var _this = this;
        var message = "You are not authorized to access the item at ".concat(url, ". If this is a remote registry, you may need to authenticate.");
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.FORBIDDEN,
            statusCode: 403,
            cause: cause,
            context: { url: url },
            suggestion: "Check your authentication credentials and environment variables.",
        }) || this;
        _this.url = url;
        _this.name = "RegistryForbiddenError";
        return _this;
    }
    return RegistryForbiddenError;
}(RegistryError));
exports.RegistryForbiddenError = RegistryForbiddenError;
var RegistryFetchError = /** @class */ (function (_super) {
    __extends(RegistryFetchError, _super);
    function RegistryFetchError(url, statusCode, responseBody, cause) {
        var _this = this;
        // Use the error detail from the server if available
        var baseMessage = statusCode
            ? "Failed to fetch from registry (".concat(statusCode, "): ").concat(url)
            : "Failed to fetch from registry: ".concat(url);
        var message = typeof cause === "string" && cause
            ? "".concat(baseMessage, " - ").concat(cause)
            : baseMessage;
        var suggestion = "Check your network connection and try again.";
        if (statusCode === 404) {
            suggestion =
                "The requested resource was not found. Check the URL or item name.";
        }
        else if (statusCode === 500) {
            suggestion = "The registry server encountered an error. Try again later.";
        }
        else if (statusCode && statusCode >= 400 && statusCode < 500) {
            suggestion = "There was a client error. Check your request parameters.";
        }
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.FETCH_ERROR,
            statusCode: statusCode,
            cause: cause,
            context: { url: url, responseBody: responseBody },
            suggestion: suggestion,
        }) || this;
        _this.url = url;
        _this.responseBody = responseBody;
        _this.name = "RegistryFetchError";
        return _this;
    }
    return RegistryFetchError;
}(RegistryError));
exports.RegistryFetchError = RegistryFetchError;
var RegistryNotConfiguredError = /** @class */ (function (_super) {
    __extends(RegistryNotConfiguredError, _super);
    function RegistryNotConfiguredError(registryName) {
        var _this = this;
        var message = registryName
            ? "Unknown registry \"".concat(registryName, "\". Make sure it is defined in components.json as follows:\n{\n  \"registries\": {\n    \"").concat(registryName, "\": \"[URL_TO_REGISTRY]\"\n  }\n}")
            : "Unknown registry. Make sure it is defined in components.json under \"registries\".";
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.NOT_CONFIGURED,
            context: { registryName: registryName },
            suggestion: "Add the registry configuration to your components.json file. Consult the registry documentation for the correct format.",
        }) || this;
        _this.registryName = registryName;
        _this.name = "RegistryNotConfiguredError";
        return _this;
    }
    return RegistryNotConfiguredError;
}(RegistryError));
exports.RegistryNotConfiguredError = RegistryNotConfiguredError;
var RegistryLocalFileError = /** @class */ (function (_super) {
    __extends(RegistryLocalFileError, _super);
    function RegistryLocalFileError(filePath, cause) {
        var _this = _super.call(this, "Failed to read local registry file: ".concat(filePath), {
            code: exports.RegistryErrorCode.LOCAL_FILE_ERROR,
            cause: cause,
            context: { filePath: filePath },
            suggestion: "Check if the file exists and you have read permissions.",
        }) || this;
        _this.filePath = filePath;
        _this.name = "RegistryLocalFileError";
        return _this;
    }
    return RegistryLocalFileError;
}(RegistryError));
exports.RegistryLocalFileError = RegistryLocalFileError;
var RegistryParseError = /** @class */ (function (_super) {
    __extends(RegistryParseError, _super);
    function RegistryParseError(item, parseError) {
        var _this = this;
        var message = "Failed to parse registry item: ".concat(item);
        if (parseError instanceof zod_1.z.ZodError) {
            message = "Failed to parse registry item: ".concat(item, "\n").concat(parseError.errors
                .map(function (e) { return "  - ".concat(e.path.join("."), ": ").concat(e.message); })
                .join("\n"));
        }
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.PARSE_ERROR,
            cause: parseError,
            context: { item: item },
            suggestion: "The registry item may be corrupted or have an invalid format. Please make sure it returns a valid JSON object. See https://ui.shadcn.com/schema/registry-item.json.",
        }) || this;
        _this.item = item;
        _this.parseError = parseError;
        _this.name = "RegistryParseError";
        return _this;
    }
    return RegistryParseError;
}(RegistryError));
exports.RegistryParseError = RegistryParseError;
var RegistryMissingEnvironmentVariablesError = /** @class */ (function (_super) {
    __extends(RegistryMissingEnvironmentVariablesError, _super);
    function RegistryMissingEnvironmentVariablesError(registryName, missingVars) {
        var _this = this;
        var message = "Registry \"".concat(registryName, "\" requires the following environment variables:\n\n") +
            missingVars.map(function (v) { return "  \u2022 ".concat(v); }).join("\n");
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.MISSING_ENV_VARS,
            context: { registryName: registryName, missingVars: missingVars },
            suggestion: "Set the required environment variables to your .env or .env.local file.",
        }) || this;
        _this.registryName = registryName;
        _this.missingVars = missingVars;
        _this.name = "RegistryMissingEnvironmentVariablesError";
        return _this;
    }
    return RegistryMissingEnvironmentVariablesError;
}(RegistryError));
exports.RegistryMissingEnvironmentVariablesError = RegistryMissingEnvironmentVariablesError;
var RegistryInvalidNamespaceError = /** @class */ (function (_super) {
    __extends(RegistryInvalidNamespaceError, _super);
    function RegistryInvalidNamespaceError(name) {
        var _this = this;
        var message = "Invalid registry namespace: \"".concat(name, "\". Registry names must start with @ (e.g., @shadcn, @v0).");
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.VALIDATION_ERROR,
            context: { name: name },
            suggestion: "Use a valid registry name starting with @ or provide a direct URL to the registry.",
        }) || this;
        _this.name = name;
        _this.name = "RegistryInvalidNamespaceError";
        return _this;
    }
    return RegistryInvalidNamespaceError;
}(RegistryError));
exports.RegistryInvalidNamespaceError = RegistryInvalidNamespaceError;
var ConfigMissingError = /** @class */ (function (_super) {
    __extends(ConfigMissingError, _super);
    function ConfigMissingError(cwd) {
        var _this = this;
        var message = "No components.json found in ".concat(cwd, " or parent directories.");
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.NOT_CONFIGURED,
            context: { cwd: cwd },
            suggestion: "Run 'npx shadcn@latest init' to create a components.json file, or check that you're in the correct directory.",
        }) || this;
        _this.cwd = cwd;
        _this.name = "ConfigMissingError";
        return _this;
    }
    return ConfigMissingError;
}(RegistryError));
exports.ConfigMissingError = ConfigMissingError;
var ConfigParseError = /** @class */ (function (_super) {
    __extends(ConfigParseError, _super);
    function ConfigParseError(cwd, parseError) {
        var _this = this;
        var message = "Invalid components.json configuration in ".concat(cwd, ".");
        if (parseError instanceof zod_1.z.ZodError) {
            message = "Invalid components.json configuration in ".concat(cwd, ":\n").concat(parseError.errors
                .map(function (e) { return "  - ".concat(e.path.join("."), ": ").concat(e.message); })
                .join("\n"));
        }
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.INVALID_CONFIG,
            cause: parseError,
            context: { cwd: cwd },
            suggestion: "Check your components.json file for syntax errors or invalid configuration. Run 'npx shadcn@latest init' to regenerate a valid configuration.",
        }) || this;
        _this.cwd = cwd;
        _this.name = "ConfigParseError";
        return _this;
    }
    return ConfigParseError;
}(RegistryError));
exports.ConfigParseError = ConfigParseError;
var RegistriesIndexParseError = /** @class */ (function (_super) {
    __extends(RegistriesIndexParseError, _super);
    function RegistriesIndexParseError(parseError) {
        var _this = this;
        var message = "Failed to parse registries index";
        if (parseError instanceof zod_1.z.ZodError) {
            var invalidNamespaces = parseError.errors
                .filter(function (e) { return e.path.length > 0; })
                .map(function (e) { return "\"".concat(e.path[0], "\""); })
                .filter(function (v, i, arr) { return arr.indexOf(v) === i; }); // remove duplicates
            if (invalidNamespaces.length > 0) {
                message = "Failed to parse registries index. Invalid registry namespace(s): ".concat(invalidNamespaces.join(", "), "\n").concat(parseError.errors
                    .map(function (e) { return "  - ".concat(e.path.join("."), ": ").concat(e.message); })
                    .join("\n"));
            }
            else {
                message = "Failed to parse registries index:\n".concat(parseError.errors
                    .map(function (e) { return "  - ".concat(e.path.join("."), ": ").concat(e.message); })
                    .join("\n"));
            }
        }
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.PARSE_ERROR,
            cause: parseError,
            context: { parseError: parseError },
            suggestion: "The registries index may be corrupted or have invalid registry namespace format. Registry names must start with @ (e.g., @shadcn, @example).",
        }) || this;
        _this.parseError = parseError;
        _this.name = "RegistriesIndexParseError";
        return _this;
    }
    return RegistriesIndexParseError;
}(RegistryError));
exports.RegistriesIndexParseError = RegistriesIndexParseError;
var InvalidConfigIconLibraryError = /** @class */ (function (_super) {
    __extends(InvalidConfigIconLibraryError, _super);
    function InvalidConfigIconLibraryError(iconLibrary, validOptions) {
        var _this = this;
        var message = "Invalid icon library \"".concat(iconLibrary, "\". Valid options are: ").concat(validOptions.join(", "));
        _this = _super.call(this, message, {
            code: exports.RegistryErrorCode.INVALID_CONFIG,
            context: { iconLibrary: iconLibrary, validOptions: validOptions },
            suggestion: "Update the \"iconLibrary\" field in your components.json to one of: ".concat(validOptions.join(", ")),
        }) || this;
        _this.iconLibrary = iconLibrary;
        _this.validOptions = validOptions;
        _this.name = "InvalidConfigIconLibraryError";
        return _this;
    }
    return InvalidConfigIconLibraryError;
}(RegistryError));
exports.InvalidConfigIconLibraryError = InvalidConfigIconLibraryError;
exports.MISSING_DIR_OR_EMPTY_PROJECT = "1";
exports.EXISTING_CONFIG = "2";
exports.MISSING_CONFIG = "3";
exports.FAILED_CONFIG_READ = "4";
exports.TAILWIND_NOT_CONFIGURED = "5";
exports.IMPORT_ALIAS_MISSING = "6";
exports.UNSUPPORTED_FRAMEWORK = "7";
exports.COMPONENT_URL_NOT_FOUND = "8";
exports.COMPONENT_URL_UNAUTHORIZED = "9";
exports.COMPONENT_URL_FORBIDDEN = "10";
exports.COMPONENT_URL_BAD_REQUEST = "11";
exports.COMPONENT_URL_INTERNAL_SERVER_ERROR = "12";
exports.BUILD_MISSING_REGISTRY_FILE = "13";
exports.INVALID_CONFIG_ICON_LIBRARY = "14";

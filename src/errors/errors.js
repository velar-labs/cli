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
exports.ComponentNotFoundError = exports.NetworkError = exports.RegistryError = void 0;
/**
 * Base error class for registry-related errors
 */
var RegistryError = /** @class */ (function (_super) {
    __extends(RegistryError, _super);
    /**
     * Create a new RegistryError
     * @param message - Error message
     * @param cause - Original error that caused this error
     */
    function RegistryError(message, cause) {
        var _this = _super.call(this, message) || this;
        _this.cause = cause;
        _this.name = "RegistryError";
        return _this;
    }
    return RegistryError;
}(Error));
exports.RegistryError = RegistryError;
/**
 * Error thrown when a network request fails
 */
var NetworkError = /** @class */ (function (_super) {
    __extends(NetworkError, _super);
    /**
     * Create a new NetworkError
     * @param message - Error message
     * @param cause - Original error that caused this error
     */
    function NetworkError(message, cause) {
        var _this = _super.call(this, message, cause) || this;
        _this.name = "NetworkError";
        return _this;
    }
    return NetworkError;
}(RegistryError));
exports.NetworkError = NetworkError;
/**
 * Error thrown when a component is not found in the registry
 */
var ComponentNotFoundError = /** @class */ (function (_super) {
    __extends(ComponentNotFoundError, _super);
    /**
     * Create a new ComponentNotFoundError
     * @param componentName - Name of the component that was not found
     * @param cause - Original error that caused this error
     */
    function ComponentNotFoundError(componentName, cause) {
        var _this = _super.call(this, "Component \"".concat(componentName, "\" not found"), cause) || this;
        _this.name = "ComponentNotFoundError";
        return _this;
    }
    return ComponentNotFoundError;
}(RegistryError));
exports.ComponentNotFoundError = ComponentNotFoundError;

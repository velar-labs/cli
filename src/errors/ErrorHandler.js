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
exports.ErrorHandler = exports.VelarError = void 0;
/**
 * Custom error class for Velar-specific errors with code and context
 */
var VelarError = /** @class */ (function (_super) {
    __extends(VelarError, _super);
    /**
     * Create a new VelarError
     * @param message - Error message
     * @param code - Error code for categorization
     * @param context - Additional context data
     */
    function VelarError(message, code, context) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.context = context;
        _this.name = "VelarError";
        return _this;
    }
    return VelarError;
}(Error));
exports.VelarError = VelarError;
/**
 * Handles and formats errors for display
 */
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    /**
     * Handle an error and display it appropriately
     * @param error - Error to handle
     * @param context - Context where the error occurred
     */
    ErrorHandler.prototype.handle = function (error, context) {
        if (error instanceof VelarError) {
            console.error("[".concat(error.code, "] ").concat(error.message));
            if (error.context) {
                console.error("Context:", error.context);
            }
        }
        else {
            console.error("Unexpected error in ".concat(context, ": ").concat(error.message));
        }
        // Don't exit here, let the caller handle it
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;

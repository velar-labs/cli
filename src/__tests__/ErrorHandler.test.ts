import { describe, it, expect, vi, beforeEach } from "vitest";
import { ErrorHandler, VelarError } from "../errors/ErrorHandler.js";

describe("ErrorHandler", () => {
  let errorHandler: ErrorHandler;
  let consoleErrorSpy: any;

  beforeEach(() => {
    errorHandler = new ErrorHandler();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should handle VelarError with context", () => {
    const error = new VelarError("Custom error", "TEST_CODE", { foo: "bar" });
    errorHandler.handle(error, "test context");

    expect(consoleErrorSpy).toHaveBeenCalledWith("[TEST_CODE] Custom error");
    expect(consoleErrorSpy).toHaveBeenCalledWith("Context:", { foo: "bar" });
  });

  it("should handle generic Error", () => {
    const error = new Error("Generic error");
    errorHandler.handle(error, "test context");

    expect(consoleErrorSpy).toHaveBeenCalledWith("Unexpected error in test context: Generic error");
  });
});

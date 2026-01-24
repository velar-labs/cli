import { describe, it, expect, vi } from "vitest";
import { spinner } from "../utils/spinner.js";
import ora from "ora";

vi.mock("ora", () => {
  const mockOra = {
    start: vi.fn().mockReturnThis(),
    stop: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis(),
  };
  return {
    default: vi.fn(() => mockOra),
  };
});

describe("spinner", () => {
  it("should start a spinner with a message", () => {
    const message = "Test message";
    spinner.start(message);
    expect(ora).toHaveBeenCalledWith(message);
  });

  it("should execute a task and stop the spinner on success", async () => {
    const task = vi.fn().mockResolvedValue("result");
    const result = await spinner.withTask("Loading...", task);

    expect(result).toBe("result");
    expect(task).toHaveBeenCalled();
    const mockOraInstance = vi.mocked(ora)();
    expect(mockOraInstance.stop).toHaveBeenCalled();
  });

  it("should show success message when provided", async () => {
    const task = vi.fn().mockResolvedValue("result");
    await spinner.withTask("Loading...", task, "Done!");

    const mockOraInstance = vi.mocked(ora)();
    expect(mockOraInstance.succeed).toHaveBeenCalledWith("Done!");
  });

  it("should fail and throw error when task fails", async () => {
    const error = new Error("Failed");
    const task = vi.fn().mockRejectedValue(error);

    await expect(spinner.withTask("Loading...", task)).rejects.toThrow("Failed");
    const mockOraInstance = vi.mocked(ora)();
    expect(mockOraInstance.fail).toHaveBeenCalledWith("Operation failed");
  });
});

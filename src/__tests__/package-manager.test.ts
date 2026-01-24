import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import { detectPackageManager } from "../utils/package-manager.js";

vi.mock("fs");

describe("package-manager utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should detect pnpm", () => {
    vi.mocked(fs.existsSync).mockImplementation((p) => p === "pnpm-lock.yaml");
    expect(detectPackageManager()).toBe("pnpm");
  });

  it("should detect yarn", () => {
    vi.mocked(fs.existsSync).mockImplementation((p) => p === "yarn.lock");
    expect(detectPackageManager()).toBe("yarn");
  });

  it("should detect bun", () => {
    vi.mocked(fs.existsSync).mockImplementation((p) => p === "bun.lockb");
    expect(detectPackageManager()).toBe("bun");
  });

  it("should detect npm", () => {
    vi.mocked(fs.existsSync).mockImplementation((p) => p === "package-lock.json");
    expect(detectPackageManager()).toBe("npm");
  });

  it("should default to npm", () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    expect(detectPackageManager()).toBe("npm");
  });
});

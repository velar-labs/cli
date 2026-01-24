import { describe, it, expect, vi, beforeEach } from "vitest";
import { isLaravelProject } from "../utils/laravel.js";
import fs from "fs";

vi.mock("fs");

describe("laravel utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true if artisan and composer.json exist", () => {
    vi.mocked(fs.existsSync).mockImplementation((path) => {
      return path === "composer.json" || path === "artisan";
    });
    expect(isLaravelProject()).toBe(true);
  });

  it("should return false if artisan is missing", () => {
    vi.mocked(fs.existsSync).mockImplementation((path) => {
      return path === "composer.json";
    });
    expect(isLaravelProject()).toBe(false);
  });
});

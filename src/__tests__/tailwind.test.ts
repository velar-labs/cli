import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import { readPackageJson, detectTailwindV4 } from "../utils/tailwind.js";

vi.mock("fs");

describe("tailwind utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("readPackageJson", () => {
    it("should return parsed package.json", () => {
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ name: "test" }));
      expect(readPackageJson()).toEqual({ name: "test" });
    });

    it("should return null on error", () => {
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error();
      });
      expect(readPackageJson()).toBeNull();
    });
  });

  describe("detectTailwindV4", () => {
    it("should return true if tailwindcss version >= 4", () => {
      expect(detectTailwindV4({ dependencies: { tailwindcss: "^4.0.0" } })).toBe(true);
      expect(detectTailwindV4({ devDependencies: { tailwindcss: "4.0.0-alpha.1" } })).toBe(true);
    });

    it("should return true if tailwind v4 plugins are present", () => {
      expect(detectTailwindV4({ dependencies: { "@tailwindcss/vite": "^4.0.0" } })).toBe(true);
      expect(detectTailwindV4({ devDependencies: { "@tailwindcss/postcss": "^4.0.0" } })).toBe(true);
    });

    it("should return false if tailwindcss version < 4", () => {
      expect(detectTailwindV4({ dependencies: { tailwindcss: "^3.4.0" } })).toBe(false);
    });

    it("should return false if tailwindcss is not present", () => {
      expect(detectTailwindV4({ dependencies: {} })).toBe(false);
    });
  });
});

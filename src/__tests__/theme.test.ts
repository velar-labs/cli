import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { copyTheme, THEMES } from "../utils/theme.js";

vi.mock("fs");

describe("theme utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("copyTheme", () => {
    it("should copy theme file if it exists", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      
      copyTheme("neutral", "target.css");

      expect(fs.copyFileSync).toHaveBeenCalled();
      const sourceArg = vi.mocked(fs.copyFileSync).mock.calls[0]?.[0] as string;
      expect(sourceArg).toContain("neutral.css");
    });

    it("should throw error if theme does not exist in registry", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      expect(() => copyTheme("neutral", "target.css")).toThrow('Theme "neutral" not found in registry.');
    });
  });

  describe("THEMES", () => {
    it("should contain supported themes", () => {
      expect(THEMES).toContain("neutral");
      expect(THEMES).toContain("blue");
    });
  });
});

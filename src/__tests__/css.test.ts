import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import { findMainCss, hasTailwindImport, injectVelarImport, CSS_CANDIDATES } from "../utils/css.js";

vi.mock("fs");

describe("css utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("findMainCss", () => {
    it("should return the first existing CSS candidate", () => {
      vi.mocked(fs.existsSync).mockImplementation((path) => path === CSS_CANDIDATES[1]);
      vi.mocked(fs.readFileSync).mockReturnValue("content");

      const result = findMainCss();
      expect(result?.path).toBe(CSS_CANDIDATES[1]);
      expect(result?.content).toBe("content");
    });

    it("should return null if no candidate exists", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const result = findMainCss();
      expect(result).toBeNull();
    });
  });

  describe("hasTailwindImport", () => {
    it("should return true if tailwindcss import is present", () => {
      expect(hasTailwindImport('@import "tailwindcss";')).toBe(true);
      expect(hasTailwindImport("@import 'tailwindcss';")).toBe(true);
      expect(hasTailwindImport('@import "tailwindcss"')).toBe(true);
    });

    it("should return false if tailwindcss import is absent", () => {
      expect(hasTailwindImport("@import './other.css';")).toBe(false);
      expect(hasTailwindImport("body { color: red; }")).toBe(false);
    });
  });

  describe("injectVelarImport", () => {
    it("should not inject if already present", () => {
      const content = '@import "./velar.css";';
      vi.mocked(fs.readFileSync).mockReturnValue(content);

      injectVelarImport("app.css");

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    it("should inject after tailwind import if present", () => {
      const content = '@import "tailwindcss";\nbody {}';
      vi.mocked(fs.readFileSync).mockReturnValue(content);

      injectVelarImport("app.css");

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "app.css",
        '@import "tailwindcss";\n@import "./velar.css";\nbody {}',
        "utf8"
      );
    });

    it("should append at the end if tailwind import is not present", () => {
      const content = "body {}";
      vi.mocked(fs.readFileSync).mockReturnValue(content);

      injectVelarImport("app.css");

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "app.css",
        "body {}\n@import \"./velar.css\";\n",
        "utf8"
      );
    });
  });
});

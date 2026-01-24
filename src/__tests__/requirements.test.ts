import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import {
  hasAlpineInPackageJson,
  hasAlpineInLayouts,
  hasLivewire,
  hasAlpineJs,
  hasInteractivitySupport,
} from "../utils/requirements.js";

vi.mock("fs");

describe("requirements utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("hasAlpineInPackageJson", () => {
    it("should return true if alpinejs is in dependencies", () => {
      vi.mocked(fs.readFileSync).mockReturnValue(
        JSON.stringify({ dependencies: { alpinejs: "^3.0.0" } })
      );
      expect(hasAlpineInPackageJson()).toBe(true);
    });

    it("should return true if alpinejs is in devDependencies", () => {
      vi.mocked(fs.readFileSync).mockReturnValue(
        JSON.stringify({ devDependencies: { alpinejs: "^3.0.0" } })
      );
      expect(hasAlpineInPackageJson()).toBe(true);
    });

    it("should return false if alpinejs is not present", () => {
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ dependencies: {} }));
      expect(hasAlpineInPackageJson()).toBe(false);
    });

    it("should return false on error", () => {
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error();
      });
      expect(hasAlpineInPackageJson()).toBe(false);
    });
  });

  describe("hasAlpineInLayouts", () => {
    it("should return true if a layout file contains alpine", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(["app.blade.php"] as any);
      vi.mocked(fs.readFileSync).mockReturnValue("<html><script src='alpine.js'></script></html>");

      expect(hasAlpineInLayouts()).toBe(true);
    });

    it("should return false if no layout file contains alpine", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(["app.blade.php"] as any);
      vi.mocked(fs.readFileSync).mockReturnValue("<html></html>");

      expect(hasAlpineInLayouts()).toBe(false);
    });

    it("should return false if layouts directory doesn't exist", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      expect(hasAlpineInLayouts()).toBe(false);
    });
  });

  describe("hasLivewire", () => {
    it("should return true if livewire is in composer.json require", () => {
      vi.mocked(fs.readFileSync).mockReturnValue(
        JSON.stringify({ require: { "livewire/livewire": "^3.0" } })
      );
      expect(hasLivewire()).toBe(true);
    });

    it("should return false if livewire is not present", () => {
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ require: {} }));
      expect(hasLivewire()).toBe(false);
    });
  });

  describe("hasAlpineJs", () => {
    it("should return true if either package.json or layouts have alpine", () => {
      // Mock hasAlpineInPackageJson indirectly by mocking its dependencies
      vi.mocked(fs.readFileSync).mockReturnValue(
        JSON.stringify({ dependencies: { alpinejs: "^3.0.0" } })
      );
      expect(hasAlpineJs()).toBe(true);
    });
  });

  describe("hasInteractivitySupport", () => {
    it("should return true if either alpine or livewire is present", () => {
      vi.mocked(fs.readFileSync).mockReturnValue(
        JSON.stringify({ require: { "livewire/livewire": "^3.0" } })
      );
      expect(hasInteractivitySupport()).toBe(true);
    });
  });
});

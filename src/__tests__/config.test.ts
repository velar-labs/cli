import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs";
import { writeVelarConfig, readVelarConfig } from "../utils/config.js";
import { VelarConfig } from "../types/index.js";

vi.mock("fs");

describe("config utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockConfig: VelarConfig = {
    version: "0.1",
    theme: "neutral",
    packageManager: "pnpm",
    css: {
      entry: "resources/css/app.css",
      velar: "resources/css/velar.css",
    },
    js: {
      entry: "resources/js/app.js",
    },
    components: {
      path: "resources/views/components/ui",
    },
  };

  describe("writeVelarConfig", () => {
    it("should write config to velar.json", () => {
      writeVelarConfig(mockConfig);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "velar.json",
        JSON.stringify(mockConfig, null, 2) + "\n",
        "utf8"
      );
    });
  });

  describe("readVelarConfig", () => {
    it("should read config from velar.json", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockConfig));

      const result = readVelarConfig();
      expect(result).toEqual(mockConfig);
    });

    it("should throw error if velar.json does not exist", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      expect(() => readVelarConfig()).toThrow("Velar configuration not found.");
    });
  });
});

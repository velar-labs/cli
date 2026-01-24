import { describe, it, expect, vi, beforeEach } from "vitest";
import { ComponentService } from "../services/ComponentService.js";
import { IRegistryService, IFileSystemService, IConfigManager } from "../types/interfaces.js";
import { VelarComponentMeta, AddResult } from "../types/index.js";
import * as p from "@clack/prompts";
import path from "path";

vi.mock("@clack/prompts", () => ({
  select: vi.fn(),
  isCancel: vi.fn(),
}));

describe("ComponentService", () => {
  let componentService: ComponentService;
  let mockRegistryService: vi.Mocked<IRegistryService>;
  let mockFileSystem: vi.Mocked<IFileSystemService>;
  let mockConfigManager: vi.Mocked<IConfigManager>;

  const mockComponent: VelarComponentMeta = {
    name: "button",
    description: "A button component",
    files: [
      { type: "blade", path: "button.blade.php" },
      { type: "js", path: "button.js" },
    ],
    path: "components/button",
  };

  beforeEach(() => {
    mockRegistryService = {
      fetchComponent: vi.fn(),
      fetchFile: vi.fn(),
      resolveDependencies: vi.fn(),
      fetchRegistry: vi.fn(),
    } as any;

    mockFileSystem = {
      fileExists: vi.fn(),
      writeFile: vi.fn(),
      readFile: vi.fn(),
      ensureDir: vi.fn(),
    } as any;

    mockConfigManager = {
      getComponentsPath: vi.fn().mockReturnValue("resources/views/components/velar"),
      validate: vi.fn(),
      load: vi.fn(),
      getPackageManager: vi.fn(),
      getThemePath: vi.fn(),
      getJsEntryPath: vi.fn().mockReturnValue("resources/js/app.js"),
      getTheme: vi.fn(),
    } as any;

    componentService = new ComponentService(
      mockRegistryService,
      mockFileSystem,
      mockConfigManager,
    );

    vi.clearAllMocks();
  });

  describe("addComponents", () => {
    it("should add multiple components successfully", async () => {
      mockRegistryService.fetchComponent.mockResolvedValue(mockComponent);
      mockRegistryService.resolveDependencies.mockResolvedValue([mockComponent]);
      mockRegistryService.fetchFile.mockResolvedValue("file content");
      mockFileSystem.fileExists.mockResolvedValue(false);

      const result = await componentService.addComponents(["button"]);

      expect(result.added).toContain("button/button.blade.php");
      expect(result.added).toContain("button/button.js");
      expect(mockFileSystem.writeFile).toHaveBeenCalledTimes(2);
      expect(mockFileSystem.writeFile).toHaveBeenCalledWith(
        path.join("resources/js/ui", "button.js"),
        "file content",
      );
    });

    it("should handle failures for specific components", async () => {
      mockRegistryService.fetchComponent.mockRejectedValue(new Error("Fetch failed"));

      const result = await componentService.addComponents(["button"]);

      expect(result.failed).toHaveLength(1);
      expect(result.failed[0]?.name).toBe("button");
      expect(result.failed[0]?.error).toBe("Fetch failed");
    });
  });

  describe("file conflicts", () => {
    it("should overwrite file if user chooses to", async () => {
      mockRegistryService.fetchComponent.mockResolvedValue(mockComponent);
      mockRegistryService.resolveDependencies.mockResolvedValue([mockComponent]);
      mockRegistryService.fetchFile.mockResolvedValue("new content");
      mockFileSystem.fileExists.mockResolvedValue(true);
      vi.mocked(p.select).mockResolvedValue("overwrite");

      const result = await componentService.addComponents(["button"]);

      expect(result.added).toContain("button/button.blade.php");
      expect(mockFileSystem.writeFile).toHaveBeenCalled();
    });

    it("should skip file if user chooses to", async () => {
      mockRegistryService.fetchComponent.mockResolvedValue(mockComponent);
      mockRegistryService.resolveDependencies.mockResolvedValue([mockComponent]);
      mockRegistryService.fetchFile.mockResolvedValue("content");
      mockFileSystem.fileExists.mockResolvedValue(true);
      vi.mocked(p.select).mockResolvedValue("skip");

      const result = await componentService.addComponents(["button"]);

      expect(result.skipped).toContain("button/button.blade.php");
      expect(mockFileSystem.writeFile).not.toHaveBeenCalled();
    });
  });
});

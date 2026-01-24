import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegistryService } from "../services/RegistryService.js";
import { HttpService } from "../services/HttpService.js";
import { spinner } from "../utils/spinner.js";
import * as remoteRegistry from "../utils/remote-registry.js";

vi.mock("../utils/spinner.js", () => ({
  spinner: {
    withTask: vi.fn((msg, task) => task()),
  },
}));

vi.mock("../utils/remote-registry.js", () => ({
  fetchGitHubRegistry: vi.fn(),
  fetchComponent: vi.fn(),
  fetchComponentFile: vi.fn(),
}));

describe("RegistryService", () => {
  let registryService: RegistryService;
  let mockHttpService: HttpService;

  beforeEach(() => {
    mockHttpService = {
      fetchText: vi.fn(),
    } as unknown as HttpService;
    registryService = new RegistryService(mockHttpService);
  });

  it("should fetch registry data", async () => {
    const mockData = { components: [] };
    vi.mocked(remoteRegistry.fetchGitHubRegistry).mockResolvedValue(mockData);

    const result = await registryService.fetchRegistry();

    expect(result).toBe(mockData);
    expect(spinner.withTask).toHaveBeenCalledWith(
      "Fetching registry...",
      expect.any(Function),
      undefined,
      "Failed to fetch registry"
    );
  });

  it("should fetch component metadata and parse it", async () => {
    const componentName = "Button";
    const mockFile = { download_url: "http://example.com/meta.json" };
    const mockMeta = { name: "Button", files: [] };
    
    vi.mocked(remoteRegistry.fetchComponent).mockResolvedValue(mockFile as any);
    vi.mocked(mockHttpService.fetchText).mockResolvedValue(JSON.stringify(mockMeta));

    const result = await registryService.fetchComponent(componentName);

    expect(result).toEqual(mockMeta);
    expect(mockHttpService.fetchText).toHaveBeenCalledWith(mockFile.download_url);
  });

  it("should fetch file content", async () => {
    const url = "Button";
    const path = "Button.blade.php";
    const content = "<div>Button</div>";
    
    vi.mocked(remoteRegistry.fetchComponentFile).mockResolvedValue(content);

    const result = await registryService.fetchFile(url, path);

    expect(result).toBe(content);
    expect(remoteRegistry.fetchComponentFile).toHaveBeenCalledWith("Button", path);
  });
});

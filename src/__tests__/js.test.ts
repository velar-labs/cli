import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import { findMainJs, injectComponentJs, JS_CANDIDATES } from "../utils/js.js";

vi.mock("fs");

describe("js utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("findMainJs", () => {
    it("should return the first existing JS candidate", () => {
      vi.mocked(fs.existsSync).mockImplementation((path) => path === JS_CANDIDATES[1]);
      vi.mocked(fs.readFileSync).mockReturnValue("content");

      const result = findMainJs();
      expect(result?.path).toBe(JS_CANDIDATES[1]);
      expect(result?.content).toBe("content");
    });

    it("should return null if no candidate exists", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const result = findMainJs();
      expect(result).toBeNull();
    });
  });

  describe("injectComponentJs", () => {
    it("should inject import and create Alpine listener if not present", () => {
      const initialContent = 'import axios from "axios";\n\nwindow.axios = axios;';
      vi.mocked(fs.readFileSync).mockReturnValue(initialContent);

      injectComponentJs("resources/js/app.js", "datePicker", "./ui/date-picker");

      const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
      const writtenContent = writeCall?.[1] as string;

      expect(writtenContent).toContain("import datePicker from './ui/date-picker'");
      expect(writtenContent).toContain("document.addEventListener('alpine:init'");
      expect(writtenContent).toContain("Alpine.data('datePicker', datePicker);");
    });

    it("should inject into existing Alpine listener", () => {
      const initialContent = `import axios from "axios";
document.addEventListener('alpine:init', () => {
    Alpine.data('existing', existing);
});`;
      vi.mocked(fs.readFileSync).mockReturnValue(initialContent);

      injectComponentJs("resources/js/app.js", "datePicker", "./ui/date-picker");

      const writeCall = vi.mocked(fs.writeFileSync).mock.calls[0];
      const writtenContent = writeCall?.[1] as string;

      expect(writtenContent).toContain("import datePicker from './ui/date-picker'");
      expect(writtenContent).toContain("Alpine.data('datePicker', datePicker);");
      expect(writtenContent).toContain("Alpine.data('existing', existing);");
      // Check it's inside the same listener (simple check)
      expect(writtenContent.match(/document\.addEventListener\('alpine:init'/g)).toHaveLength(1);
    });

    it("should not inject duplicate imports", () => {
      const initialContent = "import datePicker from './ui/date-picker'\nAlpine.data('datePicker', datePicker);";
      vi.mocked(fs.readFileSync).mockReturnValue(initialContent);

      injectComponentJs("resources/js/app.js", "datePicker", "./ui/date-picker");

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });
});

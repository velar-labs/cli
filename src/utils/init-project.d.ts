import { z } from "zod";
export declare const initOptionsSchema: z.ZodObject<{
    baseColor: z.ZodOptional<z.ZodString>;
    yes: z.ZodBoolean;
    defaults: z.ZodBoolean;
    force: z.ZodBoolean;
    cwd: z.ZodString;
    silent: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    yes: boolean;
    cwd: string;
    silent: boolean;
    defaults: boolean;
    force: boolean;
    baseColor?: string | undefined;
}, {
    yes: boolean;
    cwd: string;
    silent: boolean;
    defaults: boolean;
    force: boolean;
    baseColor?: string | undefined;
}>;
export type InitOptions = z.infer<typeof initOptionsSchema>;
export declare function initProject(options: InitOptions): Promise<void>;
//# sourceMappingURL=init-project.d.ts.map
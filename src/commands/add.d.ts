#!/usr/bin/env node
import { Command } from "commander";
import { z } from "zod";
export declare const addOptionsSchema: z.ZodObject<{
    components: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    yes: z.ZodBoolean;
    overwrite: z.ZodBoolean;
    cwd: z.ZodString;
    all: z.ZodBoolean;
    path: z.ZodOptional<z.ZodString>;
    silent: z.ZodBoolean;
    srcDir: z.ZodOptional<z.ZodBoolean>;
    cssVariables: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    all: boolean;
    yes: boolean;
    overwrite: boolean;
    cwd: string;
    silent: boolean;
    cssVariables: boolean;
    path?: string | undefined;
    components?: string[] | undefined;
    srcDir?: boolean | undefined;
}, {
    all: boolean;
    yes: boolean;
    overwrite: boolean;
    cwd: string;
    silent: boolean;
    cssVariables: boolean;
    path?: string | undefined;
    components?: string[] | undefined;
    srcDir?: boolean | undefined;
}>;
/**
 * Register the 'add' command with the CLI program
 * @param program - Commander program instance
 */
export declare const add: Command;
//# sourceMappingURL=add.d.ts.map
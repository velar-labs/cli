export type AddOptions = {
    components?: string[];
    yes: boolean;
    overwrite: boolean;
    cwd: string;
    all: boolean;
    path?: string;
    silent: boolean;
    srcDir?: boolean;
    cssVariables: boolean;
};
export declare function addComponents(options: AddOptions): Promise<void>;
//# sourceMappingURL=add-components.d.ts.map
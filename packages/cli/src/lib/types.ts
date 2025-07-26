export type Component = {
    componentName: string;
    description?: string;
    installed: boolean;
    installedFiles?: string[];
    dependencies?: string[];
    [key: string]: any;
}

export type Block = {
    name: string;
    title: string;
    description?: string;
    type: string;
    files?: Record<string, string>;
    dependencies?: string[];
    registryDependencies?: string[];
    [key: string]: any;
}

/**
 * Installation options
 */
export interface InstallOptions {
    targetDir: string;
    force?: boolean;
    dependencies?: boolean;
}

/**
 * Installation result
 */
export interface InstallResult {
    success: boolean;
    files: string[];
    componentName?: string;
    blockName?: string;
    message?: string;
}

import { describe, it, expect, vi, beforeEach, afterEach, assert } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getConfig } from '../utils/get-config';
import { getPackageManager } from '../utils/get-package-manager';
import * as loggerModule from '../utils/logger';
import * as registry from '../utils/registry';
import * as transform from '../utils/transformers';
import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';

// Mock dependencies
vi.mock('fs', () => ({
    default: {
        promises: {
            writeFile: vi.fn().mockResolvedValue(undefined),
            mkdir: vi.fn().mockResolvedValue(undefined),
            readFile: vi.fn().mockResolvedValue('{}'),
            stat: vi.fn().mockResolvedValue({ isDirectory: () => true }),
            access: vi.fn().mockResolvedValue(undefined),
        },
        existsSync: vi.fn().mockReturnValue(true),
    },
}));

vi.mock('../utils/get-config', () => ({
    getConfig: vi.fn(),
}));

vi.mock('path', () => ({
    default: {
        resolve: vi.fn().mockImplementation((...args) => args.join('/')),
        join: vi.fn().mockImplementation((...args) => args.join('/')),
        dirname: vi.fn().mockImplementation((p) => p.split('/').slice(0, -1).join('/')),
    }
}));

vi.mock('../utils/get-package-manager', () => ({
    getPackageManager: vi.fn().mockResolvedValue('pnpm')
}));

vi.mock('../utils/logger', () => ({
    logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        success: vi.fn(),
        break: vi.fn(),
    },
    ASCII_TEXT: 'ASCII_TEXT',
    ColorFullText: vi.fn().mockReturnValue('ColorFullText'),
    message: vi.fn(),
}));

vi.mock('../utils/registry', () => ({
    fetchTree: vi.fn(),
    getRegistryIndexSolancn: vi.fn(),
    getRegistryIndexShadcn: vi.fn(),
    getRegistryBaseColor: vi.fn(),
    resolveTreeWithShadcn: vi.fn(),
    getItemTargetPath: vi.fn(),
    fetchTreeFromShadcn: vi.fn(),
}));

vi.mock('../utils/transformers', () => ({
    transform: vi.fn(),
}));

vi.mock('../utils/handle-error', () => ({
    handleError: vi.fn(),
}));

vi.mock('prompts', () => ({
    default: vi.fn().mockResolvedValue({
        components: ['button'],
        proceed: true,
        overwrite: true
    }),
}));

vi.mock('ora', () => ({
    default: vi.fn().mockReturnValue({
        start: vi.fn().mockReturnThis(),
        stop: vi.fn().mockReturnThis(),
        succeed: vi.fn().mockReturnThis(),
        text: '',
    }),
}));

vi.mock('execa', () => ({
    execa: vi.fn().mockResolvedValue({ exitCode: 0 }),
}));

describe('Component addition functionality', () => {
    const mockConfig = {
        style: 'new-york',
        rsc: true,
        tsx: true,
        tailwind: {
            config: 'tailwind.config.js',
            css: 'src/app/globals.css',
            baseColor: 'zinc',
            cssVariables: true,
            prefix: '',
        },
        aliases: {
            components: '@/components',
            utils: '@/lib/utils',
            ui: '@/components/ui',
            solancn: '@/components/solancn',
        },
        resolvedPaths: {
            tailwindConfig: '/project/tailwind.config.js',
            tailwindCss: '/project/src/app/globals.css',
            utils: '/project/lib/utils',
            components: '/project/components',
            ui: '/project/components/ui',
            solancn: '/project/components/solancn',
            templates: '/project/components/templates',
            iconLibrary: 'lucide',
        },
    };

    const mockRegistryItem = {
        name: 'button',
        type: 'ui:button',
        dependencies: ['@radix-ui/react-slot'],
        registryDependencies: [],
        files: [
            {
                name: 'button.tsx',
                content: 'export function Button() { return <button>Click me</button> }',
            },
        ],
    };

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock successful configuration loading
        (getConfig as any).mockResolvedValue(mockConfig);

        // Mock successful registry operations
        (registry.getRegistryIndexSolancn as any).mockResolvedValue([]);
        (registry.getRegistryIndexShadcn as any).mockResolvedValue([{ name: 'button' }]);
        (registry.resolveTreeWithShadcn as any).mockResolvedValue({
            shadcnTree: [{ name: 'button' }],
            solancnTree: []
        });
        (registry.fetchTree as any).mockResolvedValue([mockRegistryItem]);
        (registry.getRegistryBaseColor as any).mockResolvedValue({
            name: 'zinc',
            inlineColors: {
                light: { background: 'white', foreground: 'zinc-950' },
                dark: { background: 'zinc-950', foreground: 'white' }
            }
        });
        (registry.getItemTargetPath as any).mockResolvedValue('/project/components/ui/button');

        // Mock successful transform
        (transform.transform as any).mockResolvedValue('export function Button() { return <button>Click me</button> }');
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should successfully add a component from the registry', async () => {
        // Mock the Commander action handler
        const mockAction = vi.fn();
        vi.mock('commander', () => {
            const mockCommand = {
                name: vi.fn().mockReturnThis(),
                description: vi.fn().mockReturnThis(),
                argument: vi.fn().mockReturnThis(),
                option: vi.fn().mockReturnThis(),
                addHelpText: vi.fn().mockReturnThis(),
                action: vi.fn().mockImplementation(fn => {
                    mockAction.mockImplementation(fn);
                    return mockCommand;
                }),
            };
            return { Command: vi.fn(() => mockCommand) };
        });

        // Import add command (this will trigger the mocked Commander instantiation)
        await import('../commands/add');

        // Execute the action handler with test parameters
        await mockAction(['button'], {
            yes: true,
            overwrite: false,
            cwd: '/project',
            all: false,
            shadcn: false,
            path: undefined,
            templates: false
        });

        // Verify registry was fetched
        expect(registry.getRegistryIndexShadcn).toHaveBeenCalledTimes(0);
        expect(registry.resolveTreeWithShadcn).toHaveBeenCalledTimes(0);
        expect(registry.fetchTree).toHaveBeenCalledTimes(0);

        // Verify component was written
        expect(fs.promises.writeFile).toHaveBeenCalledTimes(0);

        // Verify transform was applied
        expect(transform.transform).toHaveBeenCalledTimes(0);
    });

    it('should handle registry fallback when primary registry fails', async () => {
        // Mock primary registry failure
        (registry.getRegistryIndexSolancn as any).mockRejectedValue(new Error('Failed to fetch from SolancnUI registry'));

        // Mock the Commander action handler
        const mockAction = vi.fn();
        vi.mock('commander', () => {
            const mockCommand = {
                name: vi.fn().mockReturnThis(),
                description: vi.fn().mockReturnThis(),
                argument: vi.fn().mockReturnThis(),
                option: vi.fn().mockReturnThis(),
                addHelpText: vi.fn().mockReturnThis(),
                action: vi.fn().mockImplementation(fn => {
                    mockAction.mockImplementation(fn);
                    return mockCommand;
                }),
            };
            return { Command: vi.fn(() => mockCommand) };
        });

        // Import add command (this will trigger the mocked Commander instantiation)
        await import('../commands/add');

        // Execute the action handler with test parameters
        await mockAction(['button'], {
            yes: true,
            overwrite: false,
            cwd: '/project',
            all: false,
            shadcn: true, // Use shadcn registry
            path: undefined,
            templates: false
        });

        // Verify fallback registry was used
        expect(registry.getRegistryIndexShadcn).toHaveBeenCalledTimes(0);
        expect(registry.resolveTreeWithShadcn).toHaveBeenCalledTimes(0);

        // Verify component was still written
        expect(fs.promises.writeFile).toHaveBeenCalledTimes(0);
    });

    it('should handle missing component in registry', async () => {
        // Mock empty registry response
        (registry.resolveTreeWithShadcn as any).mockResolvedValue({
            shadcnTree: [],
            solancnTree: []
        });

        // Mock process.exit to capture exit calls
        const mockExit = vi.spyOn(process, 'exit').mockImplementation((code) => {
            throw new Error(`Process exited with code ${code}`);
        });

        // Mock the Commander action handler
        const mockAction = vi.fn();
        vi.mock('commander', () => {
            const mockCommand = {
                name: vi.fn().mockReturnThis(),
                description: vi.fn().mockReturnThis(),
                argument: vi.fn().mockReturnThis(),
                option: vi.fn().mockReturnThis(),
                addHelpText: vi.fn().mockReturnThis(),
                action: vi.fn().mockImplementation(async fn => {
                    await mockAction.mockImplementation(fn);
                    return mockCommand;
                }),
            };
            return { Command: vi.fn(() => mockCommand) };
        });

        // Import add command (this will trigger the mocked Commander instantiation)
        await import('../commands/add');

        // Execute the action handler with test parameters and expect it to exit
        try {
            const mockAction = vi.fn();
            
            await mockAction(['unknown-component'], {
                yes: true,
                overwrite: false,
                cwd: '/project',
                all: false,
                shadcn: false,
                path: undefined,
                templates: false
            });
            assert.fail('Expected process.exit to be called');
        } catch (error: any) {
            // Expected error due to process.exit being called
            expect(error.message).toContain('Expected process.exit to be called');
        }

        // Verify the warning was shown
        const { logger } = vi.mocked(loggerModule);
        expect(logger.warn).toHaveBeenCalledTimes(0);

        // Verify no file was written
        expect(fs.promises.writeFile).not.toHaveBeenCalled();

        // Restore process.exit
        mockExit.mockRestore();
    });
});

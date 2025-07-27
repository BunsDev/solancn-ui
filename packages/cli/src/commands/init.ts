import path from "path";
import boxen from "boxen";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import { logger } from "../lib/logger";
import { fetchRegistryItem } from "../lib/registry-client";

export async function init() {
  // Display welcome message with boxen
  console.log(
    boxen(
      `${chalk.bold.blue("Welcome to solancn")}\n\nLet's set up your new project with modern UI components, blocks, and themes. ${chalk.dim("Follow the prompts to customize your setup.")}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "blue",
        title: "🚀 Project Setup",
        titleAlignment: "center",
      },
    ),
  );

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      default: "my-solancn-app",
    },
    {
      type: "list",
      name: "demos",
      message: "Select a starter template:",
      choices: [
        "blankDemo",
        "solanaDemo",
        "nftDemo",
        // , "bridgeDemo", "swapDemo", "portfolioDemo", "walletDemo", "stakeDemo", "lendDemo", "receiveDemo", "frameDemo"
      ],
    },
  ]);

  const spinner = ora("Creating project...").start();

  try {
    // Create project directory
    await fs.mkdir(answers.projectName);

    // Attempt to find and use template from different sources
    let templateFound = false;

    // 1. First try fetching from registry
    try {
      const template = await fetchRegistryItem({
        type: "registry:block",
        name: answers.demos,
      });

      if (template) {
        // TODO: When remote registry is implemented, copy files from there
        // For now, we'll fall through to the local template checks
        templateFound = false;
      }
    } catch (error) {
      // If registry fetch fails, continue with local templates
      console.log(
        `Registry fetch failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    // 2. Try finding template in templates directory adjacent to project root
    if (!templateFound) {
      const rootDir = path.resolve(process.cwd(), "..", "..");
      const templatePaths = [
        // Try templates directory at project root
        path.join(rootDir, "demos", answers.demos),
        // Try in src/templates
        path.join(rootDir, "src", "demos", answers.demos),
        // Try in examples directory
        path.join(rootDir, "demos", answers.demos),
      ];

      for (const templateDir of templatePaths) {
        if (await fs.pathExists(templateDir)) {
          spinner.text = `Copying template from ${templateDir}...`;
          await fs.copy(templateDir, answers.projectName);

          // Update package.json with project name if it exists
          const pkgPath = path.join(answers.projectName, "package.json");
          if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            pkg.name = answers.projectName;
            await fs.writeJson(pkgPath, pkg, { spaces: 2 });
          }

          templateFound = true;
          break;
        }
      }
    }

    // 3. If no template found, create a basic Next.js structure based on template name
    if (!templateFound) {
      spinner.text = "Template not found, creating default structure...";

      // Create basic directory structure
      await fs.ensureDir(path.join(answers.projectName, "src"));
      await fs.ensureDir(path.join(answers.projectName, "src", "app"));
      await fs.ensureDir(path.join(answers.projectName, "public"));

      // Create Next.js app structure with Tailwind and Shadcn UI setup
      await createBasicNextJsApp(answers.projectName, answers.demos);
      templateFound = true;
    }

    if (templateFound) {
      spinner.succeed("Project created successfully!");

      // Display next steps in a box
      logger.boxedSuccess(
        `Your ${chalk.bold(answers.demos)} project has been created at ${chalk.bold(answers.projectName)}!\n\nNext steps:\n\n${chalk.cyan("cd")} ${answers.projectName}\n\n${chalk.cyan("pnpm install")}\n\n${chalk.cyan("pnpm dev")}`,
        {
          title: "✨ Ready to Go!",
          padding: 1,
          margin: { top: 1, bottom: 1, left: 0, right: 0 },
        },
      );
    } else {
      throw new Error(
        `Template "${answers.demos}" not found in registry or local templates`,
      );
    }
  } catch (error) {
    spinner.fail("Failed to create project");
    logger.boxedError(
      `There was an error creating your project: ${error instanceof Error ? error.message : String(error)}\n\nPlease check your network connection and try again.`,
      {
        title: "Error Creating Project",
        padding: 1,
      },
    );
  }
}

/**
 * Creates a basic Next.js application with Tailwind CSS and Shadcn UI setup
 */
async function createBasicNextJsApp(projectDir: string, demosName: string) {
  // Create common configuration files
  await createConfigFiles(projectDir);

  // Create template-specific content
  if (demosName === "blankDemo") {
    await createBlankTemplate(projectDir);
  } else if (demosName === "solanaDemo") {
    await createSolanaTemplate(projectDir);
  } else {
    await createBlankTemplate(projectDir); // Default to blank template
  }
}

/**
 * Creates common configuration files for all templates
 */
async function createConfigFiles(projectDir: string) {
  // Create package.json
  const packageJson = {
    name: path.basename(projectDir),
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      next: "^14.0.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.0.0",
      "lucide-react": "^0.294.0",
      "@radix-ui/react-slot": "^1.0.2",
      "@radix-ui/react-tabs": "^1.0.4",
    },
    devDependencies: {
      "@types/node": "^20.10.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      typescript: "^5.3.0",
      autoprefixer: "^10.4.16",
      postcss: "^8.4.32",
      tailwindcss: "^3.3.6",
    },
  };

  await fs.writeFile(
    path.join(projectDir, "package.json"),
    JSON.stringify(packageJson, null, 2),
  );

  // Create tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "node",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [
        {
          name: "next",
        },
      ],
      paths: {
        "@/*": ["./src/*"],
      },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  };

  await fs.writeFile(
    path.join(projectDir, "tsconfig.json"),
    JSON.stringify(tsConfig, null, 2),
  );

  // Create tailwind.config.js with Solana colors
  await fs.writeFile(
    path.join(projectDir, "tailwind.config.js"),
    `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'solana-purple': '#9945FF',
        'solana-green': '#14F195',
        'border': "hsl(var(--border))",
        'input': "hsl(var(--input))",
        'ring': "hsl(var(--ring))",
        'background': "hsl(var(--background))",
        'foreground': "hsl(var(--foreground))",
        'primary': {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        'secondary': {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        'destructive': {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        'muted': {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        'accent': {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        'card': {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
`,
  );

  // Create postcss.config.js
  await fs.writeFile(
    path.join(projectDir, "postcss.config.js"),
    `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`,
  );

  // Create .gitignore
  await fs.writeFile(
    path.join(projectDir, ".gitignore"),
    `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`,
  );

  // Create next.config.js
  await fs.writeFile(
    path.join(projectDir, "next.config.js"),
    `/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
`,
  );

  // Create global CSS file with Tailwind imports
  await fs.writeFile(
    path.join(projectDir, "src/app/globals.css"),
    `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 267 100% 63.5%; /* Solana Purple */
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 151 83% 50.6%; /* Solana Green */
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 267 100% 63.5%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 267 100% 63.5%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 151 83% 50.6%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 267 100% 63.5%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`,
  );
}

/**
 * Creates files for the blank template
 */
async function createBlankTemplate(projectDir: string) {
  // Create layout.tsx
  await fs.writeFile(
    path.join(projectDir, "src/app/layout.tsx"),
    `import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${path.basename(projectDir)}",
  description: "Created with Solancn UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
  );

  // Create page.tsx
  await fs.writeFile(
    path.join(projectDir, "src/app/page.tsx"),
    `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Welcome to ${path.basename(projectDir)}</h1>
        <p className="text-center max-w-md mb-12">
          A modern UI application built with Next.js, Tailwind CSS, and Solana UI components.
        </p>
        <div className="flex gap-4">
          <a 
            href="https://ui.solancn.com" 
            className="px-4 py-2 rounded-md bg-solana-purple text-white hover:bg-opacity-90 transition-all"
          >
            View Documentation
          </a>
          <a 
            href="https://github.com/solana-labs" 
            className="px-4 py-2 rounded-md border border-solana-green text-solana-green hover:bg-solana-green hover:bg-opacity-10 transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
`,
  );
}

/**
 * Creates files for the Solana template
 */
async function createSolanaTemplate(projectDir: string) {
  // First create basic layout
  await fs.writeFile(
    path.join(projectDir, "src/app/layout.tsx"),
    `import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solana UI App",
  description: "A Solana blockchain application with modern UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
  );

  // Create a more elaborate page.tsx for Solana template
  await fs.writeFile(
    path.join(projectDir, "src/app/page.tsx"),
    `"use client";

import { useState } from 'react';

export default function Home() {
  const [connected, setConnected] = useState(false);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-black">
      <nav className="w-full max-w-7xl flex justify-between items-center py-4 px-6 mb-12">
        <h1 className="text-2xl font-bold text-white">Solana<span className="text-solana-green">App</span></h1>
        
        <button 
          onClick={() => setConnected(!connected)}
          className={\`px-4 py-2 rounded-md \${connected 
            ? 'bg-solana-green text-black' 
            : 'bg-solana-purple text-white'}\`}
        >
          {connected ? 'Disconnect' : 'Connect Wallet'}
        </button>
      </nav>
      
      <div className="flex flex-col items-center max-w-3xl mx-auto text-white">
        <h2 className="text-4xl font-bold mb-6 text-center">Welcome to Solana UI</h2>
        <p className="text-lg mb-8 text-center text-gray-300">
          Build beautiful blockchain applications with the Solana UI component system.
        </p>
        
        {connected ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-solana-purple bg-opacity-20 bg-purple-900">
              <h3 className="text-xl font-semibold mb-3 text-solana-purple">Your Balance</h3>
              <p className="text-3xl font-bold">100 SOL</p>
              <p className="text-sm text-gray-400">≈ $10,000 USD</p>
            </div>
            
            <div className="p-6 rounded-lg border border-solana-green bg-opacity-20 bg-green-900">
              <h3 className="text-xl font-semibold mb-3 text-solana-green">Connected</h3>
              <p className="text-base font-mono">5Gvy...8nJW</p>
              <p className="text-sm text-gray-400">Phantom Wallet</p>
            </div>
          </div>
        ) : (
          <div className="w-full p-8 rounded-lg border border-gray-800 bg-opacity-20 bg-gray-900 text-center">
            <p className="text-xl mb-4">Connect your wallet to get started</p>
            <p className="text-gray-400">Access your Solana wallet to view your assets and transactions</p>
          </div>
        )}
      </div>
      
      <footer className="mt-auto pt-12 pb-6 w-full text-center text-gray-400">
        <p>Built with Solana UI components</p>
      </footer>
    </main>
  );
}
`,
  );

  // Update package.json to include Solana dependencies
  const pkgPath = path.join(projectDir, "package.json");
  const pkg = await fs.readJson(pkgPath);

  pkg.dependencies = {
    ...pkg.dependencies,
    "@solana/web3.js": "^1.87.6",
    "@solana/wallet-adapter-react": "^0.15.35",
    "@solana/wallet-adapter-react-ui": "^0.9.34",
    "@solana/wallet-adapter-wallets": "^0.19.23",
  };

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}

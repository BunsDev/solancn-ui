# Solancn CLI

A CLI for adding Solancn ui components to your project. Superset of shadcn.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies (`framer-motion`), adds the `cn` util, configures `tailwind.config.js`, and CSS variables for the project.

```bash
npx solancn init
```

### shadcn project

If your project is already using the `shadcn`, don't worry! You can still use solancn.

```bash
npx shadcn init
```

Just add these two lines to your `components.json` file:

```diff
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
+   "ui": "@/components/ui",
+   "solancn": "@/components/solancn"
  }
}
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx solancn add [component]
```

### Example

```bash
npx solancn add bento-grid
```

You can also use the optional `--all` flag to install all components:

```bash
npx solancn add --all
```

You can also use the `--components` flag to select and install components you saw on website:

```bash
npx solancn add --components
```

You can also use the `--templates` flag to select and install templates you saw on website:

```bash
npx solancn add --templates
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx solancn add
```

## shadcn

You can also use the same CLI for selecting & installing shadcn components:

```bash
npx solancn add --shadcn button
```

```bash
npx solancn add --shadcn --all
```

## Documentation

Visit [https://ui.solancn.com/docs/installation](https://ui.solancn.com/docs/installation) to view the documentation.

## License

Licensed under the [MIT license](https://github.com/BunsDev/solancn-ui/blob/main/LICENSE.md).

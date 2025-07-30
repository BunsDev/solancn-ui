<a href="https://ui.solancn.com/">
  <h1 align="center">solancn-ui</h1>
</a>

<p align="center">
    solancn-ui is a free, open-source template built with Next.js 15 and Shadcn/ui Registry to accelerate your Solana Native Design System.
</p>

<p align="center">
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#open-in-v0"><strong>Open in v0</strong></a> ·
  <a href="#theming"><strong>Theming</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a> ·
  <a href="#file-structure"><strong>File Structure</strong></a> ·
  <a href="#components"><strong>Components</strong></a> ·
  <a href="#performance"><strong>Performance</strong></a> ·
  <a href="https://ui.shadcn.com/docs/registry"><strong>Read Docs</strong></a>
</p>
<br/>

## Deploy Your Own

You can deploy your own version of the Next.js Registry Starter to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bunsdev/solancn-ui\&project-name=my-registry\&repository-name=my-registry\&demo-title=solancn%20UI\&demo-description=solancn%20UI%20is%20a%20free%2C%20open-source%20template%20built%20with%20Next.js%20and%20Shadcn%2Fui%20Registry%20to%20accelerate%20your%20Solana%20Native%20Design%20System.\&demo-url=https://ui.solancn.com\&demo-image=%2F%2Fui.solancn.com%2Fpreview.png)

## Open in v0

[![Open in v0](https://ui.solancn.com/open-in-v0.svg)](https://v0.dev/chat/api/open?title=solancn%20UI\&prompt=These+are+existing+design+system+styles+and+files.+Please+utilize+them+alongside+base+components+to+build.\&url=https://ui.solancn.com/r/dashboard.json)

This registry application also exposes `Open in v0` buttons for each component. Once this application is deployed, the
`Open in v0` button redirects to [`v0.dev`](https://v0.dev) with a prepopulated prompt and a URL pointing back to this
registry's `/r/${component_name}.json` endpoint. This endpoint will provide v0 the necessary file information, content,
and metadata to start your v0 chat with your component, theme, and other related code.

These `/r/${component_name}.json` files are generated using `shadcn/ui` during the `build` and `dev` based on the
repository's [`registry.json`](./registry.json). For more information, refer to the
[documentation](https://ui.shadcn.com/docs/registry/registry-json).

## Theming

To use a custom theme for all the components, all you need to do is modify the CSS tokens in
[`tokens.css`](./app/tokens.css). More information on these practices can be found
on [ui.shadcn.com/docs](https://ui.shadcn.com/docs).

#### MCP

To use this registry with MCP, you must also edit [`registry.json`](./registry.json)'s first
`registry-item` named `registry`. This `registry:style` item also contains your design tokens that can be used with MCP.

For example, it looks like this:

```json
    {
      "name": "registry",
      "type": "registry:style",
      "cssVars": {
        "light": {
          "primary": "oklch(0.52 0.13 144.17)",
          "primary-foreground": "oklch(1.0 0 0)",
          "radius": "0.5rem",
          ...
        },
        "dark": {
          "primary": "oklch(0.52 0.13 144.17)",
          "primary-foreground": "oklch(1.0 0 0)",
          ...
        }
      },
      "files": []
    }
```

#### Fonts

To use custom fonts, you can either use [
`next/font/google`](https://nextjs.org/docs/pages/getting-started/fonts#google-fonts) or the [
`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) CSS rule. For example, `fonts.css` might look
like:

```css
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm45xW5rygbi49c.woff2') format('woff2'),
    url('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm45xW5rygbj49c.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD-w.woff2') format('woff2'),
    url('https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3g3D_w.woff') format('woff');
}
```

If you use `@font-face`, you will also need to modify [`tailwind.css`](app/tailwind.css) AND
[`tailwind.config.ts`](v0/tailwind.config.ts) to map your custom fonts to Tailwind. Refer to this
[Tailwind documentation](https://tailwindcss.com/docs/font-family#customizing-your-theme)

## Running locally

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000).

## Technical Stack

Solancn UI is built on modern technologies to ensure optimal performance and developer experience:

- **Next.js 15.3.2**: Server-side rendering and modern React framework
- **React 19**: Latest React version with improved performance
- **Tailwind CSS 4**: Utility-first CSS framework for styling
- **TypeScript**: Static type checking for safer code
- **Shadcn UI Registry**: Component registry system for easy installation
- **ESLint & Prettier**: Code quality and formatting tools

All dependencies are maintained at their latest stable versions to ensure the best compatibility and performance.

# Solancn UI

**Beautifully designed components you can copy and paste into your apps. Accessible. Customizable. Open Source.**

Solancn UI is a reusable component library for React, Next.js, and other JSX-based libraries. Currently, we support `React` and `Next.js` only. Our goal is to create next-level UI with minimal code, optimal performance, and a modern feel.

> 💡 **Why Solancn UI?**
> Solancn UI is born from real development needs — built by a developer, for developers on Solana.

***

## ✨ Features

* **🎨 Modern Design:** Clean and beautiful UI components.
* **⚡ High Performance:** Built with performance and accessibility in mind.
* **🧱 Easy to Customize:** Easily themeable with Tailwind CSS.
* **🔄 Smooth Animations:** Powered by the excellent `framer-motion` library.
* **🧩 Icons Included:** `lucide-react` icons are integrated out of the box.

***

## 🚀 Getting Started

You can add Solancn UI components to your project in two ways: using our CLI for a quick setup or by manually copying the component code for more control.

### CLI Installation

Our CLI will guide you through the process of adding components to your project. Here is an example of how to add the `Button` component:

**npm**

```bash
npx shadcn@latest add "https://ui.solancn.com/registry/button.json"
```

**pnpm**

```bash
pnpm dlx shadcn@latest add "https://ui.solancn.com/registry/button.json"
```

**yarn**

```bash
yarn dlx shadcn@latest add "https://ui.solancn.com/registry/button.json"
```

**bun**

```bash
bunx shadcn@latest add "https://ui.solancn.com/registry/button.json"
```

### Manual Installation

For manual installation, you can copy and paste the component code directly from our documentation into your project.

1. **Choose a Component:** Browse our component library and find what you need.
2. **Copy the Code:** You can view and copy the source code for each component.
3. **Paste and Customize:** Paste the code into your project and customize it to fit your needs.

***

<a name="components"></a>
## 🧩 Available Components

We are constantly growing our library of components. Here are some of the components currently available:

* Accordion
* Alert
* Avatar
* Badge
* Button (with multiple variants):
  * Social login buttons
  * Action buttons
  * Commerce buttons
  * Icon-only buttons
  * Loading states
* Card
* RetroCard (with shadow effects)
* Checkbox
* Dialog (Modal)
* Input
* StrongPassword (with visibility toggle and validation)
* Label
* Select
* Tabs
* Textarea
* Tooltip

...and more are on the way!

All components can be installed via our CLI using:

```bash
pnpm dlx shadcn@latest add "https://ui.solancn.com/registry/[component-name].json"
```

For example, to install the button component:

```bash
pnpm dlx shadcn@latest add "https://ui.solancn.com/registry/button.json"
```

***

## 🎨 Theming

Solancn UI is built on top of **Tailwind CSS 4**, making it incredibly easy to customize the look and feel to match your brand. You can customize colors, fonts, spacing, and more by simply modifying your `tailwind.config.ts` file. The components are unstyled by default and will automatically adapt to your theme.

To customize the theme, modify the CSS tokens in `app/tokens.css`. This file contains all design tokens used across the components.

For fonts, you can use `next/font/google` or define custom fonts using `@font-face` in your CSS. If using custom fonts with `@font-face`, remember to update both `app/tailwind.css` and `tailwind.config.ts` to map your custom fonts to Tailwind.

***

## 🔌 Solana Integration

Solancn UI includes components and utilities specially designed for Solana blockchain applications:

* **Wallet Connection**: Integration with @solana/wallet-adapter-react for seamless wallet connectivity
* **Solana Styling**: Built with Solana brand colors (Purple #9945FF, Green #14F195, Black #000000)
* **DApp Components**: Specialized components for Swap, Stake, Portfolio, Transfer, and Receive functionality
* **Conditional UI**: Components that respond to wallet connection state

The staking components include:
* Modern validator selection interface
* Support for both Native and Liquid staking methods
* Transaction history display
* Rewards estimation calculator

## 📜 License

Solancn UI is an open-source project released under the **MIT License**. This means you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.

***

<a name="performance"></a>
## ⚡ Performance Optimization

Solancn UI includes a built-in Performance Optimizer component that enhances your application's Core Web Vitals and overall performance:

* **Resource Preloading**: Automatically preloads critical fonts and images
* **Image Optimization**: Uses Intersection Observer for lazy-loading images
* **Layout Shift Reduction**: Techniques to minimize Cumulative Layout Shift (CLS)
* **Script Optimization**: Delays non-critical third-party scripts
* **Service Worker**: Optional service worker registration for offline capability
* **Performance Monitoring**: Built-in performance metrics tracking

To use the Performance Optimizer, simply import and include it in your app layout:

```jsx
import { PerformanceOptimizer } from '../components/performance/performance-optimizer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PerformanceOptimizer /> {/* Add this component */}
        {children}
      </body>
    </html>
  );
}
```

## 🗂️ File Structure

Solancn UI follows the Next.js App Router structure for better organization:

```
.
├── app/                  # Main application code using Next.js App Router
│   ├── (landing)/        # Landing page routes and components
│   ├── docs/             # Documentation pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── tokens.css        # Design tokens and CSS variables
├── components/           # Reusable components
│   ├── performance/      # Performance optimization components
│   └── ui/               # UI components (shadcn/ui)
├── public/               # Static assets and registry files
│   └── registry/         # Component registry JSON files
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 💬 Community & Support

Have a question or want to get involved?

* **GitHub Discussions:** The best place to ask questions, share ideas, and get help from the community.
* **Report an Issue:** If you find a bug, please report it on our GitHub Issues page.

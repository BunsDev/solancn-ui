/**
 * Mock registry for testing
 * Used when TEST_MODE environment variable is set
 */

// Object format (used in some places)
export const mockIndexDataObject = {
  button: {
    name: "button",
    type: "components:ui",
    dependencies: ["@radix-ui/react-slot"],
    registryDependencies: [],
    files: ["button.tsx"]
  },
  card: {
    name: "card",
    type: "components:ui",
    registryDependencies: [],
    files: ["card.tsx"]
  },
  tabs: {
    name: "tabs",
    type: "components:ui",
    dependencies: ["@radix-ui/react-tabs"],
    registryDependencies: [],
    files: ["tabs.tsx"]
  }
};

// Array format (used by most functions)
export const mockIndexData = [
  {
    name: "button",
    type: "components:ui",
    dependencies: ["@radix-ui/react-slot"],
    registryDependencies: [],
    files: ["button.tsx"]
  },
  {
    name: "card",
    type: "components:ui",
    registryDependencies: [],
    files: ["card.tsx"]
  },
  {
    name: "tabs",
    type: "components:ui",
    dependencies: ["@radix-ui/react-tabs"],
    registryDependencies: [],
    files: ["tabs.tsx"]
  }
];

export const mockStylesData = [
  { name: "default", label: "Default" },
  { name: "new-york", label: "New York" },
  { name: "zinc", label: "Zinc" }
];

export const mockRegistryItem = {
  name: "button",
  type: "components:ui",
  dependencies: ["@radix-ui/react-slot"],
  registryDependencies: [],
  files: [
    {
      name: "button.tsx",
      content: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export { buttonVariants }

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
`
    }
  ]
};

export const mockBaseColor = {
  inlineColors: {
    light: {
      "50": "rgb(248 250 252)",
      "100": "rgb(241 245 249)",
      "200": "rgb(226 232 240)",
      "300": "rgb(203 213 225)",
      "400": "rgb(148 163 184)",
      "500": "rgb(100 116 139)",
      "600": "rgb(71 85 105)",
      "700": "rgb(51 65 85)",
      "800": "rgb(30 41 59)",
      "900": "rgb(15 23 42)",
      "950": "rgb(2 6 23)"
    },
    dark: {
      "50": "rgb(248 250 252)",
      "100": "rgb(241 245 249)",
      "200": "rgb(226 232 240)",
      "300": "rgb(203 213 225)",
      "400": "rgb(148 163 184)",
      "500": "rgb(100 116 139)",
      "600": "rgb(71 85 105)",
      "700": "rgb(51 65 85)",
      "800": "rgb(30 41 59)",
      "900": "rgb(15 23 42)",
      "950": "rgb(2 6 23)"
    }
  },
  cssVars: {
    light: {
      "primary": "var(--primary)",
      "primary-foreground": "var(--primary-foreground)"
    },
    dark: {
      "primary": "var(--primary)",
      "primary-foreground": "var(--primary-foreground)"
    }
  },
  inlineColorsTemplate: "--primary: {{ colors.slate.500 }}; --primary-foreground: {{ colors.slate.50 };",
  cssVarsTemplate: "--primary: {{ colors.slate.500 }}; --primary-foreground: {{ colors.slate.50 };"
};

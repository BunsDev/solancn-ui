"use client";

export interface ComponentItem {
    id: string;
    name: string;
    description: string;
    category: string;
}

export const componentItems: ComponentItem[] = [

    {
        id: "badge",
        name: "Badge",
        description: "A small visual indicator for highlighting status, notifications, or labels.",
        category: "badges"
    },
    {
        id: "toast",
        name: "Toasts",
        description: "A toast that appears at the bottom of the screen.",
        category: "badges"
    },
    {
        id: "hero",
        name: "Hero",
        description: "A hero section that displays a heading, a subheading, and a button.",
        category: "blocks"
    },
    {
        id: "pricing",
        name: "Pricing",
        description: "A pricing section that displays a heading, a subheading, and a button.",
        category: "blocks"
    },
    {
        id: "buttons",
        name: "Buttons",
        description: "Interactive element that allows users to trigger an action or event.",
        category: "buttons"
    },
    {
        id: "dropdown",
        name: "Dropdown",
        description: "Menu that appears below a button when clicked, providing additional options or actions.",
        category: "buttons"
    },
    {
        id: "drawer",
        name: "Drawer",
        description: "A drawer that slides in from the side of the screen.",
        category: "buttons"
    },
    {
        id: "search",
        name: "Search",
        description: "A search input that allows users to search for content.",
        category: "inputs"
    },
    {
        id: "prompt",
        name: "Prompt",
        description: "A prompt input that allows users to enter a prompt.",
        category: "inputs"
    },
    {
        id: "password",
        name: "Password",
        description: "A password input that allows users to enter a password.",
        category: "inputs"
    },
    {
        id: "animated",
        name: "Animated",
        description: "An animated text that changes over time.",
        category: "text"
    },
    {
        id: "fuzzy",
        name: "Fuzzy",
        description: "A fuzzy text that changes over time.",
        category: "text"
    },
    {
        id: "ticker",
        name: "Ticker",
        description: "A ticker that changes over time.",
        category: "text"
    },
    {
        id: "decrypting",
        name: "Decrypting",
        description: "A decrypting text that changes over time.",
        category: "text"
    },
    {
        id: "accordion",
        name: "Accordion",
        description: "A vertically stacked set of interactive headings that each reveal a section of content.",
        category: "tabs"
    },
    {
        id: "copy-button",
        name: "Install",
        description: "A button that copies text to the clipboard to install a given component.",
        category: "buttons"
    },
    {
        id: "divider",
        name: "Divider",
        description: "A divider that separates content into distinct sections.",
        category: "tabs"
    },
    {
        id: "card",
        name: "Card",
        description: "Container that groups related information and actions, providing a flexible and consistent way to present content.",
        category: "cards"
    },
    {
        id: "twostep",
        name: "2FA",
        description: "Two-factor authentication component.",
        category: "forms"
    },
    {
        id: "multiselect",
        name: "Multi-Select",
        description: "Multi-select component.",
        category: "forms"
    }
];

export const componentCategories = [
    { id: "all", label: "All Components" },
    { id: "badges", label: "Badges" },
    { id: "buttons", label: "Buttons" },
    { id: "blocks", label: "Blocks" },
    { id: "cards", label: "Cards" },
    { id: "dropdowns", label: "Dropdowns" },
    { id: "forms", label: "Forms" },
    { id: "grids", label: "Grids" },
    { id: "tabs", label: "Tabs" },
];

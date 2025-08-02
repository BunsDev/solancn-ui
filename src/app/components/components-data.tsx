"use client";

export interface ComponentItem {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const componentItems: ComponentItem[] = [
  {
    id: "accordion",
    name: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    category: "disclosure"
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "An image element with a fallback for representing the user.",
    category: "data-display"
  },
  {
    id: "badge",
    name: "Badge",
    description: "A small visual indicator for highlighting status, notifications, or labels.",
    category: "data-display"
  },
  {
    id: "border-beam",
    name: "Border Beam",
    description: "Animated border effect that adds a dynamic visual element to components.",
    category: "effects"
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "Navigation aid that helps users keep track of their location within the application.",
    category: "navigation"
  },
  {
    id: "button",
    name: "Button",
    description: "Interactive element that allows users to trigger an action or event.",
    category: "inputs"
  },
  {
    id: "card",
    name: "Card",
    description: "Container that groups related information and actions, providing a flexible and consistent way to present content.",
    category: "layout"
  },
  {
    id: "code-block",
    name: "Code Block",
    description: "Formatted display of code snippets with syntax highlighting and copy functionality.",
    category: "data-display"
  },
  {
    id: "collapsible",
    name: "Collapsible",
    description: "Component that can be expanded or collapsed to show or hide content.",
    category: "disclosure"
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    description: "Menu that appears below a button when clicked, providing additional options or actions.",
    category: "navigation"
  },
  {
    id: "input",
    name: "Input",
    description: "Form control for entering text and data with various input types and validation.",
    category: "inputs"
  },
  {
    id: "label",
    name: "Label",
    description: "Text element associated with inputs, enhancing accessibility and user experience.",
    category: "inputs"
  },
  {
    id: "progress",
    name: "Progress",
    description: "Visual indicator showing the completion status of a task or process.",
    category: "feedback"
  },
  {
    id: "resizable",
    name: "Resizable",
    description: "Panel that can be resized by dragging its edges, allowing flexible layouts.",
    category: "layout"
  },
  {
    id: "scroll-area",
    name: "Scroll Area",
    description: "Custom scrollable container with consistent cross-browser styling.",
    category: "layout"
  },
  {
    id: "select",
    name: "Select",
    description: "Form control for selecting an option from a dropdown list.",
    category: "inputs"
  },
  {
    id: "separator",
    name: "Separator",
    description: "Visual divider to separate content or UI elements.",
    category: "layout"
  },
  {
    id: "sheet",
    name: "Sheet",
    description: "Dialog that slides in from the edge of the screen, typically used for supplementary content.",
    category: "overlay"
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Vertical navigation panel that provides access to different sections of the application.",
    category: "navigation"
  },
  {
    id: "skeleton",
    name: "Skeleton",
    description: "Placeholder UI used during content loading to indicate that data is being fetched.",
    category: "feedback"
  },
  {
    id: "switch",
    name: "Switch",
    description: "Toggle control for binary options that provides immediate feedback when activated.",
    category: "inputs"
  },
  {
    id: "table",
    name: "Table",
    description: "Structured data display for presenting information in rows and columns.",
    category: "data-display"
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Interface for switching between different views within the same context.",
    category: "navigation"
  },
  {
    id: "toast",
    name: "Toast",
    description: "Brief notification that appears temporarily to provide feedback or important information.",
    category: "feedback"
  },
  {
    id: "toggle",
    name: "Toggle",
    description: "Button that can be switched between pressed and unpressed states.",
    category: "inputs"
  },
  {
    id: "toggle-group",
    name: "Toggle Group",
    description: "Set of toggle buttons where only one or multiple can be active at once.",
    category: "inputs"
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Contextual information that appears on hover or focus to provide additional details.",
    category: "overlay"
  },
];

export const componentCategories = [
  { id: "all", label: "All Components" },
  { id: "inputs", label: "Inputs" },
  { id: "data-display", label: "Data Display" },
  { id: "navigation", label: "Navigation" },
  { id: "layout", label: "Layout" },
  { id: "feedback", label: "Feedback" },
  { id: "disclosure", label: "Disclosure" },
  { id: "overlay", label: "Overlay" },
  { id: "effects", label: "Effects" },
];

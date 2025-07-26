"use client";

import CopyButton from "./button/copy-button";

interface CodeBlockProps {
  children: string;
  title?: string;
}

export default function CodeBlock({ children, title }: CodeBlockProps) {
  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 bg-muted/50 px-4 py-2">
          <span className="text-sm font-medium">{title}</span>
          <CopyButton text={children} />
        </div>
      )}
      <pre
        className={`overflow-x-auto bg-muted/50 p-4 text-sm ${title ? "rounded-t-none" : "rounded-lg"} border`}
      >
        <code className="text-foreground">{children}</code>
      </pre>
      {!title && (
        <div className="absolute right-2 top-2">
          <CopyButton text={children} />
        </div>
      )}
    </div>
  );
}

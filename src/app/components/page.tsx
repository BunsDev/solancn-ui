import { getComponents } from "@/lib/registry";
import { ComponentsClientPage } from "./client-page";

export const metadata = {
  title: "Components | Solancn UI",
  description: "Browse the component library and find the right component for your project",
};

export default async function ComponentsPage() {
  // Fetch all components on the server side
  const components = getComponents();
  
  return (
    <div className="flex flex-col gap-4 w-full mx-auto justify-center">
      <div className="mb-8">
        <h1 className="font-bold text-4xl mb-2">Components</h1>
        <p className="text-muted-foreground text-lg">
          Browse our collection of reusable UI components for your next Solana project.
        </p>
      </div>
      
      {/* Pass data to client component for interactivity */}
      <ComponentsClientPage components={components} />
    </div>
  );
}
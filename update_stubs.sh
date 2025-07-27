#!/bin/bash

# Update all Solana components in the src/app/starters/[name]/solana/ directory to use placeholders

cd /Users/buns/Documents/GitHub/BunsDev/solancn-ui/src/app/starters/\[name\]/solana/

# Process each .tsx file except index.tsx
for file in *.tsx; do
  if [ "$file" != "index.tsx" ]; then
    component_name="${file%.tsx}"
    
    # Create new content with placeholders
    cat > "$file" << CONTENT
"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading ${component_name} component...</div>;
};

export const ${component_name} = {
  name: "${component_name}",
  components: {
    Default: <PlaceholderComponent />,
  },
};
CONTENT
    
    echo "Updated $file"
  fi
done

echo "All component stubs updated"

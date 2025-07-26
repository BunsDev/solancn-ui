"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading bridge component...</div>;
};

export const bridge = {
  name: "bridge",
  components: {
    Default: <PlaceholderComponent />,
  },
};

"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading frame component...</div>;
};

export const frame = {
  name: "frame",
  components: {
    Default: <PlaceholderComponent />,
  },
};

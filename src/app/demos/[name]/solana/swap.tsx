"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading swap component...</div>;
};

export const swap = {
  name: "swap",
  components: {
    Default: <PlaceholderComponent />,
  },
};

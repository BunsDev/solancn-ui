"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading stake component...</div>;
};

export const stake = {
  name: "stake",
  components: {
    Default: <PlaceholderComponent />,
  },
};

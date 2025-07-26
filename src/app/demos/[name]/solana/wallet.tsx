"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading wallet component...</div>;
};

export const wallet = {
  name: "wallet",
  components: {
    Default: <PlaceholderComponent />,
  },
};

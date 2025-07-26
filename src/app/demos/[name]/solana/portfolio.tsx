"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading portfolio component...</div>;
};

export const portfolio = {
  name: "portfolio",
  components: {
    Default: <PlaceholderComponent />,
  },
};

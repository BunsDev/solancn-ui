"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading lend component...</div>;
};

export const lend = {
  name: "lend",
  components: {
    Default: <PlaceholderComponent />,
  },
};

"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading receive component...</div>;
};

export const receive = {
  name: "receive",
  components: {
    Default: <PlaceholderComponent />,
  },
};

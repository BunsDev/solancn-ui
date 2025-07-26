"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading nft component...</div>;
};

export const nft = {
  name: "nft",
  components: {
    Default: <PlaceholderComponent />,
  },
};

"use client";

// Create a placeholder component for static generation
const PlaceholderComponent = () => {
  return <div className="p-4">Loading borrow component...</div>;
};

export const borrow = {
  name: "borrow",
  components: {
    Default: <PlaceholderComponent />,
  },
};

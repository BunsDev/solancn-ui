import * as React from "react"

// Example components for New York style
// Add your actual components and examples here

export const Button = {
  component: () => (
    <button className="px-4 py-2 rounded-md bg-[#9945FF] text-white hover:bg-[#8035EF] transition-colors">
      New York Button
    </button>
  ),
}

export const Card = {
  component: () => (
    <div className="p-6 rounded-lg border border-gray-100 shadow-md bg-white">
      <h3 className="text-lg font-semibold">New York Card</h3>
      <p className="text-gray-600 mt-2">This is a New York style card component with a bit more flair.</p>
      <div className="mt-4 flex items-center">
        <div className="h-1 w-12 bg-[#14F195]"></div>
        <div className="ml-2 text-sm text-[#9945FF]">Solana Style</div>
      </div>
    </div>
  ),
}

export const Alert = {
  component: () => (
    <div className="p-4 rounded-md bg-indigo-50 border-l-4 border-[#9945FF] shadow-sm">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-[#9945FF]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-[#9945FF]">Information</h3>
          <div className="text-sm text-gray-700 mt-2">
            <p>This is a New York style alert component with Solana brand colors.</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

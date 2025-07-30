import * as React from "react"

// Example components - these would be your actual components
// Add your actual components and examples here

export const Button = {
  component: () => (
    <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
      Default Button
    </button>
  ),
}

export const Card = {
  component: () => (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm bg-white">
      <h3 className="text-lg font-medium">Default Card</h3>
      <p className="text-gray-500 mt-2">This is a default style card component.</p>
    </div>
  ),
}

export const Alert = {
  component: () => (
    <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
          <div className="text-sm text-yellow-700 mt-2">
            <p>This is a default style alert component.</p>
          </div>
        </div>
      </div>
    </div>
  ),
}

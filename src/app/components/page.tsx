"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { ComponentCard } from "./component-card"
import { componentItems, componentCategories, type ComponentItem } from "./components-data"
import { cn } from "@/lib/utils"

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredComponents, setFilteredComponents] = useState<ComponentItem[]>(componentItems)

  // Filter components based on search query and category
  useEffect(() => {
    let result = componentItems

    // Filter by category if not "all"
    if (activeCategory !== "all") {
      result = result.filter(component => component.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(component => 
        component.name.toLowerCase().includes(query) || 
        (component.description && component.description.toLowerCase().includes(query))
      )
    }

    setFilteredComponents(result)
  }, [searchQuery, activeCategory])

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          UI Components
        </h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-300">
          Explore our collection of customizable and reusable UI components.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {componentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                activeCategory === category.id
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredComponents.length} {filteredComponents.length === 1 ? 'component' : 'components'} found
        </p>
      </div>

      {/* Components Grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">No components found</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div>
      )}
    </div>
  )
}

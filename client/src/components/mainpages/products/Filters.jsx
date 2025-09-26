import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState.jsx";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value)
    setSearch("")
  }
  

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Category */}
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:block">
            Filters:
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategory}
            className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="">All Products</option>
            {categories.map((c) => (
              <option value={`category=${c._id}`} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <label htmlFor="search" className="sr-only">
            Search products
          </label>
          <input
            id="search"
            type="text"
            value={search}
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-900 shadow-sm outline-none placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-800 dark:text-gray-400"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:w-auto">
          <label htmlFor="sort" className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:block">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 w-full min-w-[190px] rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="">Newest</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=-sold">Best sales</option>
            <option value="sort=-price">Price: High → Low</option>
            <option value="sort=price">Price: Low → High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;

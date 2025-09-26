import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState.jsx";

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  return (
    <div className="flex justify-center">
      {result >= page * 9 && (
        <button
          onClick={() => setPage(page + 1)}
          className="mb-8 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium capitalize text-gray-700 shadow-sm transition hover:scale-105 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default LoadMore;

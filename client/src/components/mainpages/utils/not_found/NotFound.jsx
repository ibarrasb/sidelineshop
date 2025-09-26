import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 text-center dark:from-gray-900 dark:to-black">
      <h1 className="mb-4 text-7xl font-extrabold text-gray-900 dark:text-white">
        404
      </h1>
      <h2 className="mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Page Not Found
      </h2>
      <p className="mb-6 max-w-md text-gray-500 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for. It may have been
        moved, deleted, or never existed.
      </p>
      <Link
        to="/"
        className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;

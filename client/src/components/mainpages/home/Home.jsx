import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black px-4">
      <div className="max-w-3xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Sideline Shop
          </span>
        </h1>

        <p className="mb-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
          The go-to official place to shop for any sports product! Every item is
          guaranteed authentic, and for the best price you can find anywhere.
        </p>

        <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
          Login or create a new account to shop your favorite team or player’s
          items before they run out!
        </p>

        <Link
          to="/login"
          className="inline-block rounded-xl bg-indigo-600 px-8 py-4 font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-105 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 focus:outline-none"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;

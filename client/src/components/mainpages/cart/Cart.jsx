import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const fmt = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n ?? 0);

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const t = cart.reduce((prev, item) => prev + item.price * item.quantity, 0);
    setTotal(t);
  }, [cart]);

  const addToCart = async (cartNext) => {
    await axios.patch(
      "/user/addcart",
      { cart: cartNext },
      { headers: { Authorization: token } }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) item.quantity += 1;
    });
    const next = [...cart];
    setCart(next);
    addToCart(next);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) item.quantity = Math.max(1, item.quantity - 1);
    });
    const next = [...cart];
    setCart(next);
    addToCart(next);
  };

  const removeProduct = (id) => {
    if (!window.confirm("Remove this item from your cart?")) return;
    const next = cart.filter((i) => i._id !== id);
    setCart(next);
    addToCart(next);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-5xl font-extrabold text-gray-900 dark:text-white">Cart Empty</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Add items to your cart to start checkout.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cart.map((product) => (
          <div
            key={product._id}
            className="relative grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:grid-cols-[180px_1fr] sm:p-5"
          >
            {/* Image */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 sm:h-full">
              <img
                src={product.images.url}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold uppercase tracking-wide text-blue-800 dark:text-indigo-300">
                    {product.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                  {product.content && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {product.content}
                    </p>
                  )}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeProduct(product._id)}
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:hover:bg-red-900/20"
                  aria-label="Remove item"
                  title="Remove"
                >
                  ✕
                </button>
              </div>

              {/* Price + Quantity */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xl font-bold text-red-600">
                  {fmt(product.price * product.quantity)}
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => decrement(product._id)}
                    className="h-10 w-10 rounded-l-xl border border-gray-300 text-lg leading-none hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:hover:bg-gray-800"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="h-10 min-w-[3rem] select-none border-y border-gray-300 px-4 text-center text-base font-semibold leading-10 text-gray-900 dark:border-gray-700 dark:text-white">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => increment(product._id)}
                    className="h-10 w-10 rounded-r-xl border border-gray-300 text-lg leading-none hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:hover:bg-gray-800"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total bar */}
      <div className="sticky bottom-0 mt-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-gray-800 dark:bg-gray-950">
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          Total: <span className="text-red-600">{fmt(total)}</span>
        </div>
        <Link
          to="#!"
          className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Payment
        </Link>
      </div>
    </div>
  );
}

export default Cart;

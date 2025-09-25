import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState.jsx";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminRouter = () => (
    <>
      <li>
        <Link
          to="/create_product"
          onClick={() => setMenu(false)}
          className="block rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Create
        </Link>
      </li>
      <li>
        <Link
          to="/category"
          onClick={() => setMenu(false)}
          className="block rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Categories
        </Link>
      </li>
    </>
  );

  const loggedRouter = () => (
    <>
      <li>
        <Link
          to="/history"
          onClick={() => setMenu(false)}
          className="block rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          History
        </Link>
      </li>
      <li>
        <button
          onClick={logoutUser}
          className="block w-full rounded-xl px-4 py-2 text-left text-red-600 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          Logout
        </button>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-black/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu Button */}
        <button
          onClick={() => setMenu(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:bg-gray-800 md:hidden"
          aria-label="Open menu"
        >
          <img src={Menu} alt="" className="h-6 w-6" />
        </button>

        {/* Brand */}
        <div className="min-w-0 flex-1 md:flex-none">
          <h1 className="truncate">
            <Link
              to="/"
              className="ml-1 font-dancing text-3xl tracking-tight text-sideline-logo md:text-4xl"
            >
              {isAdmin ? "Admin" : "Sideline"}
            </Link>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {isLogged && (
              <li>
                <Link
                  to="/"
                  className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Shop
                </Link>
              </li>
            )}

            {isAdmin && adminRouter()}

            {isLogged ? (
              loggedRouter()
            ) : (
              <li>
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  onClick={() => setMenu(false)}
                  style={{ backgroundColor: "var(--sideline-accent)" }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Cart */}
        {!isLogged || isAdmin ? null : (
          <div className="relative ml-3">
            <span className="absolute -right-2 -top-2 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
              {cart.length}
            </span>
            <Link
              to="/cart"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:bg-gray-800"
              aria-label="Cart"
            >
              <img src={Cart} alt="" className="h-6 w-6" />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          menu ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menu}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            menu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenu(false)}
        />

        {/* Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] transform bg-white p-4 shadow-xl transition-transform dark:bg-gray-950 ${
            menu ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="mb-4 flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setMenu(false)}
              className="font-dancing text-3xl text-sideline-logo"
            >
              {isAdmin ? "Admin" : "Sideline"}
            </Link>
            <button
              onClick={() => setMenu(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <img src={Close} alt="" className="h-6 w-6" />
            </button>
          </div>

          <ul className="space-y-1 text-2xl">
            {isLogged && (
              <li>
                <Link
                  to="/"
                  onClick={() => setMenu(false)}
                  className="block rounded-xl px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  Shop
                </Link>
              </li>
            )}

            {isAdmin && adminRouter()}

            {isLogged ? (
              loggedRouter()
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenu(false)}
                  className="block rounded-xl bg-sideline-accent px-4 py-2 text-center font-semibold text-white shadow-sm hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;

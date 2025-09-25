import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState.jsx";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <div className="mt-3 flex w-full gap-2">
      {isAdmin ? (
        <>
          <button
            onClick={() =>
              deleteProduct(product._id, product.images.public_id)
            }
            className="flex-1 rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
          <Link
            to={`/edit_product/${product._id}`}
            className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Edit
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={() => addCart(product)}
            className="flex-1 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Buy
          </button>
          <Link
            to={`/detail/${product._id}`}
            className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-sm transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;

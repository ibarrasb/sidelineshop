import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState.jsx";
import ProductItem from "../utils/productItem/ProductItem.jsx";
import Loading from "../utils/loading/Loading.jsx";
import axios from "axios";
import Filters from "./Filters.jsx";
import LoadMore from "./LoadMore.jsx";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        { headers: { Authorization: token } }
      );
      const deleteProductReq = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProductReq;

      setCallback(!callback);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const checkAll = () => {
    products.forEach((p) => (p.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    const selected = products.filter((p) => p.checked);
    if (selected.length === 0) return;

    const sure = window.confirm(
      `Delete ${selected.length} selected item${selected.length > 1 ? "s" : ""}? This can’t be undone.`
    );
    if (!sure) return;

    selected.forEach((p) => deleteProduct(p._id, p.images.public_id));
  };

  if (loading) return <div className="py-10"><Loading /></div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Filters />

      {isAdmin && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={isCheck}
                onChange={checkAll}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700"
              />
              <span className="text-sm font-medium uppercase tracking-wide text-indigo-600">
                Select all
              </span>
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {products.filter((p) => p.checked).length} selected
            </span>
          </div>

          <button
            onClick={deleteAll}
            className="inline-flex items-center justify-center rounded-xl border border-red-600 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-red-900/20"
            disabled={products.every((p) => !p.checked)}
          >
            Delete All
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            isAdmin={isAdmin}
            deleteProduct={deleteProduct}
            handleCheck={handleCheck}
          />
        ))}
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No products found
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting filters or add new products.
          </p>
        </div>
      )}

      <div className="py-6">
        <LoadMore />
      </div>
    </div>
  );
}

export default Products;

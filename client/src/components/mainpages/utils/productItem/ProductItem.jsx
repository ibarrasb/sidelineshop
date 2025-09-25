import React from "react";
import BtnRender from "./BtnRender.jsx";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
      {/* Admin checkbox */}
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
          className="absolute left-3 top-3 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600"
        />
      )}

      {/* Image */}
      <div className="relative h-64 w-full">
        <img
          src={product.images.url}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h2
          title={product.title}
          className="truncate text-lg font-semibold capitalize text-gray-900 dark:text-gray-100"
        >
          {product.title}
        </h2>
        <span className="mt-1 text-base font-bold text-red-600">
          ${product.price}
        </span>
        <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
          {product.description}
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0">
        <BtnRender product={product} deleteProduct={deleteProduct} />
      </div>
    </div>
  );
}

export default ProductItem;


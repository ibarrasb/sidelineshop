import React, { useContext, useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState.jsx";
import ProductItem from "../utils/productItem/ProductItem.jsx";

const fmt = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n ?? 0);

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;

  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    if (!params.id || !products?.length) return;
    const found = products.find((p) => p._id === params.id);
    setDetailProduct(found || null);
  }, [params.id, products]);

  const related = useMemo(() => {
    if (!detailProduct || !products?.length) return [];
    // shuffle a copy for variety, then filter
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled
      .filter(
        (p) => p.category === detailProduct.category && p._id !== detailProduct._id
      )
      .slice(0, 8);
  }, [detailProduct, products]);

  if (!detailProduct) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading product…</p>
      </div>
    );
  }

  return (
    <>
      {/* Detail */}
      <div className="grid grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="aspect-[4/5] w-full">
            <img
              src={detailProduct.images.url}
              alt={detailProduct.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-blue-800 dark:text-indigo-300">
                {detailProduct.title}
              </h2>
              <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                #id: {detailProduct.product_id}
              </span>
            </div>

            <div className="mt-3 text-2xl font-semibold text-red-600">
              {fmt(detailProduct.price)}
            </div>

            <p className="mt-4 leading-6 text-gray-700 dark:text-gray-300">
              {detailProduct.description}
            </p>
            {detailProduct.content && (
              <p className="mt-2 leading-6 text-gray-700 dark:text-gray-300">
                {detailProduct.content}
              </p>
            )}

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Sold: {detailProduct.sold}
            </p>
          </div>

          <div className="mt-6">
            <Link
              to="/cart"
              onClick={() => addCart(detailProduct)}
              className="inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Related products
        </h3>
        {related.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            No related products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {related.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DetailProduct;

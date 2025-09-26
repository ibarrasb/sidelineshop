import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState.jsx";

const fmt = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n ?? 0);

function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (!params.id || !history?.length) return;
    const found = history.find((h) => h._id === params.id);
    setOrderDetails(found || null);
  }, [params.id, history]);

  if (!orderDetails) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading order…</p>
      </div>
    );
  }

  const addr = orderDetails.address || {};
  const items = orderDetails.cart || [];
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Order Details
      </h1>

      {/* Shipping */}
      <div className="card mb-6 p-0 overflow-hidden">
        <div className="card-header p-4">
          <h2 className="card-title">Shipping</h2>
        </div>
        <div className="grid gap-4 border-t border-gray-200 p-4 text-sm dark:border-gray-800 sm:grid-cols-2">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Name</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {addr.recipient_name || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Address</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {[addr.line1, addr.city].filter(Boolean).join(" - ") || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Postal Code</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {addr.postal_code || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Country Code</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {addr.country_code || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="card overflow-hidden">
        <div className="card-header p-4">
          <h2 className="card-title">Items</h2>
        </div>

        <div className="overflow-x-auto border-t border-gray-200 dark:border-gray-800">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left font-medium"> </th>
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-center font-medium">Quantity</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 text-sm dark:border-gray-800"
                >
                  <td className="px-4 py-3">
                    <div className="h-20 w-14 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                      <img
                        src={item.images?.url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                    {fmt(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <td colSpan={3} className="px-4 py-4 text-right text-sm font-semibold">
                  Total
                </td>
                <td className="px-4 py-4 text-right text-lg font-bold text-red-600">
                  {fmt(total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;

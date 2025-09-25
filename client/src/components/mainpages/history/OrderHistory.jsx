import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (!token) return;
    const getHistory = async () => {
      try {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      } catch (e) {
        // optional: toast or alert
        console.error("Failed to fetch order history");
      }
    };
    getHistory();
  }, [token, isAdmin, setHistory]);

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-end justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Order History
        </h1>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {history.length} {history.length === 1 ? "order" : "orders"}
        </span>
      </div>

      {history.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 text-center dark:border-gray-700">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No orders yet
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            When you place an order, it’ll show up here.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="card-header p-4">
            <h2 className="card-title">Recent Orders</h2>
          </div>

          <div className="overflow-x-auto border-t border-gray-200 dark:border-gray-800">
            <table className="min-w-full">
              <thead className="sticky top-0 bg-gray-50 text-left text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Payment ID</th>
                  <th className="px-4 py-3 font-medium">Date of Purchase</th>
                  <th className="px-4 py-3 text-right font-medium"> </th>
                </tr>
              </thead>
              <tbody>
                {history.map((items) => (
                  <tr
                    key={items._id}
                    className="border-b border-gray-100 text-sm dark:border-gray-800"
                  >
                    <td className="px-4 py-3 align-top">
                      <code className="rounded bg-gray-100 px-2 py-1 text-[11px] text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {items.paymentID}
                      </code>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-900 dark:text-gray-100">
                      {fmtDate(items.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/history/${items._id}`}
                        className="inline-flex items-center rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;

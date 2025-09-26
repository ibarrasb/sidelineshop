import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState.jsx";
import axios from "axios";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category.trim() },
          { headers: { Authorization: token } }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category.trim() },
          { headers: { Authorization: token } }
        );
        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const editCategory = (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCategory = async (id) => {
    const ok = window.confirm("Delete this category? This cannot be undone.");
    if (!ok) return;
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete category");
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Manage Categories
      </h1>

      {/* Form */}
      <form
        onSubmit={createCategory}
        className="card card-body mb-6 space-y-4 p-5"
      >
        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {onEdit ? "Edit category" : "New category"}
          </label>
          <div className="flex gap-2">
            <input
              id="category"
              type="text"
              name="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Jerseys"
              className="input"
            />
            <button
              type="submit"
              className={`btn ${
                onEdit ? "btn-primary" : "btn-success"
              } whitespace-nowrap`}
            >
              {onEdit ? "Update" : "Create"}
            </button>
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={() => {
                setOnEdit(false);
                setCategory("");
                setID("");
              }}
              className="mt-2 text-sm text-gray-500 underline-offset-4 hover:underline"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-12 text-center dark:border-gray-700">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              No categories yet
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Create your first category above.
            </p>
          </div>
        ) : (
          categories.map((c) => (
            <div
              key={c._id}
              className="card flex items-center justify-between p-4"
            >
              <p className="truncate text-gray-900 dark:text-gray-100">
                {c.name}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => editCategory(c._id, c.name)}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(c._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;


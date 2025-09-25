import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState.jsx";
import Loading from "../utils/loading/Loading.jsx";
import { useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((p) => {
        if (p._id === param.id) {
          setProduct(p);
          setImages(p.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];
      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024) return alert("Size too large! (max 1MB)");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect (jpeg/png only).");

      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);

      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setImages(res.data);
    } catch (err) {
      alert(err?.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images?.public_id) return;

      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        { headers: { Authorization: token } }
      );
      setImages(false);
    } catch (err) {
      alert(err?.response?.data?.msg || "Failed to remove image");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          { headers: { Authorization: token } }
        );
      }
      setCallback(!callback);
      window.location.href = "/";
    } catch (err) {
      alert(err?.response?.data?.msg || "Save failed");
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {onEdit ? "Edit Product" : "Create Product"}
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image Uploader */}
        <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          {/* Dropzone / Preview */}
          {!images ? (
            <label
              htmlFor="file_up"
              className="flex h-[420px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center transition hover:border-indigo-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              <div className="mb-2 text-5xl">＋</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Click to upload product image
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG or PNG, up to 1MB
              </p>
              <input
                type="file"
                id="file_up"
                name="file"
                onChange={handleUpload}
                className="sr-only"
                accept="image/png,image/jpeg"
              />
            </label>
          ) : (
            <div className="relative h-[420px] w-full overflow-hidden rounded-xl">
              <img
                src={images.url}
                alt="product"
                className="h-full w-full object-cover"
              />
              <button
                onClick={handleDestroy}
                type="button"
                className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-red-600 shadow-sm transition hover:bg-white dark:bg-gray-900/80"
                title="Remove image"
              >
                ✕
              </button>
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-white/80 backdrop-blur dark:bg-black/50">
              <Loading />
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950"
        >
          {/* Product ID */}
          <div>
            <label
              htmlFor="product_id"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Product ID
            </label>
            <input
              type="text"
              id="product_id"
              name="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:disabled:bg-gray-800"
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={product.title}
              onChange={handleChangeInput}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              value={product.price}
              onChange={handleChangeInput}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows="4"
              value={product.description}
              onChange={handleChangeInput}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows="6"
              value={product.content}
              onChange={handleChangeInput}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChangeInput}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">Please select a category</option>
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {onEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;

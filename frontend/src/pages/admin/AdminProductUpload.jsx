import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useFetchAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../redux/features/products/productsApi";

const AdminProductUpload = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch all products
  const { data, isLoading, refetch } = useFetchAllProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  // Mutations
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    oldPrice: "",
    image: "",
    color: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      image: product.image || "",
      color: product.color || "",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      oldPrice: "",
      image: "",
      color: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      author: user?._id,
    };

    try {
      if (isEditing) {
        await updateProduct({ id: editingId, ...payload }).unwrap();
        setMessage("Product updated successfully!");
        handleCancelEdit();
      } else {
        await addProduct(payload).unwrap();
        setMessage("Product added successfully!");
        setFormData({
          name: "",
          category: "",
          description: "",
          price: "",
          oldPrice: "",
          image: "",
          color: "",
        });
      }
      refetch();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save product. Please check input values.");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(productId).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  const handleToggleStock = async (product) => {
    const nextStockStatus = product.inStock === undefined ? false : !product.inStock;
    try {
      await updateProduct({
        id: product._id,
        inStock: nextStockStatus,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
      alert("Failed to update stock status.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Product Management
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Add, update, or remove shop inventory products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Product list section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-50 uppercase border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8">
                        Loading shop items...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8">
                        No products found. Use the form to add one.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 object-cover rounded border border-gray-200"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-gray-900 block truncate max-w-[150px]">
                              {product.name}
                            </span>
                            <span className="text-xs text-gray-400 truncate max-w-[150px] block">
                              {product.color || "No color spec"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 capitalize">{product.category}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleToggleStock(product)}
                            className={`px-2.5 py-1 text-xs font-semibold rounded ${
                              product.inStock !== false
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            } transition-colors`}
                          >
                            {product.inStock !== false ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-xs font-semibold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-600 bg-gray-50">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product upload form panel */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-gray-800 pb-3 border-b border-gray-100 mb-4">
            {isEditing ? "Edit Product" : "Upload New Product"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Classic Tee"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="clothing"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="blue"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="29.99"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Old Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="39.99"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                required
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a brief description..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              ></textarea>
            </div>

            {message && (
              <p className="text-xs text-primary bg-pink-50 p-2.5 rounded font-medium border border-pink-100">
                {message}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-dark transition-colors"
              >
                {isEditing ? "Save Changes" : "Create Product"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};

export default AdminProductUpload;

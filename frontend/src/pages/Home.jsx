import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(
      `/products?search=${search}&category=${category}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const res = await api.post(`/cart/add`, { userId, productId });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 min-h-screen px-6 py-4">
      {/* Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-md">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
          <option value="accessories">Accessories</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
          <option value="toys">Toys</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <h2 className="mt-2 px-3 font-semibold text-lg line-clamp-1">{product.title}</h2>
            </Link>

            {/* Price + Add to Cart (same line) */}
            <div className="m-3 flex items-center justify-between bg-linear-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-lg">
              <p className="font-bold">₹{product.price}</p>

              <button
                onClick={() => addToCart(product._id)}
                className="bg-blue-600 hover:bg-blue-700 active:scale-70 transition px-3 py-1 rounded-md text-sm"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
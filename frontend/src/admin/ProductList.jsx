import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const loadProducts = async () => {
        const response = await api.get(`/products?search=${search}&category=${category}`);
        setProducts(response.data.products);
    }

    const deletedProduct = async (id) => {
        try {
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully!");
            loadProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-10">
            <h2 className="text-2xl font-bold">Product List</h2>
            <div className="flex justify-between items-center mb-6">
                <div className="flex justify-between space-x-4 w-2/3">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    {/* Category Filter */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-1/3 border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                <Link to="/admin/products/add" className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
                    Add New Product
                </Link>
            </div>

            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Title</th>
                        <th className="border border-gray-200 px-4 py-2">Price</th>
                        <th className="border border-gray-200 px-4 py-2">Stock</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="text-center">
                            <td className="border border-gray-200 px-4 py-2">{product.title}</td>
                            <td className="border border-gray-200 px-4 py-2">₹{product.price}</td>
                            <td className="border border-gray-200 px-4 py-2">{product.stock}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <Link to={`/admin/products/update/${product._id}`} className="text-blue-500 hover:underline mr-4">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deletedProduct(product._id)}
                                    className="text-red-500 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
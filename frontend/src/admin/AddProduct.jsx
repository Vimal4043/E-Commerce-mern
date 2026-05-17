import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function AddProduct() {
    const [form , setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });
    const [categories, setCategories] = useState([]);

    const formTypes = {
        title: "text",
        description: "text",
        price: "number",
        category: "select",
        image: "text",
        stock: "number",
    };

    const navigate = useNavigate();

    const loadCategories = async () => {
        try {
            const response = await api.get("/products/categories");
            setCategories(response.data);
        } catch (err) {
            console.error("Error loading categories:", err);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "price" || name === "stock") {
            if (!/^[0-9]*$/.test(value)) return;
        }

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await api.post("/products/add", form);
            alert("Product added successfully!");
            navigate("/admin/products");
        }catch(err){
            console.error("Error adding product:", err);
        }
    }

    return(
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {
                    Object.keys(form).map((key) => (
                        formTypes[key] === "select" ? (
                            <select
                                key={key}
                                name={key}
                                value={form[key]}
                                onChange={handleChange}
                                required={key === "category"}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={formTypes[key]}
                                key={key}
                                name={key}
                                value={form[key]}
                                onChange={handleChange}
                                placeholder={key}
                                required={key === "title" || key === "price" || key === "stock"}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        )
                    ))
                }
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Add Product
                </button>
            </form>
        </div>
    )
}
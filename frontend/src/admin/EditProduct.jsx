import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });

  const formTypes = {
    title: "text",
    description: "text",
    price: "number",
    category: "text",
    image: "text",
    stock: "number",
  };
  
  const allowedFields = ["title", "price", "description", "category", "image", "stock"];

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setForm(res.data);
    } catch (error) {
      console.error("Failed to load product", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      if (!/^[A-Za-z ]*$/.test(value)) return;
    }

    if (name === "price" || name === "stock") {
      if (!/^[0-9]*$/.test(value)) return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${id}`, form);
      alert("Product updated!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {allowedFields.map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            type={formTypes[key]}
            placeholder={key}
            required={key === "title" || key === "price" || key === "stock"}
            className="w-full border px-3 py-2 rounded"
          />
        ))}

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Update Product
        </button>
      </form>
    </div>
  );
}
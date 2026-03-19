import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/address/add", {
                ...form,
                userId,
            });
            navigate("/checkout");
        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Error saving address");
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6">

            {/* Card */}
            <div className="bg-white p-8 rounded-xl shadow-md">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Delivery Address
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {Object.keys(form).map((key) => (
                            <div key={key} className="flex flex-col">

                                {/* Label */}
                                <label className="text-sm font-medium mb-1 capitalize">
                                    {key}
                                </label>

                                {/* Input */}
                                <input
                                    name={key}
                                    placeholder={`Enter ${key}`}
                                    onChange={handleChange}
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                            </div>
                        ))}

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Save Address
                    </button>

                </form>

            </div>

        </div>
    )
}
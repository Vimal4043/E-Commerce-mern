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

    const [errors, setErrors] = useState({});

    const formTypes = {
        fullName: "text",
        phone: "tel",
        addressLine: "text",
        city: "text",
        state: "text",
        pincode: "text"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Name, City, State → only letters + space
        if (["fullName", "city", "state"].includes(name)) {
            if (!/^[A-Za-z ]*$/.test(value)) return;
        }

        // Phone → only numbers
        if (name === "phone" || name === "pincode") {
            if (!/^[0-9]*$/.test(value)) return;
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Phone validation
        if (!/^[0-9]{10}$/.test(form.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        // Pincode validation
        if (!/^[0-9]{6}$/.test(form.pincode)) {
            newErrors.pincode = "Pincode must be 6 digits";
        }

        // set errors
        setErrors(newErrors);

        // stop if errors exist
        if (Object.keys(newErrors).length > 0) return;

        try {
            await api.post("/address/add", {
                ...form,
                userId,
            });

            navigate("/checkout");
        } catch (error) {
            console.log(error.response?.data);
        }
    };

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
                                    value={form[key]}
                                    onChange={handleChange}
                                    className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors[key] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                                        }`}
                                    required
                                />

                                {/* 🔥 Error message */}
                                {errors[key] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors[key]}
                                    </p>
                                )}

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
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const location = useLocation();

    const existingAddress = location.state && location.state._id ? location.state : null; // detect edit when state is an address object
    const fromCheckout = location.state && location.state.fromCheckout;

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({});

    const formTypes = {
        fullName: "text",
        phone: "tel",
        addressLine: "text",
        city: "text",
        state: "text",
        pincode: "text",
    };

    // Prefill form in edit mode
    useEffect(() => {
        if (existingAddress) {
            setForm({
                fullName: existingAddress.fullName || "",
                phone: existingAddress.phone || "",
                addressLine: existingAddress.addressLine || "",
                city: existingAddress.city || "",
                state: existingAddress.state || "",
                pincode: existingAddress.pincode || "",
            });
        }
    }, [existingAddress]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["fullName", "city", "state"].includes(name)) {
            if (!/^[A-Za-z ]*$/.test(value)) return;
        }

        if (name === "phone" || name === "pincode") {
            if (!/^[0-9]*$/.test(value)) return;
        }

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!/^[0-9]{10}$/.test(form.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!/^[0-9]{6}$/.test(form.pincode)) {
            newErrors.pincode = "Pincode must be 6 digits";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            if (existingAddress) {
                // UPDATE
                await api.put(`/address/${existingAddress._id}`, form);
            } else {
                // ADD
                await api.post("/address/add", {
                    ...form,
                    userId,
                });
            }

            // If opened from checkout flow, redirect back to checkout
            if (fromCheckout) {
                navigate("/checkout");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6">

            <div className="bg-white p-8 rounded-xl shadow-md">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    {existingAddress ? "Edit Address" : "Add Address"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(form).map((key) => (
                            <div key={key} className="flex flex-col">

                                <label className="text-sm font-medium mb-1 capitalize">
                                    {key}
                                </label>

                                <input
                                    type={formTypes[key]}
                                    name={key}
                                    placeholder={`Enter ${key}`}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors[key]
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                        }`}
                                    required
                                />

                                {errors[key] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors[key]}
                                    </p>
                                )}

                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        {existingAddress ? "Update Address" : "Add Address"}
                    </button>

                </form>

            </div>
        </div>
    );
}
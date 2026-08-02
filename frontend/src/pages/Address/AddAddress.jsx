import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiPhone, FiMapPin, FiHome, FiEdit3, FiHash } from "react-icons/fi";
import api from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { goldLineAnimation } from "../../utils/animations";

export default function AddAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const location = useLocation();

    const existingAddress = location.state && location.state._id ? location.state : null;
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
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formFields = [
        { key: "fullName", label: "Full Name", icon: FiUser, type: "text" },
        { key: "phone", label: "Phone Number", icon: FiPhone, type: "tel" },
        { key: "addressLine", label: "Address Line", icon: FiHome, type: "text" },
        { key: "city", label: "City", icon: FiMapPin, type: "text" },
        { key: "state", label: "State", icon: FiEdit3, type: "text" },
        { key: "pincode", label: "Pincode", icon: FiHash, type: "text" },
    ];

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

        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const newErrors = {};

        if (!/^[0-9]{10}$/.test(form.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!/^[0-9]{6}$/.test(form.pincode)) {
            newErrors.pincode = "Pincode must be 6 digits";
        }

        if (!form.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!form.addressLine.trim()) {
            newErrors.addressLine = "Address line is required";
        }

        if (!form.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!form.state.trim()) {
            newErrors.state = "State is required";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);

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
            setSubmitError(error.response?.data?.message || "Unable to save address. Please try again.");
            console.log(error.response?.data);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark">
            {/* Banner */}
            <div className="bg-dark-elevated/30 border-b border-dark-border">
                <div className="container-lux py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-4 block">
                            {existingAddress ? "Edit" : "Add"} Address
                        </span>
                        <h1 className="typo-h1 text-white mb-4">
                            {existingAddress ? "Edit Address" : "Add a New Address"}
                        </h1>
                        <motion.div
                            className="divider-gold"
                            variants={goldLineAnimation}
                            initial="initial"
                            animate="animate"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Form */}
            <div className="container-lux section-padding-sm">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <div className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl">
                        {submitError && (
                            <motion.div
                                className="mb-6 p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-sm text-rose-300"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {submitError}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
                            {formFields.map((field, index) => {
                                const Icon = field.icon;
                                return (
                                    <motion.div
                                        key={field.key}
                                        className="flex flex-col"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                    >
                                        <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                                            {field.label}
                                        </label>
                                        <div className="relative">
                                            <Icon
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                                                size={18}
                                            />
                                            <input
                                                type={field.type}
                                                name={field.key}
                                                placeholder={field.label}
                                                value={form[field.key]}
                                                onChange={handleChange}
                                                onFocus={() => {}}
                                                className={`input w-full py-3.5 pl-12 pr-4 rounded-xl ${
                                                    errors[field.key]
                                                        ? "border-red-500/50 focus:border-red-500"
                                                        : "border-dark-border focus:border-accent"
                                                }`}
                                                required
                                            />
                                        </div>
                                        {errors[field.key] && (
                                            <motion.p
                                                className="text-red-400 text-xs mt-1"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors[field.key]}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                );
                            })}

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary md:col-span-2"
                                whileHover={!isSubmitting ? "hover" : undefined}
                                whileTap={!isSubmitting ? "tap" : undefined}
                            >
                                {isSubmitting
                                    ? (existingAddress ? "Updating..." : "Saving...")
                                    : (existingAddress ? "Update Address" : "Add Address")
                                }
                            </motion.button>
                        </form>
                    </div>

                    {/* Cancel Button */}
                    <motion.button
                        type="button"
                        onClick={() => navigate(fromCheckout ? "/checkout" : "/profile")}
                        className="btn btn-ghost mt-4"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Cancel
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiLock, FiPackage, FiTruck, FiCreditCard, FiMapPin, FiFileText, FiShield } from "react-icons/fi";

export default function LuxuryCheckout() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        // Shipping
        fullName: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        // Billing
        sameAsShipping: true,
        billingAddress: "",
        // Payment
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: ""
    });

    const steps = [
        { id: 1, label: "Shipping", icon: FiMapPin },
        { id: 2, label: "Billing", icon: FiFileText },
        { id: 3, label: "Payment", icon: FiCreditCard },
        { id: 4, label: "Review", icon: FiCheck }
    ];

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        api.get(`/cart`).then((res) => setCart(res.data));
        api.get(`/address`).then((res) => {
            setAddresses(res.data);
            if (res.data.length > 0) {
                setSelectedAddress(res.data[0]);
                setFormData(prev => ({
                    ...prev,
                    fullName: res.data[0].fullName || "",
                    addressLine: res.data[0].addressLine || "",
                    city: res.data[0].city || "",
                    state: res.data[0].state || "",
                    pincode: res.data[0].pincode || "",
                    phone: res.data[0].phone || ""
                }));
            }
        });
    }, [userId, navigate]);

    const validItems = (cart?.items || []).filter((i) => i?.productId?._id);
    const subtotal = validItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const shipping = subtotal > 5000 ? 0 : 50;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert("Please select or enter a shipping address");
            return;
        }

        setIsProcessing(true);
        try {
            const res = await api.post("/orders/place", {
                userId,
                address: selectedAddress
            });
            navigate(`/order-success/${res.data.orderId}`);
        } catch (error) {
            alert("Failed to place order. Please try again.");
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark">
            {/* Luxury Banner */}
            <div className="bg-dark-elevated/30 border-b border-dark-border">
                <div className="container-lux py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="typo-label-gold mb-4 block">Secure Checkout</span>
                        <h1 className="typo-h1 text-white mb-4">Checkout</h1>
                        <div className="divider-gold" />
                    </motion.div>
                </div>
            </div>

            <div className="container-lux section-padding-sm">
                {/* Progress Indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;

                            return (
                                <div key={step.id} className="flex-1">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                                                        isCompleted
                                                            ? "bg-accent border-accent text-dark"
                                                            : isActive
                                                                ? "border-accent text-accent"
                                                                : "border-dark-border text-text-muted"
                                                    }`}
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {isCompleted ? (
                                                        <FiCheck size={20} />
                                                    ) : (
                                                        <Icon size={20} />
                                                    )}
                                                </motion.div>
                                                <div className="hidden md:block">
                                                    <p className={`text-sm font-medium ${isActive ? "text-white" : "text-text-muted"}`}>
                                                        {step.label}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className="flex-1 mx-4">
                                                <div className="h-0.5 bg-dark-border relative">
                                                    <motion.div
                                                        className="h-full bg-accent"
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: isCompleted || isActive ? 1 : 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Forms */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Shipping Address */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-dark-card border border-dark-border rounded-2xl p-8"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <FiMapPin className="text-accent" size={24} />
                                        <h2 className="typo-h3 text-white">Shipping Address</h2>
                                    </div>

                                    {/* Saved Addresses */}
                                    {addresses.length > 0 && (
                                        <div className="mb-8">
                                            <p className="text-sm text-text-muted mb-4">Select a saved address or enter a new one:</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {addresses.map((addr) => (
                                                    <motion.div
                                                        key={addr._id}
                                                        onClick={() => setSelectedAddress(addr)}
                                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                            selectedAddress?._id === addr._id
                                                                ? "border-accent bg-accent/5"
                                                                : "border-dark-border hover:border-accent/30"
                                                        }`}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <p className="text-white font-medium mb-1">{addr.fullName}</p>
                                                        <p className="text-sm text-text-muted">{addr.addressLine}</p>
                                                        <p className="text-sm text-text-muted">{addr.city}, {addr.state} {addr.pincode}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* New Address Form */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-text-muted mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="input w-full py-3 rounded-xl"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-text-muted mb-2">Address Line</label>
                                            <input
                                                type="text"
                                                name="addressLine"
                                                value={formData.addressLine}
                                                onChange={handleInputChange}
                                                className="input w-full py-3 rounded-xl"
                                                placeholder="123 Main Street"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-text-muted mb-2">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="input w-full py-3 rounded-xl"
                                                    placeholder="New York"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-text-muted mb-2">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="input w-full py-3 rounded-xl"
                                                    placeholder="NY"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-text-muted mb-2">Pincode</label>
                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleInputChange}
                                                    className="input w-full py-3 rounded-xl"
                                                    placeholder="10001"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-text-muted mb-2">Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="input w-full py-3 rounded-xl"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <motion.button
                                            onClick={() => setCurrentStep(2)}
                                            className="btn btn-primary btn-lg w-full"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Continue to Billing
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Billing */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="billing"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-dark-card border border-dark-border rounded-2xl p-8"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <FiFileText className="text-accent" size={24} />
                                        <h2 className="typo-h3 text-white">Billing Information</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="sameAsShipping"
                                                checked={formData.sameAsShipping}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 rounded border-dark-border bg-dark-card text-accent focus:ring-accent"
                                            />
                                            <span className="text-white">Billing address same as shipping</span>
                                        </label>

                                        {!formData.sameAsShipping && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="block text-sm text-text-muted mb-2">Billing Address</label>
                                                    <textarea
                                                        name="billingAddress"
                                                        value={formData.billingAddress}
                                                        onChange={handleInputChange}
                                                        className="input w-full py-3 rounded-xl"
                                                        rows="4"
                                                        placeholder="Enter billing address"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            className="flex-1 btn btn-outline"
                                        >
                                            Back
                                        </button>
                                        <motion.button
                                            onClick={() => setCurrentStep(3)}
                                            className="flex-1 btn btn-primary btn-lg"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Continue to Payment
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Payment */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-dark-card border border-dark-border rounded-2xl p-8"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <FiCreditCard className="text-accent" size={24} />
                                        <h2 className="typo-h3 text-white">Payment Method</h2>
                                    </div>

                                    {/* Security Badges */}
                                    <div className="flex items-center gap-4 mb-8 p-4 bg-dark-elevated/50 rounded-xl">
                                        <FiShield className="text-accent" size={24} />
                                        <div>
                                            <p className="text-sm text-white font-medium">Secure Payment</p>
                                            <p className="text-xs text-text-muted">Your payment information is encrypted</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-text-muted mb-2">Card Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    className="input w-full py-3 rounded-xl pl-12"
                                                    placeholder="1234 5678 9012 3456"
                                                />
                                                <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-text-muted mb-2">Cardholder Name</label>
                                            <input
                                                type="text"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                className="input w-full py-3 rounded-xl"
                                                placeholder="JOHN DOE"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-text-muted mb-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={formData.expiry}
                                                    onChange={handleInputChange}
                                                    className="input w-full py-3 rounded-xl"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-text-muted mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    className="input w-full py-3 rounded-xl"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => setCurrentStep(2)}
                                            className="flex-1 btn btn-outline"
                                        >
                                            Back
                                        </button>
                                        <motion.button
                                            onClick={() => setCurrentStep(4)}
                                            className="flex-1 btn btn-primary btn-lg"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Review Order
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Review */}
                            {currentStep === 4 && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-dark-card border border-dark-border rounded-2xl p-8"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <FiCheck className="text-accent" size={24} />
                                        <h2 className="typo-h3 text-white">Review Your Order</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Shipping Summary */}
                                        <div className="p-6 bg-dark-elevated/50 rounded-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-white font-medium">Shipping Address</h3>
                                                <button
                                                    onClick={() => setCurrentStep(1)}
                                                    className="text-sm text-accent hover:text-accent-alt"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                            <p className="text-text-secondary text-sm">
                                                {selectedAddress ? (
                                                    <>
                                                    {selectedAddress.fullName}<br />
                                                        {selectedAddress.addressLine}<br />
                                                        {selectedAddress.city}, {selectedAddress.state} {selectedAddress.pincode}
                                                    </>
                                                ) : (
                                                    "No address selected"
                                                )}
                                            </p>
                                        </div>

                                        {/* Payment Summary */}
                                        <div className="p-6 bg-dark-elevated/50 rounded-xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-white font-medium">Payment Method</h3>
                                                <button
                                                    onClick={() => setCurrentStep(3)}
                                                    className="text-sm text-accent hover:text-accent-alt"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                            <p className="text-text-secondary text-sm">
                                                Card ending in {formData.cardNumber.slice(-4) || "****"}
                                            </p>
                                        </div>

                                        {/* Items Summary */}
                                        <div className="p-6 bg-dark-elevated/50 rounded-xl">
                                            <h3 className="text-white font-medium mb-4">Order Items ({validItems.length})</h3>
                                            <div className="space-y-3">
                                                {validItems.map((item) => (
                                                    <div key={item.productId._id} className="flex justify-between text-sm">
                                                        <span className="text-text-secondary">
                                                            {item.productId.title} {"\u00D7"} {item.quantity}
                                                        </span>
                                                        <span className="text-white">
                                                            ₹ {(item.productId.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => setCurrentStep(3)}
                                            className="flex-1 btn btn-outline"
                                        >
                                            Back
                                        </button>
                                        <motion.button
                                            onClick={handlePlaceOrder}
                                            disabled={isProcessing}
                                            className="flex-1 btn btn-primary btn-lg"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isProcessing ? "Processing..." : `Pay \u20B9${total.toFixed(2)}`}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            className="sticky top-24 bg-dark-card border border-dark-border rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {/* Luxury Packaging Illustration */}
                            <div className="bg-dark-elevated/50 p-8 border-b border-dark-border">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full border-2 border-accent/20 bg-accent/5 flex items-center justify-center">
                                            <FiPackage className="text-accent" size={40} />
                                        </div>
                                        <motion.div
                                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <FiCheck className="text-dark" size={16} />
                                        </motion.div>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-text-muted">
                                    Premium Gift Packaging
                                </p>
                                <p className="text-center text-xs text-text-muted mt-1">
                                    Included with every order
                                </p>
                            </div>

                            <div className="p-8">
                                <h3 className="typo-h4 text-white mb-6">Order Summary</h3>

                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {validItems.map((item) => (
                                        <div key={item.productId._id} className="flex justify-between text-sm">
                                            <span className="text-text-secondary">
                                                {item.productId.title} {"\u00D7"} {item.quantity}
                                            </span>
                                            <span className="text-white">
                                                ₹ {(item.productId.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="divider mb-6" />

                                {/* Estimates */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Subtotal</span>
                                        <span className="text-white">₹ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Shipping</span>
                                        <span className="text-white">
                                            {shipping === 0 ? (
                                                <span className="text-green-400">FREE</span>
                                            ) : (
                                                `\u20B9${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">Tax</span>
                                        <span className="text-white">₹ {tax.toFixed(2)}</span>
                                    </div>
                                    <div className="divider-gold-thin my-4" />
                                    <div className="flex justify-between items-center">
                                        <span className="typo-h4 text-white">Total</span>
                                        <span className="typo-price-lg">₹ {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Estimated Delivery */}
                                <div className="p-4 bg-dark-elevated/50 rounded-xl mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FiTruck className="text-accent" size={18} />
                                        <p className="text-sm text-white font-medium">Estimated Delivery</p>
                                    </div>
                                    <p className="text-xs text-text-muted">
                                        {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                {/* Security Badges */}
                                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-dark-border">
                                    <div className="text-center">
                                        <FiLock className="text-accent mx-auto mb-2" size={20} />
                                        <p className="text-[10px] text-text-muted">SSL Secure</p>
                                    </div>
                                    <div className="text-center">
                                        <FiShield className="text-accent mx-auto mb-2" size={20} />
                                        <p className="text-[10px] text-text-muted">Protected</p>
                                    </div>
                                    <div className="text-center">
                                        <FiPackage className="text-accent mx-auto mb-2" size={20} />
                                        <p className="text-[10px] text-text-muted">Insured</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

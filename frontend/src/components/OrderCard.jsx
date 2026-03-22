import React from "react";

const OrderCard = ({ order }) => {
    return (
        <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="text-sm text-gray-500">
                        Order ID: {order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Cancelled"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                        }`}
                >
                    {order.status}
                </span>
            </div>

            {/* Items */}
            <div className="space-y-3">
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                        <div>
                            <p className="font-medium">
                                Product ID: {item.productId?.slice(-5)}
                            </p>
                            <p className="text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <p className="font-semibold">₹{item.price}</p>
                    </div>
                ))}
            </div>

            {/* Address */}
            <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium">{order.address.fullName}</p>
                <p>
                    {order.address.addressLine}, {order.address.city}
                </p>
                <p>
                    {order.address.state} - {order.address.pincode}
                </p>
                <p>📞 {order.address.phone}</p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <div>
                    <p className="text-sm text-gray-500">
                        Payment: {order.paymentMethod}
                    </p>
                    <p className="font-bold text-lg">
                        ₹{order.totalAmount}
                    </p>
                </div>

                <button className="text-blue-600 hover:underline text-sm">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default OrderCard;
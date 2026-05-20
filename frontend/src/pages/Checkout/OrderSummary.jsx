import React from 'react'

const OrderSummary = ({ cart, total, placeOrder }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit mt-10">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            {/* Breakdown */}
            <div className="space-y-2 text-sm text-gray-600">

                <div className="flex justify-between">
                    <span>Items Total</span>
                    <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-600 font-medium">-₹0</span>
                </div>
            </div>

            <hr className="my-4" />

            {/* Total */}
            <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>₹{total}</span>
            </div>

            {/* Button */}
            <button
                onClick={placeOrder}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-medium"
            >
                Place Order (COD)
            </button>

            {/* Footer note */}
            <p className="text-xs text-gray-500 mt-3">
                🔒 Safe & secure payments
            </p>
        </div>
    )
}

export default OrderSummary
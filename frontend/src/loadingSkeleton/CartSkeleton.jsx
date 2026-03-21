import React from 'react'

const CartSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">

            {/* Title */}
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>

            {/* Cart Items */}
            {[...Array(2)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between bg-white rounded-xl shadow p-4 mb-4"
                >
                    {/* Left: Image + Info */}
                    <div className="flex items-center gap-4">

                        {/* Image */}
                        <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>

                        {/* Name + Price */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        <div className="w-6 h-4 bg-gray-300 rounded"></div>
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>

                    {/* Right: Price + Remove */}
                    <div className="text-right space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-20 ml-auto"></div>
                        <div className="h-4 bg-gray-300 rounded w-12 ml-auto"></div>
                    </div>
                </div>
            ))}

            {/* Add More Button */}
            <div className="h-10 bg-gray-300 rounded w-48 my-6"></div>

            {/* Total */}
            <div className="flex justify-between items-center bg-white rounded-xl shadow p-4 mb-6">
                <div className="h-5 bg-gray-300 rounded w-32"></div>
                <div className="h-5 bg-gray-300 rounded w-24"></div>
            </div>

            {/* Checkout Button */}
            <div className="h-12 bg-gray-300 rounded w-full"></div>
        </div>
    )
}

export default CartSkeleton
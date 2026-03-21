import React from 'react'

const CheckoutSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">

            {/* Title */}
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 🔹 LEFT: Address Section */}
                <div>
                    <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>

                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="border rounded-xl p-4 mb-4 space-y-3"
                        >
                            {/* Name */}
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>

                            {/* Address */}
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>

                            {/* Phone */}
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    ))}

                    {/* Add Address Button */}
                    <div className="h-10 bg-gray-300 rounded w-40 mt-4"></div>
                </div>

                {/* 🔹 RIGHT: Order Summary */}
                <div className="bg-white rounded-xl shadow p-6 space-y-4">

                    {/* Title */}
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>

                    {/* Items */}
                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>

                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/5"></div>
                    </div>

                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/5"></div>
                    </div>

                    <hr />

                    {/* Total */}
                    <div className="flex justify-between">
                        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                    </div>

                    {/* Button */}
                    <div className="h-12 bg-gray-300 rounded w-full mt-4"></div>

                    {/* Footer text */}
                    <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSkeleton
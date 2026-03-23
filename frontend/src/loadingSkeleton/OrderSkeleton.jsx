import React from "react";

const OrderSkeleton = () => {
    return (
        <div className="border rounded-2xl shadow-sm p-5 mb-5 animate-pulse bg-white">

            {/* Top Row */}
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-3 w-28 bg-gray-200 rounded"></div>
                </div>

                <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
            </div>

            {/* Products Section */}
            <div className="space-y-4">
                {[1, 2].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">

                        {/* Left side */}
                        <div className="space-y-2">
                            <div className="h-4 w-48 bg-gray-200 rounded"></div>
                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>

                        {/* Right price */}
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Address */}
            <div className="mt-5 space-y-2">
                <div className="h-4 w-36 bg-gray-200 rounded"></div>
                <div className="h-3 w-56 bg-gray-200 rounded"></div>
                <div className="h-3 w-48 bg-gray-200 rounded"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-gray-200"></div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center">

                {/* Left */}
                <div className="space-y-2">
                    <div className="h-3 w-28 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>

                {/* Right */}
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default OrderSkeleton;
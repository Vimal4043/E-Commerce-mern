import React from "react";

const OrderSkeleton = () => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 mb-6 animate-pulse bg-white">

            <div className="h-3 w-28 bg-gray-300 rounded mb-3"></div>

            {/* 🔹 Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded"></div>
                </div>

                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-3"></div>

            {/* 🔹 Items */}
            <div className="space-y-3">
                {[1, 2].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-3"></div>

            {/* 🔹 Bottom */}
            <div className="flex justify-between items-center">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>

                <div className="text-right space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded ml-auto"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default OrderSkeleton;
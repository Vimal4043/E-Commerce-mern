import React from 'react'

const ProductListSkeleton = () => {
    return (
        <div className="px-4 md:px-10 py-6 animate-pulse">

            {/* 🔹 Top Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="h-12 bg-gray-300 rounded-lg w-full md:w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded-lg w-full md:w-1/4"></div>
            </div>

            {/* 🔹 Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow p-3">

                        {/* Image */}
                        <div className="h-40 bg-gray-300 rounded-lg"></div>

                        {/* Title */}
                        <div className="h-5 bg-gray-300 rounded mt-3 w-3/4"></div>

                        {/* Price + Button */}
                        <div className="flex justify-between items-center mt-4">
                            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-8 bg-gray-300 rounded w-16"></div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default ProductListSkeleton
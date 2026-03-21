import React from 'react'

const ProductSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT: Image */}
                <div className="w-full h-75 md:h-100 bg-gray-300 rounded-xl"></div>

                {/* RIGHT: Content */}
                <div className="space-y-4">

                    {/* Title */}
                    <div className="h-8 bg-gray-300 rounded w-2/3"></div>

                    {/* Subtitle */}
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>

                    {/* Price */}
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>

                    {/* Stock */}
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <div className="h-12 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-12 bg-gray-300 rounded w-1/2"></div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mt-4">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductSkeleton
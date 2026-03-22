const CartSkeleton = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-6 animate-pulse">
            <div className="max-w-4xl mx-auto px-4">

                {/* Title */}
                <div className="h-7 bg-gray-300 rounded w-32 mb-6"></div>

                {/* Cart Items */}
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white p-4 rounded-xl shadow-sm mb-4"
                    >
                        {/* TOP ROW */}
                        <div className="flex items-center justify-between gap-3">

                            {/* LEFT: Image + Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>

                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                                </div>
                            </div>

                            {/* RIGHT: Qty */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                                <div className="w-5 h-4 bg-gray-300 rounded"></div>
                                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            </div>
                        </div>

                        {/* BOTTOM ROW */}
                        <div className="flex justify-between items-center mt-3">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                            <div className="h-3 bg-gray-300 rounded w-12"></div>
                        </div>
                    </div>
                ))}

                {/* Add More Button */}
                <div className="h-10 bg-gray-300 rounded w-full mb-6"></div>

                {/* Total */}
                <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between mb-4">
                    <div className="h-4 bg-gray-300 rounded w-28"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>

                {/* Checkout */}
                <div className="h-12 bg-gray-300 rounded w-full"></div>
            </div>
        </div>
    );
};

export default CartSkeleton;
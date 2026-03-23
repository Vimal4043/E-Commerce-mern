const OrderDetailsSkeleton = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-6 animate-pulse">
            <div className="max-w-6xl mx-auto px-4">

                {/* 🔹 Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded"></div>
                    </div>

                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                </div>

                {/* 🔥 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                    {/* 🔹 LEFT */}
                    <div className="md:col-span-3 space-y-6">

                        {/* 🛒 Items */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <div className="h-5 w-20 bg-gray-200 rounded mb-4"></div>

                            <div className="space-y-4">
                                {[1, 2].map((_, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                                    >
                                        {/* image */}
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>

                                        {/* text */}
                                        <div>
                                            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                        </div>

                                        {/* price */}
                                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 💳 Payment Summary */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>

                            <div className="flex justify-between mb-3">
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                            </div>

                            <div className="h-px bg-gray-200 my-2"></div>

                            <div className="flex justify-between mt-3">
                                <div className="h-5 w-16 bg-gray-200 rounded"></div>
                                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 RIGHT */}
                    <div className="md:col-span-2 space-y-6">

                        {/* 📍 Address */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>

                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                <div className="h-4 w-28 bg-gray-200 rounded mt-2"></div>
                            </div>
                        </div>

                        {/* 🚚 Status */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>

                            <div className="h-6 w-20 bg-gray-200 rounded-full mb-3"></div>

                            <div className="h-4 w-56 bg-gray-200 rounded"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsSkeleton;
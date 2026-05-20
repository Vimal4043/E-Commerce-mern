import React from 'react'

const ItemCard = ({ item, updateQty, removeItem }) => {
    return (
        <div
            key={item.productId._id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
        >
            {/* Left: Image + Info */}
            <div className="flex items-center gap-4 md:w-1/2">
                <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                    <h2 className="font-semibold">
                        {item.productId.title}
                    </h2>
                    <p className="text-gray-500">
                        ₹{item.productId.price}
                    </p>
                </div>
            </div>

            <div className="md:flex items-center justify-between md:w-1/2">
                {/* Middle: Quantity */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() =>
                            updateQty(item.productId._id, item.quantity - 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        -
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                        onClick={() =>
                            updateQty(item.productId._id, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>

                {/* Right: Price + Remove */}
                <div className="text-right">
                    <p className="font-semibold">
                        ₹{(item.productId.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-red-500 text-sm hover:text-red-700 mt-1"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
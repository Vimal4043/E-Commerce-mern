import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500 mb-4">Your cart is empty 😔</p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Start Shopping
            </Link>
        </div>
    )
}

export default EmptyCart
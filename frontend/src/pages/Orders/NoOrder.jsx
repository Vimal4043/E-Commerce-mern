import React from 'react'

const NoOrder = () => {
    return (
        <div className="h-[60vh] flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold">No Orders Yet</h2>
            <p className="text-gray-500">Start shopping to see orders here</p>
            <Link
                to="/"
                className="bg-blue-600 mt-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Start Shopping
            </Link>
        </div>
    )
}

export default NoOrder
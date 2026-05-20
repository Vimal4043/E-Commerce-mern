import React from 'react'

const CTA = ({ search, setSearch, category, setCategory }) => {
    return (
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-md">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* Category Filter */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
                <option value="home">Home</option>
            </select>
        </div>
    )
}

export default CTA
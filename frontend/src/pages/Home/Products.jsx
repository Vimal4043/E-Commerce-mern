import React from 'react'
import LuxuryProductCard from "../../components/Home/LuxuryProductCard";

const Products = ({ products, gridRef }) => {
    return (
        <div>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
                {/* products cards */}
                {products.map((product) => (
                    <div key={product._id} className="product-reveal-item">
                        <LuxuryProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
import React from 'react'
import ProductCard from "../../components/Home/ProductCard";

const Products = ({ products, gridRef }) => {
    return (
        <div>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
                {/* products cards */}
                {products.map((product) => (
                    <div key={product._id} className="product-reveal-item">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
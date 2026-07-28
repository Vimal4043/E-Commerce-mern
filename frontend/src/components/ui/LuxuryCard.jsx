import { motion } from "framer-motion";
import { cardHover, imageZoom } from "../../utils/animations";

export default function LuxuryCard({
    children,
    className = "",
    onClick,
    hover = true,
    padding = "p-6"
}) {
    return (
        <motion.div
            onClick={onClick}
            className={`bg-dark-card border border-dark-border rounded-2xl ${padding} ${className} ${onClick ? 'cursor-pointer' : ''}`}
            variants={hover ? cardHover : undefined}
            whileHover={hover ? "hover" : undefined}
            transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
        >
            {children}
        </motion.div>
    );
}

// Product Card with image zoom
export function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist }) {
    return (
        <LuxuryCard className="overflow-hidden group">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-dark-elevated mb-4">
                <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    variants={imageZoom}
                    whileHover="hover"
                />

                {/* Wishlist Button */}
                <motion.button
                    onClick={() => onToggleWishlist(product._id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark/80 backdrop-blur-sm border border-dark-border flex items-center justify-center text-text-muted hover:text-accent transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg
                        className="w-5 h-5"
                        fill={isInWishlist ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </motion.button>

                {/* Quick Add Button */}
                <motion.button
                    onClick={() => onAddToCart(product)}
                    className="absolute bottom-4 left-4 right-4 bg-accent text-dark py-3 rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                >
                    Add to Cart
                </motion.button>
            </div>

            {/* Product Info */}
            <div>
                <p className="text-xs text-accent uppercase tracking-wider mb-2">
                    {product.category}
                </p>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    {product.title}
                </h3>
                <p className="text-sm text-text-muted mb-4 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">
                        ${product.price}
                    </span>
                </div>
            </div>
        </LuxuryCard>
    );
}

// Animated Card with icon
export function IconCard({ icon: Icon, title, subtitle, onClick }) {
    return (
        <LuxuryCard onClick={onClick} className="text-center">
            <motion.div
                className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                <Icon className="text-accent" size={32} />
            </motion.div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-text-muted">{subtitle}</p>
        </LuxuryCard>
    );
}
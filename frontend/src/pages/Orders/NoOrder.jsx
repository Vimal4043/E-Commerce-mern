import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiSearch } from 'react-icons/fi'
import { goldLineAnimation, buttonHover } from '../../utils/animations'

const NoOrder = () => {
    return (
        <div className="min-h-screen bg-dark flex items-center justify-center">
            <motion.div
                className="text-center max-w-md mx-auto px-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
            >
                {/* Icon */}
                <motion.div
                    className="w-32 h-32 mx-auto mb-8 rounded-full bg-linear-to-br from-dark-card to-dark-elevated border-2 border-dark-border flex items-center justify-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <FiShoppingBag className="text-5xl text-accent" />
                </motion.div>

                {/* Title */}
                <motion.h2
                    className="typo-h2 text-white mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    No Orders Yet
                </motion.h2>

                {/* Gold Divider */}
                <motion.div
                    className="divider-gold mx-auto mb-6"
                    variants={goldLineAnimation}
                    initial="initial"
                    animate="animate"
                />

                {/* Description */}
                <p className="typo-body-sm text-text-secondary mb-8">
                    Start shopping to see your orders here. Discover our exquisite collection of luxury timepieces.
                </p>

                {/* Shop Button */}
                <Link to="/shop">
                    <motion.button
                        className="btn btn-primary btn-lg group"
                        variants={buttonHover}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Explore Collection
                        <FiSearch className="group-hover:translate-x-1 transition-transform" size={16} />
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    )
}

export default NoOrder

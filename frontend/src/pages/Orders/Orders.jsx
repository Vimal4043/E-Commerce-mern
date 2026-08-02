import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../api/axios'
import OrderCard from '../../components/Orders/OrderCard'
import NoOrder from './NoOrder'
import { goldLineAnimation } from '../../utils/animations'

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const userId = localStorage.getItem('userId')

    const loadOrders = async () => {
        try {
            const res = await api.get(`/orders/user/${userId}`)
            setOrders(res.data)
        } catch (error) {
            console.error('Error loading orders:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [])

    return (
        <div className="min-h-screen bg-dark">
            {/* Banner */}
            <div className="bg-dark-elevated/30 border-b border-dark-border">
                <div className="container-lux py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                    >
                        <span className="typo-label-gold mb-4 block">Order History</span>
                        <h1 className="typo-h1 text-white mb-4">My Orders</h1>
                        <motion.div
                            className="divider-gold"
                            variants={goldLineAnimation}
                            initial="initial"
                            animate="animate"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container-lux section-padding-sm">
                {loading ? (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <motion.div
                                key={i}
                                className="bg-dark-card border border-dark-border rounded-2xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div className="skeleton h-5 w-32 rounded mb-4"></div>
                                <div className="skeleton h-4 w-48 rounded mb-2"></div>
                                <div className="skeleton h-4 w-40 rounded mb-4"></div>
                                <div className="skeleton h-px w-full mb-4"></div>
                                <div className="space-y-3">
                                    <div className="skeleton h-4 w-full rounded"></div>
                                    <div className="skeleton h-4 w-3/4 rounded"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : !loading && orders.length === 0 ? (
                    <NoOrder />
                ) : (
                    <motion.div
                        className="space-y-6 max-w-4xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <OrderCard order={order} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Orders

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiUser, FiMessageCircle, FiSend } from 'react-icons/fi'
import api from '../../api/axios'
import { goldLineAnimation } from '../../utils/animations'

const initialForm = {
    name: '',
    email: '',
    message: '',
}

const Contact = () => {
    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const userId = localStorage.getItem('userId')

        if (!userId) return

        const loadUser = async () => {
            try {
                const res = await api.get(`/user/${userId}`)
                setForm((current) => ({
                    ...current,
                    name: res.data?.name || current.name,
                    email: res.data?.email || current.email,
                }))
            } catch (err) {
                console.error('Failed to load profile for contact form', err)
            }
        }

        loadUser()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSuccess('')
        setError('')
        setLoading(true)

        try {
            await api.post('/contact', form)
            setSuccess('Your message has been sent successfully. We will get back to you soon.')
            setForm((current) => ({ ...initialForm, name: current.name, email: current.email }))
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || 'Unable to send your message right now.')
        } finally {
            setLoading(false)
        }
    }

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
                        <span className="typo-label-gold mb-4 block">Contact Us</span>
                        <h1 className="typo-h2 text-white mb-4">We're here to help</h1>
                        <motion.div
                            className="divider-gold"
                            variants={goldLineAnimation}
                            initial="initial"
                            animate="animate"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Form */}
            <div className="container-lux section-padding-sm">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
                >
                    <motion.div
                        className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="mb-8">
                            <p className="typo-label text-text-muted mb-2">Send a message</p>
                            <h2 className="typo-h2 text-white mb-2">
                                We're here to help
                            </h2>
                            <p className="typo-body-sm text-text-secondary">
                                Share a short message and we'll get back to you.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 stagger-children">
                            {/* Name */}
                            <motion.div
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                                    Full name
                                </label>
                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="input w-full py-3.5 pl-12 pr-4 rounded-xl"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="input w-full py-3.5 pl-12 pr-4 rounded-xl"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                                    Message
                                </label>
                                <div className="relative">
                                    <FiMessageCircle className="absolute left-4 top-4 text-text-muted" size={18} />
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help"
                                        className="input w-full py-3.5 pl-12 pr-4 rounded-xl min-h-35 resize-y"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Success Message */}
                            {success ? (
                                <motion.div
                                    className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-sm text-emerald-300"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {success}
                                </motion.div>
                            ) : null}

                            {/* Error Message */}
                            {error ? (
                                <motion.div
                                    className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-sm text-rose-300"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {error}
                                </motion.div>
                            ) : null}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full group"
                                whileHover={!loading ? "hover" : undefined}
                                whileTap={!loading ? "tap" : undefined}
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Message
                                        <FiSend size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>

                            <p className="text-center text-xs text-text-muted">
                                Or go back to{' '}
                                <Link
                                    to="/"
                                    className="font-medium text-accent hover:text-accent-alt transition-colors"
                                >
                                    home
                                </Link>{' '}
                                and continue browsing.
                            </p>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Contact

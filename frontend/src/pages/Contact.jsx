import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import api from '../api/axios'

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
        <div className="bg-linear-to-b from-slate-50 via-white to-slate-100">
            <section className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Send a message</p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">We're here to help</h2>
                        <p className="mt-2 text-sm text-slate-600">Share a short message and we’ll get back to you.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell us how we can help"
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white"
                                required
                            />
                        </div>

                        {success ? (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                {success}
                            </div>
                        ) : null}

                        {error ? (
                            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {error}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>

                        <p className="text-center text-xs text-slate-500">
                            Or go back to <Link to="/" className="font-medium text-slate-900 underline">home</Link> and continue browsing.
                        </p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Contact

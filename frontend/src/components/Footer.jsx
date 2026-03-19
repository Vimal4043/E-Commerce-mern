import React from 'react'
import { Link } from "react-router";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaAndroid, FaApple } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* BRAND */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Shopverse</h2>
                    <p className="text-sm mb-4">
                        A modern platform to explore, shop, and manage your favorite products with ease.
                    </p>

                    <div className="flex gap-4 text-lg">
                        <FaInstagram className="cursor-pointer hover:text-white" />
                        <FaTwitter className="cursor-pointer hover:text-white" />
                        <FaFacebook className="cursor-pointer hover:text-white" />
                        <FaLinkedin className="cursor-pointer hover:text-white" />
                    </div>
                </div>

                {/* NAVIGATION */}
                <div className='ml-15'>
                    <h3 className="text-white font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/" className="hover:text-white">Products</Link></li>
                        <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                        {/* <li><Link to="/orders" className="hover:text-white">Orders</Link></li> */}
                    </ul>
                </div>

                {/* CATEGORIES */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Shop By Category</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white">Electronics</Link></li>
                        <li><Link to="/" className="hover:text-white">Clothing</Link></li>
                        <li><Link to="/" className="hover:text-white">Footwear</Link></li>
                        <li><Link to="/" className="hover:text-white">Grocery</Link></li>
                    </ul>
                </div>

                {/* CONTACT + APP */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
                    <p className="text-sm mb-2">support@shopverse.com</p>
                    <p className="text-sm mb-4">+91 98765 43210</p>

                    <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg px-4 py-3 text-sm hover:bg-gray-800 transition">
                            <FaAndroid className="text-xl" />
                            <span>Download for Android</span>
                        </button>

                        <button className="flex items-center justify-center gap-2 border border-gray-600 rounded-lg px-4 py-3 text-sm hover:bg-gray-800 transition">
                            <FaApple className="text-xl" />
                            <span>Download for iOS</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="border-t border-gray-700 text-center text-sm py-4 text-gray-400">
                © {new Date().getFullYear()} Shopverse. Built with MERN Stack.
            </div>
        </footer>
    )
}

export default Footer
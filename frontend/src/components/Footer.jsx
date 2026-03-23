import React from 'react'
import { Link } from "react-router";
import { FaInstagram, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-9xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* BRAND */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Shopverse</h2>
                    <p className="text-sm mb-4">
                        A modern platform to explore, shop and manage your favorite products with ease.
                    </p>
                </div>

                {/* NAVIGATION */}
                <div className="md:ml-15">
                    <h3 className="text-white font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                        <li><Link to="/orders" className="hover:text-white">Orders</Link></li>
                        <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
                    </ul>
                </div>

                {/* CONNECT WITH US */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
                    <ul className="space-y-3 text-sm">

                        <li>
                            <a
                                href="https://github.com/Vimal4043"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-white transition"
                            >
                                <FaGithub />
                                <span>GitHub</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.linkedin.com/in/vimal-kumar-bb3258218"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-white transition"
                            >
                                <FaLinkedin />
                                <span>LinkedIn</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="https://www.instagram.com/vimal_.kr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-white transition"
                            >
                                <FaInstagram />
                                <span>Instagram</span>
                            </a>
                        </li>

                        {/* <li>
                            <a
                                href="https://twitter.com/your-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-white transition"
                            >
                                <FaTwitter />
                                <span>Twitter</span>
                            </a>
                        </li> */}

                    </ul>
                </div>

                {/* CONTACT + APP */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
                    <p className="text-sm mb-2">support@shopverse.com</p>
                    <p className="text-sm mb-4">+91 12345 67890</p>

                    <div className="gap-3">
                        <a
                            href="https://github.com/Vimal4043/E-Commerce-mern"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-500 text-gray-200 rounded-lg hover:bg-gray-800 transition"
                        >
                            <FaGithub className='h-5 w-5' />
                            View Code
                        </a>
                    </div>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="border-t border-gray-700 text-center text-sm py-4 text-gray-400">
                © {new Date().getFullYear()} Shopverse • Designed & Developed by{" "}
                <a
                    href="https://github.com/Vimal4043"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                >
                    Vimal Kumar
                </a>
            </div>
        </footer>
    )
}

export default Footer
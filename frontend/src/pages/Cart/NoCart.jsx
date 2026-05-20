import React from 'react'

const NoCart = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">

                <h2 className="text-2xl font-bold mb-2">
                    Your Cart is empty
                </h2>

                <div className="flex gap-4 justify-center">

                    {/* Login */}
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-purple-400 hover:bg-purple-500 text-black px-5 py-2 rounded-full font-medium transition"
                    >
                        Sign in to your account
                    </button>

                    {/* Signup */}
                    <button
                        onClick={() => navigate("/signup")}
                        className="border border-gray-400 px-5 py-2 rounded-full hover:bg-gray-100 transition"
                    >
                        Sign up now
                    </button>

                </div>
            </div>
        </div>
    )
}

export default NoCart
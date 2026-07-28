import React from 'react'
import Footer from '../components/Footer/LuxuryFooter'
import { Outlet, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Navbar/Header'
import ScrollToTop from '../components/Utils/ScrollToTop'

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.165, 0.84, 0.44, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.165, 0.84, 0.44, 1]
        }
    }
}

const Layout = () => {
    const location = useLocation()
    const isAdminRoute = location.pathname.startsWith('/admin')

    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />

            {!isAdminRoute && <Header />}

            <div className="grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        variants={pageVariants}
                        className="w-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>

            {!isAdminRoute && <Footer />}
        </div>
    )
}

export default Layout
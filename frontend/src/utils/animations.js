import { motion } from "framer-motion";

// Reusable animation variants
export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

export const fadeInScale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
};

export const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }
    }
};

// Button hover effect
export const buttonHover = {
    hover: { 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
        scale: 0.98,
        transition: { duration: 0.1 }
    }
};

// Card hover effect
export const cardHover = {
    hover: { 
        y: -8,
        transition: { duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }
    }
};

// Icon hover effect
export const iconHover = {
    hover: { 
        scale: 1.1,
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.4 }
    }
};

// Badge pulse animation
export const badgePulse = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
            delay: 0.1
        }
    }
};

// Loading shimmer
export const shimmer = {
    initial: { opacity: 0 },
    animate: { 
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

// Wishlist heart animation
export const wishlistAnimation = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.3, 1],
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

// Cart add animation
export const cartAddAnimation = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 0.8, 1.2, 1],
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Number counter animation
export const counterAnimation = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            delay: 0.2
        }
    }
};

// Slide in from right
export const slideInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

// Gold accent line animation
export const goldLineAnimation = {
    initial: { scaleX: 0 },
    animate: { 
        scaleX: 1,
        transition: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }
    }
};

// Success checkmark animation
export const checkmarkAnimation = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
        pathLength: 1, 
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};

// Ripple effect for buttons
export const ripple = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
        scale: 4, 
        opacity: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

// Navbar link hover
export const navLinkHover = {
    hover: {
        scale: 1.05,
        transition: { duration: 0.2 }
    }
};

// Image zoom on hover
export const imageZoom = {
    hover: {
        scale: 1.1,
        transition: { duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }
    }
};

// Floating animation
export const floatingAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Spin animation
export const spinAnimation = {
    animate: {
        rotate: 360,
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    }
};

// Utility function to create motion component with variants
export const createMotionComponent = (Component, variants) => {
    return motion(Component, variants);
};

// Smooth value animation
export const smoothValue = {
    initial: { opacity: 0, y: 10 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4 }
    }
};

// Notification badge bounce
export const badgeBounce = {
    animate: {
        scale: [1, 1.2, 1],
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};
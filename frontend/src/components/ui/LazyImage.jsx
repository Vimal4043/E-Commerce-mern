import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function LazyImage({
    src,
    alt,
    placeholder = "⌚",
    className = "",
    onLoad,
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "100px" }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
            {/* Placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-elevated">
                    <span className="text-6xl opacity-30">{placeholder}</span>
                </div>
            )}

            {/* Actual Image */}
            {isInView && (
                <motion.img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={handleLoad}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
                    transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
}

// Blur-up placeholder component for premium effect
export function BlurImage({ src, alt, className = "" }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "100px" }
        );

        const currentRef = canvasRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => observer.disconnect();
    }, []);

    // Generate blur hash preview (simplified version)
    const blurCanvas = useRef(null);

    useEffect(() => {
        if (!isInView || isLoaded) return;

        // Create a simple blur effect
        const canvas = blurCanvas.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Draw placeholder gradient
        const gradient = ctx.createLinearGradient(0, 0, 100, 100);
        gradient.addColorStop(0, "rgba(28, 28, 32, 1)");
        gradient.addColorStop(1, "rgba(40, 40, 45, 1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [isInView, isLoaded]);

    return (
        <div ref={canvasRef} className={`relative ${className}`}>
            {!isLoaded && (
                <canvas
                    ref={blurCanvas}
                    width="20"
                    height="20"
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                />
            )}
            {isInView && (
                <motion.img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
}
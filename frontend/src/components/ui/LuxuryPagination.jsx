import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function LuxuryPagination({
    currentPage,
    totalPages,
    onPageChange,
    className = ""
}) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        pages.push(totalPages);

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <motion.div
            className={`flex items-center justify-center gap-2 ${className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Previous Button */}
            <motion.button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-dark-border text-text-muted hover:text-white hover:border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={!currentPage === 1 ? { scale: 1.1 } : {}}
                whileTap={!currentPage === 1 ? { scale: 0.9 } : {}}
            >
                <FiChevronLeft size={18} />
            </motion.button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    <motion.button
                        key={index}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={page === '...'}
                        className={`min-w-[40px] h-10 rounded-lg font-medium text-sm transition-all ${
                            page === currentPage
                                ? 'bg-accent text-dark'
                                : page === '...'
                                ? 'text-text-muted cursor-default'
                                : 'text-text-muted hover:text-white hover:bg-dark-card'
                        }`}
                        whileHover={typeof page === 'number' && page !== currentPage ? { scale: 1.1 } : {}}
                        whileTap={typeof page === 'number' && page !== currentPage ? { scale: 0.9 } : {}}
                    >
                        {page}
                    </motion.button>
                ))}
            </div>

            {/* Next Button */}
            <motion.button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-dark-border text-text-muted hover:text-white hover:border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.9 } : {}}
            >
                <FiChevronRight size={18} />
            </motion.button>
        </motion.div>
    );
}
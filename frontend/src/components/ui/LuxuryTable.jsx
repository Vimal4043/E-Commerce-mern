import { motion } from "framer-motion";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export default function LuxuryTable({
    columns,
    data,
    onRowClick,
    className = ""
}) {
    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-dark-border">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="text-left text-xs text-text-muted uppercase tracking-wider pb-4 font-medium"
                            >
                                <div className="flex items-center gap-2">
                                    {column.label}
                                    {column.sortable && (
                                        <div className="flex flex-col">
                                            <FiChevronUp size={12} className="text-text-muted" />
                                            <FiChevronDown size={12} className="text-text-muted" />
                                        </div>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <motion.tr
                            key={rowIndex}
                            className="border-b border-dark-border/50 hover:bg-dark-elevated/50 transition-colors cursor-pointer"
                            onClick={() => onRowClick?.(row)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: rowIndex * 0.05 }}
                        >
                            {columns.map((column) => (
                                <td key={column.key} className="py-4">
                                    {column.render ? column.render(row[column.key], row) : (
                                        <span className="text-sm text-white">{row[column.key]}</span>
                                    )}
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
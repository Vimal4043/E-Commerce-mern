import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiList, FiSliders, FiX, FiSearch, FiChevronDown } from "react-icons/fi";

export default function LuxuryShop() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Filters
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedMovements, setSelectedMovements] = useState([]);
    const [selectedWaterResistance, setSelectedWaterResistance] = useState([]);

    const brands = ["Horologium", "Chronograph", "Elegance", "Diver", "Pilot"];
    const materials = ["18K Gold", "Stainless Steel", "Titanium", "Rose Gold", "Platinum"];
    const movements = ["Automatic", "Manual", "Quartz", "Smart"];
    const waterResistance = ["30m", "100m", "300m", "500m"];

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [products, searchQuery, sortBy, priceRange, selectedBrands, selectedMaterials, selectedMovements, selectedWaterResistance]);

    const loadProducts = async () => {
        try {
            const res = await api.get("/products?limit=100");
            setProducts(res.data.products || []);
            setFilteredProducts(res.data.products || []);
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...products];

        // Search
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price range
        filtered = filtered.filter(p => {
            const price = parseFloat(p.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "price-high":
                filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case "newest":
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case "rating":
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const toggleFilter = (filterArray, value, setFilter) => {
        if (filterArray.includes(value)) {
            setFilter(filterArray.filter(item => item !== value));
        } else {
            setFilter([...filterArray, value]);
        }
    };

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const FilterSection = ({ title, options, selected, onToggle }) => (
        <div className="mb-8">
            <h3 className="typo-label text-white mb-4">{title}</h3>
            <div className="space-y-3">
                {options.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => onToggle(option)}
                                className="w-4 h-4 rounded border-dark-border bg-dark-card text-accent focus:ring-accent focus:ring-offset-dark"
                            />
                        </div>
                        <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                            {option}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-dark">
            {/* Collection Banner */}
            <div className="relative bg-dark-elevated/30 border-b border-dark-border">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
                </div>
                <div className="container-lux relative z-10 py-16">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="typo-label-gold mb-4 block">Explore Our Collection</span>
                        <h1 className="typo-h1 text-white mb-4">Exceptional Timepieces</h1>
                        <div className="divider-gold mx-auto mb-6" />
                        <p className="typo-body-sm max-w-2xl mx-auto">
                            Discover our complete collection of luxury timepieces, each crafted with precision and passion.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-lux section-padding-sm">
                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="typo-h3 text-white">Filters</h2>
                                <FiSliders className="text-accent" size={20} />
                            </div>

                            {/* Search */}
                            <div className="mb-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search watches..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input pl-10 pr-4 py-3 rounded-xl"
                                    />
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <h3 className="typo-label text-white mb-4">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                            className="input w-full py-2 rounded-lg"
                                            placeholder="Min"
                                        />
                                        <span className="text-text-muted">-</span>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="input w-full py-2 rounded-lg"
                                            placeholder="Max"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <FilterSection
                                title="Brand"
                                options={brands}
                                selected={selectedBrands}
                                onToggle={(value) => toggleFilter(selectedBrands, value, setSelectedBrands)}
                            />

                            {/* Case Material Filter */}
                            <FilterSection
                                title="Case Material"
                                options={materials}
                                selected={selectedMaterials}
                                onToggle={(value) => toggleFilter(selectedMaterials, value, setSelectedMaterials)}
                            />

                            {/* Movement Filter */}
                            <FilterSection
                                title="Movement"
                                options={movements}
                                selected={selectedMovements}
                                onToggle={(value) => toggleFilter(selectedMovements, value, setSelectedMovements)}
                            />

                            {/* Water Resistance Filter */}
                            <FilterSection
                                title="Water Resistance"
                                options={waterResistance}
                                selected={selectedWaterResistance}
                                onToggle={(value) => toggleFilter(selectedWaterResistance, value, setSelectedWaterResistance)}
                            />
                        </div>
                    </aside>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setShowFilters(true)}
                        className="lg:hidden fixed bottom-6 right-6 z-40 btn btn-primary btn-lg rounded-full shadow-2xl"
                    >
                        <FiSliders size={20} />
                    </button>

                    {/* Mobile Filters Modal */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                className="lg:hidden fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowFilters(false)}
                            >
                                <motion.div
                                    className="absolute right-0 top-0 bottom-0 w-80 bg-dark-elevated border-l border-dark-border overflow-y-auto"
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ duration: 0.3 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="typo-h3 text-white">Filters</h2>
                                            <button onClick={() => setShowFilters(false)}>
                                                <FiX size={24} className="text-text-muted" />
                                            </button>
                                        </div>
                                        {/* Mobile filters content */}
                                        <div className="mb-8">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search watches..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="input pl-10 pr-4 py-3 rounded-xl"
                                                />
                                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                            </div>
                                        </div>
                                        <FilterSection
                                            title="Price Range"
                                            options={["Under $5,000", "$5,000 - $10,000", "$10,000 - $20,000", "Over $20,000"]}
                                            selected={selectedBrands}
                                            onToggle={(value) => toggleFilter(selectedBrands, value, setSelectedBrands)}
                                        />
                                        <FilterSection
                                            title="Brand"
                                            options={brands}
                                            selected={selectedBrands}
                                            onToggle={(value) => toggleFilter(selectedBrands, value, setSelectedBrands)}
                                        />
                                        <FilterSection
                                            title="Case Material"
                                            options={materials}
                                            selected={selectedMaterials}
                                            onToggle={(value) => toggleFilter(selectedMaterials, value, setSelectedMaterials)}
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-dark-border">
                            <div>
                                <p className="text-sm text-text-muted">
                                    Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="input pr-10 pl-4 py-2 rounded-xl appearance-none cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Newest</option>
                                        <option value="rating">Top Rated</option>
                                    </select>
                                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={16} />
                                </div>

                                {/* Grid/List Toggle */}
                                <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all ${
                                            viewMode === "grid" ? "bg-accent text-dark" : "text-text-muted hover:text-white"
                                        }`}
                                    >
                                        <FiGrid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition-all ${
                                            viewMode === "list" ? "bg-accent text-dark" : "text-text-muted hover:text-white"
                                        }`}
                                    >
                                        <FiList size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-dark-card border border-dark-border rounded-2xl p-6 animate-pulse">
                                        <div className="aspect-square bg-dark-elevated rounded-xl mb-4" />
                                        <div className="h-4 bg-dark-elevated rounded mb-2" />
                                        <div className="h-4 bg-dark-elevated rounded w-2/3" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="typo-body-sm text-text-muted mb-4">No products found matching your criteria</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedBrands([]);
                                        setSelectedMaterials([]);
                                        setSelectedMovements([]);
                                        setSelectedWaterResistance([]);
                                        setPriceRange([0, 50000]);
                                    }}
                                    className="btn btn-outline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {paginatedProducts.map((product, index) => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                        >
                                            <div className="group bg-dark-card border border-dark-border rounded-2xl overflow-hidden card-hover">
                                                <div className="relative aspect-square bg-gradient-to-br from-dark-elevated to-dark-card flex items-center justify-center">
                                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500">⌚</span>
                                                    {product.isNew && (
                                                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-dark text-[10px] tracking-[0.15em] uppercase font-medium">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="p-6">
                                                    <p className="text-xs text-accent uppercase tracking-wider mb-2">{product.category}</p>
                                                    <h3 className="typo-h4 text-white mb-3 group-hover:text-accent transition-colors">
                                                        {product.title}
                                                    </h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className="typo-price">${product.price}</span>
                                                        {product.oldPrice && (
                                                            <span className="text-sm text-text-muted line-through">${product.oldPrice}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {paginatedProducts.map((product, index) => (
                                        <motion.div
                                            key={product._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                        >
                                            <div className="flex gap-6 bg-dark-card border border-dark-border rounded-2xl overflow-hidden card-hover">
                                                <div className="w-48 h-48 flex-shrink-0 bg-gradient-to-br from-dark-elevated to-dark-card flex items-center justify-center">
                                                    <span className="text-5xl">⌚</span>
                                                </div>
                                                <div className="flex-1 p-6 flex flex-col justify-between">
                                                    <div>
                                                        <p className="text-xs text-accent uppercase tracking-wider mb-2">{product.category}</p>
                                                        <h3 className="typo-h4 text-white mb-2">{product.title}</h3>
                                                        <p className="typo-body-sm text-text-muted line-clamp-2">
                                                            {product.description || "A masterpiece of Swiss horological excellence, crafted with precision and passion."}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div>
                                                            <span className="typo-price">${product.price}</span>
                                                            {product.oldPrice && (
                                                                <span className="text-sm text-text-muted line-through ml-2">${product.oldPrice}</span>
                                                            )}
                                                        </div>
                                                        <button className="btn btn-primary btn-sm">
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="btn btn-secondary disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-10 h-10 rounded-full ${
                                                currentPage === i + 1
                                                    ? "bg-accent text-dark"
                                                    : "bg-dark-card border border-dark-border text-text-muted hover:text-white"
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="btn btn-secondary disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
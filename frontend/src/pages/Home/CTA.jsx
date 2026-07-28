import { FiSearch, FiSliders } from "react-icons/fi";

const CTA = ({ search, setSearch, category, setCategory }) => {
    return (
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
                <FiSearch
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                />
                <input
                    type="text"
                    placeholder="Search timepieces..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input pl-11 pr-4"
                />
            </div>

            {/* Category Filter */}
            <div className="relative min-w-[180px]">
                <FiSliders
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input select pl-11 pr-10"
                >
                    <option value="">All Collections</option>
                    <option value="classic">Classic</option>
                    <option value="dress">Dress</option>
                    <option value="diver">Diver</option>
                    <option value="chronograph">Chronograph</option>
                    <option value="limited">Limited Edition</option>
                    <option value="accessories">Luxury Accessories</option>
                </select>
            </div>
        </div>
    );
};

export default CTA;
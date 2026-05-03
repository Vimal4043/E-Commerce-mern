import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import ProductListSkeleton from "../loadingSkeleton/ProductListSkeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const batchSize = 24;
  const [page, setPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const gridRef = useRef(null);
  const requestIdRef = useRef(0);

  const dedupeProducts = useCallback((items) => {
    const seenIds = new Set();

    return items.filter((item) => {
      if (seenIds.has(item._id)) {
        return false;
      }

      seenIds.add(item._id);
      return true;
    });
  }, []);

  const loadProducts = useCallback(async ({ pageNumber = 1, reset = false } = {}) => {
    const currentRequestId = ++requestIdRef.current;
    if (reset) {
      setIsInitialLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    const res = await api.get(
      `/products?search=${search}&category=${category}&page=${pageNumber}&limit=${batchSize}`
    );

    if (currentRequestId !== requestIdRef.current) {
      return;
    }

    const nextProducts = res.data.products || [];
    const uniqueNextProducts = dedupeProducts(nextProducts);

    setProducts((currentProducts) =>
      reset
        ? uniqueNextProducts
        : dedupeProducts([...currentProducts, ...uniqueNextProducts])
    );
    setHasMoreProducts(Boolean(res.data.hasMore));
    setPage(pageNumber);
    setIsInitialLoading(false);
    setIsLoadingMore(false);
  }, [search, category, batchSize, dedupeProducts]);

  const handleLoadMore = useCallback(() => {
    if (!hasMoreProducts || isLoadingMore || isInitialLoading) {
      return;
    }

    loadProducts({ pageNumber: page + 1, reset: false });
  }, [hasMoreProducts, isLoadingMore, isInitialLoading, page, loadProducts]);

  useEffect(() => {
    loadProducts({ pageNumber: 1, reset: true });
  }, [loadProducts]);

  useEffect(() => {
    const container = gridRef.current;

    if (!container) {
      return undefined;
    }

    const revealItems = Array.from(
      container.querySelectorAll(".product-reveal-item:not(.is-visible)")
    );

    if (revealItems.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "120px",
        threshold: 0.15,
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [products]);

  if (isInitialLoading) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 min-h-screen px-6 py-4">
      {/* Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-md">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
          <option value="accessories">Accessories</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
          <option value="toys">Toys</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>

      {/* Products Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
        {/* products cards */}
        {products.map((product) => (
          <div key={product._id} className="product-reveal-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {hasMoreProducts && (
        <div className="mt-8 flex justify-center py-4">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore || isInitialLoading}
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

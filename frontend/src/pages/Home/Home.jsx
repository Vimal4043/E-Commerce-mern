import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import Hero from "../../components/Home/Hero";
import FeaturedCollections from "../../components/Home/FeaturedCollections";
import NewArrivals from "../../components/Home/NewArrivals";
import LuxuryCollectionBanner from "../../components/Home/LuxuryCollectionBanner";
import BestSellers from "../../components/Home/BestSellers";
import SwissCraftsmanship from "../../components/Home/SwissCraftsmanship";
import BrandStory from "../../components/Home/BrandStory";
import PremiumFeatures from "../../components/Home/PremiumFeatures";
import CustomerReviews from "../../components/Home/CustomerReviews";
import InstagramGallery from "../../components/Home/InstagramGallery";
import Newsletter from "../../components/Home/Newsletter";
import LuxuryFooter from "../../components/Home/LuxuryFooter";
import CTA from "./CTA";
import Products from "./Products";
import ProductListSkeleton from "../../loadingSkeleton/ProductListSkeleton";

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
  const hasLoadedInitialProductsRef = useRef(false);

  const dedupeProducts = useCallback((items) => {
    const seenIds = new Set();
    return items.filter((item) => {
      if (seenIds.has(item._id)) return false;
      seenIds.add(item._id);
      return true;
    });
  }, []);

  const loadProducts = useCallback(async ({ pageNumber = 1, reset = false } = {}) => {
    const currentRequestId = ++requestIdRef.current;
    if (reset && !hasLoadedInitialProductsRef.current) {
      setIsInitialLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}&page=${pageNumber}&limit=${batchSize}`
      );

      if (currentRequestId !== requestIdRef.current) return;

      const nextProducts = res.data.products || [];
      const uniqueNextProducts = dedupeProducts(nextProducts);

      setProducts((currentProducts) =>
        reset
          ? uniqueNextProducts
          : dedupeProducts([...currentProducts, ...uniqueNextProducts])
      );
      setHasMoreProducts(Boolean(res.data.hasMore));
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      if (currentRequestId === requestIdRef.current) {
        hasLoadedInitialProductsRef.current = true;
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    }
  }, [search, category, batchSize, dedupeProducts]);

  const handleLoadMore = useCallback(() => {
    if (!hasMoreProducts || isLoadingMore || isInitialLoading) return;
    loadProducts({ pageNumber: page + 1, reset: false });
  }, [hasMoreProducts, isLoadingMore, isInitialLoading, page, loadProducts]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadProducts({ pageNumber: 1, reset: true });
    }, 250);
    return () => window.clearTimeout(timeoutId);
  }, [loadProducts]);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return undefined;

    const revealItems = Array.from(
      container.querySelectorAll(".product-reveal-item:not(.is-visible)")
    );

    if (revealItems.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "120px", threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [products]);

  if (isInitialLoading) {
    return (
      <>
        <Hero />
        <ProductListSkeleton />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Fullscreen Hero Section */}
      <Hero />

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Luxury Collection Banner */}
      <LuxuryCollectionBanner />

      {/* Best Sellers */}
      <BestSellers />

      {/* Swiss Craftsmanship Section */}
      <SwissCraftsmanship />

      {/* Brand Story */}
      <BrandStory />

      {/* Premium Features */}
      <PremiumFeatures />

      {/* Products Section */}
      <section className="relative z-10 bg-dark section-padding-sm">
        <div className="container-lux">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="typo-label-gold mb-4">Our Collection</span>
            <h2 className="typo-h2 text-white mb-3">Exceptional Timepieces</h2>
            <div className="divider-gold mx-auto mb-6" />
            <p className="typo-body-sm max-w-lg">
              Discover our complete range of luxury watches, from classic dress watches
              to professional diving instruments, each crafted with precision.
            </p>
          </div>

          {/* CTA Search / Filter */}
          <CTA
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />

          {/* Products Grid */}
          <Products products={products} gridRef={gridRef} />

               {hasMoreProducts && (
             <div className="mt-12 flex justify-center">
               <button
                 type="button"
                 onClick={handleLoadMore}
                 disabled={isLoadingMore || isInitialLoading}
                 className="btn btn-outline btn-lg"
               >
                 {isLoadingMore ? "Loading..." : "View All Timepieces"}
               </button>
             </div>
           )}
        </div>
      </section>

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Instagram Gallery */}
      <InstagramGallery />

      {/* Newsletter */}
      <Newsletter />

      {/* Luxury Footer */}
      <LuxuryFooter />
    </div>
  );
}
import { Helmet } from "react-helmet-async";

export const siteConfig = {
    name: "Horologium",
    description: "Luxury Swiss timepieces crafted with precision since 1923. Discover exceptional watches including Classic, Dress, Diver, Chronograph, and Limited Edition collections.",
    url: "https://horologium.com",
    social: {
        twitter: "@horologium",
        instagram: "@horologiumwatches",
        facebook: "horologiumwatches"
    }
};

export const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Horologium",
    "description": "Luxury Swiss Wristwatches",
    "telephone": "+41 123 456 7890",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Luxury Avenue",
        "addressLocality": "Geneva",
        "addressCountry": "CH"
    },
    "priceRange": "₹₹₹₹"
};

export function SEO({ title, description, image, pathname, type = "website" }) {
    const fullTitle = title 
        ? `${title} | ${siteConfig.name}`
        : `Horologium | Luxury Swiss Timepieces`;

    const fullDescription = description || siteConfig.description;

    const url = `${siteConfig.url}${pathname || "/"}`;
    const imageUrl = image ? `${siteConfig.url}${image}` : `${siteConfig.url}/og-image.jpg`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={fullDescription} />
            <link rel="canonical" href={url} />

            {/* Open Graph - Social Sharing */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDescription} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
}
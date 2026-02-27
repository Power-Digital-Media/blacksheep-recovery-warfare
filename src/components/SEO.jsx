import React, { useEffect } from 'react';
import Schema from './Schema';

export const SEO = ({ title, description, image, url, type = "website", schemaData }) => {
    useEffect(() => {
        // Update Title
        if (title) {
            document.title = title;
        }

        // Helper to set or create meta tags
        const setMetaTag = (propertyKey, propertyValue, content) => {
            if (!content) return;
            let meta = document.querySelector(`meta[${propertyKey}="${propertyValue}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(propertyKey, propertyValue);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        const setLinkTag = (rel, href) => {
            if (!href) return;
            let link = document.querySelector(`link[rel="${rel}"]`);
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', rel);
                document.head.appendChild(link);
            }
            link.setAttribute('href', href);
        };

        // Standard Meta
        setMetaTag('name', 'description', description);

        // Open Graph Meta
        setMetaTag('property', 'og:title', title);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:image', image);
        setMetaTag('property', 'og:url', url);
        setMetaTag('property', 'og:type', type);

        // Twitter Meta (uses same image usually for summary_large_image)
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        setMetaTag('name', 'twitter:image', image);

        // Canonical link
        setLinkTag('canonical', url);

        // Optional Cleanup (usually in SPAs you just overwrite, but if unmounting to a completely empty state you might clear. Overwriting is usually sufficient)
    }, [title, description, image, url, type]);

    return (
        <React.Fragment>
            {schemaData && <Schema data={schemaData} />}
        </React.Fragment>
    );
};

export default SEO;

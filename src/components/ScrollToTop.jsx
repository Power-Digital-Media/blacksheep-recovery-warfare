import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CANONICAL_DOMAIN = "https://blacksheeprecoverywarfare.com";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Inject speakable WebPage schema on route change
    useEffect(() => {
        const existing = document.querySelector('script[data-speakable]');
        if (existing) existing.remove();

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-speakable', 'true');
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${CANONICAL_DOMAIN}${pathname}#webpage`,
            "url": `${CANONICAL_DOMAIN}${pathname}`,
            "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2"]
            }
        });
        document.head.appendChild(script);
        return () => script.remove();
    }, [pathname]);

    return null;
}

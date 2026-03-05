import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GlobalScrollGlow() {
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 768) return; // Only process on mobile

            const cards = document.querySelectorAll('.bento-card');
            const windowCenter = window.innerHeight / 2;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;

                // Calculate distance from center
                const distance = Math.abs(windowCenter - cardCenter);

                // Max distance from center before glow completely fades 
                // (Set to about 40% of screen height)
                const maxDistance = window.innerHeight * 0.4;

                let intensity = 0;

                if (distance < maxDistance) {
                    // Normalize distance
                    const normalizedDistance = distance / maxDistance;

                    // Create a bell-curve like falloff so it's strongest in the center
                    // and drops off smoothly
                    intensity = Math.pow(1 - normalizedDistance, 1.8);
                }

                card.style.setProperty('--scroll-intensity', intensity.toFixed(3));
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Trigger on mount and slightly after to allow layout shift
        handleScroll();
        const timeout = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, [pathname]);

    return null;
}

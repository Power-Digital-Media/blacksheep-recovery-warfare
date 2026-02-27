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

                // Calculate distance from center (0 = perfectly centered)
                const distance = Math.abs(windowCenter - cardCenter);
                const maxDistance = window.innerHeight / 2.5; // Starts glowing earlier

                let intensity = 1 - (distance / maxDistance);
                intensity = Math.max(0, Math.min(1, intensity));

                // Apply a slight curve to the intensity so it pops more in the middle
                const curvedIntensity = Math.pow(intensity, 1.5).toFixed(2);
                card.style.setProperty('--scroll-intensity', curvedIntensity);
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

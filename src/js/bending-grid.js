const grid = document.getElementById('hero-grid');
const fadeTop = document.getElementById('grid-fade-top');

if (grid && fadeTop) {
    // Configuration - Only rotation animation
    const config = {
        startRotateX: 75,  // More angled at start
        endRotateX: 0,
        scrollDistance: 30,
        startFadeHeight: 42,
        endFadeHeight: 8,
    };

    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }

    function updateGrid() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        const progress = Math.min(scrollY / (vh * (config.scrollDistance / 100)), 1);

        const rotateX = lerp(config.startRotateX, config.endRotateX, progress);
        const fadeHeight = lerp(config.startFadeHeight, config.endFadeHeight, progress);

        // ONLY rotate angle - no position changes
        grid.style.transform = `rotateX(${rotateX}deg)`;

        fadeTop.style.height = `${fadeHeight}%`;
    }

    window.addEventListener('scroll', updateGrid, { passive: true });
    updateGrid();
}

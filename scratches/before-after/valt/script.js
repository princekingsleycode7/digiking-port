document.addEventListener("DOMContentLoaded", () => {
    
    /**
     * Sets up an infinite scroll animation for a given row.
     * @param {string} rowSelector - The CSS selector for the row element.
     * @param {number} duration - The duration of the scroll animation in seconds.
     * @param {string} direction - The scroll direction ('left' or 'right').
     */
    function setupInfiniteScroll(rowSelector, duration, direction = 'left') {
        const row = document.querySelector(rowSelector);
        const items = Array.from(row.children);
        
        // Duplicate all items to create a seamless loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            row.appendChild(clone);
        });

        // Get the total width of the original items
        const originalContentWidth = row.scrollWidth / 2;

        let animation;

        if (direction === 'left') {
            // Animate from 0 to the negative width of original content
            animation = gsap.to(row, {
                x: -originalContentWidth,
                ease: 'none',
                duration: duration,
                repeat: -1,
            });
        } else { // direction === 'right'
            // For right scroll, start from a translated position and animate back to 0
            gsap.set(row, { x: -originalContentWidth }); // Set initial position
            animation = gsap.to(row, {
                x: 0,
                ease: 'none',
                duration: duration,
                repeat: -1,
            });
        }

        // Pause animation on hover
        row.addEventListener('mouseenter', () => animation.pause());
        row.addEventListener('mouseleave', () => animation.play());
    }

    // Initialize the scroll animations for all three rows
    setupInfiniteScroll('#row1', 40, 'left');
    setupInfiniteScroll('#row2', 50, 'right');
    setupInfiniteScroll('#row3', 45, 'left');

});
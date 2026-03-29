document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('transition-overlay');
    const navLinks = document.querySelectorAll('nav .nav-link');
    const pages = document.querySelectorAll('main .page');
    let isTransitioning = false;

    const NUM_ROWS = 10;
    const NUM_COLS = 11; // Based on the video's appearance

    // Create the grid of blocks inside the overlay
    function createGrid() {
        overlay.innerHTML = ''; // Clear existing blocks
        for (let i = 0; i < NUM_ROWS; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < NUM_COLS; j++) {
                const block = document.createElement('div');
                block.classList.add('block');
                row.appendChild(block);
            }
            overlay.appendChild(row);
        }
    }

    // The core transition function
    function handleLinkClick(event) {
        event.preventDefault();

        if (isTransitioning) {
            return;
        }

        const targetId = event.currentTarget.getAttribute('data-target');
        const targetPage = document.getElementById(targetId);
        const currentPage = document.querySelector('.page.active');
        
        if (targetPage === currentPage) {
            return; // Don't transition to the same page
        }
        
        isTransitioning = true;
        overlay.style.display = 'flex';
        overlay.classList.remove('out');
        overlay.classList.add('in');

        const blocks = document.querySelectorAll('#transition-overlay .block');

        // Apply staggered delays for the "in" animation
        blocks.forEach((block, index) => {
            const rowIndex = Math.floor(index / NUM_COLS);
            const randomDelay = Math.random() * 0.5;
            const rowDelay = (NUM_ROWS - rowIndex - 1) * 0.05;
            block.style.transitionDelay = `${randomDelay + rowDelay}s`;
        });
        
        // Wait for the "in" animation to complete, then switch content
        setTimeout(() => {
            currentPage.classList.remove('active');
            targetPage.classList.add('active');

            // Start the "out" animation
            overlay.classList.remove('in');
            overlay.classList.add('out');

            // Wait for the "out" animation to finish, then clean up
            setTimeout(() => {
                overlay.style.display = 'none';
                blocks.forEach(block => {
                    block.style.transitionDelay = '0s'; // Reset delay for next time
                });
                isTransitioning = false;
            }, 1000); // Duration of the out animation (0.5s) + max delay (~0.5s)

        }, 1000); // Duration of the in animation (0.5s) + max delay (~0.5s)
    }

    // Initialize
    createGrid();
    navLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
});
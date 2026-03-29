const slider = document.querySelector('.comparison-slider'); 
const beforeImage = document.querySelector('.before-image'); 
const sliderBar = document.querySelector('.slider-bar'); 

let isDragging = false; 

// Mouse events 
sliderBar.addEventListener('mousedown', () => { 
    isDragging = true; 
}); 

document.addEventListener('mouseup', () => { 
    isDragging = false; 
}); 

document.addEventListener('mousemove', (e) => { 
    if (isDragging) { 
        const sliderX = e.clientX - slider.getBoundingClientRect().left; 
        const newWidth = (sliderX / slider.offsetWidth) * 100; 

        if (newWidth >= 0 && newWidth <= 100) { 
            beforeImage.style.width = `${newWidth}%`; 
            sliderBar.style.left = `${newWidth}%`; 
        } 
    } 
}); 

// Touch events 
sliderBar.addEventListener('touchstart', () => { 
    isDragging = true; 
}); 

document.addEventListener('touchend', () => { 
    isDragging = false; 
}); 

document.addEventListener('touchmove', (e) => { 
    if (isDragging) { 
        const sliderX = e.touches[0].clientX - slider.getBoundingClientRect().left; 
        const newWidth = (sliderX / slider.offsetWidth) * 100; 

        if (newWidth >= 0 && newWidth <= 100) { 
            beforeImage.style.width = `${newWidth}%`; 
            sliderBar.style.left = `${newWidth}%`; 
        } 
    } 
}); 

const clients = [ 
    { 
        before: 'https://images.unsplash.com/photo-1582285843323-95b68a83416b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRpcmF0eSUyMHBsYWNlfGVufDB8fDB8fHww', 
        after: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBsYWluJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D', 
        name: 'Client A', 
        description: 'Description for Client A.' 
    }, 
    { 
        before: 'https://images.unsplash.com/photo-1542037104857-e8777195d530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xkJTIwY2FycGV0fGVufDB8fDB8fHww', 
        after: 'https://images.unsplash.com/photo-1596423637579-24b81c2b5167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xlYW4lMjBjYXJwZXR8ZW58MHx8MHx8fDA%3D', 
        name: 'Client B', 
        description: 'Description for Client B.' 
    }, 
    { 
        before: 'https://images.unsplash.com/photo-1560179427-4a65b4916de3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlydHklMjB3YWxsc3xlbnwwfHwwfHx8MA%3D%3D', 
        after: 'https://images.unsplash.com/photo-1581092497018-c3938f29645c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYW4lMjB3YWxsc3xlbnwwfHwwfHx8MA%3D%3D', 
        name: 'Client C', 
        description: 'Description for Client C.' 
    } 
]; 

let currentClientIndex = 0; 

function updateClient(index) { 
    const client = clients[index]; 
    document.querySelector('.before-image img').src = client.before; 
    document.querySelector('.after-image img').src = client.after; 
    document.querySelector('.info-card h3').textContent = client.name; 
    document.querySelector('.info-card p').textContent = client.description; 
} 

// Listen for arrow key presses 
document.addEventListener('keydown', (e) => { 
    if (e.key === 'ArrowRight') { 
        currentClientIndex = (currentClientIndex + 1) % clients.length; 
        updateClient(currentClientIndex); 
    } else if (e.key === 'ArrowLeft') { 
        currentClientIndex = (currentClientIndex - 1 + clients.length) % clients.length; 
        updateClient(currentClientIndex); 
    } 
}); 

// Initial load 
updateClient(currentClientIndex);
document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Element Selection ---
  const container = document.querySelector(".container");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuContent = document.querySelector(".menu-content");
  const menuPreviewImg = document.querySelector(".menu-preview-img");
  const menuLinks = document.querySelectorAll(".link a");

  // --- State Flags ---
  let isOpen = false;
  let isAnimating = false;

  // --- Utility Functions ---
  const cleanupPreviewImages = () => {
    const previewImages = menuPreviewImg.querySelectorAll("img");
    if (previewImages.length > 3) {
      for (let i = 0; i < previewImages.length - 3; i++) {
        menuPreviewImg.removeChild(previewImages[i]);
      }
    }
  };

  const resetPreviewImage = () => {
    menuPreviewImg.innerHTML = "";
    const defaultPreviewImg = document.createElement("img");
    defaultPreviewImg.src = "https://images.unsplash.com/photo-1589995279672-13658535a235?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600";
    menuPreviewImg.appendChild(defaultPreviewImg);
  };
  
  const animateMenuToggle = (isOpening) => {
    const open = document.querySelector("#menu-open");
    const close = document.querySelector("#menu-close");
    const targetOut = isOpening ? open : close;
    const targetIn = isOpening ? close : open;
    
    gsap.to(targetOut, {
        x: isOpening ? 5 : -5,
        y: isOpening ? -10 : 10,
        rotation: isOpening ? -5 : 5,
        opacity: 0,
        delay: 0.25,
        duration: 0.5,
        ease: "power2.out",
    });

    gsap.to(targetIn, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
        ease: "power2.out",
    });
  };

  // --- Main Animation Logic ---
  const toggleMenu = () => {
    if (isAnimating) return;
    isAnimating = true;
    
    const onComplete = () => {
        isOpen = !isOpen;
        isAnimating = false;
        if (!isOpen) {
            gsap.set([".link a", ".social a", ".menu-footer a"], { y: '120%', opacity: 0.25 });
            resetPreviewImage();
        }
    };
    
    gsap.to(container, {
        rotation: isOpen ? 0 : 10,
        x: isOpen ? 0 : 300,
        y: isOpen ? 0 : 450,
        scale: isOpen ? 1 : 1.5,
        duration: 1.25,
        ease: "power4.inOut",
    });

    animateMenuToggle(!isOpen);
    
    gsap.to(menuContent, {
        rotation: isOpen ? -15 : 0,
        x: isOpen ? -100 : 0,
        y: isOpen ? -100 : 0,
        scale: isOpen ? 1.5 : 1,
        opacity: isOpen ? 0.25 : 1,
        duration: 1.25,
        ease: "power4.inOut",
    });
    
    gsap.to([".link a", ".social a", ".menu-footer a"], {
        y: isOpen ? '120%' : '0%',
        opacity: isOpen ? 0.25 : 1,
        duration: 1,
        delay: isOpen ? 0 : 0.75,
        stagger: 0.1,
        ease: "power3.out",
    });
    
    gsap.to(menuOverlay, {
        clipPath: isOpen 
            ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" 
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: onComplete,
    });
  };

  // --- Event Listeners ---
  menuToggle.addEventListener("click", toggleMenu);
  
  menuLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
      if (!isOpen || isAnimating) return;

      const imgSrc = link.getAttribute("data-img");
      if (!imgSrc) return;
      
      const previewImages = menuPreviewImg.querySelectorAll("img");
      if (previewImages.length > 0 && previewImages[previewImages.length - 1].src.endsWith(imgSrc)) {
          return;
      }

      const newPreviewImg = document.createElement("img");
      newPreviewImg.src = imgSrc;
      newPreviewImg.style.opacity = "0";
      newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";

      menuPreviewImg.appendChild(newPreviewImg);
      cleanupPreviewImages();

      gsap.to(newPreviewImg, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    });
  });

});
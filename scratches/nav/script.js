//MAIN
import gsap from "https://cdn.skypack.dev/gsap";
import {
    CustomEase
} from "https://cdn.skypack.dev/gsap/CustomEase";
import {
    SplitText
} from "https://cdn.skypack.dev/gsap/SplitText";

document.addEventListener("DOMContentLoaded", () => {
    // --- FIX: Wait for fonts to be loaded before running any animation logic ---
    document.fonts.ready.then(() => {
        // Run the main animation sequence
        preloaderAnimation();
    });
});


// Preloader Animation
const preloaderAnimation = () => {
    gsap.registerPlugin(CustomEase, SplitText);

    CustomEase.create("hop", ".8, 0, .3, 1");

    const splitTextElements = (selector, type = "words,chars", addFirstChar = false) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            const splitText = new SplitText(element, {
                type,
                wordsClass: "preloader-word",
                charsClass: "preloader-char",
            });

            if (type.includes("chars")) {
                splitText.chars.forEach((char, index) => {
                    const originalText = char.textContent;
                    char.innerHTML = `<span>${originalText}</span>`;

                    if (addFirstChar && index === 0) {
                        char.classList.add("preloader-first-char");
                    }
                });
            }
        });
    };

    splitTextElements(".preloader-intro-title .preloader-h1", "words,chars", true);
    splitTextElements(".preloader-outro-title .preloader-h1", "words,chars", true);
    splitTextElements(".preloader-tag .preloader-p", "words");

    const isMobile = window.innerWidth < 1000;

    gsap.set(
        [
            ".preloader-split-overlay .preloader-intro-title .preloader-first-char span",
            ".preloader-split-overlay .preloader-outro-title .preloader-char span",
        ], {
            y: "0%"
        }
    );

    gsap.set(".preloader-split-overlay .preloader-intro-title .preloader-first-char", {
        x: isMobile ? "5.5rem" : "15rem",
        y: isMobile ? "-1rem" : "-2.75rem",
        fontWeight: "900",
        scale: 0.75,
    });

    gsap.set(".preloader-split-overlay .preloader-outro-title .preloader-char", {
        x: isMobile ? "-2rem" : "-6rem",
        fontSize: isMobile ? "6rem" : "14rem",
        fontWeight: "500",
    });

    const tl = gsap.timeline({
        defaults: {
            ease: "hop"
        }
    });
    const tags = gsap.utils.toArray(".preloader-tag");

    tags.forEach((tag, index) => {
        tl.to(
            tag.querySelectorAll(".preloader-p .preloader-word"), {
                y: "0%",
                duration: 0.75
            },
            0.5 + index * 0.1
        );
    });

    tl.to(".preloader .preloader-intro-title .preloader-char span", {
        y: "0%",
        duration: 0.75,
        stagger: 0.05
    }, 0.5);
    tl.to(".preloader .preloader-intro-title .preloader-char:not(.preloader-first-char) span", {
        y: "100%",
        duration: 0.75,
        stagger: 0.05
    }, 2);
    tl.to(".preloader .preloader-outro-title .preloader-char span", {
        y: "0%",
        duration: 0.75,
        stagger: 0.075
    }, 2.5);
    tl.to(".preloader .preloader-intro-title .preloader-first-char", {
        x: isMobile ? "7rem" : "28.5rem",
        duration: 1
    }, 3.5);
    tl.to(".preloader .preloader-outro-title .preloader-char", {
        x: isMobile ? "-2rem" : "-6rem",
        duration: 1
    }, 3.5);
    tl.to([".preloader .preloader-intro-title", ".preloader .preloader-outro-title"], {
        scale: 0.90,
        duration: 0.75
    }, 4.5);

    tl.to(".preloader .preloader-outro-title", {
        fontSize: isMobile ? "6rem" : "14rem",
        fontWeight: "500",
        duration: 0.75,
        onComplete: () => {
            gsap.set(".preloader", {
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
            });
            gsap.set(".preloader-split-overlay", {
                visibility: "visible",
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            });
        },
    }, 4.5);

    tl.to(".main-container", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1
    }, 6);


    tags.forEach((tag, index) => {
        tl.to(tag.querySelectorAll(".preloader-p .preloader-word"), {
            y: "100%",
            duration: 0.75
        }, 5.5 + index * 0.1);
    });

    tl.to([".preloader", ".preloader-split-overlay"], {
        y: (i) => (i === 0 ? "-50%" : "50%"),
        duration: 1,
        // --- FIX: When the animation is done, hide the overlays and start the menu logic ---
        onComplete: () => {
            document.querySelector(".preloader").style.display = "none";
            document.querySelector(".preloader-split-overlay").style.display = "none";
            document.querySelector(".preloader-tags-overlay").style.display = "none";
            heroMenuAnimation(); // Initialize the menu JavaScript
        }
    }, 6);
}

// Hero and Menu Animation
const heroMenuAnimation = () => {
    const container = document.querySelector(".main-container");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const menuPreviewImg = document.querySelector(".menu-preview-img");
    const menuLinks = document.querySelectorAll(".menu-link a");

    let isOpen = false;
    let isAnimating = false;

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

    const toggleMenu = () => {
        if (isAnimating) return;
        isAnimating = true;

        const onComplete = () => {
            isOpen = !isOpen;
            isAnimating = false;
            if (!isOpen) {
                gsap.set([".menu-link a", ".menu-social a", ".menu-footer a"], {
                    y: '120%',
                    opacity: 0.25
                });
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

        gsap.to([".menu-link a", ".menu-social a", ".menu-footer a"], {
            y: isOpen ? '120%' : '0%',
            opacity: isOpen ? 0.25 : 1,
            duration: 1,
            delay: isOpen ? 0 : 0.75,
            stagger: 0.1,
            ease: "power3.out",
        });

        gsap.to(menuOverlay, {
            clipPath: isOpen ?
                "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.25,
            ease: "power4.inOut",
            onComplete: onComplete,
        });
    };

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
}
import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm";

gsap.registerPlugin(ScrollTrigger);

// ─── Lenis Smooth Scroll ───
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sync ScrollTrigger with Lenis
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// ─── Preloader ───
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 1500); // 1.5s load time
});


// ─── Navbar Scroll Effect ───
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ─── Hero Animation ───
const heroTl = gsap.timeline();

heroTl.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    delay: 1.5 // wait for preloader
});

heroTl.from(".hero-stats", {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.5");


// ─── Features Scroll Reveal ───
gsap.utils.toArray(".feature-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
    });
});


// ─── FAQ Accordion ───
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all others
        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");
            otherItem.querySelector(".faq-answer").style.height = 0;
        });

        if (!isActive) {
            item.classList.add("active");
            answer.style.height = answer.scrollHeight + "px";
        }
    });
});

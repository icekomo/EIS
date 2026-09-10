import { gsap } from "../gsap-setup.js";

export function initHomeTitles() {
    const container = document.querySelector("#home-titles");
    if (!container) return;

    const slides = Array.from(container.querySelectorAll("h1"));
    if (slides.length < 2) return;

    // --- Build dot indicators ---
    const dotsContainer = document.createElement("div");
    dotsContainer.id = "home-titles-dots";

    const dots = slides.map((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("home-titles-dot");
        dot.setAttribute("aria-label", `Slide ${i + 1}`);
        if (i === 0) dot.classList.add("is-active");
        dotsContainer.appendChild(dot);
        return dot;
    });

    // Insert dots after .home-slides, inside #home-hero
    const homeSlidesEl = container.closest(".home-slides");
    homeSlidesEl
        ? homeSlidesEl.insertAdjacentElement("afterend", dotsContainer)
        : container.insertAdjacentElement("afterend", dotsContainer);

    // --- Initial setup ---
    let current = 0;
    let isAnimating = false;
    const DURATION = 0.5;
    const EASE = "power2.inOut";
    const AUTO_DELAY = 5;

    // Make all h1s absolute so none bleed through, then measure the tallest
    // to give the container an explicit height.
    gsap.set(slides, { position: "absolute", top: 0, left: 0, width: "100%" });

    function setContainerHeight() {
        // Temporarily make all visible to measure natural height
        gsap.set(slides, { autoAlpha: 1, x: "0%" });
        const tallest = Math.max(...slides.map((s) => s.offsetHeight));
        container.style.height = `${tallest}px`;
        // Re-hide all, then restore first slide
        gsap.set(slides, { x: "100%", autoAlpha: 0 });
        gsap.set(slides[current], { x: "0%", autoAlpha: 1 });
    }

    setContainerHeight();
    window.addEventListener("resize", setContainerHeight);

    // --- Animate to a specific slide ---
    function goTo(next) {
        if (isAnimating || next === current) return;
        isAnimating = true;

        const prev = current;
        const direction = next > prev ? 1 : -1;

        // Outgoing slide exits left or right
        gsap.to(slides[prev], {
            x: `${-100 * direction}%`,
            autoAlpha: 0,
            duration: DURATION,
            ease: EASE
        });

        // Incoming slide enters from opposite side
        gsap.fromTo(
            slides[next],
            { x: `${100 * direction}%`, autoAlpha: 0 },
            {
                x: "0%",
                autoAlpha: 1,
                duration: DURATION,
                ease: EASE,
                onComplete: () => {
                    isAnimating = false;
                }
            }
        );

        // Update dots
        dots[prev].classList.remove("is-active");
        dots[next].classList.add("is-active");

        current = next;
    }

    // --- Dot click handlers ---
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            resetTimer();
            goTo(i);
        });
    });

    // --- Auto-advance ---
    function advance() {
        const next = (current + 1) % slides.length;
        goTo(next);
    }

    let timer = gsap.delayedCall(AUTO_DELAY, function loop() {
        advance();
        timer = gsap.delayedCall(AUTO_DELAY, loop);
    });

    function resetTimer() {
        timer.kill();
        timer = gsap.delayedCall(AUTO_DELAY, function loop() {
            advance();
            timer = gsap.delayedCall(AUTO_DELAY, loop);
        });
    }

    // --- Pause on hover ---
    const heroEl = container.closest("#home-hero");
    heroEl?.addEventListener("mouseenter", () => timer.pause());
    heroEl?.addEventListener("mouseleave", () => timer.resume());
}
/* ============================================
           Who Card Flip
============================================ */
import { gsap } from "../gsap-setup.js";

export function initCardflip() {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    document.querySelectorAll(".card-wrapper").forEach((wrapper) => {
        const front = wrapper.querySelector(".card-front");
        const back = wrapper.querySelector(".card-back");
        let flipped = false;

        // Set initial state — back hidden
        gsap.set(back, { rotationY: 180, autoAlpha: 0 });

        function flipTo() {
            gsap.to(front, {
                rotationY: -90,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(front, { autoAlpha: 0 });
                    gsap.set(back, { autoAlpha: 1, rotationY: 90 });
                    gsap.to(back, {
                        rotationY: 0,
                        duration: 0.25,
                        ease: "power2.out",
                    });
                },
            });
        }

        function flipBack() {
            gsap.to(back, {
                rotationY: 90,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(back, { autoAlpha: 0 });
                    gsap.set(front, { autoAlpha: 1, rotationY: -90 });
                    gsap.to(front, {
                        rotationY: 0,
                        duration: 0.25,
                        ease: "power2.out",
                    });
                },
            });
        }

        if (isTouchDevice) {
            wrapper.addEventListener("click", (e) => {
                // Don't flip if the click came from the bio button
                if (e.target.closest(".read-bio-btn")) return;
                flipped = !flipped;
                flipped ? flipTo() : flipBack();
            });
        } else {
            wrapper.addEventListener("mouseenter", flipTo);
            wrapper.addEventListener("mouseleave", flipBack);
        }
    });
}

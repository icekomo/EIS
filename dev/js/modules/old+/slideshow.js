import { gsap } from "../gsap-setup.js";

export function initSlideshow() {
    const track = document.querySelector(".slides-track");
    const slides = track.querySelectorAll(".slide");
    const slideWidth = slides[0].offsetWidth;
    const totalWidth = slideWidth * (slides.length / 2); // width of one full set

    gsap.to(track, {
        x: -totalWidth,
        duration: 20, // adjust for speed — higher = slower
        ease: "none",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // seamless loop
        }
    });
}
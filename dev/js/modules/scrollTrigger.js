import { gsap, ScrollTrigger } from "../gsap-setup.js";
import { initGears } from "./gears.js";
import { initSubModular } from "./sub-modular-animation.js";

export function initScrollTrigger() {

    /* ============================================
        Home — background-image parallax
    ============================================ */
    ScrollTrigger.create({
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        //markers: true
    });

    ScrollTrigger.create({
        trigger: "#slideshow",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
        //markers: true
    });


    /* ============================================
        Overview + gear — 992px+
    ============================================ */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {

        gsap.from("#overview-content", {
            x: "-80px",
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#overview",
                start: "top 65%",
                end: "top 50%",
                scrub: true,
                toggleActions: "play none none none",
                //markers: true
            }
        });

        gsap.from("#overview-svg", {
            x: "80px",
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#overview",
                start: "top 65%",
                end: "top 50%",
                scrub: true,
                toggleActions: "play none none none",
                //markers: true
            }
        });

        /* ============================================
            GxP Services — cards stagger up + fade in
        ============================================ */
        gsap.from(".gxp-card", {
            y: 60,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: "#gxp-card-container",
                start: "top 65%",
                end: "top 50%",
                scrub: true,
                toggleActions: "play none none none",
                //markers: true
            }
        });

        /* ============================================
            e-gear — plays when the top of
            #overview-bottom reaches 50% of viewport
        ============================================ */
        const gearsMaster = initGears();

        if (gearsMaster) {
            ScrollTrigger.create({
                trigger: "#overview-bottom",
                start: "top 50%",
                once: true,
                // markers: true,
                onEnter: () => {
                    console.log("gear trigger fired");
                    gearsMaster.play();
                },
            });
        }

        /* ============================================
            Sub-modular — plays when #modular-container
            reaches 50% of viewport
        ============================================ */
        const subModularMaster = initSubModular();

        if (subModularMaster) {
            ScrollTrigger.create({
                trigger: "#modular-container",
                start: "top 50%",
                once: true,
                // markers: true,
                onEnter: () => {
                    console.log("sub-modular trigger fired");
                    subModularMaster.play();
                },
            });
        }

    });


    /* ============================================
        Force refresh after fonts/images settle
    ============================================ */
    window.addEventListener("load", () => {
        setTimeout(() => ScrollTrigger.refresh(), 100);
    });

}
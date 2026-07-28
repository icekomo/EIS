import { gsap } from "../gsap-setup.js";

export function initGetStarted() {
    /* ============================================
           Get Started
    ============================================ */

    const arrows = gsap.utils.toArray("#steps-container .arrow-inner");
    const TOTAL = 6;
    const mdBreakpoint = 768;

    function buildTimeline() {
        const isDesktop = window.innerWidth >= mdBreakpoint;
        const tl = gsap.timeline({ repeat: -1 });

        const staggerGap = (TOTAL * 0.5) / arrows.length;

        arrows.forEach((arrow, i) => {
            const startTime = i * staggerGap;

            tl.fromTo(
                arrow,
                {
                    autoAlpha: 0,
                    x: isDesktop ? -30 : -30,
                    y: 0,
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                startTime
            );
        });

        tl.to(
            arrows,
            { autoAlpha: 0, duration: 1, ease: "power1.in" },
            TOTAL * 0.5
        );

        tl.set(arrows, { clearProps: "x,y,opacity,visibility" }, TOTAL - 0.01);
        tl.set({}, {}, TOTAL);

        return tl;
    }

    let tl = buildTimeline();

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            tl.kill();
            gsap.set(arrows, { clearProps: "x,y,opacity,visibility" });
            tl = buildTimeline();
        }, 250);
    });
}
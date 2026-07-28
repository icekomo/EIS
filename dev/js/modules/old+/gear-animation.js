import { gsap } from "../gsap-setup.js";

export function initGearAnimation() {

    /* ============================================
           Gear Rotations
    ============================================ */

    function rotateGear(id, duration, direction = 1) {
        const el = document.querySelector(id);
        if (!el) return;

        const bbox = el.getBBox();
        const cx = bbox.x + bbox.width / 2;
        const cy = bbox.y + bbox.height / 2;

        gsap.to(el, {
            rotation: 360 * direction,
            duration,
            ease: "none",
            repeat: -1,
            svgOrigin: `${cx} ${cy}`
        });
    }

    rotateGear("#eCTD\\ IND",            60,  1);
    rotateGear("#CMC",                   45, -1);
    rotateGear("#Toxicology",            50, -1);
    rotateGear("#Clinical\\ Protocol",   55, -1);
    rotateGear("#Document\\ Management", 40,  1);
    rotateGear("#GLP",                   25,  1);
    rotateGear("#Monitoring\\ Audits",   30, -1);
    rotateGear("#FDA\\ Meetings",        20, -1);

    /* ============================================
           Gear + Key Fade-In (staggered)
    ============================================ */

    const pairs = [
        ["#eCTD\\ IND",             "#ect\\ text"],
        ["#CMC",                     "#cmc\\ text"],
        ["#Toxicology",              "#toxt\\ text"],
        ["#Clinical\\ Protocol",     "#clincial\\ text"],
        ["#Document\\ Management",   "#doc\\ text"],
        ["#FDA\\ Meetings",          "#fda\\ text"],
        ["#GLP",                     "#glp\\ text"],
        ["#Monitoring\\ Audits",     "#monitor\\ text"],
    ];

    pairs.forEach(([gear, key]) => {
        gsap.set([gear, key], { autoAlpha: 0 });
    });

    pairs.forEach(([gear, key], i) => {
        gsap.to([gear, key], {
            autoAlpha: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: i * 1.0,
        });
    });

}
import { gsap } from "../gsap-setup.js";

export function initGearAnimation() {

    /* ============================================
        Utility
        Returns an SVG coordinate string "cx cy".
        Pass as svgOrigin on any tween — works for
        both rotation and scale on SVG elements.
    ============================================ */

    // Force layout flush before reading any SVG geometry,
    // so getBBox() returns consistent values in every browser
    document.querySelector('#gear-container svg')?.getBoundingClientRect();

    function getOrigin(el) {
        const bbox = el.getBBox();
        const cx = bbox.x + bbox.width  / 2;
        const cy = bbox.y + bbox.height / 2;
        return `${cx} ${cy}`;
    }

    function buildRotation(id, duration, direction = 1) {
        const el = document.querySelector(id);
        if (!el) return null;

        const tl = gsap.timeline({ id: `rotate-${id}` });

        tl.to(el, {
            rotation: 360 * direction,
            duration,
            ease: "none",
            repeat: -1,
            svgOrigin: getOrigin(el),
        });

        return tl;
    }


    /* ============================================
        Per-gear timeline functions
        Targeting gear group IDs from the new SVG
    ============================================ */

    function eCtdInd() {
        return buildRotation("#e-gear", 60, 1);
    }

    function cmc() {
        return buildRotation("#cmc-gear", 45, -1);
    }

    function toxicology() {
        return buildRotation("#tox-gear", 50, -1);
    }

    function clinicalProtocol() {
        return buildRotation("#clinical-gear", 55, -1);
    }

    function documentManagement() {
        return buildRotation("#doc-gear", 40, 1);
    }

    function glp() {
        return buildRotation("#glp-gear", 25, 1);
    }

    function monitoringAudits() {
        return buildRotation("#monitor-gear", 30, -1);
    }

    function fdaMeetings() {
        return buildRotation("#fda-gear", 20, -1);
    }

    function eg1() {
        return buildRotation("#eg1", 35, 1);
    }

    function eg3() {
        return buildRotation("#eg3", 50, -1);
    }


    /* ============================================
        Fade-in timeline
        Pairs: [gear group, legend key group]
        Key group IDs from the new SVG's #key section
    ============================================ */

    function fadeInGears() {
        const pairs = [
            ["#e-gear",       "#ect\\ text"],
            ["#cmc-gear",     "#cmc\\ text"],
            ["#tox-gear",     "#toxt\\ text"],
            ["#clinical-gear","#clincial\\ text"],
            ["#doc-gear",     "#doc\\ text"],
            ["#fda-gear",     "#fda\\ text"],
            ["#glp-gear",     "#glp\\ text"],
            ["#monitor-gear", "#monitor\\ text"],
        ];

        const tl = gsap.timeline({ id: "fadeInGears" });

        pairs.forEach(([gear, key]) => {
            gsap.set([gear, key], { autoAlpha: 0 });
        });

        pairs.forEach(([gear, key], i) => {
            tl.to(
                [gear, key],
                { autoAlpha: 1, duration: 1.2, ease: "power2.out" },
                i * 1.0
            );
        });

        return tl;
    }


    /* ============================================
        Master timeline
    ============================================ */

    const master = gsap.timeline({ id: "gearAnimationMaster" });

    [
        eCtdInd(),
        cmc(),
        toxicology(),
        clinicalProtocol(),
        documentManagement(),
        glp(),
        monitoringAudits(),
        fdaMeetings(),
        eg1(),
        eg3(),
        fadeInGears(),
    ]
    .filter(Boolean)
    .forEach(tl => master.add(tl, 0));

    return master;

}
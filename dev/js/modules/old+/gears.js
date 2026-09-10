import { gsap, DrawSVGPlugin } from "../gsap-setup.js";

export function initGears() {

    /* ============================================
        Utility
        Null-safe: returns "0 0" if el is missing
        so downstream callers don't throw.
    ============================================ */

    function getOrigin(el) {
        if (!el) return "0 0";
        const bbox = el.getBBox();
        const cx = bbox.x + bbox.width  / 2;
        const cy = bbox.y + bbox.height / 2;
        return `${cx} ${cy}`;
    }


    /* ============================================
        Deferred element queries
        All querySelector calls happen here, inside
        the exported function, not at module scope.
        This ensures the SVG is in the DOM first.
    ============================================ */

    const eGearGroup    = document.querySelector("#e-gear_2");
    if (!eGearGroup) {
        console.warn("initGears: #e-gear_2 not found — SVG not in DOM yet?");
        return null;
    }

    const eOutter       = document.querySelector("#e-outter");
    const eInner        = document.querySelector("#e-inner");
    const eRingLeft     = document.querySelector("#e-ring-left");
    const eRingBottom   = document.querySelector("#e-ring-bottom");
    const eRingRight    = document.querySelector("#e-ring-right");
    const eLineTop      = document.querySelector("#e-line-top");
    const eLineBottom   = document.querySelector("#e-line-bottom");
    const eLinesRight   = document.querySelector("#e-lines-right");
    const eBlocksTop    = document.querySelector("#e-blocks-top");
    const eBlocksBottom = document.querySelector("#e-blocks-bottom");

    const cmcGearGroup  = document.querySelector("#cmc-gear");
    const cmcOutter     = document.querySelector("#cmc-outter");
    const cmcCenter     = document.querySelector("#cmc-center");

    const toxGearGroup  = document.querySelector("#tox-gear");
    const toxOutter     = document.querySelector("#tox-outter");
    const toxInner      = document.querySelector("#tox-inner");

    const eg1Group      = document.querySelector("#eg1");
    const eg1Outter     = document.querySelector("#eg1-outter");
    const eg1Inner      = document.querySelector("#eg1-inner");
    const eg1Lines      = document.querySelector("#eg1-lines");

    const clinicalGearGroup = document.querySelector("#clinical-gear");
    const clinicalOutter    = document.querySelector("#clinical-outter");
    const clinicalInner     = document.querySelector("#clinical-inner");

    const eg2Group  = document.querySelector("#eg2");
    const eg2Outer  = document.querySelector("#eg2-3");
    const eg2Mid    = document.querySelector("#eg2-2");
    const eg2Inner  = document.querySelector("#eg2-1");

    const docGearGroup  = document.querySelector("#doc-gear");
    const docPurple     = document.querySelector("#doc-purple");
    const docOutter     = document.querySelector("#doc-outter");
    const docInner      = document.querySelector("#doc-inner");
    const docLines      = document.querySelector("#doc-lines");

    const glpGearGroup  = document.querySelector("#glp-gear");
    const glpOutter     = document.querySelector("#g-outter");
    const glpInner      = document.querySelector("#g-inner");

    const fdaGearGroup      = document.querySelector("#fda-gear");
    const fdaInner          = document.querySelector("#fda-inner");
    const fdaCircle         = document.querySelector("#fda-circle");
    const fdaCircleOutter   = document.querySelector("#fda-circle-outter");

    const monitorGearGroup  = document.querySelector("#monitor-gear");
    const monitorOutter     = document.querySelector("#Vector_3");
    const monitorInner      = document.querySelector("#Vector_2");

    const eg3Group  = document.querySelector("#eg3");
    const eg3Gear   = document.querySelector("#eg3 #Vector");

    const line1Group    = document.querySelector("#line-1");
    const l1Start       = document.querySelector("#l1-start");
    const l1Line        = document.querySelector("#l1-line");
    const l1End         = document.querySelector("#l1-end");

    const line2Group    = document.querySelector("#line-2");
    const l2Start       = document.querySelector("#l2-start");
    const l2Line        = document.querySelector("#l2-line");
    const l2End         = document.querySelector("#l2-end");

    const line3Group    = document.querySelector("#line-3");
    const l3Line        = document.querySelector("#l3-line");
    const l3Top         = document.querySelector("#l3-top");
    const l3Bottom      = document.querySelector("#l3-bottom");

    const line4Group    = document.querySelector("#line-4");
    const l4Line        = document.querySelector("#l4-line");
    const l4Top         = document.querySelector("#l4-top");
    const l4Bottom      = document.querySelector("#l4-bottom");

    const line8Group    = document.querySelector("#line-8");
    const l8Line        = document.querySelector("#l8-line");
    const l8Top         = document.querySelector("#l8-top");
    const l8Bottom      = document.querySelector("#l8-bottom");

    const line9Group    = document.querySelector("#line-9");
    const l9Line        = document.querySelector("#l9-line");
    const l9Top         = document.querySelector("#l9-top");
    const l9Bottom      = document.querySelector("#l9-bottom");

    const line13Group   = document.querySelector("#line-13");
    const l13Line       = document.querySelector("#l13-line");
    const l13Top        = document.querySelector("#l13-top");
    const l13Bottom     = document.querySelector("#l13-bottom");

    const line22Group   = document.querySelector("#line-22");
    const l22Line       = document.querySelector("#l22-line");
    const l22Top        = document.querySelector("#l22-top");
    const l22Bottom     = document.querySelector("#l22-bottom");

    const line5Group    = document.querySelector("#line-5");
    const l5Start       = document.querySelector("#l5-start");
    const l5Line        = document.querySelector("#l5-line");
    const l5End         = document.querySelector("#l5-end");

    const line6Group    = document.querySelector("#line-6");
    const l6Start       = document.querySelector("#l6-start");
    const l6Line        = document.querySelector("#l6-line");
    const l6End         = document.querySelector("#l6-end");

    const line7Group    = document.querySelector("#line-7");
    const l7Start       = document.querySelector("#l7-start");
    const l7Line        = document.querySelector("#l7-line");
    const l7End         = document.querySelector("#l7-end");

    const line10Group   = document.querySelector("#line-10");
    const l10Start      = document.querySelector("#l10-start");
    const l10Line       = document.querySelector("#l10-line");
    const l10End        = document.querySelector("#l10-end");

    const line11Group   = document.querySelector("#line-11");
    const l11Start      = document.querySelector("#l11-start");
    const l11Line       = document.querySelector("#l11-line");
    const l11End        = document.querySelector("#l11-end");

    const line12Group   = document.querySelector("#line-12");
    const l12Start      = document.querySelector("#l12-start");
    const l12Line       = document.querySelector("#l12-line");
    const l12End        = document.querySelector("#l12-end");

    const line14Group   = document.querySelector("#line-14");
    const l14Start      = document.querySelector("#l14-start");
    const l14Line       = document.querySelector("#l14-line");
    const l14End        = document.querySelector("#l14-end");

    const line15Group   = document.querySelector("#line-15");
    const l15Start      = document.querySelector("#l15-start");
    const l15Line       = document.querySelector("#l15-line");
    const l15End        = document.querySelector("#l15-end");

    const line16Group   = document.querySelector("#line-16");
    const l16Start      = document.querySelector("#l16-start");
    const l16Line       = document.querySelector("#l16-line");
    const l16End        = document.querySelector("#l16-end");

    const line17Group   = document.querySelector("#line-17");
    const l17Start      = document.querySelector("#l17-start");
    const l17Line       = document.querySelector("#l17-line");
    const l17End        = document.querySelector("#l17-end");

    const line18Group   = document.querySelector("#line-18");
    const l18Start      = document.querySelector("#l18-start");
    const l18Line       = document.querySelector("#l18-line");
    const l18End        = document.querySelector("#l18-end");

    const line19Group   = document.querySelector("#line-19");
    const l19Start      = document.querySelector("#l19-start");
    const l19Line       = document.querySelector("#l19-line");
    const l19End        = document.querySelector("#l19-end");

    const line20Group   = document.querySelector("#line-20");
    const l20Start      = document.querySelector("#l20-start");
    const l20Line       = document.querySelector("#l20-line");
    const l20End        = document.querySelector("#l20-end");

    // line-21 uses l22-* IDs (SVG labeling quirk)
    const line21Group   = document.querySelector("#line-21");
    const l21Start      = document.querySelector("#l21-start");
    const l21Line       = document.querySelector("#l21-line");
    const l21End        = document.querySelector("#l21-end");


    /* ============================================
        e-gear scale-in + rotate timeline
    ============================================ */

    function eGear() {
        const tl = gsap.timeline({ id: "eGear" });

        tl.from(eInner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eInner),
            ease: "power2.out",
        })
        .from(eOutter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eOutter),
            ease: "power2.out",
            onComplete: rotateEGear,
        }, "-=.5")
        .from(eLineTop, {
            duration: 1,
            alpha: 0,
            ease: "power2.out",
        }, "-=.5")
        .from(eLinesRight, {
            duration: 1,
            alpha: 0,
            ease: "power2.out",
        }, "-=.5")
        .from(eLineBottom, {
            duration: 1,
            alpha: 0,
            ease: "power2.out",
        }, "-=.5")
        .from(eBlocksTop, {
            duration: 1,
            alpha: 0,
            ease: "power2.out",
        }, "-=.5")
        .from(eBlocksBottom, {
            duration: 1,
            alpha: 0,
            ease: "power2.out",
        });

        return tl;
    }

    function rotateEGear() {
        gsap.to(eOutter, {
            duration: 10,
            rotate: 360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(eOutter),
        });
    }


    /* ============================================
        cmc-gear scale-in + rotate timeline
    ============================================ */

    function cmcGear() {
        if (!cmcGearGroup) return null;

        const tl = gsap.timeline({ id: "cmcGear" });

        tl.from(cmcOutter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(cmcOutter),
            ease: "power2.out",
        })
        .from(cmcCenter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(cmcCenter),
            ease: "power2.out",
            onComplete: rotateCmcGear,
        }, "-=.5");

        return tl;
    }

    function rotateCmcGear() {
        gsap.to(cmcOutter, {
            duration: 8,
            rotate: -360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(cmcOutter),
        });
    }


    /* ============================================
        tox-gear scale-in + rotate timeline
    ============================================ */

    function toxGear() {
        if (!toxGearGroup) return null;

        const tl = gsap.timeline({ id: "toxGear" });

        tl.from(toxOutter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(toxOutter),
            ease: "power2.out",
        })
        .from(toxInner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(toxInner),
            ease: "power2.out",
            onComplete: rotateToxGear,
        }, "-=.5");

        return tl;
    }

    function rotateToxGear() {
        gsap.to(toxOutter, {
            duration: 9,
            rotate: -360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(toxOutter),
        });
    }


    /* ============================================
        eg1 scale-in + rotate timeline
    ============================================ */

    function eg1Gear() {
        if (!eg1Group) return null;

        const tl = gsap.timeline({ id: "eg1Gear" });

        tl.from(eg1Outter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eg1Outter),
            ease: "power2.out",
        })
        .from(eg1Inner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eg1Inner),
            ease: "power2.out",
        }, "-=.5")
        .from(eg1Lines, {
            duration: 0.8,
            scale: 0,
            svgOrigin: getOrigin(eg1Lines),
            ease: "power2.out",
            onComplete: rotateEg1,
        }, "-=.5");

        return tl;
    }

    function rotateEg1() {
        gsap.to(eg1Outter, {
            duration: 8,
            rotate: 360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(eg1Outter),
        });
        gsap.to(eg1Lines, {
            duration: 8,
            rotate: -360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(eg1Lines),
        });
    }


    /* ============================================
        clinical-gear scale-in + rotate timeline
    ============================================ */

    function clinicalGear() {
        if (!clinicalGearGroup) return null;

        const tl = gsap.timeline({ id: "clinicalGear" });

        tl.from(clinicalOutter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(clinicalOutter),
            ease: "power2.out",
        })
        .from(clinicalInner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(clinicalInner),
            ease: "power2.out",
            onComplete: rotateClinicalGear,
        }, "-=.5");

        return tl;
    }

    function rotateClinicalGear() {
        gsap.to(clinicalOutter, {
            duration: 7,
            rotate: 360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(clinicalOutter),
        });
    }


    /* ============================================
        eg2 scale-in + rotate timeline
    ============================================ */

    function eg2Gear() {
        if (!eg2Group) return null;

        const tl = gsap.timeline({ id: "eg2Gear" });

        tl.from(eg2Outer, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eg2Outer),
            ease: "power2.out",
        })
        .from(eg2Mid, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eg2Mid),
            ease: "power2.out",
        }, "-=.5")
        .from(eg2Inner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eg2Inner),
            ease: "power2.out",
        }, "-=.5")
        .to(eg2Group, {
            duration: 11,
            rotate: 360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(eg2Outer),
        });

        return tl;
    }


    /* ============================================
        doc-gear scale-in + rotate timeline
    ============================================ */

    function docGear() {
        if (!docGearGroup) return null;

        const tl = gsap.timeline({ id: "docGear" });

        tl.from(docPurple, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(docPurple),
            ease: "power2.out",
        })
        .from(docOutter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(docOutter),
            ease: "power2.out",
        }, "-=.5")
        .from(docInner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(docInner),
            ease: "power2.out",
        }, "-=.5")
        .from(docLines, {
            duration: 1,
            svgOrigin: getOrigin(docInner),
            scale: 0,
            ease: "power2.inOut",
            onComplete: rotateDocGear,
        }, "-=.3");

        return tl;
    }

    function rotateDocGear() {
        gsap.to(docOutter, {
            duration: 14,
            rotate: -360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(docOutter),
        });
        gsap.to(docLines, {
            duration: 14,
            rotate: 360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(docLines),
        });
    }


    /* ============================================
        glp-gear scale-in + rotate timeline
    ============================================ */

    function glpGear() {
        if (!glpGearGroup) return null;

        const tl = gsap.timeline({ id: "glpGear" });

        tl.from(glpOutter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(glpOutter),
            ease: "power2.out",
        })
        .from(glpInner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(glpInner),
            ease: "power2.out",
            onComplete: rotateGlpGear,
        }, "-=.5");

        return tl;
    }

    function rotateGlpGear() {
        gsap.to(glpOutter, {
            duration: 6,
            rotate: 360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(glpOutter),
        });
    }


    /* ============================================
        fda-gear scale-in + rotate timeline
        Note: apha was a typo — fixed to autoAlpha
    ============================================ */

    function fdaGear() {
        if (!fdaGearGroup) return null;

        const tl = gsap.timeline({ id: "fdaGear" });

        tl.from(fdaInner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(fdaInner),
            ease: "power2.out",
        })
        .from(fdaCircle, {
            scale: 0,
            autoAlpha: 0,
            duration: 1,
            svgOrigin: getOrigin(fdaInner),
            ease: "power2.inOut",
        }, "-=.3")
        .from(fdaCircleOutter, {
            scale: 0,
            autoAlpha: 0,
            duration: 1,
            svgOrigin: getOrigin(fdaInner),
            ease: "power2.inOut",
            onComplete: rotateFdaGear,
        }, "-=.7");

        return tl;
    }

    function rotateFdaGear() {
        gsap.to(fdaInner, {
            duration: 8,
            rotate: 360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(fdaInner),
        });
        gsap.to(fdaCircleOutter, {
            duration: 8,
            rotate: -360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(fdaCircleOutter),
        });
    }


    /* ============================================
        monitor-gear scale-in + rotate timeline
    ============================================ */

    function monitorGear() {
        if (!monitorGearGroup) return null;

        const tl = gsap.timeline({ id: "monitorGear" });

        tl.from(monitorOutter, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(monitorOutter),
            ease: "power2.out",
        })
        .from(monitorInner, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(monitorInner),
            ease: "power2.out",
            onComplete: rotateMonitorGear,
        }, "-=.5");

        return tl;
    }

    function rotateMonitorGear() {
        gsap.to(monitorOutter, {
            duration: 10,
            rotate: -360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(monitorOutter),
        });
    }


    /* ============================================
        eg3 scale-in + rotate timeline
    ============================================ */

    function eg3Anim() {
        if (!eg3Group) return null;

        const tl = gsap.timeline({ id: "eg3Anim" });

        tl.from(eg3Gear, {
            duration: 1,
            scale: 0,
            svgOrigin: getOrigin(eg3Gear),
            ease: "power2.out",
            onComplete: rotateEg3,
        });

        return tl;
    }

    function rotateEg3() {
        gsap.to(eg3Gear, {
            duration: 12,
            rotate: -360,
            repeat: -1,
            ease: "none",
            svgOrigin: getOrigin(eg3Gear),
        });
    }


    /* ============================================
        e-ring DrawSVG stagger timeline
    ============================================ */

    function eRings() {
        const rings = [eRingLeft, eRingBottom, eRingRight];
        const drawDuration  = 0.8;
        const holdDuration  = 0.4;
        const eraseDuration = 0.6;
        const staggerDelay  = 0.4;

        gsap.set(rings, { drawSVG: "0%" });

        const tl = gsap.timeline({ id: "eRings", repeat: -1, repeatDelay: 0.5 });

        rings.forEach((ring, i) => {
            const offset = i * staggerDelay;
            tl.to(ring, {
                drawSVG: "100%",
                duration: drawDuration,
                ease: "power2.inOut",
            }, offset);
            tl.to(ring, {
                drawSVG: "0%",
                duration: eraseDuration,
                ease: "power2.in",
            }, offset + drawDuration + holdDuration);
        });

        return tl;
    }


    /* ============================================
        Line animation helpers
    ============================================ */

    function line1() {
        if (!line1Group) return null;

        gsap.set(l1Line,  { drawSVG: "0%" });
        gsap.set(l1Start, { scale: 0, svgOrigin: getOrigin(l1Start) });
        gsap.set(l1End,   { scale: 0, svgOrigin: getOrigin(l1End) });

        const tl = gsap.timeline({ id: "line1" });

        tl.to(l1Start, { duration: 0.5, scale: 1, svgOrigin: getOrigin(l1Start), ease: "back.out(1.7)" })
          .to(l1Line,  { duration: 0.8, drawSVG: "100%", ease: "power2.inOut" }, "-=.1")
          .to(l1End,   { duration: 0.5, scale: 1, svgOrigin: getOrigin(l1End),   ease: "back.out(1.7)" }, "-=.1");

        return tl;
    }

    function line2() {
        if (!line2Group) return null;

        gsap.set(l2Line,  { drawSVG: "0%" });
        gsap.set(l2Start, { scale: 0, svgOrigin: getOrigin(l2Start) });
        gsap.set(l2End,   { scale: 0, svgOrigin: getOrigin(l2End) });

        const tl = gsap.timeline({ id: "line2" });

        tl.to(l2Start, { duration: 0.5, scale: 1, svgOrigin: getOrigin(l2Start), ease: "back.out(1.7)" })
          .to(l2Line,  { duration: 0.8, drawSVG: "100%", ease: "power2.inOut" }, "-=.1")
          .to(l2End,   { duration: 0.5, scale: 1, svgOrigin: getOrigin(l2End),   ease: "back.out(1.7)" }, "-=.1");

        return tl;
    }

    function lineArrow(id, group, line, top, bottom) {
        if (!group) return null;

        gsap.set(line,          { drawSVG: "0%" });
        gsap.set([top, bottom], { autoAlpha: 0 });

        const tl = gsap.timeline({ id });

        tl.to(line,         { duration: 0.8, drawSVG: "100%", ease: "power2.inOut" })
          .to([top, bottom], { duration: 0.3, autoAlpha: 1, ease: "power2.out" }, "-=.05");

        return tl;
    }

    function lineStartEnd(id, group, start, line, end) {
        if (!group) return null;

        gsap.set(line,  { drawSVG: "0%" });
        gsap.set(start, { scale: 0, svgOrigin: getOrigin(start) });
        gsap.set(end,   { scale: 0, svgOrigin: getOrigin(end) });

        const tl = gsap.timeline({ id });

        tl.to(start, { duration: 0.5, scale: 1, svgOrigin: getOrigin(start), ease: "back.out(1.7)" })
          .to(line,  { duration: 0.8, drawSVG: "100%", ease: "power2.inOut" }, "-=.1")
          .to(end,   { duration: 0.5, scale: 1, svgOrigin: getOrigin(end),   ease: "back.out(1.7)" }, "-=.1");

        return tl;
    }

    function line3()  { return lineArrow(    "line3",  line3Group,  l3Line,  l3Top,  l3Bottom);  }
    function line4()  { return lineArrow(    "line4",  line4Group,  l4Line,  l4Top,  l4Bottom);  }
    function line5()  { return lineStartEnd( "line5",  line5Group,  l5Start, l5Line, l5End);     }
    function line6()  { return lineStartEnd( "line6",  line6Group,  l6Start, l6Line, l6End);     }
    function line7()  { return lineStartEnd( "line7",  line7Group,  l7Start, l7Line, l7End);     }
    function line8()  { return lineArrow(    "line8",  line8Group,  l8Line,  l8Top,  l8Bottom);  }
    function line9()  { return lineArrow(    "line9",  line9Group,  l9Line,  l9Top,  l9Bottom);  }
    function line10() { return lineStartEnd( "line10", line10Group, l10Start, l10Line, l10End);  }
    function line11() { return lineStartEnd( "line11", line11Group, l11Start, l11Line, l11End);  }
    function line12() { return lineStartEnd( "line12", line12Group, l12Start, l12Line, l12End);  }
    function line13() { return lineArrow(    "line13", line13Group, l13Line, l13Top, l13Bottom); }
    function line14() { return lineStartEnd( "line14", line14Group, l14Start, l14Line, l14End);  }
    function line15() { return lineStartEnd( "line15", line15Group, l15Start, l15Line, l15End);  }
    function line16() { return lineStartEnd( "line16", line16Group, l16Start, l16Line, l16End);  }
    function line17() { return lineStartEnd( "line17", line17Group, l17Start, l17Line, l17End);  }
    function line18() { return lineStartEnd( "line18", line18Group, l18Start, l18Line, l18End);  }
    function line19() { return lineStartEnd( "line19", line19Group, l19Start, l19Line, l19End);  }
    function line20() { return lineStartEnd( "line20", line20Group, l20Start, l20Line, l20End);  }
    function line21() { return lineStartEnd( "line21", line21Group, l21Start, l21Line, l21End);  }
    function line22() { return lineArrow(    "line22", line22Group, l22Line, l22Top, l22Bottom); }


    /* ============================================
        Master timeline
    ============================================ */

    const LINES_DELAY = 2;
    const CMC_AFTER   = 2;

    const master = gsap.timeline({ id: "gearsMaster", paused: true });

    [
        eGear(),
        cmcGear(),
        toxGear(),
        eg1Gear(),
        clinicalGear(),
        eg2Gear(),
        docGear(),
        glpGear(),
        fdaGear(),
        monitorGear(),
        eRings(),
    ]
    .filter(Boolean)
    .forEach((tl, i) => master.add(tl, i * 0.5));

    const eg3Tl = eg3Anim();
    if (eg3Tl) master.add(eg3Tl, CMC_AFTER);

    const line1Tl = line1();
    if (line1Tl) master.add(line1Tl, LINES_DELAY);

    [
        line2(),  line3(),  line4(),  line5(),  line6(),
        line7(),  line8(),  line9(),  line10(), line11(),
        line12(), line13(), line14(), line15(), line16(),
        line17(), line18(), line19(), line20(), line21(),
        line22(),
    ]
    .filter(Boolean)
    .forEach((tl, i) => master.add(tl, LINES_DELAY + ((i + 1) * 0.3)));

    return master;

}
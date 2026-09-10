import { gsap } from "../gsap-setup.js";

/* ============================================================================
   SUB-MODULAR — CTD Pyramid Animation
   ----------------------------------------------------------------------------
   Narrative arc (mirrors how a CTD dossier is actually assembled):

     1. FOUNDATION  — Module 3/4/5 data bands sweep in at the base
     2. SYNTHESIS   — Module 2 summary bands layer on top
     3. CAPSTONE    — Module 1 administrative band completes the pyramid
     4. THE COLUMN  — the cross-cutting Module 4/5 column descends through
                      the structure (the "aha" beat), divider line draws,
                      column labels settle in
     5. ALIVE       — a light sheen periodically sweeps the pyramid, the
                      column breathes, and the layers respond to the cursor
                      with depth parallax

   Technique notes:
   - The color bands are far wider than the viewBox and sit behind a triangle
     mask. Sliding them horizontally produces a wipe that always preserves
     the pyramid silhouette — no clip-path animation needed.
   - Only transforms + opacity are animated (compositor-friendly).
   - The divider line is drawn with stroke-dashoffset, so there is no
     dependency on DrawSVGPlugin for this module.
   - Honors prefers-reduced-motion: jumps straight to the resting state.
   ========================================================================== */

export function initSubModular() {
    const section = document.querySelector("#modular-container");
    if (!section) return;

    const svg = section.querySelector("svg");
    const q = gsap.utils.selector(svg);

    /* ------------------------------------------------------------------
       Element registry
       (several ids contain spaces, so attribute selectors are required)
    ------------------------------------------------------------------ */
    const els = {
        pyramid: q("#modular"),

        // Color bands, listed bottom-of-pyramid → top (build order)
        bands: [
            q("#m345-color, #m345-color-top")[0] && q("#module-3-5 > [id^='m345']"),
            q("#mb2-color"),
            q("#m2-color"),
            q("#mb1-color"),
            q("#m1-color"),
        ],

        // Big module labels
        moduleLabels: q(
            "[id='Module 2'], [id='Module 3'], [id='Module 4'], [id='Module 5'], #m1-text"
        ),

        // Supporting detail text inside the bands
        detailText: q(
            "[id='Clinical study reports'], [id='Nonclinical study reports'], " +
            "[id='Quality data'], [id='Clinical overview'], [id='Clinical summary'], " +
            "[id='Quality overall summary'], #mb1-text"
        ),

        // The vertical Module 4/5 column (the hero detail)
        columnSegments: q("#color-4-middle, #color-5-top, #color-5-bottom"),
        columnText: q("[id='Nonclinical summary'], [id='Nonclinical overview']"),
        divideLine: q("#divide-line")[0],

        // Parallax depth groups (top of pyramid = nearest = moves most)
        depthLayers: [
            { targets: q("#module-1, #module-1-bottom"), depth: 1.0 },
            { targets: q("#module-2, #module-2-bottom"), depth: 0.65 },
            { targets: q("#module-3-5"), depth: 0.35 },
            {
                targets: q("[id='Nonclinical summary'], [id='Nonclinical overview'], #divide-line"),
                depth: -0.4, // counter-moves slightly for depth separation
            },
        ],
    };

    /* ------------------------------------------------------------------
       Sheen — a soft diagonal light sweep created at runtime and injected
       inside the masked pyramid group so it conforms to the silhouette
    ------------------------------------------------------------------ */
    const sheen = createSheen(svg);

    /* ------------------------------------------------------------------
       Initial state — everything staged before the curtain rises
    ------------------------------------------------------------------ */
    const BAND_OFFSETS = [-520, 520, -440, 440, -380]; // alternate wipe directions

    function setInitialState() {
        gsap.set(svg, { autoAlpha: 1 }); // svg itself is revealed; children are staged
        gsap.set(els.pyramid, { transformOrigin: "50% 100%", scale: 0.97 });

        els.bands.forEach((band, i) => {
            gsap.set(band, { x: BAND_OFFSETS[i], autoAlpha: 0 });
        });

        gsap.set(els.moduleLabels, {
            autoAlpha: 0,
            y: 14,
            scale: 0.96,
            transformOrigin: "50% 50%",
        });
        gsap.set(els.detailText, { autoAlpha: 0, y: 8 });

        gsap.set(els.columnSegments, {
            scaleY: 0,
            transformOrigin: "50% 0%", // grows downward, like a column descending
        });
        gsap.set(els.columnText, { autoAlpha: 0, y: 10 });

        // Stage the divider line for a stroke draw
        if (els.divideLine) {
            const len = els.divideLine.getTotalLength();
            gsap.set(els.divideLine, {
                strokeDasharray: len,
                strokeDashoffset: len,
            });
        }

        gsap.set(sheen.rect, { x: -380, autoAlpha: 0 });
    }

    /* ------------------------------------------------------------------
       ACT I–IV: the entrance timeline
    ------------------------------------------------------------------ */
    function buildIntro() {
        const tl = gsap.timeline({
            defaults: { ease: "power4.out" },
            onComplete: startIdle,
        });

        // The whole structure settles upward as it builds — a slow, confident rise
        tl.to(els.pyramid, { scale: 1, duration: 2.4, ease: "power2.inOut" }, 0);

        // ACT I–III — bands wipe in through the triangle mask, bottom-up.
        // Alternating directions + decreasing travel = a weaving, layered build.
        els.bands.forEach((band, i) => {
            tl.to(
                band,
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 1.1,
                    ease: "expo.out",
                },
                0.12 + i * 0.16 // tight overlap keeps momentum high
            );
        });

        // Module labels pop with a soft overshoot, cascading up the pyramid
        tl.to(
            els.moduleLabels,
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },
            0.95
        );

        // Supporting copy drifts in quietly underneath the labels
        tl.to(
            els.detailText,
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
            },
            1.25
        );

        // ACT IV — the column descends through the structure (the hero beat)
        tl.to(
            els.columnSegments,
            {
                scaleY: 1,
                duration: 0.85,
                stagger: 0.12, // top segment leads, lower segments chase it down
                ease: "power3.inOut",
            },
            1.55
        );

        // Divider line draws across the column
        if (els.divideLine) {
            tl.to(
                els.divideLine,
                { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
                2.15
            );
        }

        // Column labels land last — the eye ends on the detail that matters
        tl.to(
            els.columnText,
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            },
            2.25
        );

        // A single celebratory sheen sweep to close the entrance
        tl.add(sheen.sweep(), 2.6);

        return tl;
    }

    /* ------------------------------------------------------------------
       ACT V: resting-state micro-interactions
    ------------------------------------------------------------------ */
    let idleTl;

    function startIdle() {
        idleTl = gsap.timeline({ repeat: -1, repeatDelay: 5.5 });

        // Periodic sheen keeps the surface feeling lit and alive
        idleTl.add(sheen.sweep());

        // The column gently breathes — barely perceptible, but it reads as "on"
        gsap.to([els.columnSegments, els.columnText, els.divideLine], {
            y: "+=3",
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    }

    /* ------------------------------------------------------------------
       Cursor depth parallax — layers shift at different rates, the column
       counter-moves, and everything eases back to center on leave.
       quickTo keeps this allocation-free on mousemove.
    ------------------------------------------------------------------ */
    function initParallax() {
        const MAX_SHIFT = 9; // in SVG user units, so it scales with the artwork

        const movers = els.depthLayers.map(({ targets, depth }) => ({
            x: gsap.quickTo(targets, "x", { duration: 0.9, ease: "power3.out" }),
            depth,
        }));

        section.addEventListener("mousemove", (e) => {
            const r = section.getBoundingClientRect();
            const nx = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1 … 1
            movers.forEach((m) => m.x(nx * MAX_SHIFT * m.depth));
        });

        section.addEventListener("mouseleave", () => {
            movers.forEach((m) => m.x(0));
        });
    }

    /* ------------------------------------------------------------------
       Sheen factory — gradient + rect injected into the masked group
    ------------------------------------------------------------------ */
    function createSheen(svgEl) {
        const NS = "http://www.w3.org/2000/svg";
        const defs = svgEl.querySelector("defs");

        const grad = document.createElementNS(NS, "linearGradient");
        grad.setAttribute("id", "sheen-grad");
        grad.setAttribute("x1", "0");
        grad.setAttribute("x2", "1");
        [
            ["0", "0"],
            ["0.5", "0.22"],
            ["1", "0"],
        ].forEach(([offset, opacity]) => {
            const stop = document.createElementNS(NS, "stop");
            stop.setAttribute("offset", offset);
            stop.setAttribute("stop-color", "#ffffff");
            stop.setAttribute("stop-opacity", opacity);
            grad.appendChild(stop);
        });
        defs.appendChild(grad);

        const rect = document.createElementNS(NS, "rect");
        rect.setAttribute("x", "-160");
        rect.setAttribute("y", "0");
        rect.setAttribute("width", "260");
        rect.setAttribute("height", "588");
        rect.setAttribute("fill", "url(#sheen-grad)");
        rect.setAttribute("transform", "skewX(-18)");
        rect.style.pointerEvents = "none";

        // Append inside the masked group so the sweep hugs the pyramid shape
        svgEl.querySelector("[mask]").appendChild(rect);

        return {
            rect,
            sweep() {
                return gsap.fromTo(
                    rect,
                    { x: -380, autoAlpha: 0 },
                    {
                        x: 1100,
                        autoAlpha: 1,
                        duration: 1.6,
                        ease: "power2.inOut",
                        // fade the sheen out as it exits the right edge
                        onUpdate() {
                            if (this.progress() > 0.75) {
                                gsap.set(rect, {
                                    autoAlpha: 1 - (this.progress() - 0.75) * 4,
                                });
                            }
                        },
                    }
                );
            },
        };
    }

    /* ------------------------------------------------------------------
       Boot — respects reduced motion, plays once the SVG scrolls into view
    ------------------------------------------------------------------ */
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
        // Skip straight to the finished composition — no motion, full content
        gsap.set(svg, { autoAlpha: 1 });
        gsap.set(
            [els.moduleLabels, els.detailText, els.columnText, ...els.bands],
            { autoAlpha: 1, x: 0, y: 0, scale: 1 }
        );
        gsap.set(els.columnSegments, { scaleY: 1 });
        if (els.divideLine) gsap.set(els.divideLine, { strokeDashoffset: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
        setInitialState();

        // Play the entrance when the pyramid actually enters the viewport
        const intro = buildIntro().pause();
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    intro.play();
                    io.disconnect();
                }
            },
            { threshold: 0.35 }
        );
        io.observe(section);

        initParallax();

        // matchMedia cleanup if conditions ever change
        return () => {
            intro.kill();
            idleTl && idleTl.kill();
            io.disconnect();
        };
    });
}
import { gsap } from "../gsap-setup.js";

export function initHeader() {
    const burgerBtn = document.querySelector("#burgerBtn");
    const mainNav = document.querySelector("#mainNav");
    const navItems = mainNav.querySelectorAll("li");
    const navLinks = mainNav.querySelectorAll("a");
    const topLine = document.querySelector("#top");
    const bottomLine = document.querySelector("#bottom");
    const middleLine = document.querySelector("#middle");
    const indicator = document.querySelector("#nav-indicator");

    const desktopMQ = window.matchMedia("(min-width: 992px)");

    let isMenuOpen = false;
    let activeLink = null;
    let scrollUpdateQueued = false;

    // ─── Burger icon timeline ────────────────────────────────────────────────
    const burgerTl = gsap.timeline({ paused: true });
    gsap.set(topLine, { transformOrigin: "center center" });
    gsap.set(bottomLine, { transformOrigin: "center center" });

    burgerTl
        .to(middleLine, { duration: 0.4, scaleX: 0 })
        .to(topLine, { duration: 0.4, y: 8, rotation: 45, transformOrigin: "center center" }, "<")
        .to(bottomLine, { duration: 0.4, y: -9, rotation: -45, transformOrigin: "center center" }, "<");

    // ─── Nav indicator ───────────────────────────────────────────────────────
    function moveIndicatorTo(el, animate = true) {
        if (!el || !desktopMQ.matches) return;

        const navRect = mainNav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        const targetLeft = elRect.left - navRect.left;
        const targetWidth = elRect.width;

        if (animate) {
            gsap.to(indicator, {
                left: targetLeft,
                width: targetWidth,
                opacity: 1,
                duration: 0.35,
                ease: "power3.out",
            });
        } else {
            gsap.set(indicator, {
                left: targetLeft,
                width: targetWidth,
                opacity: 1,
            });
        }

        activeLink = el;
    }

    function hideIndicator() {
        gsap.to(indicator, { opacity: 0, duration: 0.2 });
        activeLink = null;
    }

    // ─── Click handling ──────────────────────────────────────────────────────
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            moveIndicatorTo(link);

            if (!desktopMQ.matches && isMenuOpen) {
                closeMenu();
            }
        });
    });

    const contactBtn = document.querySelector(".contact-btn");
    if (contactBtn) {
        contactBtn.addEventListener("click", () => {
            if (!desktopMQ.matches && isMenuOpen) {
                closeMenu();
            }
        });
    }

    // ─── Scroll-based active link via IntersectionObserver ───────────────────
    // Map each section id → its nav link.
    // #home is intentionally excluded from the observer because it is
    // position:fixed (parallax) and never leaves the viewport, which causes
    // it to fire at the wrong time. It is handled separately via scrollY.
    const sectionLinkMap = new Map();
    let homeLink = null;

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const sectionId = href.slice(1);
        if (sectionId === "home") {
            homeLink = link;
            return; // skip — handled by scroll listener below
        }
        const section = document.getElementById(sectionId);
        if (section) sectionLinkMap.set(section, link);
    });

    const observerOptions = {
        root: null,
        // Fires when a section crosses the upper-middle of the viewport
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        // Ignore scroll updates while the user is actively clicking
        if (scrollUpdateQueued) return;

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const link = sectionLinkMap.get(entry.target);
                if (link && link !== activeLink) {
                    moveIndicatorTo(link);
                }
            }
        });
    }, observerOptions);

    sectionLinkMap.forEach((_, section) => sectionObserver.observe(section));

    // #home: activate only when the user is truly at the top of the page.
    // A small threshold accounts for subpixel scroll values.
    const HOME_THRESHOLD = 80;

    window.addEventListener("scroll", () => {
        if (scrollUpdateQueued || !homeLink || !desktopMQ.matches) return;
        if (window.scrollY <= HOME_THRESHOLD && activeLink !== homeLink) {
            moveIndicatorTo(homeLink);
        }
    }, { passive: true });

    // Brief lock after click so scroll observer doesn't immediately override
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            scrollUpdateQueued = true;
            setTimeout(() => { scrollUpdateQueued = false; }, 800);
        });
    });

    // ─── Resize: reposition indicator without animation ──────────────────────
    window.addEventListener("resize", () => {
        if (activeLink && desktopMQ.matches) {
            moveIndicatorTo(activeLink, false);
        }
    });

    // ─── Mobile / desktop state ──────────────────────────────────────────────
    function openMenu() {
        isMenuOpen = true;

        burgerTl.play();

        gsap.set(mainNav, { height: 0 });
        gsap.set(navItems, { x: 40, opacity: 0 });

        gsap.to(mainNav, {
            height: "auto",
            duration: 0.5,
            ease: "power3.inOut",
        });

        gsap.to(navItems, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.07,
            delay: 0.2,
        });
    }

    function closeMenu() {
        isMenuOpen = false;

        burgerTl.reverse();

        gsap.to(navItems, {
            x: 40,
            opacity: 0,
            duration: 0.2,
            ease: "power3.in",
            stagger: 0.04,
        });

        gsap.to(mainNav, {
            height: 0,
            duration: 0.4,
            ease: "power3.inOut",
        });
    }

    function setMobileState() {
        if (!desktopMQ.matches) {
            gsap.set(mainNav, { height: 0 });
            gsap.set(navItems, { x: 40, opacity: 0 });
            hideIndicator();
        } else {
            gsap.set(mainNav, { clearProps: "all" });
            gsap.set(navItems, { clearProps: "all" });
            burgerTl.pause(0);
            // Re-draw indicator for whichever link is active
            if (activeLink) moveIndicatorTo(activeLink, false);
        }
    }

    setMobileState();

    desktopMQ.addEventListener("change", () => {
        isMenuOpen = false;
        setMobileState();
    });

    burgerBtn.addEventListener("click", () => {
        if (!isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    });
}
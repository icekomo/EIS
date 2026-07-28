import { gsap } from "../gsap-setup.js";

export function initBioModal() {
/* ============================================
           Bio Modal
============================================ */

    const overlay = document.getElementById("bio-overlay");
    const closeBtn = document.getElementById("bio-close-btn");

    // --- Tags in bio-modal.kit that get populated ---
    const modalName  = document.getElementById("bio-name");
    const modalTitle = document.getElementById("bio-title");
    const modalP1    = document.getElementById("bio-p-1");
    const modalP2    = document.getElementById("bio-p-2");
    const modalP3    = document.getElementById("bio-p-3");
    const modalP4    = document.getElementById("bio-p-4");

    // --- Load & cache bios.xml ---
    let bioData = {};

    function getText(person, tag) {
        const el = person.getElementsByTagName(tag)[0];
        return el ? el.textContent : "";
    }

    fetch("xml/bios.xml")
        .then(function(res) { return res.text(); })
        .then(function(text) {
            const xml = new DOMParser().parseFromString(text, "application/xml");


            const parseError = xml.querySelector("parsererror");
            if (parseError) {
                console.error("XML parse error:", parseError.textContent);
                return;
            }


            const people = xml.querySelectorAll("person");
            people.forEach(function(person) {
                const id = person.getAttribute("id");
                bioData[id] = {
                    name:  getText(person, "name"),
                    title: getText(person, "title"),
                    p1:    getText(person, "p1"),
                    p2:    getText(person, "p2"),
                    p3:    getText(person, "p3"),
                    p4:    getText(person, "p4"),
                };
            });
            console.log("bioData loaded:", bioData);
        });

    // --- Populate modal from cached data ---
    function populateBio(id) {
        const bio = bioData[id];
        if (!bio) return;

        modalName.textContent  = bio.name;
        modalTitle.textContent = bio.title;
        modalP1.textContent    = bio.p1;
        modalP2.textContent    = bio.p2;
        modalP3.textContent    = bio.p3;
        modalP4.textContent    = bio.p4;
    }

    // --- Open / close ---
    function openBio() {
        gsap.set(overlay, { display: "block" });
        gsap.fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
    }

    function closeBio() {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: function() { gsap.set(overlay, { display: "none" }); }
        });
    }

    // --- Trigger — event delegation handles buttons regardless of DOM timing ---
    document.addEventListener("click", function(e) {
        const btn = e.target.closest(".read-bio-btn");
        if (!btn) return;
        e.stopPropagation();
        populateBio(btn.dataset.bio);
        openBio();
    });

    closeBtn.addEventListener("click", closeBio);

    overlay.addEventListener("click", function(e) {
        if (e.target === overlay) closeBio();
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeBio();
    });
}
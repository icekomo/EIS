import { initBurger } from "./modules/burger.js";
import { initHeader } from "./modules/header.js";
import { initProjectsList } from "./modules/projects-list.js";
import { initProjectDetail } from "./modules/project-detail.js";
// import { initCardflip } from "./modules/card-flip.js";
// import { initContact } from "./modules/contact.js";
// import { initSlideshow } from "./modules/slideshow.js";
// import { initBioModal } from "./modules/bio-modal.js";
// import { initGetStarted } from "./modules/get-started.js";
// import { initScrollTrigger } from "./modules/scrollTrigger.js";
// import { initHomeTitles } from "./modules/home-titles.js";

document.addEventListener("DOMContentLoaded", () => {
    initBurger();
    initHeader();

    // Page guards — only run on the page that has the matching markup,
    // same as this file conditionally wiring up any other page module.
    if (document.getElementById("project-container")) {
        initProjectsList();
    }

    if (document.getElementById("project-detail-hero")) {
        initProjectDetail();
    }
});

import { getProjectBySlug } from "./project-loader.js";
import { GLightbox } from "../glightbox-setup.js";

/* ============================================
           Project Detail (project-detail.html)
   Reads ?project=<slug> from the URL and
   populates the template from projects.xml,
   including the page's SEO meta tags.
============================================ */

// Reused across page loads so a second populateProject() call (shouldn't
// normally happen — one project per page load — but keep it safe) tells
// GLightbox to rescan instead of creating duplicate instances.
let galleryLightbox = null;

function getSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("project");
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "";
}

function setBackgroundImage(el, url) {
    if (!el) return;
    if (url) {
        el.style.backgroundImage = "url('" + url + "')";
        el.style.display = "";
    } else {
        // No image for this slot (e.g. project has fewer gallery
        // photos than the template has tiles) — hide the tile.
        el.style.display = "none";
    }
}

// Gallery tiles get the same background-image treatment as the other
// image slots, plus a full-tile <a class="glightbox"> overlay so the
// tile opens the lightbox on click. See css/_projectdetailcontent.scss
// (#gallery ul li a.glightbox) for the overlay/hover styling.
function setGalleryTile(li, url) {
    if (!li) return;

    li.innerHTML = "";

    if (!url) {
        li.style.display = "none";
        li.style.backgroundImage = "";
        return;
    }

    li.style.display = "";
    li.style.backgroundImage = "url('" + url + "')";

    const link = document.createElement("a");
    link.className = "glightbox";
    link.href = url;
    link.setAttribute("data-gallery", "project-gallery");
    link.setAttribute("aria-label", "View larger image");

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-magnifying-glass";
    link.appendChild(icon);

    li.appendChild(link);
}

// GLightbox itself is loaded separately (see the <script>/<link> tags in
// project-detail.html) rather than imported here, so this only runs if
// it actually loaded — the gallery still works as a plain image grid
// without it, it just won't open a lightbox on click.
function initGalleryLightbox() {
    if (typeof GLightbox !== "function") {
        console.warn("GLightbox isn't loaded — gallery tiles won't open in a lightbox.");
        return;
    }

    if (galleryLightbox) {
        galleryLightbox.reload();
        return;
    }

    galleryLightbox = GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
    });
}

function buildIconList(container, items) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach(function (text) {
        const li = document.createElement("li");
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-hexagon-check";
        li.appendChild(icon);
        li.appendChild(document.createTextNode(text));
        container.appendChild(li);
    });
}

function setMeta(selector, content) {
    if (!content) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute("content", content);
}

function populateSEO(project) {
    const seo = project.seo || {};
    const fallbackImage = seo.ogImage || project.heroImage || project.cardImage;

    const title = seo.title || project.title + " | Elite Industrial Services";
    if (title) document.title = title;

    setMeta('meta[name="title"]', title);
    setMeta('meta[name="description"]', seo.description || project.description);
    setMeta('meta[name="keywords"]', seo.keywords);

    setMeta('meta[property="og:title"]', seo.ogTitle || title);
    setMeta('meta[property="og:description"]', seo.ogDescription || seo.description || project.description);
    setMeta('meta[property="og:image"]', fallbackImage);

    setMeta('meta[name="twitter:title"]', seo.twitterTitle || title);
    setMeta('meta[name="twitter:description"]', seo.twitterDescription || seo.description || project.description);
    setMeta('meta[name="twitter:image"]', seo.twitterImage || fallbackImage);

    if (seo.canonical) {
        const canonicalEl = document.querySelector('link[rel="canonical"]');
        if (canonicalEl) canonicalEl.setAttribute("href", seo.canonical);

        setMeta('meta[property="og:url"]', seo.canonical);
        setMeta('meta[name="twitter:url"]', seo.canonical);
    }
}

function populateProject(project) {
    setText("project-category", project.category);
    setText("project-date", project.dateCompleted);
    setText("project-title", project.title);
    setText("project-description", project.description);
    setText("client-name", project.client);
    setText("client-location", project.location);
    setText("project-type", project.service);
    setText("project-timeframe", project.duration);

    setBackgroundImage(document.getElementById("project-hero-right"), project.heroImage);

    setText("overview-text", project.overview);

    setText("challenge-text", project.challenge.text);
    setBackgroundImage(document.getElementById("challenge-1"), project.challenge.images[0]);
    setBackgroundImage(document.getElementById("challenge-2"), project.challenge.images[1]);

    setText("solution-text", project.solution.text);
    buildIconList(document.getElementById("solution-list"), project.solution.items);

    setText("result-text", project.result.text);

    for (let i = 1; i <= 6; i++) {
        setGalleryTile(document.getElementById("gallery-" + i), project.gallery[i - 1]);
    }
    initGalleryLightbox();

    buildIconList(document.getElementById("achievements-list"), project.achievements);

    populateSEO(project);
}

export function initProjectDetail() {
    const slug = getSlugFromURL();

    if (!slug) {
        window.location.href = "projects.html";
        return;
    }

    getProjectBySlug(slug).then(function (project) {
        if (!project) {
            console.error('No project found for slug "' + slug + '"');
            window.location.href = "projects.html";
            return;
        }
        populateProject(project);
    });
}
import { loadProjects } from "./project-loader.js";

/* ============================================
    Projects Grid (projects.html)
   Builds every project card from projects.xml.
============================================ */

function buildCard(project) {
    const li = document.createElement("li");
    li.id = "project-" + project.id;

    const hero = document.createElement("div");
    hero.className = "project-hero";
    if (project.cardImage) {
        hero.style.backgroundImage = "url('" + project.cardImage + "')";
    }

    const details = document.createElement("div");
    details.className = "details";
    details.innerHTML =
        '<h4 class="green-pill">' + project.category + "</h4>" +
        '<h4 class="year">' + project.year + "</h4>";

    const heading = document.createElement("h2");
    heading.textContent = project.title;

    const summary = document.createElement("p");
    summary.textContent = project.summary;

    // Button lives in its own footer wrapper so it can be pinned to the
    // bottom-left of the card in CSS, no matter how long the title/summary
    // above it run — see #project-content .card-footer in the SCSS.
    const footer = document.createElement("div");
    footer.className = "card-footer";

    const link = document.createElement("a");
    link.href = "project-detail.html?project=" + encodeURIComponent(project.id);
    link.className = "project-btn";
    link.textContent = "View Project";

    footer.appendChild(link);

    li.appendChild(hero);
    li.appendChild(details);
    li.appendChild(heading);
    li.appendChild(summary);
    li.appendChild(footer);

    return li;
}

export function initProjectsList() {
    const list = document.querySelector("#project-container ul");
    if (!list) return;

    loadProjects().then(function (projects) {
        list.innerHTML = "";
        projects.forEach(function (project) {
            list.appendChild(buildCard(project));
        });
    });
}
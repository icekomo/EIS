/* ============================================
           Project Loader
   Fetches + parses xml/projects.xml once, caches
   the result, and hands back plain JS objects.
   Same fetch -> DOMParser -> cache pattern as
   bio-modal.js's bios.xml loader.
============================================ */

let projectsPromise = null;

function getText(node, tag) {
    if (!node) return "";
    const el = node.getElementsByTagName(tag)[0];
    return el ? el.textContent.trim() : "";
}

function getItems(node, tag) {
    if (!node) return [];
    return Array.from(node.getElementsByTagName(tag)).map(function (el) {
        return el.textContent.trim();
    });
}

function parseProject(node) {
    const challengeNode = node.getElementsByTagName("challenge")[0];
    const solutionNode = node.getElementsByTagName("solution")[0];
    const resultNode = node.getElementsByTagName("result")[0];
    const galleryNode = node.getElementsByTagName("gallery")[0];
    const achievementsNode = node.getElementsByTagName("achievements")[0];
    const seoNode = node.getElementsByTagName("seo")[0];

    return {
        id: node.getAttribute("id"),
        category: getText(node, "category"),
        year: getText(node, "year"),
        dateCompleted: getText(node, "dateCompleted"),
        title: getText(node, "title"),
        summary: getText(node, "summary"),
        description: getText(node, "description"),
        client: getText(node, "client"),
        location: getText(node, "location"),
        service: getText(node, "service"),
        duration: getText(node, "duration"),
        cardImage: getText(node, "cardImage"),
        heroImage: getText(node, "heroImage"),
        overview: getText(node, "overview"),
        challenge: {
            text: getText(challengeNode, "p"),
            images: getItems(challengeNode, "image"),
        },
        solution: {
            text: getText(solutionNode, "p"),
            items: getItems(solutionNode, "item"),
        },
        result: {
            text: getText(resultNode, "p"),
        },
        gallery: getItems(galleryNode, "image"),
        achievements: getItems(achievementsNode, "item"),
        seo: seoNode
            ? {
                  title: getText(seoNode, "title"),
                  description: getText(seoNode, "description"),
                  keywords: getText(seoNode, "keywords"),
                  canonical: getText(seoNode, "canonical"),
                  ogTitle: getText(seoNode, "ogTitle"),
                  ogDescription: getText(seoNode, "ogDescription"),
                  ogImage: getText(seoNode, "ogImage"),
                  twitterTitle: getText(seoNode, "twitterTitle"),
                  twitterDescription: getText(seoNode, "twitterDescription"),
                  twitterImage: getText(seoNode, "twitterImage"),
              }
            : null,
    };
}

// --- Load & cache projects.xml (fetched once no matter how many
//     functions call loadProjects()) ---
export function loadProjects() {
    if (projectsPromise) return projectsPromise;

    projectsPromise = fetch("xml/projects.xml")
        .then(function (res) { return res.text(); })
        .then(function (text) {
            const xml = new DOMParser().parseFromString(text, "application/xml");

            const parseError = xml.querySelector("parsererror");
            if (parseError) {
                console.error("XML parse error:", parseError.textContent);
                return [];
            }

            const projectNodes = xml.querySelectorAll("project");
            const projects = Array.from(projectNodes).map(parseProject);
            console.log("projects loaded:", projects);
            return projects;
        });

    return projectsPromise;
}

export function getProjectBySlug(slug) {
    return loadProjects().then(function (projects) {
        return projects.find(function (p) { return p.id === slug; }) || null;
    });
}

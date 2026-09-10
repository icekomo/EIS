/* ============================================
           GLightbox Setup
   GLightbox loads as a plain global via a
   <script src="js/glightbox.min.js"> tag in the
   HTML (see project-detail.html) rather than as
   an installed npm package — it isn't in
   node_modules, so it can't be imported by
   specifier the way gsap-setup.js imports "gsap".

   If we did `import GLightbox from "glightbox"`
   directly, CodeKit's bundler would treat
   "glightbox" as an unresolved external (same as
   it already does for gsap's own submodules — see
   the build log) and guess its global variable
   name from the package name itself: "glightbox",
   all lowercase. That guess would be wrong — the
   library actually exposes `window.GLightbox`
   (capital G, capital L). GSAP's guessed names
   happen to be correct because GreenSock's real
   globals (gsap, ScrollTrigger, etc.) match their
   package/submodule names exactly; GLightbox's
   doesn't, so the same trick would silently call
   a function that doesn't exist.

   Reading it off `window` here sidesteps the guess
   entirely, and gives project-detail.js a real
   local import to satisfy ESLint's no-undef rule.
============================================ */

export const GLightbox = typeof window !== "undefined" ? window.GLightbox : undefined;
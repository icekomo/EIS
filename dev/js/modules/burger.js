import { gsap } from "../gsap-setup.js";

export function initBurger() {
    const burgerBtn = document.querySelector("#burgerBtn");
    const mainNav = document.querySelector("#mainNav");
    const topLine = document.querySelector("#top");
    const bottomLine = document.querySelector("#bottom");
    const middleLine = document.querySelector("#middle");

    const mm = gsap.matchMedia();

    mm.add("(max-width: 991px)", () => {
        var menuisHidden = true;

        gsap.set(mainNav, { x: "100vw" });
        gsap.set(topLine, { transformOrigin: "center center" });
        gsap.set(bottomLine, { transformOrigin: "center center" });

        const burgerTl = gsap.timeline({ paused: true });
        burgerBtn.addEventListener("click", openCloseMenu);

        burgerTl
            .to(middleLine, { duration: 0.4, scaleX: 0 })
            .to(
                topLine,
                {
                    duration: 0.4,
                    y: 8,
                    rotation: 45,
                    transformOrigin: "center center"
                },
                "<"
            )
            .to(
                bottomLine,
                {
                    duration: 0.4,
                    y: -9,
                    rotation: -45,
                    transformOrigin: "center center"
                },
                "<"
            );

        function openCloseMenu() {
            if (menuisHidden == true) {
                burgerTl.play();

                //show menu
                gsap.to(mainNav, {
                    x: "0",
                    duration: 0.4,
                    ease: "power2.out"
                });
                menuisHidden = false;
                console.log("show menu");
            } else {
                burgerTl.reverse();

                // hide menu
                gsap.to(mainNav, {
                    x: "100vw",
                    duration: 0.35,
                    ease: "power2.in"
                });
                menuisHidden = true;
                console.log("hide menu");
            }
        }
    });
}

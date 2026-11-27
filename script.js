"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

const mechanismDemo = document.querySelector("#mechanism-demo");
const mechanismToggle = document.querySelector(".mechanism-toggle");

if (mechanismDemo && mechanismToggle) {
  mechanismToggle.addEventListener("click", () => {
    const isRunning = mechanismToggle.getAttribute("aria-pressed") !== "true";
    mechanismToggle.setAttribute("aria-pressed", String(isRunning));
    mechanismDemo.classList.toggle("is-running", isRunning);
    mechanismToggle.firstChild.textContent = isRunning ? "Stop rotation " : "Rotate bucket ";
  });
}

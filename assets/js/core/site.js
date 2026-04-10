export function initSiteChrome() {
    initMenuToggle();
    initActiveNav();
}

export function startClock(selector = ".js-clock") {
    const clock = document.querySelector(selector);

    if (!clock) {
        return;
    }

    const update = () => {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString("en-GB");
    };

    update();
    window.setInterval(update, 1000);
}

export function rotateMessages(selector, messages, interval = 2200) {
    const target = document.querySelector(selector);

    if (!target || !messages.length) {
        return;
    }

    let index = 0;
    target.textContent = messages[index];

    window.setInterval(() => {
        index = (index + 1) % messages.length;
        target.textContent = messages[index];
    }, interval);
}

function initMenuToggle() {
    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (!button || !nav) {
        return;
    }

    button.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
    });
}

function initActiveNav() {
    const page = document.body.dataset.page;
    const links = document.querySelectorAll("[data-nav]");

    if (!page || !links.length) {
        return;
    }

    links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const isHome = page === "home" && href.endsWith("index.html");
        const isMatch = href.includes(`${page}.html`);
        link.classList.toggle("is-active", isHome || isMatch);
    });
}

console.log("js loaded");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.2
});

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((el) => observer.observe(el));

const products = {
    men: [
        { name: "MEN EDITION 01", img: "향수샘플.jpg" },
        { name: "MEN EDITION 02", img: "향수샘플.jpg" },
        { name: "MEN EDITION 03", img: "향수샘플.jpg" },
        { name: "MEN EDITION 04", img: "향수샘플.jpg" }
    ],
    women: [
        { name: "WOMEN EDITION 01", img: "green.jpg" },
        { name: "WOMEN EDITION 02", img: "green.jpg" },
        { name: "WOMEN EDITION 03", img: "green.jpg" },
        { name: "WOMEN EDITION 04", img: "green.jpg" }
    ]
};

let currentGender = "men";
let isMoving = false;

window.updateProducts = function (gender, event) {
    if (isMoving) return;
    if (gender === currentGender) return;

    const grid = document.querySelector(".homepage-grid");
    const images = document.querySelectorAll(".perfume-card img");
    const names = document.querySelectorAll(".product-name");
    const items = document.querySelectorAll(".toggle-item");

    isMoving = true;

    const isToWomen = gender === "women";

    grid.classList.add(isToWomen ? "slide-left-out" : "slide-right-out");

    items.forEach(item => item.classList.remove("active"));
    event.target.classList.add("active");

    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            images[i].src = products[gender][i].img;
            names[i].innerText = products[gender][i].name;
        }

        grid.classList.remove("slide-left-out", "slide-right-out");

        grid.classList.add(isToWomen ? "slide-right-in" : "slide-left-in");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                grid.classList.remove("slide-right-in", "slide-left-in");
                currentGender = gender;
                isMoving = false;
            });
        });
    }, 450);
};

const searchOpen = document.getElementById("searchOpen");
const searchClose = document.getElementById("searchClose");
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");

searchOpen.addEventListener("click", function (event) {
    event.preventDefault();
    searchOverlay.classList.add("active");
    searchInput.focus();
});

searchClose.addEventListener("click", function () {
    searchOverlay.classList.remove("active");
});

searchOverlay.addEventListener("click", function (event) {
    if (event.target === searchOverlay) {
        searchOverlay.classList.remove("active");
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        searchOverlay.classList.remove("active");
    }
}); 

window.addEventListener("DOMContentLoaded", function () {
    const menuOpen = document.getElementById("menuOpen");
    const menuClose = document.getElementById("menuClose");
    const sideMenu = document.getElementById("sideMenu");
    const menuBackdrop = document.getElementById("menuBackdrop");
    const menuSections = document.querySelectorAll(".menu-section");

    menuOpen.addEventListener("click", function () {
        sideMenu.classList.add("active");
        menuBackdrop.classList.add("active");
    });

    menuClose.addEventListener("click", function () {
        sideMenu.classList.remove("active");
        menuBackdrop.classList.remove("active");
    });

    menuBackdrop.addEventListener("click", function () {
        sideMenu.classList.remove("active");
        menuBackdrop.classList.remove("active");
    });

    menuSections.forEach(function (section) {
        const title = section.querySelector(".menu-section-title");

        title.addEventListener("click", function () {
            section.classList.toggle("active");
        });
    });
});

const ourownHeader = document.getElementById("ourownHeader");

if (ourownHeader) {
    let lastHeaderScrollY = window.scrollY;
    let headerTicking = false;

    window.addEventListener("scroll", function () {
        if (!headerTicking) {
            window.requestAnimationFrame(function () {
                const currentScrollY = window.scrollY;

                if (currentScrollY <= 0) {
                    ourownHeader.classList.remove("scrolled");
                    ourownHeader.classList.remove("hide");
                } else {
                    ourownHeader.classList.add("scrolled");

                    if (currentScrollY > lastHeaderScrollY && currentScrollY > 80) {
                        ourownHeader.classList.add("hide");
                    } else if (currentScrollY < lastHeaderScrollY) {
                        ourownHeader.classList.remove("hide");
                    }
                }

                lastHeaderScrollY = currentScrollY;
                headerTicking = false;
            });

            headerTicking = true;
        }
    });
}

const SCROLL_DISTANCE_RATIO = 0.62;
const SCROLL_SMOOTHNESS = 0.12;

let targetScrollY = window.scrollY;
let currentSmoothScrollY = window.scrollY;
let isSmoothScrolling = false;

window.addEventListener(
    "wheel",
    function (event) {
        event.preventDefault();

        targetScrollY += event.deltaY * SCROLL_DISTANCE_RATIO;

        const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

        if (targetScrollY < 0) {
            targetScrollY = 0;
        }

        if (targetScrollY > maxScrollY) {
            targetScrollY = maxScrollY;
        }

        if (!isSmoothScrolling) {
            smoothScroll();
        }
    },
    { passive: false }
);

function smoothScroll() {
    isSmoothScrolling = true;

    currentSmoothScrollY += (targetScrollY - currentSmoothScrollY) * SCROLL_SMOOTHNESS;

    window.scrollTo(0, currentSmoothScrollY);

    if (Math.abs(targetScrollY - currentSmoothScrollY) > 0.5) {
        requestAnimationFrame(smoothScroll);
    } else {
        window.scrollTo(0, targetScrollY);
        currentSmoothScrollY = targetScrollY;
        isSmoothScrolling = false;
    }
}

const accountOpen = document.getElementById("accountOpen");
const favoriteOpen = document.getElementById("favoriteOpen");
const loginOverlay = document.getElementById("loginOverlay");
const loginClose = document.getElementById("loginClose");
const loginForm = document.getElementById("loginForm");

function isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

function openLoginOverlay() {
    if (!loginOverlay) return;
    loginOverlay.classList.add("active");
}

function closeLoginOverlay() {
    if (!loginOverlay) return;
    loginOverlay.classList.remove("active");
}

if (accountOpen) {
    accountOpen.addEventListener("click", function (event) {
        event.preventDefault();

        if (!isUserLoggedIn()) {
            openLoginOverlay();
            return;
        }

        alert("이미 로그인된 상태입니다.");
    });
}

if (favoriteOpen) {
    favoriteOpen.addEventListener("click", function (event) {
        event.preventDefault();

        if (!isUserLoggedIn()) {
            openLoginOverlay();
            return;
        }

        alert("즐겨찾기 페이지로 이동합니다.");
    });
}

if (loginClose) {
    loginClose.addEventListener("click", function () {
        closeLoginOverlay();
    });
}

if (loginOverlay) {
    loginOverlay.addEventListener("click", function (event) {
        if (event.target === loginOverlay) {
            closeLoginOverlay();
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        localStorage.setItem("isLoggedIn", "true");
        closeLoginOverlay();

        alert("로그인되었습니다.");
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLoginOverlay();
    }
});
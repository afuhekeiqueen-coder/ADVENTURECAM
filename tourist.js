// ======================================
// ADVENTURECAM TOURIST PAGE
// tourist.js
// ======================================

// Wait until the page loads
document.addEventListener("DOMContentLoaded", () => {

    console.log("AdventureCam Tourist Page Loaded Successfully!");

    // ======================================
    // LIVE SEARCH
    // ======================================

    const searchBox = document.getElementById("searchBox");
    const cards = document.querySelectorAll(".card");

    if (searchBox) {

        searchBox.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            cards.forEach(card => {

                const text = card.textContent.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

    // ======================================
    // SCROLL ANIMATION
    // ======================================

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.2
    });

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "0.8s ease";

        observer.observe(card);

    });

    // ======================================
    // BUTTON RIPPLE EFFECT
    // ======================================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "scale(1.05)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "scale(1)";

        });

    });

});

// ======================================
// BACK TO TOP BUTTON
// ======================================

// Create button
const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topButton";

document.body.appendChild(topButton);

// Style the button
topButton.style.position = "fixed";
topButton.style.bottom = "25px";
topButton.style.right = "25px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#0b7d43";
topButton.style.color = "#fff";
topButton.style.fontSize = "22px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
topButton.style.transition = "0.3s";

// Show button when scrolling
window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

// Scroll to top
topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

// ======================================
// CURRENT YEAR IN FOOTER
// ======================================

const copyright = document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML = `&copy; ${year} AdventureCam. All Rights Reserved.`;

}

// ======================================
// ACTIVE NAVIGATION
// ======================================

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => item.classList.remove("active"));

        this.classList.add("active");

    });

});

// ======================================
// PAGE LOADING EFFECT
// ======================================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "1";

    }, 100);

});

// ======================================
// IMAGE HOVER EFFECT
// ======================================

const images = document.querySelectorAll(".card img");

images.forEach(image => {

    image.addEventListener("mouseover", () => {

        image.style.filter = "brightness(105%)";

    });

    image.addEventListener("mouseout", () => {

        image.style.filter = "brightness(100%)";

    });

});

// ======================================
// KEYBOARD SHORTCUT
// Press "/" to focus the search box
// ======================================

document.addEventListener("keydown", (event) => {

    if (event.key === "/") {

        event.preventDefault();

        const search = document.getElementById("searchBox");

        if (search) {

            search.focus();

        }

    }

});

console.log("AdventureCam Tourist JavaScript Loaded.");
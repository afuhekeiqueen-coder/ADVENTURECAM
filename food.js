// =======================================
// ADVENTURECAM - FOODS PAGE
// foods.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Welcome to ADVENTURECAM Foods Page!");

    // =======================================
    // LIVE SEARCH
    // =======================================

    const searchBox = document.getElementById("searchBox");
    const foodCards = document.querySelectorAll(".food-card");

    if (searchBox) {

        searchBox.addEventListener("keyup", function () {

            const searchValue = this.value.toLowerCase();

            foodCards.forEach(card => {

                const text = card.textContent.toLowerCase();

                if (text.includes(searchValue)) {

                    card.style.display = "flex";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    // =======================================
    // BACK TO TOP BUTTON
    // =======================================

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    // =======================================
    // ACTIVE NAVIGATION
    // =======================================

    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });


    // =======================================
    // FADE-IN ANIMATION
    // =======================================

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: 0.2

    });

    foodCards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform = "translateY(40px)";

        card.style.transition = "0.8s ease";

        observer.observe(card);

    });


    // =======================================
    // NEWSLETTER VALIDATION
    // =======================================

    const newsletterForm = document.querySelector(".newsletter form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = this.querySelector("input");

            if (email.value.trim() === "") {

                alert("Please enter your email address.");

                return;

            }

            alert("Thank you for subscribing to ADVENTURECAM!");

            email.value = "";

        });

    }


    // =======================================
    // BUTTON RIPPLE EFFECT
    // =======================================

    const buttons = document.querySelectorAll(".food-info a");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";

            ripple.style.top = (e.clientY - rect.top) + "px";

            ripple.classList.add("ripple");

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    // =======================================
    // LOADING EFFECT
    // =======================================

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity 0.8s";

    setTimeout(() => {

        document.body.style.opacity = "1";

    }, 200);


    // =======================================
    // CURRENT YEAR
    // =======================================

    const yearElement = document.querySelector(".copyright");

    if (yearElement) {

        const year = new Date().getFullYear();

        yearElement.innerHTML =
            "&copy; " + year +
            " ADVENTURECAM. All Rights Reserved.";

    }


    // =======================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // =======================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });


    // =======================================
    // IMAGE HOVER EFFECT
    // =======================================

    const images = document.querySelectorAll(".food-card img");

    images.forEach(image => {

        image.addEventListener("mouseenter", () => {

            image.style.filter = "brightness(110%)";

        });

        image.addEventListener("mouseleave", () => {

            image.style.filter = "brightness(100%)";

        });

    });

});
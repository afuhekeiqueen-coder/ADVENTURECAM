

document.addEventListener("DOMContentLoaded", () => {



    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function searchCards() {

        const value = searchInput.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }

    if (searchBtn) {

        searchBtn.addEventListener("click", searchCards);

    }

    if (searchInput) {

        searchInput.addEventListener("keyup", function (e) {

            if (e.key === "Enter") {

                searchCards();

            }

        });

    }

    const buttons = document.querySelectorAll(".categories button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

        });

    });


    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 350) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    const fadeItems = document.querySelectorAll("section, .card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    fadeItems.forEach(item => {

        item.classList.add("fade");

        observer.observe(item);

    });


    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });


    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });

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


    if (searchBtn) {

        searchBtn.addEventListener("mouseenter", () => {

            searchBtn.style.transform = "scale(1.05)";

        });

        searchBtn.addEventListener("mouseleave", () => {

            searchBtn.style.transform = "scale(1)";

        });

    }


    const year = new Date().getFullYear();

    const footer = document.querySelector("footer");

    if (footer) {

        footer.setAttribute("data-year", year);

    }

    console.log("Welcome to AdventureCam!");

});
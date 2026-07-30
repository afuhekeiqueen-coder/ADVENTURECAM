
document.addEventListener("DOMContentLoaded", function () {

    console.log("AdventureCam Home Page Loaded Successfully!");

    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => {

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });


    const exploreBtn = document.querySelector(".explore-btn");
    const bookBtn = document.querySelector(".book-btn");

    if (exploreBtn) {

        exploreBtn.addEventListener("click", function () {

            alert("Welcome! Let's explore the beauty of Cameroon.");

        });

    }

    if (bookBtn) {

        bookBtn.addEventListener("click", function () {

            alert("Redirecting to Booking Page...");

        });

    }

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


    const images = document.querySelectorAll(".card img");

    images.forEach(image => {

        image.addEventListener("mouseenter", function () {

            this.style.transform = "scale(1.08)";
            this.style.transition = "0.4s";

        });

        image.addEventListener("mouseleave", function () {

            this.style.transform = "scale(1)";

        });

    });

    const sections = document.querySelectorAll("section");

    function revealSection() {

        sections.forEach(section => {

            const top = section.getBoundingClientRect().top;

            const screenHeight = window.innerHeight;

            if (top < screenHeight - 120) {

                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
                section.style.transition = "1s";

            }

        });

    }

    sections.forEach(section => {

        section.style.opacity = "0";
        section.style.transform = "translateY(50px)";

    });

    window.addEventListener("scroll", revealSection);

    revealSection();


    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }

    setTimeout(function () {

        console.log("Welcome to AdventureCam!");

    }, 1000);

});
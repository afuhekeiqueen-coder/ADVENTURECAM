document.addEventListener("DOMContentLoaded", () => {

    console.log("About Page Loaded Successfully!");


    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

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


    const sections = document.querySelectorAll("section");

    function revealSections() {

        sections.forEach(section => {

            const top = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (top < screenHeight - 100) {

                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
                section.style.transition = "all 0.8s ease";

            }

        });

    }

    sections.forEach(section => {

        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";

    });

    window.addEventListener("scroll", revealSections);

    revealSections();


    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {

        box.addEventListener("mouseenter", () => {

            box.style.transform = "scale(1.05)";
            box.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
            box.style.transition = "0.3s";

        });

        box.addEventListener("mouseleave", () => {

            box.style.transform = "scale(1)";
            box.style.boxShadow = "none";

        });

    });


    const values = document.querySelectorAll(".value");

    values.forEach(value => {

        value.addEventListener("mouseenter", () => {

            value.style.transform = "translateY(-10px)";
            value.style.transition = "0.3s";

        });

        value.addEventListener("mouseleave", () => {

            value.style.transform = "translateY(0)";

        });

    });


    const heroTitle = document.querySelector(".overlay h1");

    if (heroTitle) {

        heroTitle.style.opacity = "0";
        heroTitle.style.transform = "translateX(-50px)";

        setTimeout(() => {

            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateX(0)";
            heroTitle.style.transition = "1s";

        }, 300);

    }


    const year = document.getElementById("year");

    if (year) {

        year.textContent = new Date().getFullYear();

    }


    console.log("Welcome to AdventureCam About Page!");

});
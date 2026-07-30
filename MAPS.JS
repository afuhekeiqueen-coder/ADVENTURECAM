

document.addEventListener("DOMContentLoaded", () => {


    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

        });


    const fadeElements = document.querySelectorAll(
        ".map-card, .map-description, .destination-links, .info-box, .footer"
    );

    const reveal = () => {

        fadeElements.forEach(element => {

            const position = element.getBoundingClientRect().top;

            const screenHeight = window.innerHeight;

            if (position < screenHeight - 120) {

                element.classList.add("show");

            }

        });

    };

    window.addEventListener("scroll", reveal);

    reveal();


    const directionBtn = document.getElementById("directionBtn");

    if (directionBtn) {

        directionBtn.addEventListener("click", () => {

            window.open(
                "https://www.google.com/maps/dir//Cameroon",
                "_blank"
            );

        });

    }


    const currentPage = location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        }

    });


    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            const radius = diameter / 2;

            circle.style.width = circle.style.height =
                `${diameter}px`;

            circle.style.left =
                `${e.clientX - this.getBoundingClientRect().left - radius}px`;

            circle.style.top =
                `${e.clientY - this.getBoundingClientRect().top - radius}px`;

            circle.classList.add("ripple");

            const ripple = this.querySelector(".ripple");

            if (ripple) {

                ripple.remove();

            }

            this.appendChild(circle);

        });

    });


    const images = document.querySelectorAll(".map-card img");

    images.forEach(image => {

        image.addEventListener("mouseenter", () => {

            image.style.transform = "scale(1.04)";

        });

        image.addEventListener("mouseleave", () => {

            image.style.transform = "scale(1)";

        });

    });


    document.body.style.opacity = "0";

    window.addEventListener("load", () => {

        document.body.style.transition = "opacity .8s";

        document.body.style.opacity = "1";

    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });


    const mapCard = document.querySelector(".map-card");

    if (mapCard) {

        mapCard.addEventListener("mousemove", () => {

            mapCard.style.boxShadow =
                "0 20px 40px rgba(0,0,0,.25)";

        });

        mapCard.addEventListener("mouseleave", () => {

            mapCard.style.boxShadow =
                "0 8px 20px rgba(0,0,0,.12)";

        });

    }


    document.addEventListener("keydown", (e) => {

        if (e.key === "m" || e.key === "M") {

            window.open(
                "https://www.google.com/maps/place/Cameroon/",
                "_blank"
            );

        }

    });

    console.log({
        "Welcome to AdventureCam Maps!"
    

});
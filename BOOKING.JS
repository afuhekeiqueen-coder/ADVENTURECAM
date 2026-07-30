/*====================================================
    ADVENTURECAM
    booking.js
=====================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*=========================================
        FOOTER YEAR
    =========================================*/

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /*=========================================
        MINIMUM DATE = TODAY
    =========================================*/

    const travelDate = document.getElementById("travelDate");

    if (travelDate) {

        const today = new Date().toISOString().split("T")[0];

        travelDate.setAttribute("min", today);

    }

    /*=========================================
        CHARACTER COUNTER
    =========================================*/

    const textarea = document.getElementById("request");

    const counter = document.getElementById("charCount");

    if (textarea && counter) {

        textarea.addEventListener("input", function () {

            counter.textContent = this.value.length;

        });

    }

    /*=========================================
        BOOKING FORM
    =========================================*/

    const form = document.getElementById("bookingForm");

    const success = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;

        /*===========================
            FULL NAME
        ===========================*/

        const fullName = document.getElementById("fullName");

        if (fullName.value.trim().length < 3) {

            fullName.classList.add("error");

            valid = false;

        } else {

            fullName.classList.remove("error");

            fullName.classList.add("valid");

        }

        /*===========================
            EMAIL
        ===========================*/

        const email = document.getElementById("email");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {

            email.classList.add("error");

            valid = false;

        } else {

            email.classList.remove("error");

            email.classList.add("valid");

        }

        /*===========================
            PHONE
        ===========================*/

        const phone = document.getElementById("phone");

        const phonePattern = /^[0-9]{9,15}$/;

        if (!phonePattern.test(phone.value)) {

            phone.classList.add("error");

            valid = false;

        } else {

            phone.classList.remove("error");

            phone.classList.add("valid");

        }

        /*===========================
            DESTINATION
        ===========================*/

        const destination =
            document.getElementById("destination");

        if (destination.value === "") {

            destination.classList.add("error");

            valid = false;

        } else {

            destination.classList.remove("error");

            destination.classList.add("valid");

        }

        /*===========================
            PERSONS
        ===========================*/

        const persons =
            document.getElementById("persons");

        if (persons.value < 1) {

            persons.classList.add("error");

            valid = false;

        } else {

            persons.classList.remove("error");

            persons.classList.add("valid");

        }

        /*===========================
            DATE
        ===========================*/

        if (travelDate.value === "") {

            travelDate.classList.add("error");

            valid = false;

        } else {

            travelDate.classList.remove("error");

            travelDate.classList.add("valid");

        }

        /*===========================
            SUCCESS
        ===========================*/

        if (valid) {

            success.style.display = "block";

            success.scrollIntoView({

                behavior: "smooth"

            });

            setTimeout(() => {

                form.reset();

                counter.textContent = "0";

            }, 2000);

        }

    });

    /*=========================================
        RESET BUTTON
    =========================================*/

    form.addEventListener("reset", function () {

        const answer = confirm(

            "Are you sure you want to clear the form?"

        );

        if (!answer) {

            event.preventDefault();

        }

        counter.textContent = "0";

        success.style.display = "none";

    });

    /*=========================================
        RIPPLE EFFECT
    =========================================*/

    const buttons = document.querySelectorAll(

        ".book-btn,.reset-btn"

    );

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(

                this.clientWidth,

                this.clientHeight

            );

            const radius = diameter / 2;

            circle.style.width =
                circle.style.height =
                `${diameter}px`;

            circle.style.left =
                `${e.clientX -
                this.getBoundingClientRect().left -
                radius}px`;

            circle.style.top =
                `${e.clientY -
                this.getBoundingClientRect().top -
                radius}px`;

            circle.classList.add("ripple");

            const ripple =
                this.querySelector(".ripple");

            if (ripple) {

                ripple.remove();

            }

            this.appendChild(circle);

        });

    });

    /*=========================================
        BACK TO TOP BUTTON
    =========================================*/

    const backToTop =
        document.getElementById("backToTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            if (backToTop)

                backToTop.style.display = "block";

        } else {

            if (backToTop)

                backToTop.style.display = "none";

        }

    });

    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*=========================================
        LOADING EFFECT
    =========================================*/

    document.body.style.opacity = "0";

    window.addEventListener("load", function () {

        document.body.style.transition =
            "opacity .8s";

        document.body.style.opacity = "1";

    });

    /*=========================================
        SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]')

        .forEach(anchor => {

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

    /*=========================================
        KEYBOARD SHORTCUT

        Press B to focus booking form
    =========================================*/

    document.addEventListener("keydown", function (e) {

        if (e.key === "b" || e.key === "B") {

            fullName.focus();

        }

    });

    console.log("AdventureCam Booking Page Loaded");

});
// ===========================================
// AdventureCam Account Page
// account.js
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    const accountToggle = document.getElementById("accountToggle");
    const companyForm = document.getElementById("companyForm");
    const touristForm = document.getElementById("touristForm");
    const toggleButtons = accountToggle ? accountToggle.querySelectorAll("button[data-type]") : [];

    function showForm(type) {
        if (!companyForm || !touristForm) return;

        if (type === "tourist") {
            companyForm.style.display = "none";
            touristForm.style.display = "block";
        } else {
            touristForm.style.display = "none";
            companyForm.style.display = "block";
        }

        toggleButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.type === type);
        });
    }

    if (accountToggle && toggleButtons.length) {
        toggleButtons.forEach((button) => {
            button.addEventListener("click", function () {
                showForm(this.dataset.type);
            });
        });

        showForm("company");
    }

    const registerTab = document.getElementById("registerTab");
    const loginTab = document.getElementById("loginTab");

    const showLogin = document.getElementById("showLogin");
    const showRegister = document.getElementById("showRegister");

    // Hide login form when page loads
    loginSection.style.display = "none";

    // ===============================
    // SHOW LOGIN FORM
    // ===============================

    function openLogin() {

        registerSection.style.display = "none";
        loginSection.style.display = "block";

        registerTab.classList.remove("active");
        loginTab.classList.add("active");

    }

    // ===============================
    // SHOW REGISTER FORM
    // ===============================

    function openRegister() {

        registerSection.style.display = "block";
        loginSection.style.display = "none";

        loginTab.classList.remove("active");
        registerTab.classList.add("active");

    }

    registerTab.addEventListener("click", openRegister);
    loginTab.addEventListener("click", openLogin);

    showLogin.addEventListener("click", function(e){

        e.preventDefault();
        openLogin();

    });

    showRegister.addEventListener("click", function(e){

        e.preventDefault();
        openRegister();

    });

    // ===============================
    // REGISTER USER
    // ===============================

    registerForm.addEventListener("submit", function(e){

        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input, select");

        const user = {

            fullname: inputs[0].value,
            email: inputs[1].value,
            phone: inputs[2].value,
            nationality: inputs[3].value,
            residence: inputs[4].value,
            gender: inputs[5].value,
            dob: inputs[6].value,
            password: inputs[7].value

        };

        localStorage.setItem("AdventureCamUser", JSON.stringify(user));

        alert("Registration Successful!\nPlease Login.");

        registerForm.reset();

        openLogin();

    });

    // ===============================
    // LOGIN USER
    // ===============================

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email =
        loginForm.querySelector('input[type="email"]').value;

        const password =
        loginForm.querySelector('input[type="password"]').value;

        const savedUser =
        JSON.parse(localStorage.getItem("AdventureCamUser"));

        if(savedUser == null){

            alert("No account found.\nPlease Register First.");

            openRegister();

            return;

        }

        if(email === savedUser.email &&
           password === savedUser.password){

            alert("Login Successful!\nWelcome " + savedUser.fullname);

            localStorage.setItem("loggedIn","true");

            window.location.href = "index.html";

        }

        else{

            alert("Incorrect Email or Password.");

        }

    });

    // ===============================
    // REMEMBER USER
    // ===============================

    if(localStorage.getItem("loggedIn") === "true"){

        console.log("User already logged in.");

    }

});
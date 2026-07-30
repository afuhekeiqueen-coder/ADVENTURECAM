// Show / Hide Password

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", function(){

    if(password.type === "password"){

        password.type = "text";
        toggle.innerHTML = "🙈";

    }else{

        password.type = "password";
        toggle.innerHTML = "👁";

    }

});


// Login Validation

document.getElementById("loginForm").addEventListener("submit",function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const pass = password.value.trim();

    if(email === "" || pass === ""){

        alert("Please fill in all fields.");

        return;

    }

    alert("Login Successful!");

    // Redirect after successful login
    // window.location.href = "home.html";

});
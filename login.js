// ============================================================
// AdventureCam — Login Page JS
// ============================================================

// ── Show / Hide Password ─────────────────────────────────────
const passwordInput = document.getElementById("password");
const toggle        = document.getElementById("togglePassword");

if (toggle && passwordInput) {
    toggle.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type  = "text";
            toggle.innerHTML    = "🙈";
        } else {
            passwordInput.type  = "password";
            toggle.innerHTML    = "👁";
        }
    });
}

// ── Login Form — submit via fetch ────────────────────────────
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const pass  = passwordInput ? passwordInput.value : "";

        if (email === "" || pass === "") {
            showMessage("Please fill in all fields.", "error");
            return;
        }

        const submitBtn = loginForm.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled    = true;
            submitBtn.textContent = "Signing in…";
        }

        const formData = new FormData(loginForm);

        fetch("login.php", {
            method: "POST",
            body:   formData
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                showMessage(data.message, "success");
                setTimeout(function () {
                    window.location.href = data.redirect || "HOME.HTML";
                }, 1200);
            } else {
                showMessage(data.message || "Login failed. Please try again.", "error");
                if (submitBtn) {
                    submitBtn.disabled    = false;
                    submitBtn.textContent = "Sign In";
                }
            }
        })
        .catch(function () {
            showMessage("Network error. Please check your connection.", "error");
            if (submitBtn) {
                submitBtn.disabled    = false;
                submitBtn.textContent = "Sign In";
            }
        });
    });
}

// ── Helper: show inline message ──────────────────────────────
function showMessage(msg, type) {
    let msgEl = document.getElementById("loginMessage");

    if (!msgEl) {
        msgEl           = document.createElement("p");
        msgEl.id        = "loginMessage";
        msgEl.style.cssText =
            "margin-top:12px; padding:10px 14px; border-radius:8px; " +
            "font-size:0.9rem; text-align:center;";
        loginForm.appendChild(msgEl);
    }

    msgEl.textContent   = msg;
    msgEl.style.background  = type === "success" ? "#d4edda" : "#f8d7da";
    msgEl.style.color       = type === "success" ? "#155724" : "#721c24";
    msgEl.style.display     = "block";
}

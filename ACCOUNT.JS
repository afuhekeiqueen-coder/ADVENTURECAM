// ============================================================
// AdventureCam — Account Page JS
// Handles Company / Tourist toggle and form submission
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ── Company / Tourist toggle ─────────────────────────────
    const accountToggle = document.getElementById("accountToggle");
    const companyForm   = document.getElementById("companyForm");
    const touristForm   = document.getElementById("touristForm");
    const toggleButtons = accountToggle
        ? accountToggle.querySelectorAll("button[data-type]")
        : [];

    function showForm(type) {
        if (!companyForm || !touristForm) return;

        if (type === "tourist") {
            companyForm.style.display = "none";
            touristForm.style.display = "block";
        } else {
            touristForm.style.display = "none";
            companyForm.style.display = "block";
        }

        toggleButtons.forEach(function (btn) {
            btn.classList.toggle("active", btn.dataset.type === type);
        });
    }

    if (accountToggle && toggleButtons.length) {
        toggleButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                showForm(this.dataset.type);
            });
        });
        showForm("company");
    }

    // ── Password show/hide ───────────────────────────────────
    document.querySelectorAll(".toggle-eye").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const targetId = this.dataset.target;
            const input    = document.getElementById(targetId);
            if (!input) return;

            if (input.type === "password") {
                input.type    = "text";
                this.textContent = "🙈";
            } else {
                input.type    = "password";
                this.textContent = "👁";
            }
        });
    });

    // ── Generic form submit handler ──────────────────────────
    function wireForm(form, endpoint) {
        if (!form) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Check terms checkbox
            const agree = form.querySelector('input[name="agree"]');
            if (agree && !agree.checked) {
                showMessage(form, "You must agree to the Terms of Service before continuing.", "error");
                return;
            }

            const submitBtn = form.querySelector(".submit-btn");
            if (submitBtn) {
                submitBtn.disabled    = true;
                submitBtn.textContent = "Creating account…";
            }

            const formData = new FormData(form);

            fetch(endpoint, { method: "POST", body: formData })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    if (data.success) {
                        showMessage(form, data.message, "success");
                        form.reset();
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = endpoint.includes("company")
                                ? "Create Company Account"
                                : "Create Tourist Account";
                        }
                        // Redirect to login after short delay
                        setTimeout(function () {
                            window.location.href = "login.html";
                        }, 2000);
                    } else {
                        showMessage(form, data.message || "Registration failed. Please try again.", "error");
                        if (submitBtn) {
                            submitBtn.disabled    = false;
                            submitBtn.textContent = endpoint.includes("company")
                                ? "Create Company Account"
                                : "Create Tourist Account";
                        }
                    }
                })
                .catch(function () {
                    showMessage(form, "Network error. Please check your connection.", "error");
                    if (submitBtn) {
                        submitBtn.disabled    = false;
                        submitBtn.textContent = endpoint.includes("company")
                            ? "Create Company Account"
                            : "Create Tourist Account";
                    }
                });
        });
    }

    wireForm(companyForm, "company_register.php");
    wireForm(touristForm, "account.php");

    // ── Helper: show inline message below the form ───────────
    function showMessage(form, msg, type) {
        let msgEl = form.querySelector(".form-message");

        if (!msgEl) {
            msgEl           = document.createElement("p");
            msgEl.className = "form-message";
            msgEl.style.cssText =
                "margin-top:14px; padding:10px 16px; border-radius:8px; " +
                "font-size:0.9rem; text-align:center;";
            form.appendChild(msgEl);
        }

        msgEl.textContent      = msg;
        msgEl.style.background = type === "success" ? "#d4edda" : "#f8d7da";
        msgEl.style.color      = type === "success" ? "#155724" : "#721c24";
        msgEl.style.display    = "block";
    }

    // ── Footer year ──────────────────────────────────────────
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

});

// ============================================================
// AdventureCam — Shared Nav Session Handler
// Checks login state and swaps the ACCOUNT link for
// Profile + Logout when the user is signed in.
// Include this script on every HTML page.
// ============================================================

(function () {
    'use strict';

    function updateNav(data) {
        // Find the ACCOUNT <li> by its href
        var accountLink = document.querySelector('nav a[href="ACCOUNT.HTML"]');
        if (!accountLink) return;

        var accountLi = accountLink.parentElement; // the <li>

        if (data.logged_in) {
            // Replace ACCOUNT link with Profile link
            accountLink.href        = 'profile.php';
            accountLink.textContent = '\uD83D\uDC64 ' + data.display_name;
            accountLink.title       = 'View your profile';
            accountLink.classList.add('nav-profile-link');

            // Inject a Logout <li> right after
            var logoutLi = document.createElement('li');
            logoutLi.innerHTML =
                '<a href="logout.php" class="nav-logout-link" ' +
                'style="color:#b23b3b; font-weight:bold; font-size:13px;">' +
                'Logout</a>';
            accountLi.insertAdjacentElement('afterend', logoutLi);
        }
        // If not logged in: leave ACCOUNT link as-is
    }

    // Fetch session state from PHP
    fetch('session_status.php', { credentials: 'same-origin' })
        .then(function (res) { return res.json(); })
        .then(function (data) { updateNav(data); })
        .catch(function () {
            // Silently fail — nav stays as default (ACCOUNT link)
        });
})();

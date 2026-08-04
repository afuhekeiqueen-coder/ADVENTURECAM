<?php
// ============================================================
// AdventureCam — Logout
// Destroys the session and sends the user to the login page.
// ============================================================

session_start();
session_unset();
session_destroy();

// Expire the session cookie immediately
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params['path'],
        $params['domain'],
        $params['secure'],
        $params['httponly']
    );
}

header('Location: login.html');
exit;

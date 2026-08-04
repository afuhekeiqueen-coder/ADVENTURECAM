<?php
// ============================================================
// AdventureCam — Session Status Endpoint
// Called by nav.js to check login state.
// Returns JSON so static HTML pages can update the nav.
// ============================================================

header('Content-Type: application/json');
header('Cache-Control: no-store');

session_start();

if (!empty($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    echo json_encode([
        'logged_in'    => true,
        'display_name' => $_SESSION['display_name'] ?? 'My Profile',
        'user_type'    => $_SESSION['user_type']    ?? '',
    ]);
} else {
    echo json_encode(['logged_in' => false]);
}

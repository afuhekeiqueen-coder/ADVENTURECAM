<?php
// ============================================================
// AdventureCam — Login Handler
// Accepts POST from login.html
// Verifies credentials, starts session, returns JSON
// ============================================================

header('Content-Type: application/json');

require_once __DIR__ . '/config/database.php';

// Start session before any output
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ── Only accept POST ────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ── Collect inputs ───────────────────────────────────────────
$email    = trim($_POST['email']    ?? '');
$password = $_POST['password']      ?? '';

// ── Basic validation ─────────────────────────────────────────
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email and password.']);
    exit;
}

// ── Look up the login record ─────────────────────────────────
$pdo  = getDB();
$stmt = $pdo->prepare(
    'SELECT login_id, user_type, tourist_id, company_id, password_hash
     FROM login
     WHERE email = ?
     LIMIT 1'
);
$stmt->execute([$email]);
$row = $stmt->fetch();

if (!$row || !password_verify($password, $row['password_hash'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Incorrect email or password.']);
    exit;
}

// ── Build session ─────────────────────────────────────────────
session_regenerate_id(true);          // prevent session fixation

$_SESSION['logged_in']  = true;
$_SESSION['user_type']  = $row['user_type'];
$_SESSION['login_id']   = $row['login_id'];
$_SESSION['email']      = $email;

// Resolve display name from the correct table
if ($row['user_type'] === 'tourist' && $row['tourist_id']) {
    $_SESSION['user_id'] = $row['tourist_id'];

    $s = $pdo->prepare('SELECT full_name FROM tourist WHERE tourist_id = ? LIMIT 1');
    $s->execute([$row['tourist_id']]);
    $profile = $s->fetch();
    $_SESSION['display_name'] = $profile['full_name'] ?? $email;

} else {
    $_SESSION['user_id'] = $row['company_id'];

    $s = $pdo->prepare('SELECT company_name FROM companies WHERE company_id = ? LIMIT 1');
    $s->execute([$row['company_id']]);
    $profile = $s->fetch();
    $_SESSION['display_name'] = $profile['company_name'] ?? $email;
}

echo json_encode([
    'success'      => true,
    'message'      => 'Login successful. Welcome back, ' . htmlspecialchars($_SESSION['display_name']) . '!',
    'user_type'    => $row['user_type'],
    'display_name' => $_SESSION['display_name'],
    'redirect'     => 'HOME.HTML'
]);

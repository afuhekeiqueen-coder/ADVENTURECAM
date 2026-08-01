<?php
// ============================================================
// AdventureCam — Feedback Handler
// Accepts POST from FEEDBACK.HTML
// Guests can submit feedback without an account
// ============================================================

header('Content-Type: application/json');

require_once __DIR__ . '/config/database.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ── Only accept POST ────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ── Collect & sanitise inputs ───────────────────────────────
$tour         = trim($_POST['tour']     ?? '');
$rating       = (int) ($_POST['rating'] ?? 0);
$name         = trim($_POST['name']     ?? '');
$email        = trim($_POST['email']    ?? '');
$feedbackText = trim($_POST['feedback'] ?? '');

// tourist_id from session if logged in
$touristId = (isset($_SESSION['logged_in'], $_SESSION['user_type'])
              && $_SESSION['logged_in'] === true
              && $_SESSION['user_type'] === 'tourist')
             ? (int) $_SESSION['user_id']
             : null;

// ── Allowed tours (whitelist) ────────────────────────────────
$validTours = [
    'tour1' => 'Mount Cameroon Trek',
    'tour2' => 'Limbe Wildlife Tour',
    'tour3' => 'Douala City Tour',
];

// ── Server-side validation ───────────────────────────────────
$errors = [];

if (!array_key_exists($tour, $validTours))              $errors[] = 'Please select a valid tour.';
if ($rating < 1 || $rating > 5)                        $errors[] = 'Please provide a rating between 1 and 5.';
if ($name === '')                                       $errors[] = 'Your name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))         $errors[] = 'A valid email address is required.';
if (strlen($feedbackText) < 10)                        $errors[] = 'Please write at least 10 characters of feedback.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Insert feedback ──────────────────────────────────────────
try {
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'INSERT INTO feedback
            (tourist_id, tour, rating, name, email, feedback_text)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $touristId,
        $validTours[$tour],   // store the human-readable tour name
        $rating,
        $name,
        $email,
        $feedbackText
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your feedback! We appreciate you taking the time to share your experience.'
    ]);

} catch (PDOException $e) {
    error_log('feedback error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Submission failed. Please try again.']);
}

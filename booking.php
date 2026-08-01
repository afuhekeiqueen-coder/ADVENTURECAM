<?php
// ============================================================
// AdventureCam — Booking Handler
// Accepts POST from BOOKING.HTML
// Guests can book without an account (tourist_id is optional)
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
$destination = trim($_POST['destination'] ?? '');
$travelDate  = trim($_POST['travelDate']  ?? '');
$fullName    = trim($_POST['fullName']    ?? '');
$phone       = trim($_POST['phone']       ?? '');
$email       = trim($_POST['email']       ?? '');
$persons     = (int) ($_POST['persons']   ?? 0);

// tourist_id comes from session if the user is logged in
$touristId = (isset($_SESSION['logged_in'], $_SESSION['user_type'])
              && $_SESSION['logged_in'] === true
              && $_SESSION['user_type'] === 'tourist')
             ? (int) $_SESSION['user_id']
             : null;

// ── Allowed destinations (whitelist) ────────────────────────
$validDestinations = [
    'Mount Cameroon',
    'Waza National Park',
    'Limbe Botanical Garden',
    'Kribi Beach',
    'Korup National Park',
    'Lake Nyos',
    'Foumban Palace',
];

// ── Server-side validation ───────────────────────────────────
$errors = [];

if (!in_array($destination, $validDestinations, true)) $errors[] = 'Please select a valid destination.';
if ($travelDate === '' || !strtotime($travelDate))      $errors[] = 'A valid travel date is required.';
if (strtotime($travelDate) < strtotime('today'))        $errors[] = 'Travel date cannot be in the past.';
if ($fullName === '')                                   $errors[] = 'Full name is required.';
if (!preg_match('/^[0-9+\s\-]{7,20}$/', $phone))       $errors[] = 'A valid phone number is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))         $errors[] = 'A valid email address is required.';
if ($persons < 1 || $persons > 50)                     $errors[] = 'Number of persons must be between 1 and 50.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Insert booking ───────────────────────────────────────────
try {
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'INSERT INTO booking
            (tourist_id, destination, travel_date, full_name, phone, email, num_persons)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $touristId,
        $destination,
        date('Y-m-d', strtotime($travelDate)),
        $fullName,
        $phone,
        $email,
        $persons
    ]);

    $bookingId = (int) $pdo->lastInsertId();

    echo json_encode([
        'success'    => true,
        'message'    => 'Your booking has been submitted successfully! We will contact you shortly.',
        'booking_id' => $bookingId
    ]);

} catch (PDOException $e) {
    error_log('booking error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Booking failed. Please try again.']);
}

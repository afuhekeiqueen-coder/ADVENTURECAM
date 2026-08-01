<?php
// ============================================================
// AdventureCam — Tourist Registration Handler
// Accepts POST from ACCOUNT.HTML touristForm
// Inserts into: tourist + login
// ============================================================

header('Content-Type: application/json');

require_once __DIR__ . '/config/database.php';

// ── Only accept POST ────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ── Collect & sanitise inputs ───────────────────────────────
$fullName    = trim($_POST['fullName']    ?? '');
$email       = trim($_POST['email']       ?? '');
$phone       = trim($_POST['phone']       ?? '');
$country     = trim($_POST['country']     ?? '');
$nationality = trim($_POST['nationality'] ?? '');
$gender      = trim($_POST['gender']      ?? '');
$dob         = trim($_POST['dob']         ?? '');
$password    = $_POST['password']         ?? '';

// ── Server-side validation ──────────────────────────────────
$errors = [];

if ($fullName === '')                             $errors[] = 'Full name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))  $errors[] = 'A valid email address is required.';
if (!preg_match('/^[0-9+\s\-]{7,20}$/', $phone)) $errors[] = 'A valid phone number is required.';
if ($country === '')                             $errors[] = 'Country of residence is required.';
if ($nationality === '')                         $errors[] = 'Nationality is required.';
if ($gender === '')                              $errors[] = 'Gender is required.';
if ($dob === '' || !strtotime($dob))             $errors[] = 'A valid date of birth is required.';
if (strlen($password) < 8)                      $errors[] = 'Password must be at least 8 characters.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Check for duplicate email ────────────────────────────────
$pdo = getDB();

$stmt = $pdo->prepare('SELECT tourist_id FROM tourist WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
    exit;
}

// ── Hash the password ────────────────────────────────────────
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// ── Insert into tourist then login (transaction) ─────────────
try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare(
        'INSERT INTO tourist
            (full_name, email, phone, country, nationality, gender, date_of_birth)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$fullName, $email, $phone, $country, $nationality, $gender, $dob]);

    $touristId = (int) $pdo->lastInsertId();

    $stmt = $pdo->prepare(
        'INSERT INTO login (user_type, tourist_id, email, password_hash)
         VALUES (?, ?, ?, ?)'
    );
    $stmt->execute(['tourist', $touristId, $email, $passwordHash]);

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Tourist account created successfully! You can now log in.'
    ]);

} catch (PDOException $e) {
    $pdo->rollBack();
    error_log('account (tourist) register error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
}

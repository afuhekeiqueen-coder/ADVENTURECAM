<?php
// ============================================================
// AdventureCam — Company Registration Handler
// Accepts POST from ACCOUNT.HTML companyForm
// Inserts into: companies + login
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
$companyName  = trim($_POST['companyName']  ?? '');
$regNumber    = trim($_POST['regNumber']    ?? '');
$contactName  = trim($_POST['contactName']  ?? '');
$email        = trim($_POST['email']        ?? '');
$phone        = trim($_POST['phone']        ?? '');
$country      = trim($_POST['country']      ?? '');
$address      = trim($_POST['address']      ?? '');
$businessType = trim($_POST['businessType'] ?? '');
$website      = trim($_POST['website']      ?? '') ?: null;
$password     = $_POST['password']          ?? '';

// ── Server-side validation ──────────────────────────────────
$errors = [];

if ($companyName === '')            $errors[] = 'Company name is required.';
if ($regNumber   === '')            $errors[] = 'Registration number is required.';
if ($contactName === '')            $errors[] = 'Contact person name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email address is required.';
if (!preg_match('/^[0-9+\s\-]{7,20}$/', $phone)) $errors[] = 'A valid phone number is required.';
if ($country     === '')            $errors[] = 'Country of registration is required.';
if ($address     === '')            $errors[] = 'Business address is required.';
if ($businessType === '')           $errors[] = 'Business type is required.';
if (strlen($password) < 8)         $errors[] = 'Password must be at least 8 characters.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Check for duplicate email ────────────────────────────────
$pdo = getDB();

$stmt = $pdo->prepare('SELECT company_id FROM companies WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
    exit;
}

// ── Hash the password ────────────────────────────────────────
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// ── Insert into companies ────────────────────────────────────
try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare(
        'INSERT INTO companies
            (company_name, reg_number, contact_name, email, phone,
             country, address, business_type, website)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $companyName, $regNumber, $contactName, $email, $phone,
        $country, $address, $businessType, $website
    ]);

    $companyId = (int) $pdo->lastInsertId();

    // ── Insert into login ────────────────────────────────────
    $stmt = $pdo->prepare(
        'INSERT INTO login (user_type, company_id, email, password_hash)
         VALUES (?, ?, ?, ?)'
    );
    $stmt->execute(['company', $companyId, $email, $passwordHash]);

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Company account created successfully! You can now log in.'
    ]);

} catch (PDOException $e) {
    $pdo->rollBack();
    error_log('company_register error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
}

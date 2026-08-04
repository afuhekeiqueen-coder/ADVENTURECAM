<?php
// ============================================================
// AdventureCam — User Profile Page
// Requires an active login session.
// Shows tourist or company details + booking/feedback history.
// ============================================================

session_start();

// ── Guard: must be logged in ─────────────────────────────────
if (empty($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: login.html');
    exit;
}

require_once __DIR__ . '/config/database.php';

$pdo      = getDB();
$userType = $_SESSION['user_type'];   // 'tourist' | 'company'
$userId   = (int) $_SESSION['user_id'];

// ── Fetch profile data ───────────────────────────────────────
$profile  = [];
$bookings = [];
$feedbacks = [];

if ($userType === 'tourist') {

    $stmt = $pdo->prepare(
        'SELECT tourist_id, full_name, email, phone, country,
                nationality, gender, date_of_birth, created_at
         FROM tourist WHERE tourist_id = ? LIMIT 1'
    );
    $stmt->execute([$userId]);
    $profile = $stmt->fetch();

    // Recent bookings
    $stmt = $pdo->prepare(
        'SELECT booking_id, destination, travel_date, num_persons, created_at
         FROM booking
         WHERE tourist_id = ?
         ORDER BY created_at DESC
         LIMIT 10'
    );
    $stmt->execute([$userId]);
    $bookings = $stmt->fetchAll();

    // Recent feedback
    $stmt = $pdo->prepare(
        'SELECT feedback_id, tour, rating, feedback_text, created_at
         FROM feedback
         WHERE tourist_id = ?
         ORDER BY created_at DESC
         LIMIT 10'
    );
    $stmt->execute([$userId]);
    $feedbacks = $stmt->fetchAll();

} else {

    $stmt = $pdo->prepare(
        'SELECT company_id, company_name, reg_number, contact_name,
                email, phone, country, address, business_type,
                website, created_at
         FROM companies WHERE company_id = ? LIMIT 1'
    );
    $stmt->execute([$userId]);
    $profile = $stmt->fetch();
}

if (!$profile) {
    // Corrupt session — clear and redirect
    session_destroy();
    header('Location: login.html');
    exit;
}

$displayName = $userType === 'tourist'
    ? htmlspecialchars($profile['full_name'])
    : htmlspecialchars($profile['company_name']);

$memberSince = date('F Y', strtotime($profile['created_at']));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $displayName ?> — Profile | AdventureCam</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <link rel="stylesheet" href="profile.css">
  <link rel="stylesheet" href="footer.css">
</head>
<body>

<!-- ── HEADER ─────────────────────────────────────────────── -->
<header>
  <div class="logo">
    <a href="HOME.HTML">
      <img src="img/DVDU4213[1].PNG" alt="AdventureCam Logo">
    </a>
  </div>
  <nav>
    <ul>
      <li><a href="HOME.HTML">HOME</a></li>
      <li><a href="ABOUT.HTML">ABOUT</a></li>
      <li><a href="EXPLORE.HTML">EXPLORE CAMEROON</a></li>
      <li><a href="MAPS.HTML">MAPS</a></li>
      <li><a href="BOOKING.HTML">BOOKING</a></li>
      <li><a href="FEEDBACK.HTML">FEEDBACK</a></li>
      <li><a href="profile.php" class="active nav-profile">
        <i class="fa-solid fa-circle-user"></i> <?= $displayName ?>
      </a></li>
      <li><a href="logout.php" class="nav-logout">
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </a></li>
    </ul>
  </nav>
</header>

<!-- ── PROFILE HERO ───────────────────────────────────────── -->
<section class="profile-hero">
  <div class="avatar">
    <?php if ($userType === 'tourist'): ?>
      <i class="fa-solid fa-circle-user"></i>
    <?php else: ?>
      <i class="fa-solid fa-building"></i>
    <?php endif; ?>
  </div>
  <h1><?= $displayName ?></h1>
  <p class="badge <?= $userType ?>"><?= ucfirst($userType) ?></p>
  <p class="since">Member since <?= $memberSince ?></p>
</section>

<!-- ── MAIN CONTENT ───────────────────────────────────────── -->
<main class="profile-main">

  <!-- ── LEFT: DETAILS CARD ──────────────────────────────── -->
  <section class="profile-card details-card">
    <h2><i class="fa-solid fa-id-card"></i> Account Details</h2>

    <?php if ($userType === 'tourist'): ?>
    <dl>
      <dt>Full Name</dt>
      <dd><?= htmlspecialchars($profile['full_name']) ?></dd>

      <dt>Email</dt>
      <dd><?= htmlspecialchars($profile['email']) ?></dd>

      <dt>Phone</dt>
      <dd><?= htmlspecialchars($profile['phone']) ?></dd>

      <dt>Country of Residence</dt>
      <dd><?= htmlspecialchars($profile['country']) ?></dd>

      <dt>Nationality</dt>
      <dd><?= htmlspecialchars($profile['nationality']) ?></dd>

      <dt>Gender</dt>
      <dd><?= htmlspecialchars($profile['gender']) ?></dd>

      <dt>Date of Birth</dt>
      <dd><?= date('d M Y', strtotime($profile['date_of_birth'])) ?></dd>
    </dl>

    <?php else: ?>
    <dl>
      <dt>Company Name</dt>
      <dd><?= htmlspecialchars($profile['company_name']) ?></dd>

      <dt>Registration Number</dt>
      <dd><?= htmlspecialchars($profile['reg_number']) ?></dd>

      <dt>Contact Person</dt>
      <dd><?= htmlspecialchars($profile['contact_name']) ?></dd>

      <dt>Email</dt>
      <dd><?= htmlspecialchars($profile['email']) ?></dd>

      <dt>Phone</dt>
      <dd><?= htmlspecialchars($profile['phone']) ?></dd>

      <dt>Country</dt>
      <dd><?= htmlspecialchars($profile['country']) ?></dd>

      <dt>Address</dt>
      <dd><?= htmlspecialchars($profile['address']) ?></dd>

      <dt>Business Type</dt>
      <dd><?= htmlspecialchars($profile['business_type']) ?></dd>

      <?php if (!empty($profile['website'])): ?>
      <dt>Website</dt>
      <dd><a href="<?= htmlspecialchars($profile['website']) ?>" target="_blank" rel="noopener">
        <?= htmlspecialchars($profile['website']) ?>
      </a></dd>
      <?php endif; ?>
    </dl>
    <?php endif; ?>

    <div class="card-actions">
      <a href="edit_profile.php" class="btn-outline">
        <i class="fa-solid fa-pen-to-square"></i> Edit Profile
      </a>
      <a href="logout.php" class="btn-danger">
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </a>
    </div>
  </section>

  <!-- ── RIGHT: ACTIVITY (tourists only) ─────────────────── -->
  <?php if ($userType === 'tourist'): ?>
  <div class="profile-activity">

    <!-- Bookings -->
    <section class="profile-card">
      <h2><i class="fa-solid fa-calendar-check"></i> My Bookings</h2>

      <?php if (empty($bookings)): ?>
        <p class="empty-state">You haven't made any bookings yet.
          <a href="BOOKING.HTML">Book a tour</a>
        </p>
      <?php else: ?>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Destination</th>
              <th>Travel Date</th>
              <th>Persons</th>
              <th>Booked On</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($bookings as $i => $b): ?>
            <tr>
              <td><?= $i + 1 ?></td>
              <td><?= htmlspecialchars($b['destination']) ?></td>
              <td><?= date('d M Y', strtotime($b['travel_date'])) ?></td>
              <td><?= (int) $b['num_persons'] ?></td>
              <td><?= date('d M Y', strtotime($b['created_at'])) ?></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php endif; ?>
    </section>

    <!-- Feedback -->
    <section class="profile-card">
      <h2><i class="fa-solid fa-star"></i> My Feedback</h2>

      <?php if (empty($feedbacks)): ?>
        <p class="empty-state">You haven't left any feedback yet.
          <a href="FEEDBACK.HTML">Share your experience</a>
        </p>
      <?php else: ?>
      <div class="feedback-list">
        <?php foreach ($feedbacks as $f): ?>
        <div class="feedback-item">
          <div class="fb-header">
            <span class="fb-tour"><?= htmlspecialchars($f['tour']) ?></span>
            <span class="fb-stars">
              <?php for ($s = 1; $s <= 5; $s++): ?>
                <i class="fa-<?= $s <= $f['rating'] ? 'solid' : 'regular' ?> fa-star"></i>
              <?php endfor; ?>
            </span>
          </div>
          <p class="fb-text"><?= htmlspecialchars($f['feedback_text']) ?></p>
          <p class="fb-date"><?= date('d M Y', strtotime($f['created_at'])) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>
    </section>

  </div><!-- /.profile-activity -->
  <?php endif; ?>

</main>

<!-- ── FOOTER ─────────────────────────────────────────────── -->
<footer class="footer">
  <div class="footer-container">
    <div class="footer-logo">
      <a href="HOME.HTML">
        <img src="img/DVDU4213[1].PNG" alt="AdventureCam Logo">
      </a>
      <p>Explore • Experience • Enjoy</p>
    </div>
    <div class="footer-contact">
      <h2>CONTACT US</h2>
      <p><i class="fa-solid fa-phone"></i> +237 679 893 672</p>
      <p><i class="fa-solid fa-phone"></i> +237 677 912 844</p>
      <p><i class="fa-solid fa-envelope"></i> afuhekiequeeneth@gmail.com</p>
      <p><i class="fa-solid fa-location-dot"></i> Buea, South West Region, Cameroon</p>
    </div>
    <div class="footer-social">
      <h2>FOLLOW US</h2>
      <div class="social-icons">
        <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://x.com" target="_blank"><i class="fab fa-x-twitter"></i></a>
        <a href="https://youtube.com" target="_blank"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <hr>
    <p>&copy; <span id="year"></span> AdventureCam. All Rights Reserved.</p>
    <p>Designed by AdventureCam Team</p>
  </div>
</footer>

<script>
  document.getElementById('year').textContent = new Date().getFullYear();
</script>
</body>
</html>

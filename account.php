<form id="touristForm" class="account-form" novalidate style="display:none;">

    <div class="field">
      <label for="fullName">Full Name <span class="req">*</span></label>
      <input type="text" id="fullName" name="fullName" placeholder="Enter full Name" required>
      <div class="error-msg" data-error-for="fullName"></div>
    </div>

    <div class="field">
      <label for="touristEmail">Email Address <span class="req">*</span></label>
      <input type="email" id="touristEmail" name="email" placeholder="you@example.com" required>
      <div class="error-msg" data-error-for="email"></div>
    </div>

    <div class="field">
      <label for="touristPhone">Phone Number <span class="req">*</span></label>
      <input type="tel" id="touristPhone" name="phone" placeholder="XXX XXX XXX" required>
      <div class="error-msg" data-error-for="phone"></div>
    </div>
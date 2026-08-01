const stars = document.querySelectorAll('.star');
const feedbackForm = document.querySelector('.feedback-form');
let selectedRating = 0;

function updateStars(rating) {
  stars.forEach((star) => {
    const value = Number(star.dataset.value);
    star.classList.toggle('selected', value <= rating);
  });
}

function saveRating(rating) {
  selectedRating = rating;
  updateStars(rating);

  if (feedbackForm) {
    let ratingInput = feedbackForm.querySelector('input[name="rating"]');

    if (!ratingInput) {
      ratingInput = document.createElement('input');
      ratingInput.type = 'hidden';
      ratingInput.name = 'rating';
      feedbackForm.appendChild(ratingInput);
    }

    ratingInput.value = rating;
  }
}

stars.forEach((star) => {
  const value = Number(star.dataset.value);

  star.setAttribute('tabindex', '0');
  star.setAttribute('role', 'radio');
  star.setAttribute('aria-label', `${value} star`);

  star.addEventListener('click', () => {
    saveRating(value);
  });

  star.addEventListener('mouseenter', () => {
    updateStars(value);
  });

  star.addEventListener('mouseleave', () => {
    updateStars(selectedRating);
  });

  star.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      saveRating(value);
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      saveRating(Math.min(5, value + 1));
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      saveRating(Math.max(1, value - 1));
    }
  });
});

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!selectedRating) {
      showFeedbackMessage('Please select a star rating before submitting.', 'error');
      return;
    }

    const submitBtn = feedbackForm.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.disabled   = true;
      submitBtn.textContent = 'Submitting…';
    }

    const formData = new FormData(feedbackForm);

    fetch('feedback.php', { method: 'POST', body: formData })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          showFeedbackMessage(data.message, 'success');
          feedbackForm.reset();
          selectedRating = 0;
          updateStars(0);
        } else {
          showFeedbackMessage(data.message || 'Submission failed. Please try again.', 'error');
          if (submitBtn) {
            submitBtn.disabled    = false;
            submitBtn.textContent = 'SUBMIT';
          }
        }
      })
      .catch(function () {
        showFeedbackMessage('Network error. Please check your connection.', 'error');
        if (submitBtn) {
          submitBtn.disabled    = false;
          submitBtn.textContent = 'SUBMIT';
        }
      });
  });
}

function showFeedbackMessage(msg, type) {
  let msgEl = document.getElementById('feedbackMessage');
  if (!msgEl) {
    msgEl          = document.createElement('p');
    msgEl.id       = 'feedbackMessage';
    msgEl.style.cssText =
      'margin-top:14px; padding:10px 16px; border-radius:8px; ' +
      'font-size:0.9rem; text-align:center;';
    feedbackForm.appendChild(msgEl);
  }
  msgEl.textContent       = msg;
  msgEl.style.background  = type === 'success' ? '#d4edda' : '#f8d7da';
  msgEl.style.color       = type === 'success' ? '#155724' : '#721c24';
  msgEl.style.display     = 'block';
}

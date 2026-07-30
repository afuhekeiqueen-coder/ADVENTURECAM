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
    if (!selectedRating) {
      event.preventDefault();
      alert('Please select a rating before submitting.');
    }
  });
}

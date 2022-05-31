const show_modal = document.querySelector('.set-goal-prompt');
const modal = document.querySelector('.modal');
const close_modal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const add_goal_btn = document.querySelector('.submit-goal');

export default function modalFeature() {
  const openModal = function () {
    modal.classList.remove('hide');
    overlay.classList.remove('hide');
  };

  show_modal.addEventListener('click', openModal);

  const closeModal = function () {
    modal.classList.add('hide');
    overlay.classList.add('hide');
  };

  close_modal.addEventListener('click', closeModal);

  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Need to write function to close and also send the data to database
  add_goal_btn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      closeModal();
    }
  });
}

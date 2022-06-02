import addNewGoal from './addNewGoal.js';

const show_goal_modal = document.querySelector('.set-goal-prompt');
const show_to_do_modal = document.querySelector('.add-to-do-button');
const modal = document.querySelector('.add-goal-modal');
const to_do_modal = document.querySelector('.add-to-do-modal');
const close_modal = document.querySelector('.close-modal');
const close_to_do_modal = document.querySelector('.close-to-do-button');
const overlay = document.querySelector('.overlay');
const add_goal_btn = document.querySelector('.submit-goal');
const add_to_do_btn = document.querySelector('.submit-to-do');

export default function modalFeature() {
  const openModal = function () {
    modal.classList.remove('hide');
    overlay.classList.remove('hide');
  };

  const openToDoModal = function () {
    to_do_modal.classList.remove('hide');
    overlay.classList.remove('hide');
  };

  show_goal_modal.addEventListener('click', openModal);

  show_to_do_modal.addEventListener('click', openToDoModal);

  const closeModals = function () {
    modal.classList.add('hide');
    to_do_modal.classList.add('hide');
    overlay.classList.add('hide');
  };

  close_modal.addEventListener('click', closeModals);

  close_to_do_modal.addEventListener('click', closeModals);

  overlay.addEventListener('click', closeModals);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModals();
    }
  });

  add_goal_btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModals();
    addNewGoal();
  });

  add_to_do_btn.addEventListener('click', closeModals);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeModals();
      addNewGoal();
    }
  });
}

import { addNewGoal } from './appLogic.js';
import { addToDo } from './appLogic.js';
import { editToDoStorage } from './storage.js';

const show_goal_modal = document.querySelector('.set-goal-prompt');
const show_to_do_modal = document.querySelector('.add-to-do-button');
const modal = document.querySelector('.add-goal-modal');
const to_do_modal = document.querySelector('.add-to-do-modal');
const close_modal = document.querySelector('.close-modal');
const close_to_do_modal = document.querySelector('.close-to-do-button');
const close_edit_modal_btn = document.querySelector('.close-edit-modal');
const overlay = document.querySelector('.overlay');
const add_goal_btn = document.querySelector('.submit-goal');
const add_to_do_btn = document.querySelector('.submit-to-do');
const edit_to_do_btn = document.querySelector('.edit-to-do');
const edit_to_do_modal = document.querySelector('.edit-to-do-modal');

function openModal() {
  modal.classList.remove('hide');
  overlay.classList.remove('hide');
}

function openToDoModal() {
  to_do_modal.classList.remove('hide');
  overlay.classList.remove('hide');
}

function closeModals() {
  modal.classList.add('hide');
  to_do_modal.classList.add('hide');
  edit_to_do_modal.classList.add('hide');
  overlay.classList.add('hide');
}

export function openEditModal() {
  edit_to_do_modal.classList.remove('hide');
  overlay.classList.remove('hide');
}

export default function modalFeature() {
  show_goal_modal.addEventListener('click', openModal);

  show_to_do_modal.addEventListener('click', openToDoModal);

  close_modal.addEventListener('click', closeModals);

  close_to_do_modal.addEventListener('click', closeModals);

  close_edit_modal_btn.addEventListener('click', closeModals);

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

  add_to_do_btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModals();
    addToDo();
  });

  edit_to_do_btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModals();
    editToDoStorage();
  });

  to_do_modal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeModals();
      addToDo();
    }
  });

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeModals();
      addNewGoal();
    }
  });

  edit_to_do_modal.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeModals();
      editToDoStorage();
    }
  });
}

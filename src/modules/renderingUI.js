import { goalListStorage } from './storage.js';
import { deleteGoal } from './appLogic.js';

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function renderGoalsFromStorage() {
  const goalsContainer = document.querySelector('.goals-container');

  clearElement(goalsContainer);

  goalListStorage.forEach((goal) => {
    const markUpGoals = `
      <div class="goal button" data-goal>
        <div class="goal-sign">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14.4,6H20V16H13L12.6,14H7V21H5V4H14L14.4,6M14,14H16V12H18V10H16V8H14V10L13,8V6H11V8H9V6H7V8H9V10H7V12H9V10H11V12H13V10L14,12V14M11,10V8H13V10H11M14,10H16V12H14V10Z"></path>
            </svg>
            <ul class="goal button set-goal-text button">${goal}</ul>
        </div>
        <div class="delete-btn">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
          </svg>
        </div>
      </div>
    `;

    goalsContainer.insertAdjacentHTML('afterbegin', markUpGoals);
  });
}

export function renderActiveGoal() {
  const goals = document.querySelectorAll('[data-goal]');

  function removeActiveGoals() {
    goals.forEach((goal) => {
      goal.classList.remove('active-goal');
    });
  }

  goals.forEach((goal) => {
    goal.addEventListener('click', () => {
      removeActiveGoals();
      goal.classList.add('active-goal');
    });
  });
}

function renderDeleteGoal() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const deletedGoal = btn.parentElement.innerText;
      deleteGoal();
      // deleteGoal(deletedGoal);
    });
  });
}

export default function renderUI() {
  renderGoalsFromStorage();
  renderActiveGoal();
  renderDeleteGoal();
}

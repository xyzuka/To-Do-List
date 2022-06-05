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

  goalListStorage.goals.forEach((goal) => {
    const markUpGoals = `
      <div class="goal" data-goal>
        <div class="goal-sign">
            <ul class="goal button set-goal-text button">${goal}</ul>
        </div>
        <div class="delete-btn" data-delete-btn>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
          </svg>
        </div>
      </div>
    `;

    goalsContainer.insertAdjacentHTML('beforeend', markUpGoals);
  });

  renderDeleteGoal();
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
  const deleteButtons = document.querySelectorAll('[data-delete-btn]');

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const deletedGoal = btn.parentElement.innerText;
      deleteGoal(deletedGoal);
      // deleteGoal(deletedGoal);
    });
  });
}

export default function renderUI() {
  renderGoalsFromStorage();
  renderActiveGoal();
}

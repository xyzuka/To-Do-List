import { goalListStorage } from './storage.js';
import { renderGoalsFromStorage } from './renderingUI.js';

const submitGoalBtn = document.querySelector('.submit-goal');
const newGoalForm = document.querySelector('[data-new-goal]');
const goalInput = document.getElementById('goalTitle');

export default function addNewGoal() {
  const goal = goalInput.value;
  goalListStorage.push(goal);
  console.log(goalListStorage);
  goalInput.value = null;
  renderGoalsFromStorage();
}

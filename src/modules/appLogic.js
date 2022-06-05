import { goalListStorage } from './storage.js';
import { renderGoalsFromStorage, renderActiveGoal } from './renderingUI.js';
import modalFeature from './modalFeature.js';

const goalInput = document.getElementById('goalTitle');

export default function addNewGoal() {
  const goal = goalInput.value;
  console.log(goal);

  if (!goal || goal === ' ') return alert('Please add a goal!');

  goalListStorage.add = goal;

  goalInput.value = null;
  renderGoalsFromStorage();
  renderActiveGoal();
}

export function deleteGoal(deletedGoal) {
  goalListStorage.delete = deletedGoal;
  renderGoalsFromStorage();
  renderActiveGoal();
}

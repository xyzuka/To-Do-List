import { goalListStorage } from './storage.js';
import { renderGoalsFromStorage, renderActiveGoal } from './renderingUI.js';

const goalInput = document.getElementById('goalTitle');

export default function addNewGoal() {
  const goal = goalInput.value;
  goalListStorage.push(goal);
  console.log(goalListStorage);
  goalInput.value = null;
  renderGoalsFromStorage();
  renderActiveGoal();
}

export function deleteGoal(deletedGoal) {
  console.log(deletedGoal);
  console.log(goalListStorage);

  const updatedGoalListStorage = goalListStorage.filter(
    (goal) => goal != deletedGoal
  );

  goalListStorage = updatedGoalListStorage;
}

import { goalListStorage } from './storage.js';
import { renderGoalsFromStorage, renderActiveGoal } from './renderingUI.js';
import modalFeature from './modalFeature.js';

const goalInput = document.getElementById('goalTitle');

export default function addNewGoal() {
  const goal = goalInput.value;

  if (!goal || goal === ' ') return alert('Please add a goal!');

  goalListStorage.push(goal);
  console.log(goalListStorage);
  goalInput.value = null;
  renderGoalsFromStorage();
  renderActiveGoal();
}

export function deleteGoal(deletedGoal) {
  console.log(deletedGoal);

  let updatedGoalListStorage = goalListStorage.filter(
    (goal) => goal != deletedGoal
  );

  console.log(updatedGoalListStorage);

  // goalListStorage = updatedGoalListStorage;

  // console.log(deletedGoal);
  // console.log(goalListStorage);
  // let updatedGoalListStorage = goalListStorage.filter(
  //   (goal) => goal != deletedGoal
  // );
  // console.log(updatedGoalListStorage);
  // goalListStorage = updatedGoalListStorage;
}

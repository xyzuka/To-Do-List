import { goalListStorage, toDoStorage } from './storage.js';
import { toDoItem } from './storage.js';
import {
  renderGoalsFromStorage,
  renderActiveGoal,
  renderToDosFromStorage,
} from './renderingUI.js';
import modalFeature from './modalFeature.js';

const goalInput = document.getElementById('goalTitle');

function checkDup(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal;
  });
}

export function addNewGoal() {
  const goal = goalInput.value;
  console.log(goal);

  if (!goal || goal === ' ') return alert('Please add a goal!');

  if (checkDup(goalListStorage.goals, goal))
    return alert('No duplicates are allowed');

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

export function addToDo() {
  const title = document.getElementById('to-do-title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('due-date').value;

  const newToDo = new toDoItem(title, description, dueDate);

  toDoStorage.push(newToDo);

  renderToDosFromStorage();
}

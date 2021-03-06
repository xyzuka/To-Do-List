import { goalListStorage, toDoStorage } from './storage.js';
import { toDoItem } from './storage.js';
import { updateToDoCheck } from './storage.js';
import { updateToDoStorage } from './storage.js';
import { updateLocalStorageToDos } from './storage.js';
import {
  renderGoalsFromStorage,
  renderActiveGoal,
  renderToDosFromStorage,
  showToDosForGoal,
} from './renderingUI.js';
import * as dayjs from 'dayjs';

const goalInput = document.getElementById('goalTitle');

function checkDup(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal;
  });
}

export function addNewGoal() {
  const goal = goalInput.value;

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

export function deleteToDo(deletedToDo) {
  // toDoStorage.deleteItem(deletedToDo);
  updateToDoStorage(deletedToDo);
  renderToDosFromStorage();
}

export function addToDo() {
  const titleInput = document.getElementById('to-do-title');
  const descriptionInput = document.getElementById('description');
  const dueDateInput = document.getElementById('due-date');
  const title = document.getElementById('to-do-title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('due-date').value;
  const formattedDate = dayjs(dueDate).format(`D MMMM YYYY`);
  const priority = document.getElementById('priority').value;
  const done = false;
  let goal = [];

  // Sorting to dos based on goals: loop through the tabs and goals to see which one has the 'active-goal-focus' class
  const taskBtns = document.querySelectorAll('.task-btn');
  const goalBtns = document.querySelectorAll('[data-goal]');

  taskBtns.forEach((btn) => {
    if (btn.classList.contains('active-goal-focus')) {
      goal = [];
      return goal.push(btn.textContent);
    }
  });

  goalBtns.forEach((btn) => {
    if (btn.classList.contains('active-goal-focus')) {
      goal = [];
      return goal.push(btn.outerText);
    }
  });

  const newToDo = new toDoItem(
    title,
    description,
    formattedDate,
    done,
    goal[0],
    priority
  );

  if (!title || title === '') return alert('Please fill in a title!');
  if (!description || description === '')
    return alert('Please fill in a description!');
  if (!dueDate || dueDate === '') return alert('Please fill in a dueDate!');

  toDoStorage.push(newToDo);

  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';

  // Send to local storage
  updateLocalStorageToDos();

  // Render based on the goal selected
  showToDosForGoal(goal[0]);
}

export function updateToDoAsDone(btn) {
  updateToDoCheck(btn);
}

export let currentToDoTitle;
export let currentToDoDescription;
export let currentToDoDueDate;
export let currentPriority;

// Used to search for to do information to be used in editing
export function loadToDoInfo() {
  const toDoTitle = document.querySelector('[data-edit-title]').value;

  // searching for specific object in storage to store old variables
  let searchStorage = toDoStorage.find((o) => o.title === toDoTitle);

  currentToDoTitle = searchStorage.title;
  currentToDoDescription = searchStorage.description;
  currentToDoDueDate = searchStorage.dueDate;
  currentPriority = searchStorage.priority;

  // searching for specific object in storage
  let toDoObjectSearch = toDoStorage.find((o) => o.title === currentToDoTitle);
}

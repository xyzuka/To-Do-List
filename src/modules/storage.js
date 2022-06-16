// export let goalListStorage = ['Fitness', 'Coding', 'Personal'];

import {
  currentToDoTitle,
  currentToDoDescription,
  currentToDoDueDate,
  updateToDoAsDone,
} from './appLogic';
import { renderGoalsFromStorage, renderToDosFromStorage } from './renderingUI';
import * as dayjs from 'dayjs';

function updateLocalStorageGoals() {
  localStorage.setItem(
    'goalListStorage',
    JSON.stringify(goalListStorage.goals)
  );
}

export function updateLocalStorageToDos() {
  localStorage.setItem('toDoStorage', JSON.stringify(toDoStorage));
}

export default function loadLocalStorage() {
  if (localStorage.goalListStorage) {
    let goals = JSON.parse(localStorage.getItem('goalListStorage'));
    goalListStorage.goals = goals;
    renderGoalsFromStorage();
  }

  if (localStorage.toDoStorage) {
    let toDos = JSON.parse(localStorage.getItem('toDoStorage'));
    toDoStorage = toDos;
    renderToDosFromStorage();
  }
}

export const goalListStorage = {
  set add(name) {
    this.goals.push(name);
    updateLocalStorageGoals();
  },
  set delete(name) {
    const newGoalsArray = this.goals.filter((goal) => goal != name);
    this.goals = newGoalsArray;
    updateLocalStorageGoals();
  },
  goals: ['Personal', 'Coding', 'Fitness'],
};

export let toDoStorage = [
  {
    title: 'Gym',
    description: 'We go Jim',
    dueDate: '22 June 2022',
    done: false,
  },
  {
    title: 'Coding',
    description: 'Complete To Do Project',
    dueDate: '11 June 2022',
    done: false,
  },
];

export class toDoItem {
  constructor(title, description, dueDate, done) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.done = done;
  }
}

export const updateToDoStorage = function (deletedToDo) {
  const findToDoObj = function (toDoObj) {
    let obj = toDoStorage.find((o) => o.title === toDoObj);
    return obj.title;
  };

  const newToDoArray = toDoStorage.filter(
    (toDoObj) => toDoObj.title != findToDoObj(deletedToDo)
  );

  toDoStorage = newToDoArray;

  updateLocalStorageToDos();
};

export function updateToDoCheck(btn) {
  const toDoObjectTitle = btn.nextElementSibling.textContent;
  const isToDoItemChecked = btn.checked;

  let toDoObj = toDoStorage.find((object) => object.title === toDoObjectTitle);

  if (isToDoItemChecked) {
    toDoObj.done = true;
    updateLocalStorageToDos();
  } else {
    toDoObj.done = false;
    updateLocalStorageToDos();
  }
}

export function editToDoStorage() {
  const editedToDoTitle = document.querySelector('[data-edit-title]').value;
  const editedToDoDescription = document.querySelector(
    '[data-edit-description]'
  ).value;
  const editedToDoDueDate = document.querySelector(
    '[data-edit-due-date]'
  ).value;
  const formattedDate = dayjs(editedToDoDueDate).format(`D MMMM YYYY`);

  // searching for specific object in storage
  let toDoObjectSearch = toDoStorage.find((o) => o.title === currentToDoTitle);

  // updating with new edited item
  toDoObjectSearch.title = editedToDoTitle;
  toDoObjectSearch.description = editedToDoDescription;
  toDoObjectSearch.dueDate = formattedDate;

  // updating local storage
  updateLocalStorageToDos();

  // render new edited to do
  renderToDosFromStorage();
}

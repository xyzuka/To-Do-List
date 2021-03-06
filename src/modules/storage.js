// export let goalListStorage = ['Fitness', 'Coding', 'Personal'];

import { currentToDoTitle } from './appLogic';
import {
  renderGoalsFromStorage,
  renderToDosFromStorage,
  renderActiveTasks,
} from './renderingUI';
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
    title: 'Max out testing',
    description:
      'Training block is almost over. Will need to take a week off the gym so I can to test my one rep maxes.',
    dueDate: '22 June 2022',
    done: true,
    goal: 'Fitness',
    priority: 'No',
  },
  {
    title: 'Coding my Project',
    description:
      'Complete To Do Project for the Odin Project. This is a tricky project since Webpack is pretty confusing!',
    dueDate: '30 June 2022',
    done: false,
    goal: 'Coding',
    priority: 'Yes',
  },
  {
    title: 'Complete my taxes',
    description:
      'Taxes are due at the end of this month. Need to visit my Accountant to see if I can deduct this mechanical keyboard I purchased for coding...',
    dueDate: '30 June 2022',
    done: false,
    goal: 'Personal',
    priority: 'Yes',
  },
  {
    title: 'Deload',
    description:
      'Take a week off training since my body will be taxed from the max testing.',
    dueDate: '22 June 2022',
    done: false,
    goal: 'Fitness',
    priority: 'No',
  },
];

export let temporaryToDoStorage = [];

export function clearTempStorage() {
  let emptyTemp = [];
  temporaryToDoStorage = emptyTemp;
}

export class toDoItem {
  constructor(title, description, dueDate, done, goal, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.done = done;
    this.goal = goal;
    this.priority = priority;
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
  const editedPriority = document.querySelector('[data-edit-priority]').value;
  const allTasksBtn = document.querySelector('[data-all-tasks-btn]');

  // searching for specific object in storage
  let toDoObjectSearch = toDoStorage.find((o) => o.title === currentToDoTitle);

  // updating with new edited item
  toDoObjectSearch.title = editedToDoTitle;
  toDoObjectSearch.description = editedToDoDescription;
  toDoObjectSearch.dueDate = formattedDate;
  toDoObjectSearch.priority = editedPriority;

  // updating local storage
  updateLocalStorageToDos();

  // render new edited to do
  renderActiveTasks(allTasksBtn);
  renderToDosFromStorage();
}

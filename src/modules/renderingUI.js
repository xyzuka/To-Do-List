import {
  goalListStorage,
  toDoStorage,
  temporaryToDoStorage,
  clearTempStorage,
} from './storage.js';
import {
  deleteGoal,
  deleteToDo,
  loadToDoInfo,
  updateToDoAsDone,
} from './appLogic.js';
import { openEditModal } from './modalFeature.js';
import dayjs from 'dayjs';

var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

const allTasksBtn = document.querySelector('[data-all-tasks-btn]');
const todayBtn = document.querySelector('[data-today-tasks]');
const thisWeekBtn = document.querySelector('[data-weekly-tasks]');
const priorityBtn = document.querySelector('[data-priority-tasks]');
const goalsContainer = document.querySelector('.goals-container');
const toDosContainer = document.querySelector('.to-dos-container');
const addToDoBtnContainer = document.querySelector(
  '.add-to-do-button-container'
);
const date = document.getElementById('date');
const month = document.getElementById('month');
const year = document.getElementById('year');

export function renderGoalsFromStorage() {
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
  renderActiveGoal();
}

export function renderToDosFromStorage() {
  clearElement(toDosContainer);

  for (const toDo of toDoStorage) {
    let toDoMarkUp = `
    <section class="to-do-item border">
      <div class="check-and-title">
        <div class="circle">
          <input class="checkbox" type="checkbox" id="checkbox-${toDo.title}"/>
          <label for="checkbox-${toDo.title}">${toDo.title}</label>
        </div>
      </div>

      <div class="to-do-options">
        <p>${toDo.dueDate}</p>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button edit-btn">
          <path fill="currentColor" d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" />
          </svg>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button delete-btn" data-delete-to-do-btn>
          <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
        </svg>
        </div>
    </section>
  `;

    if (toDo.done) {
      toDoMarkUp = ` <section class="to-do-item border">
      <div class="check-and-title">
        <div class="circle">
          <input class="checkbox" type="checkbox" id="checkbox-${toDo.title}" checked/>
          <label for="checkbox-${toDo.title}">${toDo.title}</label>
        </div>
      </div>

      <div class="to-do-options">
        <p>${toDo.dueDate}</p>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button edit-btn">
          <path fill="currentColor" d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" />
          </svg>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button delete-btn" data-delete-to-do-btn>
          <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
        </svg>
        </div>
    </section>
      `;
    }

    toDosContainer.insertAdjacentHTML('beforeend', toDoMarkUp);
  }

  renderDeleteToDo();
  renderEditModal();
  renderToDoAsDone();
}

export function renderSpecificToDo(specificToDo) {
  const toDosContainer = document.querySelector('.to-dos-container');

  clearElement(toDosContainer);

  specificToDo.forEach((toDo) => {
    let toDoMarkUp = `
    <section class="to-do-item border">
      <div class="check-and-title">
        <div class="circle">
          <input class="checkbox" type="checkbox" id="checkbox-${toDo.title}"/>
          <label for="checkbox-${toDo.title}">${toDo.title}</label>
        </div>
      </div>

      <div class="to-do-options">
        <p>${toDo.dueDate}</p>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button edit-btn">
          <path fill="currentColor" d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" />
          </svg>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button delete-btn" data-delete-to-do-btn>
          <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
        </svg>
        </div>
    </section>
  `;

    if (toDo.done) {
      toDoMarkUp = ` <section class="to-do-item border">
      <div class="check-and-title">
        <div class="circle">
          <input class="checkbox" type="checkbox" id="checkbox-${toDo.title}" checked/>
          <label for="checkbox-${toDo.title}">${toDo.title}</label>
        </div>
      </div>

      <div class="to-do-options">
        <p>${toDo.dueDate}</p>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button edit-btn">
          <path fill="currentColor" d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" />
          </svg>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="button delete-btn" data-delete-to-do-btn>
          <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
        </svg>
        </div>
    </section>
      `;
    }

    toDosContainer.insertAdjacentHTML('beforeend', toDoMarkUp);
  });

  renderDeleteToDo();
  renderEditModal();
  renderToDoAsDone();
}

export function showToDosForGoal(goal) {
  const toDosContainer = document.querySelector('.to-dos-container');
  clearTempStorage();
  clearElement(toDosContainer);
  toDoStorage.forEach((toDo) => {
    // filter through matching to dos
    if (toDo.goal === goal.innerText || toDo.goal === goal) {
      // push these to dos to the temporary array (always clear it before adding)
      temporaryToDoStorage.push(toDo);
      // render
      renderSpecificToDo(temporaryToDoStorage);
    }
  });
}

function removeActiveGoals() {
  const goals = document.querySelectorAll('[data-goal]');
  goals.forEach((goal) => {
    goal.classList.remove('active-goal');
    goal.classList.remove('active-goal-focus');
  });
}

function removeActiveTasks() {
  const taskBtns = document.querySelectorAll('.task-btn');
  taskBtns.forEach((task) => {
    task.classList.remove('active-goal-focus');
    task.classList.remove('active-goal');
  });
}

export function renderActiveTasks(btn) {
  removeActiveTasks();
  removeActiveGoals();
  btn.classList.add('active-goal-focus');
}

export function renderActiveGoal() {
  const goals = document.querySelectorAll('[data-goal]');
  goals.forEach((goal) => {
    goal.addEventListener('click', () => {
      removeActiveGoals();
      removeActiveTasks();
      showToDosForGoal(goal);
      goal.classList.add('active-goal');
      goal.classList.add('active-goal-focus');
    });
  });
}

function renderDeleteGoal() {
  const deleteButtons = document.querySelectorAll('[data-delete-btn]');

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const deletedGoal = btn.parentElement.innerText;
      deleteGoal(deletedGoal);
    });
  });
}

function renderDeleteToDo() {
  const deleteToDoBtns = document.querySelectorAll('[data-delete-to-do-btn]');

  deleteToDoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const deletedToDo = btn.parentElement.previousElementSibling.innerText;
      deleteToDo(deletedToDo);
    });
  });
}

function setSelectedIndex(s, v) {
  for (let i = 0; i < s.options.length; i++) {
    if (s.options[i].text == v) {
      s.options[i].selected = true;
      return;
    }
  }
}

function renderEditContentFromStorage(btn) {
  const toDoTitle = document.querySelector('[data-edit-title]');
  const toDoDescription = document.querySelector('[data-edit-description]');
  const toDoDueDate = document.querySelector('[data-edit-due-date]');
  const priorityValue = document.querySelector('[data-edit-priority]');

  const toDoInnerText =
    btn.parentElement.firstElementChild.parentElement.previousElementSibling
      .innerText;

  let toDoObj = toDoStorage.find((o) => o.title === toDoInnerText);

  const toDoDueDateReformatted = dayjs(toDoObj.dueDate).format(`YYYY-MM-D`);

  toDoTitle.value = toDoObj.title;
  toDoDescription.value = toDoObj.description;
  toDoDueDate.value = toDoDueDateReformatted;

  if (toDoObj.priority === 'Yes') {
    setSelectedIndex(priorityValue, 'Yes');
  } else {
    setSelectedIndex(priorityValue, 'No');
  }
}

function renderEditModal() {
  const editToDoBtns = document.querySelectorAll('.edit-btn');

  editToDoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openEditModal();
      renderEditContentFromStorage(btn);
      loadToDoInfo();
    });
  });
}

function renderToDoAsDone() {
  const checkBtns = document.querySelectorAll('.checkbox');

  checkBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      updateToDoAsDone(btn);
    });
  });
}

function renderToDosForToday() {
  const dateToday = `${date.textContent} ${month.textContent} ${year.textContent}`;

  clearElement(toDosContainer);
  clearTempStorage();

  toDoStorage.forEach((toDo) => {
    if (toDo.dueDate === dateToday) {
      clearElement(toDosContainer);
      temporaryToDoStorage.push(toDo);
      renderSpecificToDo(temporaryToDoStorage);
    }
  });
}

function renderToDosForWeek() {
  const today = new Date();

  const nextWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );

  const todayReformatted = dayjs(today).format(`D MMMM YYYY`);
  const startOfWeek = dayjs(todayReformatted)
    .subtract(1, 'day')
    .format(`D MMMM YYYY`);
  const endOfWeek = dayjs(nextWeek).format(`D MMMM YYYY`);

  clearTempStorage();
  clearElement(toDosContainer);

  toDoStorage.forEach((toDo) => {
    const check = dayjs(toDo.dueDate).isBetween(
      dayjs(startOfWeek),
      dayjs(endOfWeek)
    );

    if (check) {
      temporaryToDoStorage.push(toDo);
      return renderSpecificToDo(temporaryToDoStorage);
    }
  });
}

function renderPriorities() {
  clearElement(toDosContainer);
  clearTempStorage();

  toDoStorage.forEach((toDo) => {
    if (toDo.priority === 'Yes') {
      temporaryToDoStorage.push(toDo);
      return renderSpecificToDo(temporaryToDoStorage);
    }
  });
}

function hideAddToDoBtn() {
  if (
    todayBtn.classList.contains('active-goal-focus') ||
    thisWeekBtn.classList.contains('active-goal-focus')
  ) {
    addToDoBtnContainer.classList.add('hide');
  } else {
    addToDoBtnContainer.classList.remove('hide');
  }
}

allTasksBtn.addEventListener('click', () => {
  renderActiveTasks(allTasksBtn);
  hideAddToDoBtn();
  renderToDosFromStorage();
});

todayBtn.addEventListener('click', () => {
  renderActiveTasks(todayBtn);
  hideAddToDoBtn();
  renderToDosForToday();
});

thisWeekBtn.addEventListener('click', () => {
  renderActiveTasks(thisWeekBtn);
  hideAddToDoBtn();
  renderToDosForWeek();
});

priorityBtn.addEventListener('click', () => {
  renderActiveTasks(priorityBtn);
  hideAddToDoBtn();
  renderPriorities();
});

export default function renderUI() {
  renderGoalsFromStorage();
  renderToDosFromStorage();
}

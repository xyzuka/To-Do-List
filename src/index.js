import _ from 'lodash';
import './style.css';
import modalFeature from './modules/modalFeature';
import { timeAndDayUpdate } from './modules/timeFeature.js';
import renderUI from './modules/renderingUI.js';
import updateLocalStorageGoals from './modules/storage.js';

function initToDoApp() {
  modalFeature();
  setInterval(timeAndDayUpdate, 1000);
  renderUI();
  updateLocalStorageGoals();
}

document.addEventListener('DOMContentLoaded', initToDoApp);

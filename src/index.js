import _ from 'lodash';
import './style.css';
import modalFeature from './modules/modalFeature';
import { timeAndDayUpdate } from './modules/timeFeature.js';
import renderUI from './modules/renderingUI.js';
import updateLocalStorage from './modules/storage.js';

function initToDoApp() {
  modalFeature();
  setInterval(timeAndDayUpdate, 1000);
  renderUI();
  updateLocalStorage();
}

document.addEventListener('DOMContentLoaded', initToDoApp);

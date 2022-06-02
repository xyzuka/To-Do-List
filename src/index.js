import _ from 'lodash';
import './style.css';
import modalFeature from './modules/modalFeature';
import { timeAndDayUpdate } from './modules/timeFeature.js';
// import addNewGoal from './modules/addNewGoal.js';
import renderUI from './modules/renderingUI.js';

function initToDoApp() {
  modalFeature();
  setInterval(timeAndDayUpdate, 1000);
  // addNewGoal();
  renderUI();
}

document.addEventListener('DOMContentLoaded', initToDoApp);

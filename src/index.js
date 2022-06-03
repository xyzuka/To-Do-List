import _ from 'lodash';
import './style.css';
import modalFeature from './modules/modalFeature';
import { timeAndDayUpdate } from './modules/timeFeature.js';
import renderUI from './modules/renderingUI.js';

function initToDoApp() {
  modalFeature();
  setInterval(timeAndDayUpdate, 1000);
  renderUI();
}

document.addEventListener('DOMContentLoaded', initToDoApp);

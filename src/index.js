import _ from 'lodash';
import './style.css';
import modalFeature from './modules/modalFeature';
import { timeAndDayUpdate } from './modules/timeFeature.js';

function initToDoApp() {
  modalFeature();
  setInterval(timeAndDayUpdate, 1000);
}

document.addEventListener('DOMContentLoaded', initToDoApp);

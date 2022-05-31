import _ from 'lodash';
import './style.css';
import modalFeature from './modules/modalWindows.js';

function initToDoApp() {
  modalFeature();
}

document.addEventListener('DOMContentLoaded', initToDoApp);

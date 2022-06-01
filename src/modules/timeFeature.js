// Date and time and real-time
const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');
const amPmEl = document.getElementById('am_pm');
const dayEl = document.getElementById('day');
const dateEl = document.getElementById('date');
const monthEl = document.getElementById('month');
const yearEl = document.getElementById('year');

function timeFeature() {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let amPm = currentHour >= 12 ? 'pm' : 'am';

  if (currentHour > 12) {
    currentHour -= 12;
  }

  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
  amPmEl.textContent = amPm;
}

function dayFeature() {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = new Date();

  let currentDay = days[day.getDay()];
  let currentDate = day.getDate();
  let currentMonth = months[day.getMonth()];
  let currentYear = day.getFullYear();

  dayEl.textContent = currentDay;
  dateEl.textContent = currentDate;
  monthEl.textContent = currentMonth;
  yearEl.textContent = currentYear;
}

export function timeAndDayUpdate() {
  timeFeature();
  dayFeature();
}

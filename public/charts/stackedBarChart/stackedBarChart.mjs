import { BAR_CHART_CLASS, BAR_CHART_HEIGHT } from "../../lib/constants/index.js";
import { STACKED_BAR_CHART_DATA } from "./data.js";

import handleArrowKeys from "../../lib/helpers/keyboard/handleArrowKeys.mjs";

const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Add event listeners
document.addEventListener('focus', initBarChart, true);
document.addEventListener('blur', initBarChart, true);
canvas.addEventListener('click', handleClick, false);
// canvas.addEventListener('keydown', e => handleArrowKeys(e, bars), false);

function initBarChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  STACKED_BAR_CHART_DATA.map((bar, i) => {
    const segments = [...bars[i].children];
    const coordinates = bar.stackedCoordinates;

    segments.map((segment, i) => {
      drawStackedBar(segment, coordinates[i]);
    });
  });
}

function handleClick(e) {
  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  
  // Find the current segment with tabindex and remove it
  const currentTabIndex = document.querySelector('span[tabindex="0"]');
  if (currentTabIndex) currentTabIndex.removeAttribute('tabindex');

  STACKED_BAR_CHART_DATA.map((bar, i) => {
    const segments = [...bars[i].children];
    const coordinates = bar.stackedCoordinates;

    segments.map((segment, i) => {
      const {
        elemId,
        x_start,
        x_end,
        y_start,
        y_end,
      } = coordinates[i];
      const activeBar = document.activeElement === 'body' ? undefined : document.getElementById(elemId);

      if ((x >= x_start && x <= x_end) && (y >= y_start && y <= y_end)) {
        activeBar.setAttribute('tabindex', '0');
        activeBar.focus();
      }
    });
  });
}

function drawStackedBar(el, stackedCoordinates) {
  const active = document.activeElement === el;
  const height = BAR_CHART_HEIGHT;

  const {
    elemId,
    x_start,
    x_end,
    y_start,
    y_end
  } = stackedCoordinates;

  // Stacked bar segments
  ctx.fillStyle = active ? 'rebeccapurple' : 'lightgray';
  ctx.fillRect(
    x_start,
    y_start,
    x_end - x_start,
    y_end - y_start
  );

  // Segment text value
  ctx.font = '16px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = active ? 'white' : 'black';
  ctx.fillText(
    el.textContent,
    x_start + 15,
    y_start + height / 2
  );

  // Define clickable area
  ctx.beginPath();
  ctx.rect(
    x_start,
    y_start,
    x_end - x_start,
    height
  );

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}

export default initBarChart;

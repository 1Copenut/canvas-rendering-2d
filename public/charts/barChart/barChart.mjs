import { BAR_CHART_CLASS, BAR_CHART_HEIGHT } from "../../lib/constants/index.js";
import { BAR_CHART_DATA } from "./data.js";

import handleArrowKeys from "../../lib/helpers/keyboard/handleArrowKeys.mjs";
import handleClick from "../../lib/helpers/mouse/handleClick.mjs";

const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Add event listeners
document.addEventListener('focus', initBarChart, true);
document.addEventListener('blur', initBarChart, true);
canvas.addEventListener('click', e => handleClick(e, bars, BAR_CHART_DATA), false);
canvas.addEventListener('keydown', e => handleArrowKeys(e, bars), false);

function initBarChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  BAR_CHART_DATA.map((bar, i) => drawBar(
    bars[i],
    bar.x_start,
    bar.y_start,
    bar.x_end,
    bar.y_end
  ));
}

function drawBar(el, x_start, y_start, x_end, y_end) {
  const active = document.activeElement === el;
  const height = BAR_CHART_HEIGHT;

  // Button background
  ctx.fillStyle = active ? 'rebeccapurple' : 'lightgray';
  ctx.fillRect(x_start, y_start, x_end, height);

  // Button text
  ctx.font = '16px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = active ? 'white' : 'black';
  ctx.fillText(el.textContent, x_start + 15, y_start + height / 2);

  // Define clickable area
  ctx.beginPath();
  ctx.rect(x_start, y_start, x_end, height);

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}

export default initBarChart;

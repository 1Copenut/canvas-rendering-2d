import { BAR_CHART_CLASS, BAR_CHART_HEIGHT } from "../../lib/constants/index.js";
import { BAR_CHART_DATA } from "./data.js";

import handleBarChartArrowKeys from "../../lib/helpers/keyboard/handleBarChartArrowKeys.mjs";
import handleBarChartClick from "../../lib/helpers/mouse/handleBarChartClick.mjs";

const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Add event listeners
document.addEventListener('focus', initBarChart, true);
document.addEventListener('blur', initBarChart, true);
canvas.addEventListener('click', e => handleBarChartClick(e, bars, BAR_CHART_DATA.coordinates), false);
canvas.addEventListener('keydown', e => handleBarChartArrowKeys(e, bars), false);

function initBarChart(labelText) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  BAR_CHART_DATA.coordinates.map((bar, i) => drawBar(
    bars[i],
    bar.x_start,
    bar.y_start,
    bar.x_end,
    bar.y_end
  ));

  // Draw the chart label
  drawChartLabel(BAR_CHART_DATA.chartLabel)
}

function drawBar(el, x_start, y_start, x_end, y_end) {
  const active = document.activeElement === el;
  const height = BAR_CHART_HEIGHT;

  // Button background
  ctx.fillStyle = active ? 'rebeccapurple' : 'lightgray';
  ctx.fillRect(
    x_start,
    y_start,
    x_end - x_start,
    y_end - y_start
  );

  // Button text
  ctx.font = '16px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = active ? 'white' : 'black';
  ctx.fillText(el.textContent, x_start + 15, y_start + height / 2);

  // Define clickable area
  ctx.beginPath();
  ctx.rect(
    x_start,
    y_start,
    x_end - x_start,
    y_end - y_start
  );

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}

function drawChartLabel(labelText) {
  console.log('Called drawChartLabel');
  console.log(labelText);

  ctx.font = '16px bold Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(labelText, 250, 475, 500);
}

export default initBarChart;

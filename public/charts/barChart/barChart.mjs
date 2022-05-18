import { BAR_CHART_CLASS, BAR_CHART_HEIGHT } from "../../lib/constants/index.js";
import { BAR_CHART_DATA } from "./data.js";

import handleBarChartArrowKeys from "../../lib/helpers/keyboard/handleBarChartArrowKeys.mjs";
import handleBarChartClick from "../../lib/helpers/mouse/handleBarChartClick.mjs";
import drawLabel from "../../lib/helpers/drawing/drawLabel.mjs";
import drawLegend from "../../lib/helpers/drawing/drawLegend.mjs";

const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Add event listeners
document.addEventListener('focus', initBarChart, true);
document.addEventListener('blur', initBarChart, true);
canvas.addEventListener('click', e => handleBarChartClick(e, bars, BAR_CHART_DATA.coordinates), false);
canvas.addEventListener('keydown', e => handleBarChartArrowKeys(e, bars), false);

function initBarChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  BAR_CHART_DATA.coordinates.map((bar, i) => drawBar(
    bar.name,
    bar.x_start,
    bar.y_start,
    bar.x_end,
    bar.y_end,
    bars[i],
  ));

  // Draw the chart label
  drawLabel(ctx, canvas, BAR_CHART_DATA.chartLabel);

  // Draw the legend
  drawLegend(ctx, canvas, BAR_CHART_DATA.minValue, BAR_CHART_DATA.maxValue);
}

function drawBar(name, x_start, y_start, x_end, y_end, el) {
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
  ctx.fillText(name, x_start + 15, y_start + height / 2);

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

// function drawLegend(minVal, maxVal) {
//   const normalizedMinVal = Math.ceil(minVal / 10) * -10;
//   const normalizedMaxVal = Math.ceil(maxVal / 10) * 10;
//   const normalizedMedian = Math.round(normalizedMaxVal - normalizedMinVal) / 2;

//   ctx.font = '15px Helvetica, Arial, sans-serif';
//   ctx.fillStyle = 'black';

//   if (maxVal - minVal <= 50) {
//     ctx.textAlign = 'left';
//     ctx.fillText(normalizedMinVal, 22, canvas.height - 40);
    
//     ctx.textAlign = 'center';
//     ctx.fillText(normalizedMedian, canvas.width / 2, canvas.height - 40);
    
//     ctx.textAlign = 'right';
//     ctx.fillText(normalizedMaxVal, canvas.width - 22, canvas.height - 40);

//     ctx.fillStyle = 'black';
//     ctx.fillRect(
//       20,
//       canvas.height - 60,
//       canvas.width - 40,
//       2
//     );
//   }
// }

export default initBarChart;

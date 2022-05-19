import {
  BAR_CHART_CANVAS,
  BAR_CHART_CLASS,
  BAR_CHART_HEIGHT
} from "../../../lib/constants/index.js";
import drawLabel from "../../../lib/helpers/drawing/drawLabel.mjs";
import drawLegend from "../../../lib/helpers/drawing/drawLegend.mjs";
import handleBarChartArrowKeys from "../../../lib/helpers/keyboard/handleBarChartArrowKeys.mjs";
import handleBarChartClick from "../../../lib/helpers/mouse/handleBarChartClick.mjs";

// Grab the empty canvas ID from index.html
const canvas = document.getElementById(BAR_CHART_CANVAS);
const ctx = canvas.getContext('2d');

/**
 * Uses the fetched data object to construct DIVS that will become bars.
 * Constructs SPANs that will hold helper text for screen readers.
 * Appends DIVs to a document fragment, then appends the fragment
 * to the empty canvas element in index.html.
 * 
 * @param {Object} dataObj 
 */
function buildBarChartHtml(dataObj) {
  const bars = dataObj.barData;
  const chartFragment = document.createDocumentFragment();

  bars.map((bar, i) => {
    const { elemId, name, votes } = bar;

    const containerElem = document.createElement('div');
    const containerText = document.createTextNode(name);

    const helperElem = document.createElement('span');
    const helperText = document.createTextNode(`${votes} votes`);

    containerElem.append(containerText);
    containerElem.classList.add('bar-chart');
    containerElem.setAttribute('id', elemId);
    containerElem.setAttribute('tabindex', i === 0 ? "0" : "-1");

    helperElem.append(helperText);
    helperElem.classList.add('sr-only');

    containerElem.append(helperElem);
    chartFragment.append(containerElem);
  });

  canvas.append(chartFragment);
}

/**
 * Draws a single bar. Draws text label and defines focusable rectangle.
 * 
 * @param {String} name Data label drawn on the bar
 * @param {Number} x_start Beginning horizontal coordinate to render bar
 * @param {Number} y_start Beginning vertical coordinate to render bar
 * @param {Number} x_end Ending horizontal coordinate to render bar
 * @param {Number} y_end Ending vertical coordinate to render bar
 * @param {HTMLDivElement} el DIV elements that user can interact with
 */
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

/**
 * Loops over data object to draw bars, chart label, and chart legend
 * 
 * @param {Object} dataObj 
 */
function drawBarChart(dataObj) {
  const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dataObj.barData.map((bar, i) => drawBar(
    bar.name,
    bar.x_start,
    bar.y_start,
    bar.x_end,
    bar.y_end,
    bars[i],
  ));

  // Draw the chart label
  drawLabel(ctx, canvas, dataObj.chartLabel);

  // Draw the legend
  drawLegend(ctx, canvas, dataObj.minValue, dataObj.maxValue);
}

/**
 * Draws bar chart in a canvas element with the relevant ID
 */
function initBarChart(userDataObj) {
  // Add event listeners
  document.addEventListener('focus', () => drawBarChart(userDataObj), true);
  document.addEventListener('blur', () => drawBarChart(userDataObj), true);
  canvas.addEventListener('click', e => handleBarChartClick(e, canvas, userDataObj.barData), false);
  canvas.addEventListener('keydown', e => handleBarChartArrowKeys(e), false);

  buildBarChartHtml(userDataObj);
  drawBarChart(userDataObj);
}

export default initBarChart;

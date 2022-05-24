import {
  BAR_CHART_CANVAS,
  BAR_CHART_CLASS,
  BAR_CHART_HEIGHT
} from "../../../lib/constants/index.js";
import drawLabel from "../../../lib/helpers/drawing/drawLabel.mjs";
import drawXAxis from "../../../lib/helpers/drawing/drawXAxis.mjs";
import handleBarChartArrowKeys from "../../../lib/helpers/keyboard/handleBarChartArrowKeys.mjs";
import handleBarChartClick from "../../../lib/helpers/mouse/handleBarChartClick.mjs";

/**
 * Uses the fetched data object to construct DIVS that will become bars.
 * Constructs SPANs that will hold helper text for screen readers.
 * Appends DIVs to a document fragment, then appends the fragment
 * to the empty canvas element in index.html.
 * 
 * @param {Object} dataObj Data object fetched asynchronously
 * @param {HTMLCanvasElement} canvas The canvas element where the chart will be drawn
 */
function buildBarChartHtml(dataObj, canvas) {
  const bars = dataObj.barData;
  const chartFragment = document.createDocumentFragment();

  bars.map((bar, i) => {
    let countType = dataObj.countType;
    const { name, count } = bar;

    // Proper pluralization of count type (IE votes, events, endpoints)
    if (count !== 1) {
      countType = `${countType}s`;
    }

    // Create the bar element and label
    const containerElem = document.createElement('div');
    const containerText = document.createTextNode(name);

    // Create screen reader helper text
    const helperElem = document.createElement('span');
    const helperText = document.createTextNode(`${count} ${countType}`);

    // Assemble the bar container and text. Set tabindex for keyboard navigation.
    containerElem.append(containerText);
    containerElem.classList.add('bar-chart');
    containerElem.setAttribute('tabindex', i === 0 ? "0" : "-1");

    // Assemble the helper text element
    helperElem.append(helperText);
    helperElem.classList.add('sr-only');

    // Append the completed bar (element, label, screen reader text) to the document fragment
    containerElem.append(helperElem);
    chartFragment.append(containerElem);
  });

  // Append the fragment to the canvas one time. More performant than multiple appends.
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
 * @param {CanvasRenderingContext2D} ctx Canvas draw layer context
 */
function drawBar(name, x_start, y_start, x_end, y_end, el, ctx) {
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
 * @param {Object} dataObj Data object fetched asynchronously
 * @param {HTMLCanvasElement} canvas The canvas element where the chart will be drawn
 * @param {CanvasRenderingContext2D} ctx Canvas draw layer context
 */
function drawBarChart(dataObj, canvas, ctx) {
  const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];  

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dataObj.barData.map((bar, i) => drawBar(
    bar.name,
    bar.x_start,
    bar.y_start,
    bar.x_end,
    bar.y_end,
    bars[i],
    ctx
  ));

  // Draw the chart label
  drawLabel(canvas, ctx, dataObj.chartLabel);

  // Draw the X-axis and numbers
  drawXAxis(canvas, ctx, dataObj.minValue, dataObj.maxValue);
}

/**
 * Draws bar chart in a canvas element using an upstream data object and ID string
 * 
 * @param {Object} userDataObj Data object fetched asynchronously (database, flat file, etc.)
 * @param {String} canvasId ID string of the empty canvas object
 */
function initBarChart(userDataObj, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  // Add event listeners
  document.addEventListener('focus', () => drawBarChart(userDataObj, canvas, ctx), true);
  document.addEventListener('blur', () => drawBarChart(userDataObj, canvas, ctx), true);
  canvas.addEventListener('click', e => handleBarChartClick(e, canvas, userDataObj.barData), false);
  canvas.addEventListener('keydown', e => handleBarChartArrowKeys(e), false);

  buildBarChartHtml(userDataObj, canvas);
  drawBarChart(userDataObj, canvas, ctx);
}

export default initBarChart;

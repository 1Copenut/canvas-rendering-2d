import {
  BAR_CHART_CANVAS,
  BAR_CHART_CLASS,
  BAR_CHART_HEIGHT,
} from "../../../lib/constants/index.js";
import drawLabel from "../../../lib/helpers/drawing/drawLabel.mjs";
import drawXAxis from "../../../lib/helpers/drawing/drawXAxis.mjs";
import handleBarChartArrowKeys from "../../../lib/helpers/keyboard/handleBarChartArrowKeys.mjs";
import handleBarChartClick from "../../../lib/helpers/mouse/handleBarChartClick.mjs";

/**
 * Uses an outside data object to construct DIVS that will become bars.
 * Also constructs SPANs that will hold helper text for screen readers.
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
    const containerElem = document.createElement("div");
    const containerText = document.createTextNode(name);

    // Create screen reader helper text
    const helperElem = document.createElement("span");
    const helperText = document.createTextNode(`${count} ${countType}`);

    // Assemble the bar container and text. Set tabindex for keyboard navigation.
    containerElem.append(containerText);
    containerElem.classList.add("bar-chart");
    containerElem.setAttribute("tabindex", i === 0 ? "0" : "-1");

    // Assemble the helper text element
    helperElem.append(helperText);
    helperElem.classList.add("sr-only");

    // Append the completed bar (element, label, screen reader text) to the document fragment
    containerElem.append(helperElem);
    chartFragment.append(containerElem);
  });

  // Append the fragment to the canvas one time. More performant than multiple appends.
  canvas.append(chartFragment);
}

/**
 * Draws a single bar. Draws text label and defines focusable rectangle.
 * TODO: Update docs to reflect object instead of strings and numbers for args.
 *
 * @param {String} name Data label drawn on the bar
 * @param {Number} x_start Beginning horizontal coordinate to render bar
 * @param {Number} y_start Beginning vertical coordinate to render bar
 * @param {Number} x_end Ending horizontal coordinate to render bar
 * @param {Number} y_end Ending vertical coordinate to render bar
 * @param {HTMLDivElement} el DIV elements that user can interact with
 * @param {CanvasRenderingContext2D} ctx Canvas draw layer context
 */
function drawBar(barDataObj, el, ctx) {
  const { name, x_start, y_start, x_end, y_end } = barDataObj;

  const activeEl = document.activeElement === el;
  const height = BAR_CHART_HEIGHT;

  const tmpBarObject = {
    ctx,
    name,
    x_start,
    y_start,
    x_end,
    activeEl,
    height,
  };

  // Button background
  ctx.fillStyle = activeEl ? "rebeccapurple" : "lightgray";
  ctx.fillRect(x_start, y_start, x_end - x_start, y_end - y_start);

  // Button text
  ctx.font = "16px Helvetica, Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  _labelPosition(tmpBarObject);

  // Define clickable area
  ctx.beginPath();
  ctx.rect(x_start, y_start, x_end - x_start, y_end - y_start);

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}

function _labelPosition(barObject) {
  const { ctx, name, x_start, y_start, x_end, activeEl, height } = barObject;

  const textWidth = ctx.measureText(name);
  const { width } = textWidth;

  let x_labelPosition;

  if (width < x_end - x_start) {
    x_labelPosition = x_start + 15;
  } else {
    x_labelPosition = x_end - x_start + 30;
  }

  ctx.fillStyle = _labelFillColor(activeEl, x_end, x_labelPosition);
  ctx.fillText(name, x_labelPosition, y_start + height / 2);
}

function _labelFillColor(activeEl, x_end, x_labelPosition) {
  if (activeEl && x_end > x_labelPosition) {
    return "white";
  }

  if (activeEl && x_end < x_labelPosition) {
    return "black";
  }

  return "black";
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

  // Clear the canvas before it's redrawn
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each bar in turn
  dataObj.barData.map((bar, i) => drawBar(bar, bars[i], ctx));

  // Draw the chart label
  drawLabel(canvas, ctx, dataObj.chartLabel);

  // Draw the X-axis and numbers
  drawXAxis(canvas, ctx, dataObj.minValue, dataObj.maxValue);
}

/**
 * Draws bar chart in a canvas element using an outside data object and ID string
 *
 * @param {Object} userDataObj Data object fetched asynchronously (database, flat file, etc.)
 * @param {String} canvasId ID string of the empty canvas object
 */
function initBarChart(userDataObj, canvasId) {
  const canvas = document.getElementById(canvasId);

  if (canvas) {
    const ctx = canvas.getContext("2d");

    // Add event listeners
    canvas.addEventListener(
      "focus",
      () => drawBarChart(userDataObj, canvas, ctx),
      true
    );
    canvas.addEventListener(
      "blur",
      () => drawBarChart(userDataObj, canvas, ctx),
      true
    );
    canvas.addEventListener(
      "click",
      (e) => handleBarChartClick(e, canvas, userDataObj.barData),
      false
    );
    canvas.addEventListener(
      "keydown",
      (e) => handleBarChartArrowKeys(e),
      false
    );

    buildBarChartHtml(userDataObj, canvas);
    drawBarChart(userDataObj, canvas, ctx);
  } else {
    throw new Error(
      "You must include a canvas tag with unique ID in your page"
    );
  }
}

export default initBarChart;

import { BAR_CHART_CLASS } from "../../../lib/constants/index.js";

/**
 * Listens for click events inside the canvas element. Sets focus on the bar
 * clicked by the user. Focus is returned to the canvas element if user clicks
 * outside bar coordinates.
 * 
 * @param {Event} e 
 * @param {HTMLCanvasElement} canvas The canvas element to listen within for click events 
 * @param {Object} barData Data fetched asynchronously
 */
function handleBarChartClick(e, canvas, barData) {
  const barsArr = [...document.getElementsByClassName(BAR_CHART_CLASS)];

  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  barData.map((bar, i) => {
    if (
      (x >= bar.x_start && x <= bar.x_end) &&
      (y >= bar.y_start && y <= bar.y_end)
    ) {
      // Find the current segment with tabindex and remove it
      const currentTabIndex = document.querySelector('canvas [tabindex="0"]');
      if (currentTabIndex) currentTabIndex.setAttribute('tabindex', '-1');

      // Set a tabindex on the current segment so it can receive focus
      barsArr[i].setAttribute('tabindex', '0');
      barsArr[i].focus();
    }
  });
}

export default handleBarChartClick;

import { BAR_CHART_CLASS } from "../../../lib/constants/index.js";

let selectedBarIndex = 0;

function handleBarChartArrowKeys(e) {
  const barsArr = [...document.getElementsByClassName(BAR_CHART_CLASS)];

  switch(e.key) {
    case 'ArrowUp':
    case 'ArrowLeft': {
      barsArr[selectedBarIndex].setAttribute('tabindex', '-1');

      if (selectedBarIndex === 0) {
        selectedBarIndex = barsArr.length - 1;
      } else {
        selectedBarIndex = selectedBarIndex - 1;
      }

      barsArr[selectedBarIndex].setAttribute('tabindex', '0');
      barsArr[selectedBarIndex].focus();
      break;
    }

    case 'ArrowDown':
    case 'ArrowRight': {
      barsArr[selectedBarIndex].setAttribute('tabindex', '-1');

      if (selectedBarIndex === barsArr.length - 1) {
        selectedBarIndex = 0;
      } else {
        selectedBarIndex = selectedBarIndex + 1;
      }

      barsArr[selectedBarIndex].setAttribute('tabindex', '0');
      barsArr[selectedBarIndex].focus();
      break;
    }

    default: {
      break;
    }
  }
}

export default handleBarChartArrowKeys;

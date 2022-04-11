let selectedBar = 0;

function handleArrowKeys(e, barsArr, context) {
  switch(e.key) {
    case 'ArrowUp':
    case 'ArrowLeft': {
      barsArr[selectedBar].removeAttribute('tabindex');

      if (selectedBar === 0) {
        selectedBar = barsArr.length - 1;
        barsArr[selectedBar].setAttribute('tabindex', '0');
        barsArr[selectedBar].focus();
      } else {
        selectedBar = selectedBar - 1;
        barsArr[selectedBar].setAttribute('tabindex', '0');
        barsArr[selectedBar].focus();
      }
      break;
    }

    case 'ArrowDown':
    case 'ArrowRight': {
      barsArr[selectedBar].removeAttribute('tabindex');

      if (selectedBar === barsArr.length - 1) {
        selectedBar = 0;
        barsArr[selectedBar].setAttribute('tabindex', '0');
        barsArr[selectedBar].focus();
      } else {
        selectedBar = selectedBar + 1;
        barsArr[selectedBar].setAttribute('tabindex', '0');
        barsArr[selectedBar].focus();
      }
      break;
    }

    default: {
      break;
    }
  }
}

export default handleArrowKeys;

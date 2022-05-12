let selectedSegment = 0;

function handleStackedBarArrowKeys(e, barsArr) {
  const segmentsArr = barsArr.map((segment, i) => [...barsArr[i].children]);
  const segments = segmentsArr.flat(1);

  switch(e.key) {
    case 'ArrowUp':
    case 'ArrowLeft': {
      segments[selectedSegment].removeAttribute('tabindex');

      if (selectedSegment === 0) {
        selectedSegment = segments.length - 1;
        segments[selectedSegment].setAttribute('tabindex', '0');
        segments[selectedSegment].focus();
      } else {
        selectedSegment = selectedSegment - 1;
        segments[selectedSegment].setAttribute('tabindex', '0');
        segments[selectedSegment].focus();
      }
      break;
    }

    case 'ArrowDown':
    case 'ArrowRight': {
      segments[selectedSegment].removeAttribute('tabindex');

      if (selectedSegment === segments.length - 1) {
        selectedSegment = 0;
        segments[selectedSegment].setAttribute('tabindex', '0');
        segments[selectedSegment].focus();
      } else {
        selectedSegment = selectedSegment + 1;
        segments[selectedSegment].setAttribute('tabindex', '0');
        segments[selectedSegment].focus();
      }
      break;
    }

    default: {
      break;
    }
  }
}

export default handleStackedBarArrowKeys;

let selectedSegmentIndex = 0;

function handleStackedBarArrowKeys(e, barsArr) {
  const segmentsArr = barsArr.map((segment, i) => [...barsArr[i].children]);
  const segments = segmentsArr.flat(1);

  switch(e.key) {
    case 'ArrowUp':
    case 'ArrowLeft': {
      segments[selectedSegmentIndex].removeAttribute('tabindex');

      if (selectedSegmentIndex === 0) {
        selectedSegmentIndex = segments.length - 1;
        segments[selectedSegmentIndex].setAttribute('tabindex', '0');
        segments[selectedSegmentIndex].focus();
      } else {
        selectedSegmentIndex = selectedSegmentIndex - 1;
        segments[selectedSegmentIndex].setAttribute('tabindex', '0');
        segments[selectedSegmentIndex].focus();
      }
      break;
    }

    case 'ArrowDown':
    case 'ArrowRight': {
      segments[selectedSegmentIndex].removeAttribute('tabindex');

      if (selectedSegmentIndex === segments.length - 1) {
        selectedSegmentIndex = 0;
        segments[selectedSegmentIndex].setAttribute('tabindex', '0');
        segments[selectedSegmentIndex].focus();
      } else {
        selectedSegmentIndex = selectedSegmentIndex + 1;
        segments[selectedSegmentIndex].setAttribute('tabindex', '0');
        segments[selectedSegmentIndex].focus();
      }
      break;
    }

    default: {
      break;
    }
  }
}

export default handleStackedBarArrowKeys;

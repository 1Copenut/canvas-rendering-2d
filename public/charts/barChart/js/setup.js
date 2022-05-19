import fetchData from "../../../lib/helpers/data/fetchData.mjs";

const data = await fetchData('js/data/data.json');

function buildBarChartHtml(data) {
  const segments = data.segmentData;
  const chartFragment = document.createDocumentFragment();

  segments.map((segment, i) => {
    const { elemId, name, votes } = segment;

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

  document.getElementById('canvas').append(chartFragment);
}

buildBarChartHtml(data);

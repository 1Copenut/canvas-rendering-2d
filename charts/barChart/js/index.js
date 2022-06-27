import fetchData from "../../../lib/helpers/data/fetchData.mjs";
import initBarChart from './barChart.mjs';

// Top-level await means we can fetch data one time
// https://blog.saeloun.com/2021/11/25/ecmascript-top-level-await
const data = await fetchData('js/data/data.json');

initBarChart(data, 'canvas-bar-chart');

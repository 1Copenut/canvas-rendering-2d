/**
 * 
 * @param {String} url API endpoint or flat file to load chart data
 * @returns {Object} Chart data may include draw coordinates, data labels, min and max values
 */
async function fetchData(url) {
  const data = await fetch(url);
  const response = await data.json();
  return response;
}

export default fetchData;

async function fetchData(url) {
  const data = await fetch(url);
  const response = await data.json();
  return response;
}

export default fetchData;

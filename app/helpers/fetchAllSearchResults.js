export const fetchAllSearchResults = async (searchTerm, apiKey, baseUrl, page = 1, allResults = [], totalPages = 1) => {
  if (page > totalPages) {
    return allResults;
  }

  const res = await fetch(`${baseUrl}/search/multi?api_key=${apiKey}&query=${searchTerm}&page=${page}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const newResults = [...allResults, ...data.results];
  const newTotalPages = data.total_pages;

  return fetchAllSearchResults(searchTerm, apiKey, baseUrl, page + 1, newResults, newTotalPages);
};

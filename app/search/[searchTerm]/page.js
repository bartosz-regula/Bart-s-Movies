import { fetchAllSearchResults } from '../../helpers/fetchAllSearchResults';
import { handleError } from '../../helpers/handleError';
import SearchResults from '@/app/components/SearchResults';

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let allResults = [];
  let error = null;

  try {
    allResults = await fetchAllSearchResults(searchTerm, apiKey, baseUrl);
  } catch (err) {
    error = err;
  }

  if (error) {
    return handleError(error);
  }

  if (allResults.length === 0) {
    return <h1>No results found</h1>;
  }

  return <SearchResults results={allResults} />;
}

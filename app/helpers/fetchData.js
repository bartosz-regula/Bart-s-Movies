export async function fetchData(endpoint) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return response.json();
}

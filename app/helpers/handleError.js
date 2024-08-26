export const handleError = (error) => {
  console.error('Error fetching data:', error.message);
  return <h1>{error.message}</h1>;
};

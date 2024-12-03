export const categoryOptionsSeries = {
  genres: [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 36, name: 'History' },
    { id: 10764, name: 'Reality' },
    { id: 10763, name: 'News' },
    { id: 10765, name: 'Science Fiction' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' },
  ],

  countries: [
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Australia' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
    { code: 'CN', name: 'China' },
    { code: 'DE', name: 'Germany' },
    { code: 'ES', name: 'Spain' },
    { code: 'FR', name: 'France' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IN', name: 'India' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'MX', name: 'Mexico' },
    { code: 'PL', name: 'Poland' },
    { code: 'RU', name: 'Russia' },
    { code: 'SE', name: 'Sweden' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'US', name: 'United States' },
  ],

  releaseYears: [...Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)],

  sortOptions: [
    { value: 'vote_average.desc', label: 'Rating (High to Low)' },
    { value: 'vote_average.asc', label: 'Rating (Low to High)' },
    { value: 'popularity.desc', label: 'Popularity (High to Low)' },
    { value: 'popularity.asc', label: 'Popularity (Low to High)' },
    { value: 'first_air_date.desc', label: 'Release Date (Newest to Oldest)' },
    { value: 'first_air_date.asc', label: 'Release Date (Oldest to Newest)' },
  ],
};

export const getType = (mediaType, title, name) => {
  const typeMap = {
    movie: 'movie',
    tv: 'series',
    person: 'person',
  };
  return typeMap[mediaType] || (title ? 'movie' : name ? 'series' : 'unknown');
};

export const formatTitle = (title) => {
  return title.length > 24 ? title.slice(0, 24) + '...' : title;
};

export const getImageSrc = (mediaType, profilePath, posterPath, poster, defaultImage) => {
  return mediaType === 'person'
    ? profilePath
      ? `https://image.tmdb.org/t/p/w500${profilePath}`
      : defaultImage
    : posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : poster || defaultImage;
};

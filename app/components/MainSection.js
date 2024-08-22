import ShowCase from './ShowCase';

export default function MainSection() {
  return (
    <main>
      <ShowCase type="movie/popular" title="Popular Movies" route="/popular/movies" />
      <ShowCase type="movie/top_rated" title="Top Rated Movies" route="/top-rated/movies" />
      <ShowCase type="trending/tv/day" title="Popular Series" route="/popular/series" />
      <ShowCase type="tv/top_rated" title="Top Rated Series" route="top-rated/series" />
    </main>
  );
}

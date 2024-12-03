import AllShows from '../components/AllShows';
import { categoryOptionsMovies } from '../resources/categoryOptionsMovies';
export default function Page() {
  return (
    <>
      <AllShows type="movie" category={categoryOptionsMovies} header="All Movies"/>
    </>
  );
}

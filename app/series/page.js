import AllShows from '../components/AllShows';
import { categoryOptionsSeries } from '../resources/categoryOptionsSeries';

export default function Page() {
  return (
    <>
      <AllShows type="tv" category={categoryOptionsSeries} header="All Series" />
    </>
  );
}

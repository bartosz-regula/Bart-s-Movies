import Cast from '@/app/components/Cast';
import ShowDetails from '@/app/components/ShowDetails';
import ShowImages from '@/app/components/ShowImages';
import ShowVideos from '@/app/components/ShowVideos';
import { fetchData } from '@/app/helpers/fetchData';

export default async function Page({ params }) {
  const showId = params.id;

  const [showData, castData, imagesData, videosData] = await Promise.all([
    fetchData(`/tv/${showId}`),
    fetchData(`/tv/${showId}/aggregate_credits`),
    fetchData(`/tv/${showId}/images`),
    fetchData(`/tv/${showId}/videos`),
  ]);

  const backgroundStyles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280${showData.backdrop_path})`,
    backgroundSize: 'contain',
    backgroundBlendMode: 'multiply',
  };

  return (
    <div style={backgroundStyles}>
      <ShowDetails show={showData} cast={castData} />
      <Cast cast={castData} />
      <ShowImages images={imagesData.backdrops} />
      <ShowVideos videos={videosData} />
    </div>
  );
}

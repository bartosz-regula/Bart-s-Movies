import styles from './page.module.css';
import PersonDetails from '@/app/components/PersonDetails';
import PersonFilmography from '@/app/components/PersonFilmography';
import PersonImages from '@/app/components/PersonImages';
import PersonSeries from '@/app/components/PersonSeries';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';
import { fetchData } from '@/app/helpers/fetchData';
import NotFound from '@/app/not-found';
import { DEFAULT_PERSON_BACKGROUND } from '@/app/utilities/config';

export default async function Page({ params }) {
  const showId = params.id;

  if (isNaN(Number(showId))) {
    return NotFound();
  }

  const [personDetails, filmographyData, seriesData, imagesData] = await Promise.all([
    fetchData(`/person/${showId}`),
    fetchData(`/person/${showId}/movie_credits`),
    fetchData(`/person/${showId}/tv_credits`),
    fetchData(`/person/${showId}/images`),
  ]);

  if (!personDetails || !personDetails.name || !filmographyData || !seriesData || !imagesData) {
    return <NotFound />;
  }

  const backgroundStyles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.6)), url(${DEFAULT_PERSON_BACKGROUND})`,
    backgroundSize: 'cover',
    backgroundAttachment: !personDetails ? 'fixed' : 'scroll',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={backgroundStyles}>
      {personDetails && personDetails.name && filmographyData && seriesData && imagesData && (
        <div className={styles.container}>
          <PersonDetails person={personDetails} />
          <PersonFilmography movies={filmographyData.cast} />
          <PersonSeries series={seriesData.cast} />
          <PersonImages images={imagesData} />
          <ScrollToTopButton />
        </div>
      )}
    </div>
  );
}

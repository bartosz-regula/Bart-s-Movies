'use client';
import { useState, useEffect } from 'react';
import ShowCast from '@/app/components/ShowCast';
import ShowDetails from '@/app/components/ShowDetails';
import ShowImages from '@/app/components/ShowImages';
import ShowVideos from '@/app/components/ShowVideos';
import { fetchData } from '@/app/helpers/fetchData';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';
import NotFound from '@/app/not-found';
import Loading from '@/app/loading';
import { DEFAULT_SHOW_BACKGROUND } from '@/app/utilities/config';

export default function Page({ params }) {
  const showId = params.id;
  const [showData, setShowData] = useState(null);
  const [castData, setCastData] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [videosData, setVideosData] = useState(null);
  const [providersData, setProvidersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [show, cast, images, videos, providers] = await Promise.all([
          fetchData(`/movie/${showId}`),
          fetchData(`/movie/${showId}/credits`),
          fetchData(`/movie/${showId}/images`),
          fetchData(`/movie/${showId}/videos`),
          fetchData(`/movie/${showId}/watch/providers`),
        ]);

        setShowData(show);
        setCastData(cast);
        setImagesData(images);
        setVideosData(videos);
        setProvidersData(providers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, [showId]);

  if (loading) {
    return <Loading />;
  }

  if (!showData || !castData || !imagesData || !videosData || !castData.crew) {
    return <NotFound />;
  }

  const backgroundStyles = {
    backgroundImage: showData?.backdrop_path
      ? `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280${showData.backdrop_path})`
      : `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.5)), url(${DEFAULT_SHOW_BACKGROUND})`,

    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <div style={backgroundStyles}>
      {showData && castData && imagesData && videosData && (
        <>
          <ShowDetails show={showData} cast={castData} providers={providersData} />
          <ShowCast cast={castData} />
          <ShowImages images={imagesData.backdrops} />
          <ShowVideos videos={videosData} />
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
}

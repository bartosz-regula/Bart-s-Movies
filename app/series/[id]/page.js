'use client';

import { useState, useEffect } from 'react';
import ShowCast from '@/app/components/ShowCast';
import ShowDetails from '@/app/components/ShowDetails';
import ShowImages from '@/app/components/ShowImages';
import ShowVideos from '@/app/components/ShowVideos';
import { fetchData } from '@/app/helpers/fetchData';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';
import NotFound from '@/app/not-found';

export default function Page({ params }) {
  const showId = params.id;
  const [showData, setShowData] = useState(null);
  const [castData, setCastData] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [videosData, setVideosData] = useState(null);
  const [providersData, setProvidersData] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [show, cast, images, videos, providers] = await Promise.all([
          fetchData(`/tv/${showId}`),
          fetchData(`/tv/${showId}/aggregate_credits`),
          fetchData(`/tv/${showId}/images`),
          fetchData(`/tv/${showId}/videos`),
          fetchData(`/tv/${showId}/watch/providers`),
        ]);

        setShowData(show);
        setCastData(cast);
        setImagesData(images);
        setVideosData(videos);
        setProvidersData(providers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, [showId]);

  const backgroundStyles = {
    backgroundImage: showData
      ? `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280${showData.backdrop_path})`
      : 'none',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
  };
  if (isNaN(Number(showId))) {
    return NotFound();
  }
  return (
    <div style={backgroundStyles}>
      {showData && castData && imagesData && videosData && (
        <ProtectedRoute>
          <ShowDetails show={showData} cast={castData} providers={providersData} />
          <ShowCast cast={castData} />
          <ShowImages images={imagesData.backdrops} />
          <ShowVideos videos={videosData} />
          <ScrollToTopButton />
        </ProtectedRoute>
      )}
    </div>
  );
}

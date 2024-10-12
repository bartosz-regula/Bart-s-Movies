'use client';
import { useState, useEffect } from 'react';
import ShowCast from '@/app/components/ShowCast';
import ShowDetails from '@/app/components/ShowDetails';
import ShowImages from '@/app/components/ShowImages';
import ShowVideos from '@/app/components/ShowVideos';
import { fetchData } from '@/app/helpers/fetchData';

export default function Page({ params }) {
  const showId = params.id;
  const [showData, setShowData] = useState(null);
  const [castData, setCastData] = useState(null);
  const [imagesData, setImagesData] = useState(null);
  const [videosData, setVideosData] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const [show, cast, images, videos] = await Promise.all([
        fetchData(`/movie/${showId}`),
        fetchData(`/movie/${showId}/credits`),
        fetchData(`/movie/${showId}/images`),
        fetchData(`/movie/${showId}/videos`),
      ]);

      setShowData(show);
      setCastData(cast);
      setImagesData(images);
      setVideosData(videos);
    };

    fetchDataAsync();
  }, [showId]);

  const backgroundStyles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280${showData?.backdrop_path})`,
    backgroundSize: 'contain',
    backgroundBlendMode: 'multiply',
  };

  return (
    <div style={backgroundStyles}>
      {showData && castData && imagesData && videosData && (
        <>
          <ShowDetails show={showData} cast={castData} />
          <ShowCast cast={castData} />
          <ShowImages images={imagesData.backdrops} />
          <ShowVideos videos={videosData} />
        </>
      )}
    </div>
  );
}

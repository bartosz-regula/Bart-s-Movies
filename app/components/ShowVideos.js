'use client';

import styles from './ShowVideos.module.css';
import { handleScroll } from '../helpers/handleScroll';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';
import { useState, useEffect, useRef, useCallback } from 'react';
import handleKeyPress from '../helpers/handleKeyPress';
import ModalVideo from './ModalVideo';
import { disableScroll } from '../helpers/disableScroll';
import Spinner from './Spinner';

export default function ShowVideos({ videos }) {
  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [edgeReached, setEdgeReached] = useState({ left: false, right: false });

  const handleVideoClick = (index) => {
    setActiveVideo(index);
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 869);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 869);
  }, []);

  const checkEdge = () => {
    const container = containerRef.current;
    const isAtStart = container.scrollLeft === 0;
    const margin = 1;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - margin;
    setEdgeReached({
      left: isAtStart,
      right: isAtEnd,
    });
  };

  useEffect(() => {
    checkButtonsVisibility(containerRef, setShowButtons);

    const resizeHandler = () => checkButtonsVisibility(containerRef, setShowButtons);

    window.addEventListener('resize', resizeHandler);
    checkEdge();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [videos]);

  useEffect(() => {
    const container = containerRef.current;
    const handleScrollEvent = () => {
      checkEdge();
    };

    container.addEventListener('scroll', handleScrollEvent);
    return () => container.removeEventListener('scroll', handleScrollEvent);
  }, []);

  useEffect(() => {
    const keyPressHandler = (event) => {
      handleKeyPress(event, activeVideo, closeModal);
    };

    window.addEventListener('keydown', keyPressHandler);

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [activeVideo, videos]);

  useEffect(() => {
    disableScroll(activeVideo !== null);
    return () => {
      disableScroll(false);
    };
  }, [activeVideo]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!videos?.results.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Videos </h2>
      <div
        className={`${styles.videos_container} ${videos.results.length < 3 ? styles.justify_content : ''}`}
        ref={containerRef}
      >
        {showButtons && (
          <button
            className={`${styles.btn} ${styles.btn_left} ${edgeReached.left ? styles.btn_edge : ''}`}
            onClick={handleLeftClick}
          >
            &lt;
          </button>
        )}
        {videos.results.map((video, index) => (
          <div key={video.id} className={styles.video} onClick={() => handleVideoClick(index)}>
            {isLoading && <Spinner className={styles.spinner} />}
            <div className={styles.iframeContainer}>
              <iframe
                width="408"
                height="200"
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                allowFullScreen
                onLoad={handleImageLoad}
                title={video.name}
              ></iframe>
            </div>
            <p className={styles.video_name} title={video.name}>
              {video.name.length > 40 ? video.name.slice(0, 40) + '...' : video.name}
            </p>
          </div>
        ))}
        {showButtons && (
          <button
            className={`${styles.btn} ${styles.btn_right} ${edgeReached.right ? styles.btn_edge : ''}`}
            onClick={handleRightClick}
          >
            &gt;
          </button>
        )}
      </div>

      {activeVideo !== null && <ModalVideo videos={videos} activeVideo={activeVideo} closeModal={closeModal} />}
    </div>
  );
}

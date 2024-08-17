'use client';

import styles from './ShowVideos.module.css';
import { handleScroll } from '../helpers/handleScroll';
import checkButtonsVisibility from '../helpers/checkButtonsVisibility';
import { useState, useEffect, useRef, useCallback } from 'react';
import ModalVideo from './ModalVideo';

export default function ShowVideos({ videos }) {
  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

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

  useEffect(() => {
    checkButtonsVisibility(containerRef, setShowButtons);

    const resizeHandler = () => checkButtonsVisibility(containerRef, setShowButtons);

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [videos]);

  return (
    <>
      <div className={styles.videos_container} ref={containerRef}>
        {showButtons && (
          <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
            &lt;
          </button>
        )}
        {videos.results.map((video, index) => (
          <div key={video.id} className={styles.video} onClick={() => handleVideoClick(index)}>
            <div className={styles.iframeContainer}>
              <iframe
                width="408"
                height="200"
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
                allowFullScreen
                title={video.name}
              ></iframe>
            </div>
            <h3>{video.name}</h3>
          </div>
        ))}
        {showButtons && (
          <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
            &gt;
          </button>
        )}
      </div>

      {activeVideo !== null && <ModalVideo videos={videos} activeVideo={activeVideo} closeModal={closeModal} />}
    </>
  );
}

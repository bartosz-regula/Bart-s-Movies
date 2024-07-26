'use client';

import styles from './ShowVideos.module.css';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useCallback } from 'react';

export default function ShowVideos({ videos }) {
  const containerRef = useRef(null);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 869);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 869);
  }, []);

  return (
    <div className={styles.videos_container} ref={containerRef}>
      <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
        &lt;
      </button>
      {videos.results.map((video, index) => (
        <div key={video.id} className={styles.video}>
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
      <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
        &gt;
      </button>
    </div>
  );
}

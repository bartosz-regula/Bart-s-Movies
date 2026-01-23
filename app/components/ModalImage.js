import { useRef } from 'react';
import styles from './ModalImage.module.css';

export default function ModalImage({
  images,
  currentIndex,
  totalImages,
  closeModal,
  handleNextImage,
  handlePrevImage,
}) {
  const startX = useRef(null);
  const hasSwiped = useRef(false);

  const MAX_IMAGES = 12;
  const limitedImages = images.slice(0, MAX_IMAGES);

  const handlePointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX;
    hasSwiped.current = false;
  };

  const handlePointerMove = (e) => {
    if (startX.current === null) return;

    const currentX = e.clientX ?? e.touches?.[0]?.clientX;
    const diff = currentX - startX.current;

    if (Math.abs(diff) > 10) {
      hasSwiped.current = true;
    }

    if (diff > 35) {
      handlePrevImage();
      startX.current = null;
    } else if (diff < -35) {
      handleNextImage();
      startX.current = null;
    }
  };

  const handlePointerUp = () => {
    startX.current = null;
  };

  const handleImageClick = (e) => {
    if (hasSwiped.current) {
      hasSwiped.current = false;
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      handlePrevImage();
    } else {
      handleNextImage();
    }
  };

  return (
    <div
      className={styles.modal_container}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className={styles.modal_background} onClick={closeModal} />

      <button className={styles.modal_btn} onClick={handlePrevImage}>
        &lt;
      </button>

      <div className={styles.modal_image_wrapper} onClick={handleImageClick}>
        <div className={styles.carousel_track} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {limitedImages.map((img, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w1280${img.file_path}`}
              className={styles.modal_image}
              alt={`Image ${index}`}
              draggable={false}
            />
          ))}
        </div>

        <div className={styles.modal_number}>
          {currentIndex + 1} / {totalImages}
        </div>
      </div>

      <button className={styles.modal_btn} onClick={handleNextImage}>
        &gt;
      </button>
    </div>
  );
}

import styles from './ModalImage.module.css';

export default function ModalImage({
  images,
  activeImage,
  totalImages,
  currentIndex,
  closeModal,
  handleNextImage,
  handlePrevImage,
}) {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_background} onClick={closeModal}></div>
      <button className={styles.modal_btn} onClick={handlePrevImage}>
        &lt;
      </button>
      <div className={styles.modal_image_container}>
        <img
          src={`https://image.tmdb.org/t/p/w1280${images[activeImage].file_path}`}
          className={styles.modal_image}
          alt={`Active Image ${activeImage}`}
        />
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

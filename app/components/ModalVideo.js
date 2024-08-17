import styles from './ModalVideo.module.css';

export default function ModalVideo({ videos, activeVideo, closeModal }) {
  return (
    <div className={styles.container}>
      <div className={styles.modal_background} onClick={closeModal}></div>
      <div className={styles.modal_content}>
        <iframe
          src={`https://www.youtube.com/embed/${videos.results[activeVideo].key}?autoplay=1`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

import ArrowTop from './ArrowTop';
import styles from './ButtonTop.module.css';

export default function ButtonTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button className={styles.button} onClick={scrollToTop}>
      <ArrowTop />
      <p>Top</p>
    </button>
  );
}

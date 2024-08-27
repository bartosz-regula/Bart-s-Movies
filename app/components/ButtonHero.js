import styles from './ButtonHero.module.css';

export default function ButtonHero({ children, additionalClass, onClick }) {
  return (
    <button className={`${styles.btn} ${additionalClass ? styles[additionalClass] : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

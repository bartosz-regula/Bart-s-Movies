import styles from './AccountButton.module.css';

export default function AccountButton({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${className}`}>
      {children}
    </button>
  );
}

import styles from './AccountContainer.module.css';

export default function AccountContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

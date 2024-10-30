import Image from 'next/image';
import styles from './AccountBox.module.css';

export default function AccountBox({ children }) {
  return (
    <div className={styles.account_box}>
      <Image
        className={styles.logo}
        src="/barts-movies-high-resolution-logo-transparent (6) copy.png"
        width={150}
        height={50}
      />
      {children}
    </div>
  );
}

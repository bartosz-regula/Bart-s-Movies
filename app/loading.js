import { Ring } from 'react-css-spinners';
import styles from './loading.module.css';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className={styles.container}>
      <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={190} height={65} />
      <Ring color="#1E57D8" size={50} className={styles.spinner} />
    </div>
  );
}

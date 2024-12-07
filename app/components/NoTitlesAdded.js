import Image from 'next/image';
import styles from './NoTitlesAdded.module.css';

export default function NoTitlesAdded({ header, paragraph }) {
  return (
    <div className={styles.container}>
      <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={200} height={70} />
      <h2>{header}</h2>
      <p>{paragraph}</p>
    </div>
  );
}

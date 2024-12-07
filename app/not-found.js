import Image from 'next/image';
import styles from './not-found.module.css';
import Link from 'next/link';

export default function NotFound() {
  const header = "Whoops! Looks like you're lost.";
  const paragraph = "We couldn't find the page you're looking for. Try going back to the homepage.";
  return (
    <div className={styles.container}>
      <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={190} height={65} />
      <h2>{header}</h2>
      <p>{paragraph}</p>
      <Link href="/">
        <button>BACK TO HOME</button>
      </Link>
    </div>
  );
}

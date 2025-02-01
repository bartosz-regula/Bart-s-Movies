import Image from 'next/image';
import styles from './Footer.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div className={styles.top_container}>
        <div>
          <div className={styles.tmdb_container}>
            <p>Powered by:</p>
            <Link
              className={styles.tmdb_logo}
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/tmdb.svg" alt="tmdb" width={160} height={50} />
            </Link>
          </div>
          <p className={styles.tmdb_api_text}>
            This project uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>

        <div></div>
        <div className={styles.made_with}>
          <p className={styles.coded}>Made with 🤍 by Bartosz Reguła</p>
          <ul>
            <li>
              <Link href="https://www.linkedin.com/in/bartosz-regula/" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon fontSize="inherit" />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/bartosz-regula/Bart-s-Movies" target="_blank" rel="noopener noreferrer">
                <GitHubIcon fontSize="inherit" />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/barreg_/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon fontSize="inherit" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright © {currentYear} by Bart&apos;s Movies, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

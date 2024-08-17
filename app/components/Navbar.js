import NavbarItem from './NavbarItem';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <h2>LOGO</h2>
      </Link>
      <NavbarItem title="Movies" param="/movies" />
      <NavbarItem title="Series" param="/series" />
      <NavbarItem title="Favorites" param="/favorites" />
      <NavbarItem title="Watched" param="/watched" />

      <h2>Search</h2>
    </div>
  );
}

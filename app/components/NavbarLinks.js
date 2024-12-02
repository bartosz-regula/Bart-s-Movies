import NavbarItem from './NavbarItem';
import styles from './NavbarLinks.module.css';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import Image from 'next/image';

const navItems = [
  { title: 'Home', param: '/', icon: <HomeOutlinedIcon fontSize="inherit" /> },
  { title: 'Movies', param: '/movie', icon: <LocalMoviesIcon fontSize="inherit" /> },
  { title: 'Series', param: '/series', icon: <MovieFilterOutlinedIcon fontSize="inherit" /> },
  { title: 'Favorites', param: '/favorites', icon: <FavoriteBorderIcon fontSize="inherit" /> },
  { title: 'Rated', param: '/rated', icon: <StarBorderIcon fontSize="inherit" /> },
  { title: 'Search', param: '/search', icon: <SearchIcon fontSize="inherit" /> },
];

export const NavbarLinks = () => (
  <div className={styles.navbar_links}>
    <Link href="/">
      <Image src="/barts-movies-high-resolution-logo-transparent (6) copy.png" width={125} height={42} alt="Logo" />
    </Link>
    {navItems.map((item, index) => (
      <NavbarItem key={index} title={item.title} param={item.param} icon={item.icon} />
    ))}
  </div>
);

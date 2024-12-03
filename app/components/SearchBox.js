import styles from './SearchBox.module.css';
import { FaSearch } from 'react-icons/fa';

export default function SearchBox({ value, onChange }) {
  return (
    <div className={styles.container}>
      <form className={styles.search_bar}>
        <input type="text" placeholder="Search for Movies, Series, and People" value={value} onChange={onChange} />
        <FaSearch className={styles.searchIcon} size="20px" />
      </form>
    </div>
  );
}

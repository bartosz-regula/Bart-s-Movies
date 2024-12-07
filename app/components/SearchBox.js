import styles from './SearchBox.module.css';
import { FaSearch } from 'react-icons/fa';

export default function SearchBox({ value, onChange }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.container}>
      <form className={styles.search_bar} onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for Movies, Series, and People" value={value} onChange={onChange} />
        <FaSearch className={styles.searchIcon} size="20px" />
      </form>
    </div>
  );
}

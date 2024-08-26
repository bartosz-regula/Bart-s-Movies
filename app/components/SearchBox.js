'use client';

import styles from './SearchBox.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === '') return;
    router.push(`/search/${search}`);
  };

  useEffect(() => {
    setSearch('');
  }, [pathname]);

  return (
    <form className={styles.search_bar} onSubmit={handleSubmit}>
      <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <FaSearch className={styles.searchIcon} size="20px" onClick={handleSubmit} />
    </form>
  );
}

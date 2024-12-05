// 'use client';
//
// import styles from './ShowCase.module.css';
// import Card from './Card';
// import { handleScroll } from '../helpers/handleScroll';
// import { useRef, useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
//
// export default function ShowCase({ type, title, route }) {
//   const [shows, setShows] = useState([]);
//   const containerRef = useRef(null);
//
//   useEffect(() => {
//     const fetchShows = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
//         );
//         if (!response.ok) {
//           throw new Error('Failed to fetch shows');
//         }
//         const data = await response.json();
//         setShows(data.results || []);
//       } catch (error) {
//         console.error('Error fetching shows:', error);
//       }
//     };
//
//     fetchShows();
//   }, [type]);
//
//   const handleLeftClick = useCallback(() => {
//     handleScroll(containerRef.current, 'left', 1180);
//   }, []);
//
//   const handleRightClick = useCallback(() => {
//     handleScroll(containerRef.current, 'right', 1180);
//   }, []);
//
//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>{title}</h2>
//         <Link href={route}>Explore More</Link>
//       </div>
//
//       <div className={styles.show_list} ref={containerRef}>
//         <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
//           &lt;
//         </button>
//         {shows.map((show) => (
//           <Card key={show.id} show={show} />
//         ))}
//         <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import styles from './ShowCase.module.css';
import Card from './Card';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Loading from '../loading';

export default function ShowCase({ type, title, route }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        const data = await response.json();
        setShows(data.results || []);
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [type]);

  const handleLeftClick = useCallback(() => {
    handleScroll(containerRef.current, 'left', 1180);
  }, []);

  const handleRightClick = useCallback(() => {
    handleScroll(containerRef.current, 'right', 1180);
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.header}>
            <h2>{title}</h2>
            <Link href={route}>Explore More</Link>
          </div>

          <div className={styles.show_list} ref={containerRef}>
            <button className={`${styles.btn} ${styles.btn_left}`} onClick={handleLeftClick}>
              &lt;
            </button>

            {shows.map((show) => (
              <Card key={show.id} show={show} />
            ))}

            <button className={`${styles.btn} ${styles.btn_right}`} onClick={handleRightClick}>
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

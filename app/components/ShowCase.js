'use client';

import styles from './ShowCase.module.css';
import Card from './Card';
import ButtonArrow from './ButtonArrow';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useState, useEffect, useCallback } from 'react';

export default function ShowCase({ type, title }) {
	const [movies, setMovies] = useState([]);
	const containerRef = useRef(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
				);
				if (!response.ok) {
					throw new Error('Failed to fetch movies');
				}
				const data = await response.json();
				setMovies(data.results || []);
			} catch (error) {
				console.error('Error fetching movies:', error);
			}
		};

		fetchMovies();
	}, [type]);

	const handleLeftClick = useCallback(() => {
		handleScroll(containerRef.current, 'left', 1180);
	}, []);

	const handleRightClick = useCallback(() => {
		handleScroll(containerRef.current, 'right', 1180);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>{title}</h2>
				<button>Explore More</button>
			</div>

			<div className={styles.show_list} ref={containerRef}>
				<ButtonArrow additionalClass='btn_left' onClick={handleLeftClick}>
					&lt;
				</ButtonArrow>
				{movies.map((movie) => (
					<Card key={movie.id} movie={movie} />
				))}
				<ButtonArrow additionalClass='btn_right' onClick={handleRightClick}>
					&gt;
				</ButtonArrow>
			</div>
		</div>
	);
}

// import styles from './ShowCase.module.css';
// import Card from './Card';
// import ButtonArrow from './ButtonArrow';
//
// export default async function ShowCase({ type, title }) {
// 	const res = await fetch(`${process.env.BASE_URL}/${type}?api_key=${process.env.API_KEY}`);
//
// 	const movie = await res.json();
//
// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.header}>
// 				<h2>{title}</h2>
// 				<button>Explore More</button>
// 			</div>
//
// 			<div className={styles.show_list}>
// 				<ButtonArrow additionalClass='btn_left'>&lt;</ButtonArrow>
// 				{movie.results.map((movie) => (
// 					<Card key={movie.id} movie={movie} />
// 				))}
// 				<ButtonArrow additionalClass='btn_right'>&gt;</ButtonArrow>
// 			</div>
// 		</div>
// 	);
// }

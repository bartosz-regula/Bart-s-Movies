'use client';

import styles from './ShowCase.module.css';
import Card from './Card';
import ButtonArrow from './ButtonArrow';
import { handleScroll } from '../helpers/handleScroll';
import { useRef, useState, useEffect } from 'react';

export default function ShowCase({ type, title }) {
	const [movies, setMovies] = useState([]);
	const containerRef = useRef(null);

	useEffect(() => {
		async function fetchMovies() {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
				);
				if (!res.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await res.json();
				setMovies(data.results || []);
			} catch (error) {
				console.error('Failed to fetch movies:', error);
			}
		}

		fetchMovies();
	}, [type]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>{title}</h2>
				<button>Explore More</button>
			</div>

			<div className={styles.show_list} ref={containerRef}>
				<ButtonArrow
					additionalClass='btn_left'
					onClick={() => {
						handleScroll(containerRef.current, 'left', 1180);
					}}>
					&lt;
				</ButtonArrow>
				{movies.map((movie) => (
					<Card key={movie.id} movie={movie} />
				))}
				<ButtonArrow
					additionalClass='btn_right'
					onClick={() => {
						handleScroll(containerRef.current, 'right', 1180);
					}}>
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

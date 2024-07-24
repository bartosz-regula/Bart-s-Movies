'use client';

import { useState, useEffect } from 'react';
import ButtonHero from './ButtonHero';
import styles from './Hero.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export default function Hero() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchMovies() {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
			);
			const data = await res.json();
			setMovies(data.results);
		}

		fetchMovies();
	}, []);

	if (movies.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.hero}>
			<Carousel
				autoPlay
				infiniteLoop
				interval={5000}
				showThumbs={false}
				showStatus={false}
				showArrows={false}
				swipeable={true}
				dynamicHeight={false}
				emulateTouch={true}>
				{movies.map((movie) => (
					<div
						key={movie.id}
						className={styles.slide}
						style={{
							backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 5%,  rgba(0,0,0,0) ), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
							backgroundSize: 'cover',
						}}>
						<div className={styles.text_container}>
							<h1>{movie.title}</h1>
							<p>
								{movie.overview
									? movie.overview
									: `We don't have an overview for ${movie.title} yet.`}
							</p>
							<ButtonHero>Watch Trailer</ButtonHero>
							<ButtonHero additionalClass='btn_favorite'>Add to favorite</ButtonHero>
						</div>
					</div>
				))}
			</Carousel>
		</div>
	);
}

// 'use client';
//
// import { useState, useEffect } from 'react';
// import ButtonHero from './ButtonHero';
// import styles from './Hero.module.css';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
//
// export default async function Hero() {
// 	const res = await fetch(
// 		`${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}}`
// 	);
//
// 	const movie = await res.json();
// 	return (
// 		<div className={styles.hero}>
// 			<div className={styles.text_container}>
// 				<Carousel>
// 					<h1>Title</h1>
// 					<p>Overview</p>
// 				</Carousel>
// 				<ButtonHero>Wacth Trailer</ButtonHero>
// 				<ButtonHero additionalClass='btn_favorite'>Add to favorite</ButtonHero>
// 			</div>
// 		</div>
// 	);
// }

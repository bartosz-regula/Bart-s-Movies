import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';

export default function Card({ movie }) {
	const title = movie.title || movie.name;
	const truncatedTitle = title.length > 24 ? title.slice(0, 24) + '...' : title;
	const releaseDate = movie.release_date || movie.first_air_date;
	const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
	const vote = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

	return (
		<Link href={'/'}>
			<div className={styles.card}>
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					className={styles.img}
					width={215}
					height={330}
					alt={title}
				/>
				<p className={styles.title}>{truncatedTitle}</p>
				<div className={styles.details_container}>
					<p>{year}</p>
					<p>
						<span>⭐️ </span>
						{vote}
					</p>
				</div>
			</div>
		</Link>
	);
}

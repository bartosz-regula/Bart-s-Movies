import ButtonArrow from './ButtonArrow';
import Card from './Card';
import styles from './ShowCase.module.css';

export default async function ShowCase({ type, title }) {
	const res = await fetch(`${process.env.BASE_URL}/${type}?api_key=${process.env.API_KEY}`);

	const movie = await res.json();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>{title}</h2>
				<button>Explore More</button>
			</div>

			<div className={styles.show_list}>
				<ButtonArrow additionalClass='btn_left'>&lt;</ButtonArrow>
				{movie.results.map((movie) => (
					<Card key={movie.id} movie={movie} />
				))}
				<ButtonArrow additionalClass='btn_right'>&gt;</ButtonArrow>
			</div>
		</div>
	);
}

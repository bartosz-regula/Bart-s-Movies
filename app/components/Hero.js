import ButtonHero from './ButtonHero';
import styles from './Hero.module.css';

export default function Hero() {
	return (
		<div className={styles.hero}>
			<div className={styles.text_container}>
				<h1>Title</h1>
				<p>Overview</p>
				<ButtonHero name='Watch trailer' />
				<ButtonHero name='Add to favorite' additionalClass='btn_favorite' />
			</div>
		</div>
	);
}

import styles from './ButtonHero.module.css';

export default function ButtonHero({ name, additionalClass }) {
	return (
		<button className={`${styles.btn} ${additionalClass ? styles[additionalClass] : ''}`}>
			{name}
		</button>
	);
}

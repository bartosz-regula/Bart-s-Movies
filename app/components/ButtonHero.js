import styles from './ButtonHero.module.css';

export default function ButtonHero({ children, additionalClass }) {
	return (
		<button className={`${styles.btn} ${additionalClass ? styles[additionalClass] : ''}`}>
			{children}
		</button>
	);
}

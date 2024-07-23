import styles from './ButtonArrow.module.css';

export default function ButtonArrow({ children, additionalClass }) {
	return (
		<button className={`${styles.btn} ${additionalClass ? styles[additionalClass] : ''}`}>
			{children}
		</button>
	);
}

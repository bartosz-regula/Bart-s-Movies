import styles from './ButtonArrow.module.css';

export default function ButtonArrow({ children, additionalClass, onClick }) {
	return (
		<button
			className={`${styles.btn} ${additionalClass ? styles[additionalClass] : ''}`}
			onClick={onClick}>
			{children}
		</button>
	);
}

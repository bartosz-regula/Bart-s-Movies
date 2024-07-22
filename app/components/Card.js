import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';

export default function Card() {
	return (
		<Link href={'/'}>
			<div className={styles.card}>
				<Image
					src={
						'https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg'
					}
					width={215}
					height={330}
					alt='sammple'></Image>
				<h2 className={styles.title}>Title</h2>
				<div className={styles.details_container}>
					<p>year</p>
					<p>rate</p>
				</div>
			</div>
		</Link>
	);
}

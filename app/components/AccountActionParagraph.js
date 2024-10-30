import Link from 'next/link';
import styles from './AccountActionParagraph.module.css';

export default function AccountActionParagraph({ children, link, actionText }) {
  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>
        {children}{' '}
        <Link href={link} className={styles.action}>
          {actionText}
        </Link>
      </p>
    </div>
  );
}

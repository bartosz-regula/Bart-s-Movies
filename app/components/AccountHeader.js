import { Gruppo } from 'next/font/google';
import styles from './AccountHeader.module.css';

const gruppo = Gruppo({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export default function AccountHeader({ children }) {
  return <h2 className={`${gruppo.className} ${styles.header}`}>{children}</h2>;
}

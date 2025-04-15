import Link from 'next/link';
import styles from './NavbarItem.module.css';

export default function NavbarItem({ title, param, icon, className, classNameTitle, classNameIcon, onClick }) {
  return (
    <Link href={param} className={`${styles.navbarItem} ${className || ''}`} onClick={onClick}>
      <div className={`${styles.icon} ${classNameIcon}`}>{icon}</div>
      <span className={`${styles.title} ${classNameTitle}`}>{title}</span>
    </Link>
  );
}

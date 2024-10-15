import Link from 'next/link';

export default function NavbarItem({ title, param }) {
  return <Link href={param}>{title}</Link>;
}

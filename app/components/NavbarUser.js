import NavbarItem from './NavbarItem';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './NavbarUser.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LogoutIcon from '@mui/icons-material/Logout';

export const UserMenu = ({ user, logout }) => {
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div className={styles.navbar_user} onClick={toggleMenu} ref={menuRef}>
      <div className={styles.user_container}>
        <NavbarItem title={user} param="" icon={<AccountCircleIcon fontSize="inherit" />} />
        <span className={styles.user_arrow}>
          {isOpen ? <ArrowDropUpIcon fontSize="inherit" /> : <ArrowDropDownIcon fontSize="inherit" />}
        </span>
      </div>
      <NavbarItem
        title="Sign out"
        param="/"
        icon={<LogoutIcon fontSize="inherit" />}
        onClick={logout}
        className={`${styles.sign_out} ${isOpen ? styles.open : ''}`}
      />
    </div>
  );
};

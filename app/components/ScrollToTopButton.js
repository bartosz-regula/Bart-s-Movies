'use client';

import { useState, useEffect } from 'react';
import ButtonTop from './ButtonTop';

const ScrollToTopButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled ? <ButtonTop /> : null;
};

export default ScrollToTopButton;

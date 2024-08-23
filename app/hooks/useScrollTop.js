import { useState, useEffect } from 'react';

export function useScrollTop({ loading, page, totalPages, setPage }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (document.documentElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop) < 100) {
      if (!loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [page, totalPages, loading]);

  return { isVisible };
}

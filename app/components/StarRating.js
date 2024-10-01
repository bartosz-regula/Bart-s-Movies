import React, { useState, useEffect } from 'react';
import Star from './Star';
import styles from './StarRating.module.css';

function StarRating({ rating, setRating }) {
  const [tempRating, setTempRating] = useState(0);

  useEffect(() => {
    setTempRating(rating);
  }, [rating]);

  function handleRating(rating) {
    setTempRating(rating);
    setRating(rating);
  }

  return (
    <div className={styles.container}>
      <div className={styles.star_container}>
        {Array.from({ length: 10 }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
    </div>
  );
}

export default StarRating;

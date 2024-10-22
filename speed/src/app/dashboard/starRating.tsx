'use client'

import React, { useState } from 'react';

interface StarRatingProps {
  articleId: string;
  initialRating?: number;  // Allows for an initial rating if needed
}

const StarRating: React.FC<StarRatingProps> = ({ articleId, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (ratingValue: number) => {
    setRating(ratingValue);
    console.log(`Article ${articleId} rated: ${ratingValue}`);
    // Optional: Implement API call to save the rating here
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => {
        return (
          <span
            key={star}
            className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRatingClick(star)}
          >★</span>
        );
      })}
    </div>
  );
};

export default StarRating;
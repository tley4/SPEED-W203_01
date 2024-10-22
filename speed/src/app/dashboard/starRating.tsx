'use client';

import React, { useState } from 'react';

interface StarRatingProps {
  articleId: string;
  initialRating?: number;  // Allows for an initial rating if needed
}

const StarRating: React.FC<StarRatingProps> = ({ articleId, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = async (ratingValue: number) => {
    setRating(ratingValue);
    
    // Send the rating to the backend
    try {
      const response = await fetch(`http://localhost:5000/articles/${articleId}/rating`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: ratingValue }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update rating');
      }
  
      console.log(`Article ${articleId} rated: ${ratingValue}`);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleRatingClick(star)}
          style={{ cursor: 'pointer' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

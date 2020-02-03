import React from 'react';
import './RatingDisplay.scss';

const RatingDisplay = ({ rating }) => {
  return (
    <div className='rating__display'>
      <div className='rating-display__star'>
        <span className='icon-star-full'></span>
      </div>
      <div className='rating-display__number'>{rating.toFixed(1)}</div>
    </div>
  );
};

export default RatingDisplay;

import React from 'react';
import styled from 'styled-components';

const RatingDisplay = ({ rating }) => {
  const Wrapper = styled.div`
    position: relative;
  `;

  const Star = styled.span`
    font-size: 2.7em;
  `;

  const RatingNumber = styled.div`
    position: absolute;
    font-weight: bold;
    top: 13px;
    left: 10px;
  `;

  return (
    <Wrapper>
      <div>
        <Star className='icon-star-full'></Star>
      </div>
      <RatingNumber>{rating.toFixed(1)}</RatingNumber>
    </Wrapper>
  );
};

export default RatingDisplay;

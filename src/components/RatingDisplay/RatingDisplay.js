import React from 'react';
import styled from 'styled-components';

const RatingDisplay = ({ rating }) => {
  const Wrapper = styled.div`
    position: relative;
  `;

  const StarWrapper = styled.div``;

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
      <StarWrapper>
        <Star className='icon-star-full'></Star>
      </StarWrapper>
      <RatingNumber className='rating-display__number'>
        {rating.toFixed(1)}
      </RatingNumber>
    </Wrapper>
  );
};

export default RatingDisplay;

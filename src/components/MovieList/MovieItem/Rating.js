import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RatingStarDisplay from '@/components/RatingStarDisplay/RatingStarDisplay';

const Rating = ({ rating }) => {
  const Wrapper = styled.div`
    position: absolute;
    right: -23px;
    top: -20px;
  `;
  return (
    <Wrapper>
      <RatingStarDisplay rating={rating} />
    </Wrapper>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;

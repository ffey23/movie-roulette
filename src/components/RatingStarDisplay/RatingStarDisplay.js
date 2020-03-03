import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as Starr } from '@/assets/images/star-full.svg';

const RatingStarDisplay = ({ rating }) => {
  const Wrapper = styled.div`
    position: relative;
  `;

  const StarWrapper = styled.div`
    width: 43px;
    height: 43px;
    & > svg {
      fill: orange;
    }
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
        <Starr />
      </StarWrapper>
      <RatingNumber>{rating.toFixed(1)}</RatingNumber>
    </Wrapper>
  );
};

RatingStarDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingStarDisplay;

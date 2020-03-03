import React from 'react';
import ReactRating from 'react-rating';
import { ReactComponent as StarFull } from '@/assets/images/star-full.svg';
import { ReactComponent as StarEmpty } from '@/assets/images/star-empty.svg';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Rating = ({ rating, onChange }) => {
  const Wrapper = styled.div`
    margin-bottom: 12px;
    // hacking react rating responsiveness - this will be only for smaller screens to 380px
    @media screen and (max-width: 380px) {
      margin-bottom: 0px;
      > span {
        display: flex !important;
        > span {
          flex-grow: 1;
          /* > span {
            height: 0;
            padding-bottom: 100%;
          } */
          > span[style*='width: 50%'] {
            > svg {
              width: 200%;
            }
          }
        }
      }
    }
  `;

  const starsStyles = `
    fill: orange;
    // position: absolute;
    @media screen and (min-width: 380px) {
      position: relative;
      width: 32px;
    }
  `;

  const StarFullS = styled(StarFull)`
    ${starsStyles}
  `;

  const StarEmptyS = styled(StarEmpty)`
    ${starsStyles}
  `;

  return (
    <Wrapper>
      <ReactRating
        stop={10}
        fractions={2}
        initialRating={rating}
        readonly={rating !== 0}
        onChange={onChange}
        emptySymbol={<StarEmptyS />}
        fullSymbol={<StarFullS />}
      />
    </Wrapper>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

export default Rating;

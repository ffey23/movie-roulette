import React from 'react';
import { ReactComponent as Suggestion } from '../../assets/images/suggestion.svg';
import { ReactComponent as EmptyStar } from '../../assets/images/star-empty.svg';
import { ReactComponent as Details } from '../../assets/images/details.svg';
import styled from 'styled-components';
import './Landing.scss';

const SvgWrapper = styled.div`
  text-align: center;
  padding: 20px;
  svg {
    width: 42px;
    height: 42px;
    fill: #7b181b;
  }
`;

const Landing = () => {
  return (
    <div className='landing'>
      <h2 className='landing__heading'>Don't know what to watch?</h2>
      <p className='landing__text'>We'll make your life easier!</p>
      <div className='landing__features'>
        <div className='landing__feature-info'>
          <SvgWrapper>
            <Suggestion />
          </SvgWrapper>
          <strong>Get our movies suggestions</strong>
        </div>
        <div className='landing__feature-info'>
          <SvgWrapper>
            <Details />
          </SvgWrapper>
          <strong>Find out details about the movie</strong>
        </div>
        <div className='landing__feature-info'>
          <SvgWrapper>
            <EmptyStar />
          </SvgWrapper>
          <strong>Rate movies</strong>
        </div>
      </div>
    </div>
  );
};

export default Landing;

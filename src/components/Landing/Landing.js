import React from 'react';
import { ReactComponent as Suggestion } from '../../assets/images/suggestion.svg';
import { ReactComponent as EmptyStar } from '../../assets/images/star-empty.svg';
import { ReactComponent as Details } from '../../assets/images/details.svg';
import styled from 'styled-components';
import { fromMd, fromLg } from '../../styled/mixins';
import { colors } from '../../styled/variables';
import Feature from './Feature';

const Wrapper = styled.div`
  text-align: center;
  color: ${colors.primary};
`;

const Heading = styled.h2`
  margin-top: 10px;
  text-align: center;
  margin-bottom: 5px;
`;

const MainText = styled.p`
  color: ${colors.textLight};
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 30px;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  ${fromMd(`grid-template-columns: 1fr 1fr 1fr;`)}
  ${fromLg(`grid-gap: 119px;`)}
`;

const Landing = () => {
  return (
    <Wrapper>
      <Heading className='landing__heading'>Don't know what to watch?</Heading>
      <MainText className='landing__text'>
        We'll make your life easier!
      </MainText>
      <FeatureList>
        <Feature text='Get our movies suggestions' SvgImage={Suggestion} />
        <Feature text='Find out details about the movie' SvgImage={Details} />
        <Feature text='Rate movies' SvgImage={EmptyStar} />
      </FeatureList>
    </Wrapper>
  );
};

export default Landing;

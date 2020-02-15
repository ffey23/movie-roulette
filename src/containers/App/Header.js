import React from 'react';
import AuthButton from '../AuthButton/AuthButton';
import styled from 'styled-components';
import { colors } from '../../styled/variables';
import { fromLg } from '../../styled/mixins';
import { contentContainer } from './Styled/mixins';

const Header = () => {
  const HeaderWrapper = styled.header`
    height: 44px;
    background-color: ${colors.primary};
    color: ${colors.primaryText};
    ${fromLg(`
      height: 80px;
    `)}
  `;

  const Content = styled.div`
    ${contentContainer()}
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <HeaderWrapper>
      <Content>
        <h1 className='App__title'>
          <span className='App__title--big'>Movie Roulette</span>
          <span className='App__title--small'>MR</span>
        </h1>
        <AuthButton />
      </Content>
    </HeaderWrapper>
  );
};

export default Header;

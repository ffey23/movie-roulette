import React from 'react';
import AuthButton from '../AuthButton/AuthButton';
import styled from 'styled-components';
import { colors } from '@/styled/variables';
import { fromLg } from '@/styled/mixins';
import { contentContainer } from './styled/mixins';

const Header = () => {
  const Wrapper = styled.header`
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

  const Title = styled.h1``;

  const SmallTitle = styled.span`
    ${fromLg(`
        display: none;
      `)}
  `;

  const BigTitle = styled.span`
    display: none;
    ${fromLg(`
        display: block;
      `)}
  `;

  const authButtonStyles = `
    border: 1px solid #000;
    height: 30px;
    width: 90px;
    background-color: ${colors.primaryLight};
    color: ${colors.primaryText};
    font-weight: bold;
  `;

  return (
    <Wrapper>
      <Content>
        <Title>
          {/* We need different title for small and big screens */}
          <BigTitle>Movie Roulette</BigTitle>
          <SmallTitle>MR</SmallTitle>
        </Title>
        <AuthButton styles={authButtonStyles} />
      </Content>
    </Wrapper>
  );
};

export default Header;

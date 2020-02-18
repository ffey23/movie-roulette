import React from 'react';
import { ReactComponent as MdbLogo } from '../../assets/images/movie-db-logo.svg';
import { contentContainer } from './styled/mixins';
import styled from 'styled-components';

function Footer() {
  const FooterWrapper = styled.footer``;

  const Content = styled.div`
    ${contentContainer()}
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const LinkList = styled.div`
    margin-bottom: 12px;
  `;

  const Anchor = styled.a``;

  const LogoWrapper = styled.div`
    width: 100px;
  `;

  return (
    <FooterWrapper>
      <Content>
        <LinkList>
          <Anchor href='https://icons8.com/icon/W71PIW3yxyeJ/roulette'>
            Roulette icon by Icons8
          </Anchor>
        </LinkList>
        <LogoWrapper>
          <MdbLogo />
        </LogoWrapper>
      </Content>
    </FooterWrapper>
  );
}

export default Footer;

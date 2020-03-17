import React from 'react';
import { ReactComponent as MdbLogo } from '@/assets/images/movie-db-logo.svg';
import styled from 'styled-components';
import ContentContainer from './styled/ContentContainer';

function Footer() {
  const Content = styled(ContentContainer)`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const LinkList = styled.div`
    margin-bottom: 12px;
  `;

  const Link = styled.div`
    padding: 5px 0;
  `;

  const LogoWrapper = styled.div`
    width: 100px;
  `;

  return (
    <div>
      <Content>
        <LinkList>
          <Link>
            <a href='https://icons8.com/icon/W71PIW3yxyeJ/roulette'>
              Roulette icon by Icons8
            </a>
          </Link>
          <Link>
            Icons made by{' '}
            <a href='https://www.flaticon.com/authors/freepik' title='Freepik'>
              Freepik
            </a>{' '}
            from{' '}
            <a href='https://www.flaticon.com/' title='Flaticon'>
              www.flaticon.com
            </a>
          </Link>
        </LinkList>
        <LogoWrapper>
          <MdbLogo />
        </LogoWrapper>
      </Content>
    </div>
  );
}

export default Footer;

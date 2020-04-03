import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as ErrorSvg } from '@/assets/images/error-icon.svg';
import { colors } from '@/styled/variables';
import Button from '../Button/Button';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorSvgWrapper = styled.div`
  width: 100px;
  fill: ${colors.neutralDark};
  margin-bottom: 10px;
`;
const Message = styled.p`
  text-align: center;
  margin-bottom: 14px;
  font-size: 20px;
  font-weight: bold;
  color: red;
`;

const SButton = styled(Button)`
  width: 100%;
  line-height: 36px;
  font-weight: bold;
  letter-spacing: 4px;
  font-size: 18px;
  border-radius: 2px;
`;

const Crash = ({ history }) => {
  const reload = params => {
    window.location.reload();
    //history.push('/');
  };

  document.body.style.overflow = 'hidden';

  return (
    <Wrapper>
      <Content>
        <ErrorSvgWrapper>
          <ErrorSvg />
        </ErrorSvgWrapper>
        <Message>Something whent wrong</Message>
        <SButton confirm onClick={reload}>
          Reload
        </SButton>
      </Content>
    </Wrapper>
  );
};

Crash.propTypes = {};

export default Crash;

import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ErrorSvg } from '@/assets/images/error-icon.svg';
import { colors } from '@/styled/variables';

const ErrorImageFallback = () => {
  const ErrorSvgWrapper = styled.div`
    position: absolute;
    width: 100px;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    svg {
      fill: ${colors.neutralDark};
    }
  `;

  return (
    <ErrorSvgWrapper>
      <ErrorSvg />
    </ErrorSvgWrapper>
  );
};

export default ErrorImageFallback;

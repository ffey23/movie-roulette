import React from 'react';
import styled from 'styled-components';
import { fromMd, fromLg } from '@/styled/mixins';
import { colors } from '@/styled/variables';
import { ReactComponent as ErrorSvg } from '@/assets/images/error-icon.svg';

const ErrorImage = () => {
  const ErrorSvgWrapper = styled.div`
    position: absolute;
    width: 100px;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    ${fromMd(`
      width: 55px;
      position: relative;
      top: 10px;
      left: 0;
    `)}
    ${fromLg(`
      position: absolute;
      width: 100px;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
    `)}
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

export default ErrorImage;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '@/styled/variables';

function Feature({ text, SvgImage }) {
  const Wrapper = styled.div`
    border: 2px solid ${colors.neutralDark};
    border-radius: 10px;
    padding: 0 10px 20px;
    color: ${colors.textLight};
  `;

  const ImageWrapper = styled.div`
    text-align: center;
    padding: 20px;
    svg {
      width: 42px;
      height: 42px;
      fill: ${colors.primary};
    }
  `;

  return (
    <Wrapper>
      <ImageWrapper>
        <SvgImage />
      </ImageWrapper>
      <strong>{text}</strong>
    </Wrapper>
  );
}

Feature.propTypes = {
  text: PropTypes.string.isRequired,
  SvgImage: PropTypes.object.isRequired,
};

export default Feature;

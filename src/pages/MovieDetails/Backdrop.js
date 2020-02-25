import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromMd } from '@/styled/mixins';
import { colors } from '@/styled/variables';

function Backdrop({ src, alt, text }) {
  const Wrapper = styled.div`
    position: relative;
  `;

  const ImageWrapper = styled.div`
    padding-bottom: 56.19916%;
    position: relative;
  `;
  const Image = styled.img`
    width: 100%;
    position: absolute;
  `;

  const Overview = styled.div`
    background-color: white;
    border-bottom: 2px solid ${colors.neutralDark};
    border-left: 2px solid ${colors.neutralDark};
    border-right: 2px solid ${colors.neutralDark};
    border-radius: 0 0 3px 3px;
    padding: 6px 2px;
    ${fromMd(`
      position: absolute;
      left: 0;
      bottom: 0;
      width: 400px;
      padding: 10px;
      border: none;
    `)}
  `;

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={src} alt={alt} />
      </ImageWrapper>
      <Overview className='movie-details__overview'>{text}</Overview>
    </Wrapper>
  );
}

Backdrop.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Backdrop;

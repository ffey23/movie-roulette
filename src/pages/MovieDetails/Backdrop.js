import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromMd } from '@/styled/mixins';

function Backdrop({ src, alt, text }) {
  const Wrapper = styled.div`
    position: relative;
  `;

  const Image = styled.img`
    width: 100%;
    margin-bottom: 12px;
  `;

  const Overview = styled.div`
    margin-bottom: 12px;
    ${fromMd(`
      position: absolute;
      left: 0;
      bottom: 0;
      width: 400px;
      padding: 10px;
      background-color: white;
    `)}
  `;

  return (
    <Wrapper>
      <Image src={src} alt={alt} />
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

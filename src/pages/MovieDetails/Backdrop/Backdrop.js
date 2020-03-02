import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromMd } from '@/styled/mixins';
import { colors } from '@/styled/variables';
import Img from 'react-image';
import styles from './Backdrop.module.scss';
import LoaderImage from './LoaderImage/LoaderImage';
import ErrorImageFallback from './ErrorImageFallback/ErrorImageFallback';

function Backdrop({ src, alt, text }) {
  const Wrapper = styled.div`
    position: relative;
    border: 2px solid ${colors.neutralDark};
    border-radius: 3px;
  `;

  const ImageWrapper = styled.div`
    padding-bottom: 56.19916%;
    position: relative;
  `;

  const Overview = styled.div`
    background-color: white;
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
        <Img
          src={src}
          alt={alt}
          unloader={<ErrorImageFallback />}
          loader={<LoaderImage />}
          className={styles.image}
        />
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

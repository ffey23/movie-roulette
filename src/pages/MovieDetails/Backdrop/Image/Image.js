import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'react-image';
import Error from './Error';
import Loader from './Loader';
import styles from './Image.module.scss';

const Image = ({ src, alt }) => {
  const Wrapper = styled.div`
    padding-bottom: 56.19916%;
    position: relative;
  `;

  return (
    <Wrapper>
      <Img
        src={src}
        alt={alt}
        unloader={<Error />}
        loader={<Loader />}
        className={styles.image}
      />
    </Wrapper>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;

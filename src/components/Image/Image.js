import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = ({ src, alt, css, ErrorFallback }) => {
  const [error, setError] = useState(false);

  if (error) {
    if (!ErrorFallback) return null;

    return <ErrorFallback />;
  }

  const Image = styled.img`
    ${css}
  `;

  return <Image onError={setError.bind(null, true)} src={src} alt={alt} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  css: PropTypes.string,
  ErrorFallback: PropTypes.func,
};

export default Image;

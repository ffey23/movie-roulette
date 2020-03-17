import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RouteLoading = ({ msg }) => {
  const Wrapper = styled.div`
    text-align: center;
  `;
  return <Wrapper>{msg}</Wrapper>;
};

RouteLoading.propTypes = {
  msg: PropTypes.string,
};

RouteLoading.defaultProps = {
  msg: 'Loading...',
};

export default RouteLoading;

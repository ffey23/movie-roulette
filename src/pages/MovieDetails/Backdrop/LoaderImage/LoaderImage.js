import React from 'react';
import Loader from '@/components/Loader/Loader';
import styled from 'styled-components';

const LoaderImage = props => {
  const Wrapper = styled.div`
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
  `;

  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};

export default LoaderImage;

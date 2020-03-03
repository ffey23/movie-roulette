import React from 'react';
import LoaderComponent from '@/components/Loader/Loader';
import styled from 'styled-components';

const Loader = props => {
  const Wrapper = styled.div`
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
  `;

  return (
    <Wrapper>
      <LoaderComponent />
    </Wrapper>
  );
};

export default Loader;

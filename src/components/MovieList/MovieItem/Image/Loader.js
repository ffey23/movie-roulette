import React from 'react';
import styled from 'styled-components';
import { fromMd, fromLg } from '@/styled/mixins';
import LoaderComponent from '@/components/Loader/Loader';
import styles from './Image.module.scss';

const Loader = () => {
  const Wrapper = styled.div`
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
    ${fromMd(`
        width: 50px;
        position: relative;
        top: 14px;
        left: 0;
      `)}
    ${fromLg(`
        position: absolute;
        top: calc(50% - 40px);
        left: calc(50% - 40px);
      `)}
  `;

  return (
    <Wrapper>
      <LoaderComponent
        spinnerClass={styles.spinner}
        spinnerPartClass={styles.spinnerPart}
      />
    </Wrapper>
  );
};

export default Loader;

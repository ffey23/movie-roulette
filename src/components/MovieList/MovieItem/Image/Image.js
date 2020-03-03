import React from 'react';
import styled from 'styled-components';
import { fromMd, fromLg } from '@/styled/mixins';
import Img from 'react-image';
import Loader from './Loader';
import Error from './Error';
import styles from './Image.module.scss';

const Image = ({ movie }) => {
  const ImageWrapper = styled.div`
    position: relative;
    padding: 10px;
    padding-bottom: calc((100% - 20px) * 1.49997 + 10px);
    ${fromMd(`
      padding-bottom: 10px;
      width: 70px;
      height: 95px;
      // prevents shrinking image if title is to big
      flex-shrink: 0;
    `)}
    ${fromLg(`
      padding-bottom: calc((100% - 20px) * 1.49997 + 10px);
      width: 100%;
      height: auto;
      flex-grow: 1;
    `)}
  `;

  return (
    <ImageWrapper>
      <Img
        src={`${process.env.REACT_APP_IMAGES_BASE_URL}w300/${movie.poster_path}`}
        alt={`Poster for movie ${movie.original_title}`}
        unloader={<Error />}
        loader={<Loader />}
        className={styles.image}
      />
    </ImageWrapper>
  );
};

export default Image;

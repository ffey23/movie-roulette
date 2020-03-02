import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startLoader, finishLoader } from '@/redux/loader/actions';
import api from '@/services/api';
import Swal from 'sweetalert2';
import Rating from 'react-rating';
import styled from 'styled-components';
import { fromLg } from '@/styled/mixins';
import Backdrop from './Backdrop/Backdrop';
import InfoList from '@/pages/MovieDetails/InfoList';
import { ReactComponent as StarFull } from '@/assets/images/star-full.svg';
import { ReactComponent as StarEmpty } from '@/assets/images/star-empty.svg';

const MovieDetails = ({ startLoader, finishLoader }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [myRating, setMyRating] = useState(0);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
    startLoader('Fetching movie!');
    api.movies
      .get_details(id, localStorage.getItem('session_id'))
      .then(
        movie => {
          setMovie(movie);
          setMyRating(
            movie.account_states.rated ? movie.account_states.rated.value : 0
          );
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Unable to load movie!',
          });
        }
      )
      .finally(() => {
        finishLoader();
      });
  }, [id, startLoader, finishLoader]);

  const rate = value => {
    // Needed for later reseting to the old value on error - othervise it wouldn't rerender
    setMyRating(value);
    api.movies.rate(id, localStorage.getItem('session_id'), value).then(
      movie => {
        Swal.fire({
          icon: 'success',
          toast: true,
          position: 'top-end',
          timer: 2000,
          showConfirmButton: false,
          text: 'Movie rated!',
        });
      },
      err => {
        // Reseting to old value on error
        const oldValue = myRating;
        setMyRating(oldValue);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Try rate again!',
        });
      }
    );
  };

  if (!movie) {
    return null;
  }

  const infos = [
    { name: 'Rating', content: movie.vote_average },
    { name: 'Popularity', content: movie.popularity },
    { name: 'Language', content: movie.original_language },
    {
      name: 'Production Companies',
      content: movie.production_companies.map(c => c.name).join(', '),
    },
  ];

  const Wrapper = styled.div`
    line-height: 22px;
  `;

  const Title = styled.h2`
    margin-bottom: 20px;
  `;

  const About = styled.div`
    margin-top: 8px;

    @media screen and (min-width: 380px) {
      margin-top: 12px;
    }
    ${fromLg(`
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    `)}
  `;

  const RatingWrapper = styled.div`
    margin-bottom: 12px;
    // hacking react rating responsiveness - this will be only for smaller screens to 380px
    @media screen and (max-width: 380px) {
      margin-bottom: 0px;
      > span {
        display: flex !important;
        > span {
          flex-grow: 1;
          /* > span {
            height: 0;
            padding-bottom: 100%;
          } */
          > span[style*='width: 50%'] {
            > svg {
              width: 200%;
            }
          }
        }
      }
    }
  `;

  const starsStyles = `
    fill: orange;
    // position: absolute;
    @media screen and (min-width: 380px) {
      position: relative;
      width: 32px;
    }
  `;

  const StarFullS = styled(StarFull)`
    ${starsStyles}
  `;

  const StarEmptyS = styled(StarEmpty)`
    ${starsStyles}
  `;
  return (
    <Wrapper>
      <Title>{movie.original_title}</Title>
      <Backdrop
        src={`${process.env.REACT_APP_IMAGES_BASE_URL}w500${movie.backdrop_path}`}
        alt={`Poster for movie ${movie.original_title}`}
        text={movie.overview}
      />
      <About>
        <RatingWrapper>
          <Rating
            stop={10}
            fractions={2}
            initialRating={myRating}
            readonly={myRating !== 0}
            onChange={rate}
            emptySymbol={<StarEmptyS />}
            fullSymbol={<StarFullS />}
          />
        </RatingWrapper>
        <InfoList infos={infos} />
      </About>
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startLoader: message => dispatch(startLoader(message)),
    finishLoader: () => dispatch(finishLoader()),
  };
};

export default connect(null, mapDispatchToProps)(MovieDetails);

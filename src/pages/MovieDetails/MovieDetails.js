import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startLoader, finishLoader } from '@/redux/loader/actions';
import api from '@/services/api';
import Swal from 'sweetalert2';
import Rating from './Rating.js';
import styled from 'styled-components';
import { fromLg } from '@/styled/mixins';
import Backdrop from './Backdrop/Backdrop';
import InfoList from '@/pages/MovieDetails/InfoList';
import { IMAGES_BASE_URL } from '@/services/constants';

const MovieDetails = ({ startLoader, finishLoader, setError }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [myRating, setMyRating] = useState(0);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
    startLoader('Fetching movie!');
    api.movies.get_details(id, localStorage.getItem('session_id')).then(
      movie => {
        finishLoader();
        setMovie(movie);
        setMyRating(
          movie.account_states.rated ? movie.account_states.rated.value : 0
        );
      },
      err => {
        finishLoader();
        setError('FETCH_MOVIE_DETAILS_ERROR', {
          title: 'Something went wrong!',
          message: 'Unable to load movie! Please reload!',
        });
      }
    );
  }, [id, startLoader, finishLoader, setError]);

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
        setError('RATE_MOVIE_ERROR', {
          title: 'Something went wrong!',
          message: 'Try to rate again!',
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

  return (
    <Wrapper>
      <Title>{movie.original_title}</Title>
      <Backdrop
        src={`${IMAGES_BASE_URL}w500${movie.backdrop_path}`}
        alt={`Poster for movie ${movie.original_title}`}
        text={movie.overview}
      />
      <About>
        <Rating rating={myRating} onChange={rate} />
        <InfoList infos={infos} />
      </About>
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startLoader: message => dispatch(startLoader(message)),
    finishLoader: () => dispatch(finishLoader()),
    setError: (type, error) => dispatch({ type, error }),
  };
};

export default connect(null, mapDispatchToProps)(MovieDetails);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../utilities/auth';
import { startLoading, finishLoading } from '../../redux/loading/actions';
import { Redirect } from 'react-router-dom';
import RouletteMovieList from '../../containers/RouletteMovieList/RouletteMovieList';
import { ReactComponent as Suggestion } from '../../assets/images/suggestion.svg';
import { ReactComponent as EmptyStar } from '../../assets/images/star-empty.svg';
import { ReactComponent as Details } from '../../assets/images/details.svg';
import styled from 'styled-components';
import './Home.scss';

const HomeWrapper = ({
  location,
  fetchingTokenStart,
  fetchingTokenFinish,
  loggedIn,
}) => {
  const [navigation, setNavigation] = useState(null);
  const requestToken = window.localStorage.getItem('request_token');

  /**
   * Request token can be used only once and only if we are redirected from movieDB which we know
   * from the existence of query parameters (location.search)
   */
  if (requestToken && location.search) {
    window.localStorage.removeItem('request_token');

    fetchingTokenStart();

    login(requestToken)
      .catch(err => console.log(err))
      .finally(() => {
        fetchingTokenFinish();
        setNavigation('/');
      });
  }
  const SvgWrapper = styled.div`
    text-align: center;
    padding: 20px;
    svg {
      width: 42px;
      height: 42px;
      fill: #7b181b;
    }
  `;
  return (
    <div className='home'>
      {navigation && <Redirect to={navigation} />}
      {loggedIn ? (
        <div>
          <RouletteMovieList />
        </div>
      ) : (
        <div className='landing'>
          <h2 className='landing__heading'>Don't know what to watch?</h2>
          <p className='landing__text'>We'll make your life easier!</p>
          <div className='landing__features'>
            <div className='landing__feature-info'>
              <SvgWrapper>
                <Suggestion />
              </SvgWrapper>
              <strong>Get our movies suggestions</strong>
            </div>
            <div className='landing__feature-info'>
              <SvgWrapper>
                <Details />
              </SvgWrapper>
              <strong>Find out details about the movie</strong>
            </div>
            <div className='landing__feature-info'>
              <SvgWrapper>
                <EmptyStar />
              </SvgWrapper>
              <strong>Rate movies</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchingTokenStart: () =>
      dispatch(startLoading(true, 'Fetching access token')),
    fetchingTokenFinish: () => dispatch(finishLoading()),
  };
};

HomeWrapper.propTypes = {
  loggedIn: PropTypes.bool,
  fetchingTokenStart: PropTypes.func,
  fetchingTokenFinish: PropTypes.func,
};

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);

export default Home;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../utilities/auth';
import { startLoading, finishLoading } from '../../redux/loading/actions';
import { Redirect } from 'react-router-dom';
import RouletteMovieList from '../../containers/RouletteMovieList/RouletteMovieList';
import Landing from '../../components/Landing/Landing';

const Home = ({
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
  return (
    <div className='home'>
      {navigation && <Redirect to={navigation} />}
      {loggedIn ? (
        <div>
          <RouletteMovieList />
        </div>
      ) : (
        <Landing />
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

Home.propTypes = {
  loggedIn: PropTypes.bool,
  fetchingTokenStart: PropTypes.func,
  fetchingTokenFinish: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

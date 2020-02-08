import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RouletteMovieList from '../../containers/RouletteMovieList/RouletteMovieList';
import Landing from '../../components/Landing/Landing';
import { login } from '../../redux/auth/actions';

const Home = ({ location, loggedIn, login }) => {
  const [nav, setNav] = useState(null);
  /**
   * Only if we are redirected from movieDB which we know
   * from the existence of query parameters (location.search)
   */
  if (location.search) {
    login().then(() => {
      setNav('/');
    });
  }
  return (
    <div className='home'>
      {nav && <Redirect to={nav} />}
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
    login: () => dispatch(login()),
  };
};

Home.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

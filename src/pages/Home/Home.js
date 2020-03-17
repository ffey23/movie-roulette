import React, { useState, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login } from '@/redux/auth/actions';
import RouteLoading from '@/components/RouteLoading/RouteLoading';
const RouletteMovieList = lazy(() =>
  import('@/containers/RouletteMovieList/RouletteMovieList')
);

const Landing = lazy(() => import('@/components/Landing/Landing'));

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

  const renderRedirect = () => nav && <Redirect to={nav} />;

  const renderPage = () => {
    if (loggedIn) return <RouletteMovieList />;

    return <Landing />;
  };

  return (
    <div>
      {renderRedirect()}
      <Suspense fallback={<RouteLoading />}>{renderPage()}</Suspense>
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

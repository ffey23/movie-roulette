import React from 'react';
import { connect } from 'react-redux';
import { checkLoggedIn } from '../../redux/auth/actions';
import 'normalize.css';
import './App.scss';
import MainLoader from '../MainLoader/MainLoader';
import PropTypes from 'prop-types';
import Header from './Header';
import MainRoutes from './MainRoutes';
import Footer from './Footer';

let App = ({ checkLoggedIn }) => {
  checkLoggedIn();
  return (
    <div className='App'>
      <Header />
      <MainRoutes />
      <Footer />
      {/* 
        covers whole screen and blocks scroll - activate/deactivate it from 
        anywhere in the ap via redux loader (start/finish)Loader actions 
      */}
      <MainLoader />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  checkLoggedIn: () => dispatch(checkLoggedIn()),
});

App.propTypes = {
  checkLoggedIn: PropTypes.func.isRequired,
};

App = connect(null, mapDispatchToProps)(App);

export default App;

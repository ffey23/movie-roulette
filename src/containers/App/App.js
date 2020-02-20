import React from 'react';
import { connect } from 'react-redux';
import { checkLoggedIn } from '@/redux/auth/actions';
import MainLoader from '../MainLoader/MainLoader';
import PropTypes from 'prop-types';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import styled from 'styled-components';

let App = ({ checkLoggedIn }) => {
  checkLoggedIn();
  const Wrapper = styled.div``;
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
      {/* 
        covers whole screen and blocks scroll - activate/deactivate it from 
        anywhere in the ap via redux loader (start/finish)Loader actions 
      */}
      <MainLoader />
    </Wrapper>
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

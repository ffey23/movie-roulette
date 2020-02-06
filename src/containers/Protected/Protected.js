import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

let Protected = ({ component: Component, loggedIn, ...rest }) => {
  if (loggedIn) return <Route component={Component} {...rest} />;
  return <Redirect to='/' />;
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

Protected = connect(mapStateToProps)(Protected);

export default Protected;

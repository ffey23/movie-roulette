import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  if (loggedIn) return <Route component={Component} {...rest} />;
  return <Redirect to='/' />;
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(ProtectedRoute);

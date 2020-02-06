import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { createRequestToken, logout } from '../../redux/auth/actions';

class AuthButtonWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: null,
    };
  }
  render() {
    const { navigate } = this.state;
    const { text, loggedIn } = this.props;
    return (
      <div className='auth__button'>
        {navigate && <Redirect to={`${navigate}`} push={true} />}
        <Button
          text={text}
          onClick={loggedIn ? this.logOut.bind(this) : this.logIn.bind(this)}
        />
      </div>
    );
  }

  /**
   * After we catch error we need to redirect user to movieDB authorization page
   * Look for REACT_APP_LOGIN_REDIRECT variable in .env files to see where you will be redirected when authorized
   * Also we need to save request_token in local storage as we will need to use it for gaining access token after redirect
   */
  logIn() {
    this.props.createRequestToken();
  }
  logOut() {
    this.props.logout();
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    text: state.auth.loggedIn ? 'Logout' : 'Login',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    createRequestToken: () => dispatch(createRequestToken()),
  };
};

AuthButtonWrapper.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  text: PropTypes.string,
  logout: PropTypes.func.isRequired,
  createRequestToken: PropTypes.func.isRequired,
};

const AuthButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButtonWrapper);

export default AuthButton;

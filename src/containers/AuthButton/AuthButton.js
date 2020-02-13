import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { createRequestToken, logout } from '../../redux/auth/actions';
import { dismissError } from '../../redux/error/actions';
import './AuthButton.scss';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2';

class AuthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: null,
    };
  }

  renderLoader() {
    const { loadingMessage } = this.props;
    if (!loadingMessage) return null;
    return (
      <div className='auth-button__loader-wrapper'>
        <Loader blockScroll={true} message={loadingMessage} />
      </div>
    );
  }

  renderError() {
    const { error, dismissError } = this.props;
    if (error) {
      Swal.fire({
        icon: 'error',
        title: error.title,
        text: error.message,
      }).then(() => dismissError());
    }
  }

  render() {
    const { navigate } = this.state;
    const { text, loggedIn } = this.props;
    this.renderError();
    return (
      <div className='auth__button'>
        {navigate && <Redirect to={`${navigate}`} push={true} />}
        <Button
          text={text}
          onClick={loggedIn ? this.logOut.bind(this) : this.logIn.bind(this)}
        />
        {this.renderLoader()}
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
    loadingMessage: state.auth.loadingMessage,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    createRequestToken: () => dispatch(createRequestToken()),
    dismissError: () => dispatch(dismissError()),
  };
};

AuthButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  text: PropTypes.string,
  loadingMessage: PropTypes.string,
  logout: PropTypes.func.isRequired,
  createRequestToken: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);

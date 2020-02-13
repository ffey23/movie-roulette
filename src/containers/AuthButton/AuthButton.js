import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { createRequestToken, logout } from '../../redux/auth/actions';
import { dismissError } from '../../redux/error/actions';
import './AuthButton.scss';
import Swal from 'sweetalert2';

class AuthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: null,
    };
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

  renderNavigation() {
    const { navigate } = this.state;
    if (!navigate) return null;

    return <Redirect to={`${navigate}`} push={true} />;
  }

  renderButton() {
    const { text, loggedIn } = this.props;
    return (
      <Button
        text={text}
        onClick={loggedIn ? this.logOut.bind(this) : this.logIn.bind(this)}
      />
    );
  }

  render() {
    this.renderError();
    return (
      <div className='auth__button'>
        {this.renderNavigation()}
        {this.renderButton()}
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
  logout: PropTypes.func.isRequired,
  createRequestToken: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);

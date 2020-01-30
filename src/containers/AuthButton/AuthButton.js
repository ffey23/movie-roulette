import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import Button from '../../components/Button/Button';
import {createRequestToken, logout} from '../../utilities/auth';
import { startLoading, finishLoading } from '../../redux/loading/actions';

class AuthButtonWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: null
        };
      }
    render() {
        const { navigate } = this.state;
        const {text, loggedIn} = this.props;
        return (
            <div className="auth__button">
                {
                    navigate && <Redirect to={`${navigate}`} push={true} />
                }
                <Button text={text} onClick={loggedIn ? this.logOut.bind(this) : this.logIn.bind(this)}/>
            </div>
        );
    }

    /**
     * After we catch error we need to redirect user to movieDB authorization page
     * Look for REACT_APP_LOGIN_REDIRECT variable in .env files to see where you will be redirected when authorized
     * Also we need to save request_token in local storage as we will need to use it for gaining access token after redirect
     */
    logIn() {
        const {startLoading, finishLoading} = this.props;
        startLoading('Creating request token');
        createRequestToken().catch((err) => {
            console.error(err);
        })
        .finally(() => {
            finishLoading();
        })      
    }
    logOut() {
        startLoading('Loging out...');
        logout().catch(err => {
            console.error(err);
        }).finally(() => {
            finishLoading();
            this.setState({
                navigate: '/',
            })
        });
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        text: state.auth.loggedIn ? 'Logout' : 'Login',
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoading: (message) => dispatch(startLoading(true, message)),
        finishLoading: () => dispatch(finishLoading()),
    }
}

const AuthButton = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthButtonWrapper);

export default AuthButton
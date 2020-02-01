import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../utilities/auth';
import { startLoading, finishLoading} from '../redux/loading/actions';
import { Redirect } from 'react-router-dom';
import RouletteMovieList from '../containers/RouletteMovieList/RouletteMovieList';

const HomeWrapper = ({location, fetchingTokenStart, fetchingTokenFinish, loggedIn }) => {
       
    const [navigation, setNavigation] = useState(null);
    const requestToken = window.localStorage.getItem('request_token');

    /**
     * Request token can be used only once and only if we are redirected from movieDB which we know 
     * from the existence of query parameters (location.search)
     */
    if(requestToken && location.search) {
        window.localStorage.removeItem('request_token');

        fetchingTokenStart();

        login(requestToken)
        .catch(
            err => console.log(err)
        ) 
        .finally(() => {
            fetchingTokenFinish();
            setNavigation('/')
        })
    }

    return (
        <div className="home">I am home
            {
                navigation && <Redirect to={navigation} />
            }
            {
                loggedIn ? (
                    <div>
                        <RouletteMovieList />
                    </div>

                ) :
                (
                    <div>
                        This is not loggin page
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
      loggedIn: state.auth.loggedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchingTokenStart: () => dispatch(startLoading(true, 'Fetching access token')),
      fetchingTokenFinish: () => dispatch(finishLoading()),
    }
}

HomeWrapper.propTypes = {
    loggedIn: PropTypes.bool,
    fetchingTokenStart: PropTypes.func,
    fetchingTokenFinish: PropTypes.func,
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeWrapper);

export default Home;
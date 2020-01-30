import React, {useState} from 'react';
import { connect } from 'react-redux'
import { login } from '../utilities/auth';
import { startLoading, finishLoading} from '../redux/loading/actions';
import { Redirect } from 'react-router-dom';

const Home = ({location, fetchingTokenStart, fetchingTokenFinish }) => {
       
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
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      fetchingTokenStart: () => dispatch(startLoading(true, 'Fetching access token')),
      fetchingTokenFinish: () => dispatch(finishLoading()),
    }
  }
  
  const HomeConnected = connect(
      null,
      mapDispatchToProps,
  )(Home);

export default HomeConnected;
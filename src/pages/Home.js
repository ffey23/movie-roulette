import React from 'react';
import store from '../redux/store';
import { login } from '../utilities/auth';
import { startLoading, finishLoading} from '../redux/actions-creators';

const Home = ({location}) => {
       
    const requestToken = window.localStorage.getItem('request_token');

    /**
     * Request token can be used only once and only if we are redirected from movieDB which we know 
     * from the existence of query parameters (location.search)
     */
    if(requestToken && location.search) {
        window.localStorage.removeItem('request_token');

        store.dispatch(startLoading(true, 'Fetching access token'));

        login(requestToken)
        .catch(
            err => console.log(err)
        ) 
        .finally(() => {
            store.dispatch(finishLoading());
        })
    }

    return (
        <div className="home">I am home</div>
    )
    }


export default Home;
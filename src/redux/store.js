import thunkMiddleware from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import * as reducers from './reducers';

const movieRoulette = combineReducers(reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    movieRoulette,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
        )
    )
);
export default store;
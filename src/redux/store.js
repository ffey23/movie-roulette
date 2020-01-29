import {combineReducers, createStore} from 'redux';
import * as reducers from './reducers/';

const movieRoulette = combineReducers(reducers)

const store = createStore(
    movieRoulette,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
import thunk from 'redux-thunk';
import apiMiddleware from './middlewares/api.middleware';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import * as reducers from './reducers';

const movieRoulette = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  movieRoulette,
  composeEnhancers(applyMiddleware(thunk, apiMiddleware))
);
export default store;

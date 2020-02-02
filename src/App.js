import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'normalize.css';
import './App.scss';
import Home from './pages/Home';
import Details from './pages/MovieDetails/MovieDetails';
import MainLoader from './containers/MainLoader/MainLoader';
import AuthButton from './containers/AuthButton/AuthButton';
import { syncReduxWithLocalStorage } from './utilities/auth';
import {ReactComponent as MdbLogo}  from './assets/images/movie-db-logo.svg';

const App = () => {
    syncReduxWithLocalStorage();
    return (
      <Router>
        <div className="App">
          <header className="App__header">
            <div className="App__container App__container--header">
              <h1 className="App__title">
                <span className="App__title--big">Movie Roulette</span>
                <span className="App__title--small">MR</span>
              </h1>
              <AuthButton />
            </div>
          </header>
          <main className="App__main">
            <div className="App__container">
              <Switch>
                <Route path="/movie-details/:id" component={Details} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </main>
          <footer className="App__footer">
            <div className="App__container App__container--footer">
              <div className="App__footer-href">
                <a href="https://icons8.com/icon/W71PIW3yxyeJ/roulette">Roulette icon by Icons8</a>
              </div>
              <div className="App__movie-db-logo">
                <MdbLogo />
              </div> 
            </div>
          </footer>
          <MainLoader/>
        </div>
      </Router>
    );
  
}

export default App;
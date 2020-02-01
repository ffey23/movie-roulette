import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Details from './pages/MovieDetails/MovieDetails';
import MainLoader from './containers/MainLoader/MainLoader';
import AuthButton from './containers/AuthButton/AuthButton';
import { syncReduxWithLocalStorage } from './utilities/auth';

const App = () => {
    syncReduxWithLocalStorage();
    return (
      <Router>
        <div className="App">
          <header className="App__header">
            <div className="App__container">
              <AuthButton className="App__header-auth-button"/>
            </div>
          </header>
          <main className="App__main">
            <div className="App__container">
            <Switch>
              <Route path="/movie-details/:id" component={Details} />
              <Route path="/" component={Home} />
            </Switch>
            </div>
            <MainLoader/>
          </main>
          <footer className="App__footer">
            <div className="App__container">
            <a href="https://icons8.com/icon/W71PIW3yxyeJ/roulette">Roulette icon by Icons8</a>
            </div>
          </footer>
        </div>
      </Router>
    );
  
}

export default App;
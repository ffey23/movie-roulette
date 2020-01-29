import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import MainLoader from './containers/MainLoader/MainLoader';
import AuthButton from './containers/AuthButton/AuthButton';

const App = () => {
    return (
      <Router>
      <div className="App">
        <header className="App__header">
            <AuthButton />
        </header>
        <main className="App__main">
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          <MainLoader/>
        </main>
        <footer className="App__footer">
          <a href="https://icons8.com/icon/W71PIW3yxyeJ/roulette">Roulette icon by Icons8</a>
        </footer>
      </div>
      </Router>
    );
  
}

export default App;

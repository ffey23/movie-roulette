import React from 'react';
import './App.css';
import MainLoader from './containers/MainLoader/MainLoader';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
        </header>
        <main className="App__main">
          <MainLoader/>
        </main>
        <footer className="App__footer">
          <a href="https://icons8.com/icon/W71PIW3yxyeJ/roulette">Roulette icon by Icons8</a>
        </footer>
      </div>
    );
  }
}

export default App;

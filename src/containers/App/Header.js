import React from 'react';
import AuthButton from '../AuthButton/AuthButton';

const Header = () => {
  return (
    <header className='App__header'>
      <div className='App__container App__container--header'>
        <h1 className='App__title'>
          <span className='App__title--big'>Movie Roulette</span>
          <span className='App__title--small'>MR</span>
        </h1>
        <AuthButton />
      </div>
    </header>
  );
};

export default Header;

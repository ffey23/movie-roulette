import React from 'react';
import { ReactComponent as MdbLogo } from '../../assets/images/movie-db-logo.svg';
function Footer(props) {
  return (
    <footer className='App__footer'>
      <div className='App__container App__container--footer'>
        <div className='App__footer-href'>
          <a href='https://icons8.com/icon/W71PIW3yxyeJ/roulette'>
            Roulette icon by Icons8
          </a>
        </div>
        <div className='App__movie-db-logo'>
          <MdbLogo />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

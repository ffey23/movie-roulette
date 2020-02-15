import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import MovieDetails from '../../pages/MovieDetails/MovieDetails';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function MainRoutes(props) {
  return (
    <main className='App__main'>
      <div className='App__container'>
        <Router>
          <Switch>
            <ProtectedRoute
              path='/movie-details/:id'
              component={MovieDetails}
            />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </div>
    </main>
  );
}

export default MainRoutes;

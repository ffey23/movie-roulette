import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import MovieDetails from '@/pages/MovieDetails/MovieDetails';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import styled from 'styled-components';
import { contentContainer } from './styled/mixins';
import { fromLg } from '@/styled/mixins';
import { colors } from '@/styled/variables';

function Main() {
  const Wrapper = styled.main`
    background-color: ${colors.neutralLight};
    min-height: calc(100vh - 44px);
    ${fromLg(`
      min-height: calc(100vh - 80px);
    `)}
  `;

  const Content = styled.div`
    ${contentContainer()}
  `;
  return (
    <Wrapper>
      <Content>
        <Router>
          <Switch>
            <ProtectedRoute
              path='/movie-details/:id'
              component={MovieDetails}
            />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </Content>
    </Wrapper>
  );
}

export default Main;

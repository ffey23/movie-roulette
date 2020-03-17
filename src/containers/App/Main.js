import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import styled from 'styled-components';
import { fromLg } from '@/styled/mixins';
import { colors } from '@/styled/variables';
import RouteLoading from '@/components/RouteLoading/RouteLoading';
import ContentContainer from './styled/ContentContainer';

const MovieDetails = lazy(() => import('@/pages/MovieDetails/MovieDetails'));
const Home = lazy(() => import('@/pages/Home/Home'));

function Main() {
  const Wrapper = styled.main`
    background-color: ${colors.neutralLight};
    min-height: calc(100vh - 44px);
    ${fromLg(`
      min-height: calc(100vh - 80px);
    `)}
  `;

  return (
    <Wrapper>
      <ContentContainer>
        <Router>
          <Suspense fallback={<RouteLoading />}>
            <Switch>
              <ProtectedRoute
                path='/movie-details/:id'
                component={MovieDetails}
              />
              <Route path='/' component={Home} />
            </Switch>
          </Suspense>
        </Router>
      </ContentContainer>
    </Wrapper>
  );
}

export default Main;

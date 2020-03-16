import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import styled from 'styled-components';
import { contentContainer } from './styled/mixins';
import { fromLg } from '@/styled/mixins';
import { colors } from '@/styled/variables';
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

  const Content = styled.div`
    ${contentContainer()}
  `;

  const Loading = () => {
    const Wrapper = styled.div`
      text-align: center;
    `;
    return <Wrapper>Loading...</Wrapper>;
  };

  return (
    <Wrapper>
      <Content>
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <ProtectedRoute
                path='/movie-details/:id'
                component={MovieDetails}
              />
              <Route path='/' component={Home} />
            </Switch>
          </Suspense>
        </Router>
      </Content>
    </Wrapper>
  );
}

export default Main;

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { HeaderWithRouter as Header } from './components/Header';
import HomePage from './pages/Home';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontSize, fontFamily, gray2 } from './Styles';
import SearchPage from './pages/SearchPage';
import { SignInPage } from './pages/SignInPage';
import { NotFoundPage } from './pages/NotFoundPage';
import QuestionPage from './pages/QuestionPage';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

const AskPage = lazy(() => import('./pages/AskPage'));

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
            text-align: center;
          `}
        >
          <Header />
          <Switch>
            <Redirect from="/home" to="/" />
            <Route path="/questions" component={QuestionPage} />
            <Route exact path="/" component={HomePage} />
            <Route path="/signIn" component={SignInPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/ask">
              <Suspense
                fallback={
                  <div
                    css={css`
                      margin-top: 100px;
                      text-align: center;
                    `}
                  >
                    Loading...
                  </div>
                }
              >
                <AskPage />
              </Suspense>
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

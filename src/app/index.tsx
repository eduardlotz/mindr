/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Help } from './pages/Help/Loadable';
import styled, { ThemeProvider } from 'styled-components/macro';
import { MotionModal } from './components/MotionModal';
import { Lobby } from './pages/Lobby/Loadable';
import { Homepage } from './pages/Homepage/Loadable';

import { useHomepageSlice } from './pages/Homepage/slice';
import { useDispatch, useSelector } from 'react-redux';
import { games } from './pages/Homepage/gamesModes';
import {
  selectJoinedGroup,
  selectIsCreator,
} from './pages/Lobby/slice/selectors';
import { JoinedRoom } from './pages/JoinedRoom';
import { getLocalStorage, setLocalStorage } from 'helpers/localstorage';
import { selectTheme } from './pages/Homepage/slice/selectors';
import lightTheme from 'styles/lightTheme';
import darkTheme from 'styles/darkTheme';

export function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { i18n } = useTranslation();
  const location = useLocation();

  const { actions: homeActions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  const joinedGroup = useSelector(selectJoinedGroup);
  const isCreator = useSelector(selectIsCreator);

  const currentTheme = useSelector(selectTheme);

  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

  React.useEffect(() => {
    dispatch(homeActions.setGameModes(games));
  }, [dispatch, homeActions]);

  React.useEffect(() => {
    let selectedTheme = getLocalStorage('theme');

    if (!selectedTheme) {
      selectedTheme = 'light';
      setLocalStorage('theme', 'light');
    }
    dispatch(homeActions.setTheme(selectedTheme));
  }, [dispatch, homeActions]);

  return (
    <>
      <Helmet
        titleTemplate="%s - mindr"
        defaultTitle="mindr"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="mindr is an online party game made for social distancing"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <MotionModal />
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path="/" component={Homepage} />
              {joinedGroup ? (
                isCreator ? (
                  <Route exact path="/lobby" component={Lobby} />
                ) : (
                  <Route exact path="/lobby" component={JoinedRoom} />
                )
              ) : (
                <Redirect to="/" />
              )}
              <Route exact path="/help" component={Help} />
              <Route component={NotFoundPage} />
            </Switch>
          </AnimatePresence>
        </MainContainer>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

const MainContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: calc(100% - 32px);
  max-width: 800px;
  margin: 0 auto;
  background: transparent;

  padding-bottom: 20px;
`;
